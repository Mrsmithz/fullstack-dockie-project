import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { ITag } from '../types/tag/tag.type'
const TagSchema = new Schema<ITag>({
    name:{
        type: String,
        required: true,
        index: true,
        unique: true,
        trim:true,
        lowercase:true
    }
}, {timestamps: true})

const Tag = model<ITag>('Tag', TagSchema)
const customizationOptions = {}
const TagTC = composeMongoose(Tag, customizationOptions)

export { Tag, TagTC }