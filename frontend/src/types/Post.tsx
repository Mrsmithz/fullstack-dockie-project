import { Comment } from './Comment'

export type Post = {
    _id: string,
    title: string,
    description: string,
    contact: string,
    tag: string[],
    status: string,
    images: string[],
    comments: Comment[],
    authorId: string,
    author: {
        firstName: string,
        lastName: string,
        email: string,
        image: string
    },
    document: {
        text: string
    }
    ratingAvg?: number

}
