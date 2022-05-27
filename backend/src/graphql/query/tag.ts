import { TagTC, Tag } from '../../model/Tag'
import { schemaComposer } from 'graphql-compose'

export const tagById = TagTC.mongooseResolvers.findById()
export const tags = TagTC.mongooseResolvers.findMany()
export const tagCount = TagTC.mongooseResolvers.count()

export const tag = schemaComposer.createResolver({
    name:'tag',
    kind:'query',
    type:TagTC.getType(),
    args:{
        name:'String!'
    },
    resolve: async ({ args }) => {
        const { name } = args
        return await Tag.findOne({ name })
    }
})