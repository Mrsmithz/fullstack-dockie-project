import { ViewTC } from '../../model/View'
import { PostTC } from '../../model/Post'
import { UserTC } from '../../model/User'
ViewTC.addRelation(
    'post',
    {
        resolver: () => PostTC.mongooseResolvers.findOne(),
        projection: { postId: true},
        prepareArgs:{
            filter: (view) => {
                return { _id: view.postId }
            }
        }
    }
)
ViewTC.addRelation(
    'user',
    {
        resolver: () => UserTC.mongooseResolvers.findOne(),
        projection: { viewerId: true},
        prepareArgs: {
            filter: (view) => {
                return { _id : view.viewerId }
            }
        }
    }
)