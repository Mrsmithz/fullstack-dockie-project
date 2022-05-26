import { Post } from "./Post"
export type Profile = {
    firstName: string,
    lastName: string,
    followings: {
        _id: string
    }[],
    followers: {
        _id: string
    }[],
    posts: Post[],
    image: string,
    email: string
}