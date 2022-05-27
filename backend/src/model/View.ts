import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { IView } from '../types/view/view.type'

const ViewSchema = new Schema<IView>({
    postId:{
        type:Schema.Types.ObjectId,
        required:true,
        index:true
    },
    viewerId:{
        type:Schema.Types.ObjectId,
        required:true,
        index:true
    }
}, {timestamps: true})

const View = model<IView>('View', ViewSchema)
const customizationOptions = {}
const ViewTC = composeMongoose(View, customizationOptions)

export { View, ViewTC }