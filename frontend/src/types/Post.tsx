import { Comment } from './Comment'

export type Post = {
    _id: string,
    title: string,
    description: string,
    contact: string,
    tag: string[],
    status: string,
    image: File[],
    comment: Comment[],
    authorId: string,
    author: {
        firstName: string,
        lastName: string,
        email: string
    },
    document: {
        text: string
    }
}
