import { PostTC } from "../../model/Post"

export const postById = PostTC.mongooseResolvers.findById()
export const post = PostTC.mongooseResolvers.findOne()
export const posts = PostTC.mongooseResolvers.findMany()
export const postCount = PostTC.mongooseResolvers.count()