export type PostsType = {
  id: number
  content: string
  createdAt: string
  authorId: number
  author: UserType
}

export type UserType = {
  id: number
  username: string
  email: string
  password: string
  posts: PostsType[]
  profile?: ProfileType
}

export type ProfileType = {
  id: number
  bio: string
  profilePictureUrl: string
  userId: number
  user: UserType
}