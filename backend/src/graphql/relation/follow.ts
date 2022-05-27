import { FollowTC } from "../../model/Follow";
import { UserTC } from "../../model/User";

FollowTC.addRelation(
    'follower',
    {
        resolver: () => UserTC.mongooseResolvers.findOne(),
        projection: { followerId: true },
        prepareArgs:{
            filter: (follow) => {
                return { _id : follow.followerId}
            }
        }
    }
)

FollowTC.addRelation(
    'following',
    {
        resolver: () => UserTC.mongooseResolvers.findOne(),
        projection: { followingId: true },
        prepareArgs:{
            filter: (follow) => {
                return { _id : follow.followingId}
            }
        }
    }
)