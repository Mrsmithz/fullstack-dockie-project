import { PostTC, Post } from "../../model/Post"
import mongoose, { ClientSession } from "mongoose"
import { User } from "../../model/User"
import { getFileUploadBucket, getImageUploadBucket} from "../../utils/uploadsBucket"
import { schemaComposer, ResolverResolveParams} from 'graphql-compose'
import { IAddRatingArgs, IUpdatePostArgs, IRemovePostArgs} from "../../types/graphql/post.type"
import { IGraphqlContext } from "../../types/index.type"
import { IRating, IPost} from "../../types/post/Post.type"
export const updatePostById = schemaComposer.createResolver({
    name:'updatePostById',
    kind:'mutation',
    type:PostTC.getType(),
    args:{
        _id: `MongoID!`,
        title: `String`,
        description: `String`,
        contact: `String`,
        status: `enum Status { private public }`,
        tagId: `[MongoID]`
    },
    resolve: async ({ args } : ResolverResolveParams<IPost, IGraphqlContext, IUpdatePostArgs>) : Promise<IPost> => {
        const { _id } = args
        const updated = await Post.findByIdAndUpdate(_id, {
            $set:args
        }, {
            returnDocument : 'after'
        })
        return updated
    }
})

export const removePostById = schemaComposer.createResolver({
    name:'removePostById',
    kind:'mutation',
    type:PostTC.getType(),
    args:{
        _id :`MongoID!`
    },
    resolve: async ({ args, context } : ResolverResolveParams<IPost, IGraphqlContext, IRemovePostArgs>) : Promise<IPost> => {
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

const RatingPayloadOTC = schemaComposer.createObjectTC({
    name: 'RatingPayload',
    fields: {
      userId: 'MongoID!',
      rating: 'Float!'
    },
})

export const addRating = schemaComposer.createResolver({
    name:'addRating',
    kind:'mutation',
    type:RatingPayloadOTC,
    args: {
        postId: 'MongoID!',
        rating: 'Float!'
    },
    resolve: async ({args, context} : ResolverResolveParams<IRating, IGraphqlContext, IAddRatingArgs>) : Promise<IRating> => {
        const { postId, rating} = args
        const { user : {_id : userId}} = context
        const ratingObj = {
            rating,
            userId
        }
        let session : ClientSession = null
        try{
            session = await mongoose.startSession()
            session.startTransaction()
            await Post.updateOne({_id:postId}, {
                $pull:{
                    ratings: { userId }
                }
            }, { session })
            await Post.updateOne({_id:postId}, {
                $push: { ratings : ratingObj}
            }, { session })
            await session.commitTransaction()

            return {
                userId,
                rating
            }
        }
        catch(e){
            console.error(e)
            await session.abortTransaction()
            throw new Error('Server error')
        }
        finally{
            await session.endSession()
        }
    }
})
