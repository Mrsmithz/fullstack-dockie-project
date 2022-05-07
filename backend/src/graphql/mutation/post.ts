import { PostTC } from "../../model/Post";
import { Post } from "../../model/Post";

export const updatePostById = PostTC.addResolver({
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
