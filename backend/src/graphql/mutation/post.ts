import { PostTC } from "../../model/Post"
import { Post } from "../../model/Post"
import mongoose, { ClientSession } from "mongoose"
import { User } from "../../model/User"
import { getFileUploadBucket, getImageUploadBucket} from "../../utils/uploadsBucket"


PostTC.addResolver({
    name:'updatePostById',
    kind:'mutation',
    type:PostTC.getType(),
    args:{
        _id: `MongoID!`,
        title: `String`,
        description: `String`,
        contact: `String`,
        status: `enum Status { private public }`,
    },
    resolve: async ({ args }) => {
        const { _id } = args
        const updated = await Post.findByIdAndUpdate(_id, {
            $set:args
        }, {
            returnDocument : 'after'
        })
        return updated
    }
})

PostTC.addResolver({
    name:'removePostById',
    kind:'mutation',
    type:PostTC.getType(),
    args:{
        _id :`MongoID!`
    },
    resolve: async ({ args, context }) => {
        const { user } = context
        const { _id } = args
        let session : ClientSession = null
        try{
            session = await mongoose.startSession()
            session.startTransaction()
            const removedPost = await Post.findByIdAndRemove(_id, { session })
            if (!removedPost){
                throw new Error('Post not found')
            }
            await User.updateOne({_id:user._id}, {
                $pull: {
                    posts : _id
                }
            }, { session })
            await getFileUploadBucket().delete(removedPost.file)
            await Promise.all(removedPost.images.map(async (image : mongoose.Types.ObjectId) => {
                return await getImageUploadBucket().delete(image)
            }))
            await session.commitTransaction()
            return removedPost
        }
        catch(err){
            console.error(err)
            await session.abortTransaction()
            throw new Error('Delete fail, please try again')
        }
        finally{
            await session.endSession()
        }
    },
})

export const updatePostById = PostTC.getResolver('updatePostById')
export const removePostById = PostTC.getResolver('removePostById')