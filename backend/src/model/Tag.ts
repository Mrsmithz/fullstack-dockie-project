import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'

const TagSchema = new Schema({
    name:{
        type: String,
        required: true,
        index: true,
        unique: true,
        trim:true,
        lowercase:true
    }
}, {timestamps: true})

const Tag = model('Tag', TagSchema)
const customizationOptions = {}
const TagTC = composeMongoose(Tag, customizationOptions)

export { Tag, TagTC }