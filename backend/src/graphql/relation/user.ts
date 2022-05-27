import { PostTC } from "../../model/Post";
import { UserTC } from "../../model/User";
import { CommentTC } from '../../model/Comment'
import { DownloadTC } from '../../model/Download'
import { FollowTC } from '../../model/Follow'

UserTC.addRelation(
    'posts',
    {
        resolver: () => PostTC.mongooseResolvers.findMany(),
        projection: { _id : true },
        prepareArgs: {
            filter : (user) => {
                return { authorId : user._id}
            }
        }
    }
)

UserTC.addRelation(
    'comments',
    {
        resolver: () => CommentTC.mongooseResolvers.findMany(),
        projection: { _id : true},
        prepareArgs:{
            filter: (user) => {
                return { authorId : user._id}
            }
        }
    }
)
UserTC.addRelation(
    'downloads',
    {
        resolver: () => DownloadTC.mongooseResolvers.findMany(),
        projection: { _id : true},
        prepareArgs:{
            filter: (user) => {
                return { userId: user._id}
            }
        }
    }
)
UserTC.addRelation(
    'downloadsCount',
    {
        resolver: () => DownloadTC.mongooseResolvers.count(),
        projection: { _id: true},
        prepareArgs:{
            filter : (user) => {
                return { userId: user._id}
            }
        }
    }
)
UserTC.addRelation(
    'followers',
    {
        resolver: () => FollowTC.mongooseResolvers.findMany(),
        projection: { _id : true},
        prepareArgs:{
            filter : (user) => {
                return { followingId : user._id}
            }
        }
    }
)
UserTC.addRelation(
    'followings',
    {
        resolver: () => FollowTC.mongooseResolvers.findMany(),
        projection: { _id : true},
        prepareArgs:{
            filter : (user) => {
                return { followerId : user._id}
            }
        }
    }
)