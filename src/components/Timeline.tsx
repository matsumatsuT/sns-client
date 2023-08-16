import { Post } from "@/components/Post"
import apiClient from "@/lib/apiClient"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { PostsType } from "@/types"

type Inputs = {
  content: string
}

const defaultValues = {
  content: ""
}

export const Timeline = () => {
  
  const [posts, setPosts] = useState<PostsType[]>([])
  const {register, handleSubmit, reset} = useForm<Inputs>({
    defaultValues
  })

  const fetchPosts = async() => {
    const response = await apiClient.get("/posts/get_posts")
    setPosts(response.data)
  }

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if(!token) return
    fetchPosts()
  },[])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await apiClient.post("/posts/post", {
        content: data.content
      })
      fetchPosts()
      reset()

    }catch(err) {
      alert("ログインして下さい")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              {...register("content")}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  )
}