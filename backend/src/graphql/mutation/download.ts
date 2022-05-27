import { schemaComposer, ResolverResolveParams} from 'graphql-compose'
import { Download, DownloadTC} from '../../model/Download'
import { IDownloadArgs } from '../../types/graphql/download.type'
import { IDownload } from '../../types/download/download.type'
import { IGraphqlContext } from '../../types/index.type'
export const download = schemaComposer.createResolver({
    name:'download',
    kind:'mutation',
    type: DownloadTC.getType(),
    args:{
        postId: 'MongoID!'
    },
    resolve: async ({ args, context} : ResolverResolveParams<IDownload, IGraphqlContext, IDownloadArgs>) : Promise<IDownload> => {
        const { user : { _id : userId } } = context
        const { postId } = args
        return await Download.create({userId, postId})
    }
})