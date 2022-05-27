import { Post, PostTC } from "../../model/Post"
import { schemaComposer } from "graphql-compose"
export const postById = PostTC.mongooseResolvers.findById()
export const post = PostTC.mongooseResolvers.findOne()
export const posts = PostTC.mongooseResolvers.findMany()
export const postCount = PostTC.mongooseResolvers.count()

export const newestPosts = schemaComposer.createResolver({
    name:'newestPosts',
    kind:'query',
    type:PostTC.mongooseResolvers.findMany().getType(),
    resolve: async () => {
        return await Post.find().lean().sort( { createdAt : -1 }).limit(5)
    }
})