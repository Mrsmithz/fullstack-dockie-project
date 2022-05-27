import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: any;
  /** The string representation of JavaScript regexp. You may provide it with flags "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  RegExpAsString: any;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['MongoID'];
  authorId: Scalars['MongoID'];
  comment: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  postId: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  message: Scalars['String'];
};

export enum EnumPostStatus {
  Private = 'private',
  Public = 'public'
}

export type FilterCountPostAuthorIdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterCountPostInput = {
  AND?: InputMaybe<Array<FilterCountPostInput>>;
  OR?: InputMaybe<Array<FilterCountPostInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountPostOperatorsInput>;
  authorId?: InputMaybe<Scalars['MongoID']>;
  contact?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['JSON']>;
  file?: InputMaybe<Scalars['MongoID']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  ratings?: InputMaybe<Array<InputMaybe<FilterCountPostRatingsInput>>>;
  status?: InputMaybe<EnumPostStatus>;
  tagId?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountPostOperatorsInput = {
  _id?: InputMaybe<FilterCountPost_IdOperatorsInput>;
  authorId?: InputMaybe<FilterCountPostAuthorIdOperatorsInput>;
};

export type FilterCountPostRatingsInput = {
  _id?: InputMaybe<Scalars['MongoID']>;
  rating?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['MongoID']>;
};

export type FilterCountPost_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterCountTagInput = {
  AND?: InputMaybe<Array<FilterCountTagInput>>;
  OR?: InputMaybe<Array<FilterCountTagInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountTagOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type FilterCountTagNameOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountTagOperatorsInput = {
  _id?: InputMaybe<FilterCountTag_IdOperatorsInput>;
  name?: InputMaybe<FilterCountTagNameOperatorsInput>;
};

export type FilterCountTag_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterCountUserEmailOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

export type FilterCountUserInput = {
  AND?: InputMaybe<Array<FilterCountUserInput>>;
  OR?: InputMaybe<Array<FilterCountUserInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountUserOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  followings?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  recentView?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountUserOperatorsInput = {
  _id?: InputMaybe<FilterCountUser_IdOperatorsInput>;
  email?: InputMaybe<FilterCountUserEmailOperatorsInput>;
};

export type FilterCountUser_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindManyPostAuthorIdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindManyPostInput = {
  AND?: InputMaybe<Array<FilterFindManyPostInput>>;
  OR?: InputMaybe<Array<FilterFindManyPostInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyPostOperatorsInput>;
  authorId?: InputMaybe<Scalars['MongoID']>;
  contact?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['JSON']>;
  file?: InputMaybe<Scalars['MongoID']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  ratings?: InputMaybe<Array<InputMaybe<FilterFindManyPostRatingsInput>>>;
  status?: InputMaybe<EnumPostStatus>;
  tagId?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyPostOperatorsInput = {
  _id?: InputMaybe<FilterFindManyPost_IdOperatorsInput>;
  authorId?: InputMaybe<FilterFindManyPostAuthorIdOperatorsInput>;
};

export type FilterFindManyPostRatingsInput = {
  _id?: InputMaybe<Scalars['MongoID']>;
  rating?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['MongoID']>;
};

export type FilterFindManyPost_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindManyTagInput = {
  AND?: InputMaybe<Array<FilterFindManyTagInput>>;
  OR?: InputMaybe<Array<FilterFindManyTagInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyTagOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type FilterFindManyTagNameOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyTagOperatorsInput = {
  _id?: InputMaybe<FilterFindManyTag_IdOperatorsInput>;
  name?: InputMaybe<FilterFindManyTagNameOperatorsInput>;
};

export type FilterFindManyTag_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindManyUserEmailOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

export type FilterFindManyUserInput = {
  AND?: InputMaybe<Array<FilterFindManyUserInput>>;
  OR?: InputMaybe<Array<FilterFindManyUserInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyUserOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  followings?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  recentView?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
  _id?: InputMaybe<FilterFindManyUser_IdOperatorsInput>;
  email?: InputMaybe<FilterFindManyUserEmailOperatorsInput>;
};

export type FilterFindManyUser_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindOnePostAuthorIdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindOnePostInput = {
  AND?: InputMaybe<Array<FilterFindOnePostInput>>;
  OR?: InputMaybe<Array<FilterFindOnePostInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOnePostOperatorsInput>;
  authorId?: InputMaybe<Scalars['MongoID']>;
  contact?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['JSON']>;
  file?: InputMaybe<Scalars['MongoID']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  ratings?: InputMaybe<Array<InputMaybe<FilterFindOnePostRatingsInput>>>;
  status?: InputMaybe<EnumPostStatus>;
  tagId?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOnePostOperatorsInput = {
  _id?: InputMaybe<FilterFindOnePost_IdOperatorsInput>;
  authorId?: InputMaybe<FilterFindOnePostAuthorIdOperatorsInput>;
};

export type FilterFindOnePostRatingsInput = {
  _id?: InputMaybe<Scalars['MongoID']>;
  rating?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['MongoID']>;
};

export type FilterFindOnePost_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type FilterFindOneUserEmailOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

export type FilterFindOneUserInput = {
  AND?: InputMaybe<Array<FilterFindOneUserInput>>;
  OR?: InputMaybe<Array<FilterFindOneUserInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneUserOperatorsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  followings?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  recentView?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneUserOperatorsInput = {
  _id?: InputMaybe<FilterFindOneUser_IdOperatorsInput>;
  email?: InputMaybe<FilterFindOneUserEmailOperatorsInput>;
};

export type FilterFindOneUser_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRating?: Maybe<RatingPayload>;
  addTag?: Maybe<Tag>;
  createComment?: Maybe<Comment>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  removePostById?: Maybe<Post>;
  updateComment?: Maybe<Comment>;
  updatePostById?: Maybe<Post>;
};


export type MutationAddRatingArgs = {
  postId: Scalars['MongoID'];
  rating: Scalars['Float'];
};


export type MutationAddTagArgs = {
  name: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  postId: Scalars['MongoID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['MongoID'];
};


export type MutationRemovePostByIdArgs = {
  _id: Scalars['MongoID'];
};


export type MutationUpdateCommentArgs = {
  comment: Scalars['String'];
  commentId: Scalars['MongoID'];
};


export type MutationUpdatePostByIdArgs = {
  _id: Scalars['MongoID'];
  contact?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  tagId?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['MongoID'];
  author?: Maybe<User>;
  authorId: Scalars['MongoID'];
  comments: Array<Comment>;
  contact?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  document: Scalars['JSON'];
  file: Scalars['MongoID'];
  images?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  ratingAvg?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Array<Maybe<PostRatings>>>;
  status: EnumPostStatus;
  tagId?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};


export type PostCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyCommentInput>;
};


export type PostTagsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyTagInput>;
};

export type PostRatings = {
  __typename?: 'PostRatings';
  _id?: Maybe<Scalars['MongoID']>;
  rating?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['MongoID']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  postById?: Maybe<Post>;
  postCount?: Maybe<Scalars['Int']>;
  posts: Array<Post>;
  tag?: Maybe<Tag>;
  tagById?: Maybe<Tag>;
  tagCount?: Maybe<Scalars['Int']>;
  tags: Array<Tag>;
  user?: Maybe<User>;
  userById?: Maybe<User>;
  userCount?: Maybe<Scalars['Int']>;
  users: Array<User>;
};


export type QueryPostArgs = {
  filter?: InputMaybe<FilterFindOnePostInput>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindOnePostInput>;
};


export type QueryPostByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryPostCountArgs = {
  filter?: InputMaybe<FilterCountPostInput>;
};


export type QueryPostsArgs = {
  filter?: InputMaybe<FilterFindManyPostInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyPostInput>;
};


export type QueryTagArgs = {
  name: Scalars['String'];
};


export type QueryTagByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryTagCountArgs = {
  filter?: InputMaybe<FilterCountTagInput>;
};


export type QueryTagsArgs = {
  filter?: InputMaybe<FilterFindManyTagInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyTagInput>;
};


export type QueryUserArgs = {
  filter?: InputMaybe<FilterFindOneUserInput>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindOneUserInput>;
};


export type QueryUserByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryUserCountArgs = {
  filter?: InputMaybe<FilterCountUserInput>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<FilterFindManyUserInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyUserInput>;
};

export type RatingPayload = {
  __typename?: 'RatingPayload';
  rating: Scalars['Float'];
  userId: Scalars['MongoID'];
};

export enum SortFindManyCommentInput {
  AuthoridAsc = 'AUTHORID_ASC',
  AuthoridDesc = 'AUTHORID_DESC',
  PostidAsc = 'POSTID_ASC',
  PostidDesc = 'POSTID_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyPostInput {
  AuthoridAsc = 'AUTHORID_ASC',
  AuthoridDesc = 'AUTHORID_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyTagInput {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyUserInput {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOnePostInput {
  AuthoridAsc = 'AUTHORID_ASC',
  AuthoridDesc = 'AUTHORID_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneUserInput {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum Status {
  Private = 'private',
  Public = 'public'
}

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['MongoID'];
  createdAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['MongoID'];
  comments: Array<Comment>;
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  followings?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  image: Scalars['String'];
  lastName: Scalars['String'];
  posts: Array<Post>;
  recentView?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  updatedAt?: Maybe<Scalars['Date']>;
};


export type UserCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyCommentInput>;
};


export type UserPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyPostInput>;
};
