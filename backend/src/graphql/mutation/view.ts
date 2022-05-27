import { schemaComposer, ResolverResolveParams} from 'graphql-compose'
import { IGraphqlContext } from "../../types/index.type"
import { IView } from '../../types/view/view.type'
import { View, ViewTC } from '../../model/View'
import { IViewArgs } from '../../types/graphql/view.type'
export const view = schemaComposer.createResolver({
    name:'view',
    kind:'mutation',
    type:ViewTC.getType(),
    args:{
        postId:`MongoID!`
    },
    resolve: async ({ args, context} : ResolverResolveParams<IView, IGraphqlContext, IViewArgs>) => {
        const { user : { _id : viewerId }} = context
        const { postId } = args
        const history = await View.find({viewerId}).lean().sort({ updatedAt: -1 }).limit(5)
        if (history.some(viewed => viewed.postId == postId)){
            return await View.findOneAndUpdate({postId, viewerId}, {updatedAt : Date.now()}, {
                returnDocument: 'after'
            })
        }
        return await View.create({ postId, viewerId})
    }
})