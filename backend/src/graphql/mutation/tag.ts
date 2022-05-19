import {Tag, TagTC} from '../../model/Tag'
import { schemaComposer } from 'graphql-compose'

export const addTag = schemaComposer.createResolver({
    name:'addTag',
    kind:'mutation',
    type: TagTC.getType(),
    args:{
        name: 'String!'
    },
    resolve: async ({ args }) => {
        const { name } = args
        if (await Tag.exists({ name })){
            throw new Error('Tag existed')
        }
        return await Tag.create({ name })
    }
})