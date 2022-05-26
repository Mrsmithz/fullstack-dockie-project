import { CommentTC } from "../../model/Comment"
import { UserTC } from "../../model/User"

CommentTC.addRelation(
    'author',
    {
        resolver: () => UserTC.mongooseResolvers.findOne(),
        projection: { authorId: true},
        prepareArgs:{
            filter: (comment) => comment.authorId
        }
    }
)