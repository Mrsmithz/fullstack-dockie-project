import { Comment } from './Comment'

export type Post = {
    _id: string,
    title: string;
    description: string;
    contact: string;
    tag: string[];
    permission: string;
    image: File[];
    comment: Comment[];
}
