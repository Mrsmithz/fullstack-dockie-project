import { Schema, model } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

const TagSchema = new Schema({
    name:String,
    count:Number
})

TagSchema.plugin(timestamp)
const Tag = model('Tag', TagSchema)
const customizationOptions = {}
const TagTC = composeMongoose(Tag, customizationOptions)

schemaComposer.Query.addFields({
    tagById: TagTC.mongooseResolvers.findById(),
    tag: TagTC.mongooseResolvers.findOne(),
    tags: TagTC.mongooseResolvers.findMany(),
    tagCount: TagTC.mongooseResolvers.count()
})

schemaComposer.Mutation.addFields({
    tagCreateOne: TagTC.mongooseResolvers.createOne(),
    tagUpdateById: TagTC.mongooseResolvers.updateById(),
    tagUpdateOne: TagTC.mongooseResolvers.updateOne(),
    tagRemoveById: TagTC.mongooseResolvers.removeById(),
    tagRemoveOne: TagTC.mongooseResolvers.removeOne()
})

const schema = schemaComposer.buildSchema()

export default schema