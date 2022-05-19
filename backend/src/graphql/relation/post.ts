import { PostTC } from "../../model/Post"
import { UserTC } from "../../model/User"
import { TagTC, Tag} from '../../model/Tag'
import { schemaComposer } from "graphql-compose"

const TagsPayloadOTC = schemaComposer.createObjectTC({
    name: 'TagsPayload',
    fields: {
      tags: ['Tag']
    },
  })
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

PostTC.addRelation(
    'tags',
    {
        resolver: TagTC.mongooseResolvers.findMany(),
        projection: { tagId : true},
        prepareArgs: {
            filter : (post) => {
                return { '_id' : { $in : post.tagId}}
            }
        }
    }
)