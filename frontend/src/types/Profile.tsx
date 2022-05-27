import { Post } from "./Post"
import { Follower } from "./Follower"
import { Following } from "./Following"
export type Profile = {
    _id: string,
    firstName: string,
    lastName: string,
    followings: Following[],
    followers: Follower[],
    posts: Post[],
    image: string,
    email: string
}