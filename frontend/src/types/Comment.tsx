import { User } from './User'

export type Comment = {
    _id: string
    authorId: string;
    createdAt: Date;
    comment: string;
    author: User
}
