import { Comment } from './Comment'
import { User } from './User'
import { Tag } from './Tag'

export type Post = {
    _id: string,
    title: string,
    description: string,
    contact: string,
    tags: Tag[],
    status: string,
    file: string,
    images: string[],
    comments: Comment[],
    authorId: string,
    author: User,
    document: {
        text: string
    }
    ratingAvg?: number

}
