import { Post } from "./Post"
export type Profile = {
    firstName: string,
    lastName: string,
    followings: string[],
    posts: string[],
    image: string,
    postsDetail: Post[],
    email: string
}