import { PostTC } from "../../model/Post"
import { UserTC } from "../../model/User"

PostTC.addRelation(
    'author',
    {
        resolver: UserTC.mongooseResolvers.findById(),
        projection: { authorId : true },
        prepareArgs: {
            _id : (post) => post.authorId
        }
    }
)