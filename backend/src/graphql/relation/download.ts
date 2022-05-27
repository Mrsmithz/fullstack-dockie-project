import { DownloadTC } from "../../model/Download"
import { UserTC } from "../../model/User"
import { PostTC } from '../../model/Post'
DownloadTC.addRelation(
    'user',
    {
        resolver: () => UserTC.mongooseResolvers.findOne(),
        projection: { userId: true },
        prepareArgs: {
            filter : (download) => download.userId
        }
    }
)
DownloadTC.addRelation(
    'post',
    {
        resolver: () => PostTC.mongooseResolvers.findOne(),
        projection: {postId : true},
        prepareArgs:{
            filter : (download) => download.postId
        }
    }
)