import { Follow, FollowTC } from "../../model/Follow";
import { schemaComposer, ResolverResolveParams} from 'graphql-compose'
import { IGraphqlContext } from "../../types/index.type"
import { IFollow } from "../../types/follow/follow.type";
import { IFollowArgs } from "../../types/graphql/follow.type";
export const follow = schemaComposer.createResolver({
    name:'follow',
    kind:'mutation',
    type:FollowTC.getType(),
    args:{
        followingId:`MongoID!`
    },
    resolve: async ({ args, context } : ResolverResolveParams<IFollow, IGraphqlContext, IFollowArgs>) => {
        const { user : { _id : followerId }} = context
        const { followingId } = args
        const followed = await Follow.findOne({followingId, followerId})
        if (followed){
            throw new Error('Already followed')
        }
        return await Follow.create({followerId, followingId})
    }
})

export const unfollow = schemaComposer.createResolver({
    name:'unfollow',
    kind:'mutation',
    type:FollowTC.getType(),
    args:{
        followingId: `MongoID!`
    },
    resolve: async ({ args, context }: ResolverResolveParams<IFollow, IGraphqlContext, IFollowArgs>) => {
        const { user : { _id : followerId }} = context
        const { followingId } = args
        const result = await Follow.findOneAndDelete({followerId, followingId})
        if (!result){
            throw new Error('Not followed')
        }
        return result
    }
})