import { UserTC } from "../../model/User"
import { PostTC } from "../../model/Post"

UserTC.addRelation(
    'postsDetail',
    {
        resolver: () => PostTC.mongooseResolvers.findMany(),
        projection: {_id: true},
        prepareArgs: {
            filter: (user) => ({
                authorId: user._id
            })
        }
    }
)