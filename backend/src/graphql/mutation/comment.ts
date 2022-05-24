import { CommentTC, Comment } from "../../model/Comment";
import { schemaComposer, ResolverResolveParams} from 'graphql-compose'
import { IGraphqlContext } from "../../types/index.type"
import { IComment } from "../../types/comment/comment.type";
import mongoose, { Schema } from "mongoose"
import { ICreateComment, IUpdateComment, IDeleteComment} from "../../types/graphql/comment.type";

const isCommentOwner = async (userId : Schema.Types.ObjectId, commentId : Schema.Types.ObjectId) : Promise<Boolean> => {
    const result = await Comment.findOne({authorId : userId, _id: commentId})
    if (result){
        return true
    }
    return false
}
export const createComment = schemaComposer.createResolver({
    name:'createComment',
    kind:'mutation',
    type:CommentTC.getType(),
    args:{
        comment:`String!`,
        postId:`MongoID!`
    },
    resolve: async ({ args, context } : ResolverResolveParams<IComment, IGraphqlContext, ICreateComment>) => {
        const { user : { _id : userId}} = context
        const { comment, postId } = args
        const result = await Comment.create({comment, postId, authorId: userId})
        return result
    }
})

export const updateComment = schemaComposer.createResolver({
    name:'updateComment',
    kind:'mutation',
    type:CommentTC.getType(),
    args:{
        commentId:`MongoID!`,
        comment:`String!`
    },
    resolve: async ({args, context} : ResolverResolveParams<IComment, IGraphqlContext, IUpdateComment>) => {
        const { user : { _id : userId}} = context
        const { comment, commentId} = args
        if (!await isCommentOwner(userId, commentId)){
            throw new Error('Unauthorized')
        }
        const updated = await Comment.findByIdAndUpdate(commentId, { comment }, {
            returnDocument: 'after'
        })
        return updated
    }
})


const DeleteCommentPayloadOTC = schemaComposer.createObjectTC({
    name: 'DeleteCommentPayload',
    fields: {
      message: 'String!'
    },
})

export const deleteComment = schemaComposer.createResolver({
    name:'deleteComment',
    kind:'mutation',
    type: DeleteCommentPayloadOTC,
    args:{
        commentId:`MongoID!`
    },
    resolve: async ({args, context} : ResolverResolveParams<IComment, IGraphqlContext, IDeleteComment>) => {
        const { user : { _id : userId}} = context
        const { commentId } = args
        if (!await isCommentOwner(userId, commentId)){
            throw new Error('Unauthorized')
        }
        const result = await Comment.deleteOne({_id : commentId})
        if(result.deletedCount){
            return {
                message: 'Delete comment success'
            }
        }
        throw new Error('Delete comment fail, please try again')
    }
})