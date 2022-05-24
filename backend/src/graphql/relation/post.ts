import { Post, PostTC } from "../../model/Post"
import { UserTC } from "../../model/User"
import { TagTC, Tag} from '../../model/Tag'
import { IPost } from "../../types/post/Post.type"
import { CommentTC } from '../../model/Comment'

PostTC.addRelation(
    'author',
    {
        resolver: () => UserTC.mongooseResolvers.findById(),
        projection: { authorId : true },
        prepareArgs: {
            _id : (post) => post.authorId
        }
    }
)

PostTC.addRelation(
    'tags',
    {
        resolver: () => TagTC.mongooseResolvers.findMany(),
        projection: { tagId : true},
        prepareArgs: {
            filter : (post) => {
                return { '_id' : { $in : post.tagId}}
            }
        }
    }
)
PostTC.addRelation(
    'comments',
    {
        resolver: () => CommentTC.mongooseResolvers.findMany(),
        projection: { _id : true},
        prepareArgs:{
            filter : (post) => {
                return { postId : post._id}
            }
        }
    }
)

PostTC.addFields({
    ratingAvg : {
        type: 'Float',
        resolve: async (source : IPost) : Promise<number> => {
            const post = await Post.findById(source._id)
            const ratingAvg = post.ratings.reduce((prev, curr) => {
                return prev += curr.rating
            }, 0)

            if (isNaN(ratingAvg / post.ratings.length)) return 0

            return ratingAvg / post.ratings.length
        }
    }
})