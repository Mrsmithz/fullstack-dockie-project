import { Post } from "./Post"
export type Profile = {
    _id: string,
    firstName: string,
    lastName: string,
    followings: {
        followingId: string
    }[],
    followers: {
        followerId: string
    }[],
    posts: Post[],
    image: string,
    email: string
}