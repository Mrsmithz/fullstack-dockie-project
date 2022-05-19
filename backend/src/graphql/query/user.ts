import { UserTC, User} from "../../model/User"
import { schemaComposer, ResolverResolveParams} from "graphql-compose"
import { IGraphqlContext } from "../../types/index.type"
import IUser from '../../types/user/User.type'

export const userById = UserTC.mongooseResolvers.findById()
export const user = UserTC.mongooseResolvers.findOne()
export const users = UserTC.mongooseResolvers.findMany()
export const userCount = UserTC.mongooseResolvers.count()

export const me = schemaComposer.createResolver({
    name: 'me',
    kind: 'query',
    type: UserTC.getType(),
    resolve: async({ context }: ResolverResolveParams<IUser, IGraphqlContext>) => {
        if (!context.user) return null

        const { user : { _id : userId } } = context
        return await User.findById(userId)
    }
})
