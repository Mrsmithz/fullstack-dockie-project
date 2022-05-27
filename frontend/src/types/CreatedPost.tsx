import { Tag } from "./Tag"

export type CreatedPost = {
  title: string;
  description: string;
  contact: string;
  tag: Tag[];
  permission: string;
  image: File[]
  titleOcr: string
  titleType: string
}