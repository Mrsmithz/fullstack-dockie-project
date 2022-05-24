import { PostTC } from "../../model/Post";
import { UserTC } from "../../model/User";
import { CommentTC } from '../../model/Comment'
UserTC.addRelation(
    'posts',
    {
        resolver: () => PostTC.mongooseResolvers.findMany(),
        projection: { _id : true },
        prepareArgs: {
            filter : (user) => {
                return { userId : user._id}
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