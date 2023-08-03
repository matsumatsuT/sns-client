import { Post } from "@/components/Post"
import apiClient from "@/lib/apiClient"
import { PostsType, ProfileType } from "@/types"
import { GetServerSideProps } from "next"
import Image from "next/image"


export const getServerSideProps: GetServerSideProps = async (context) => {
  const {userId} = context.query

  try{
    const profile = await apiClient.get(`/users/profile/${userId}`)
    const postRes = await apiClient.get(`/posts/${userId}`)
    return {
      props: {
        profile: profile.data,
        posts: postRes.data
      }
    }  
  }catch{
    console.log("エラーです")
    return {
      notFound: true
    }
  }
}




type Props = {
  profile: ProfileType
  posts: PostsType[]
}

const Profile = ({profile, posts}: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image className="w-20 h-20 rounded-full mr-4" alt="User Avatar" src={profile.profilePictureUrl} width={20} height={20}/>
            <div>
              <h2 className="text-2xl font-semibold mb-1">{profile.user?.username}</h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>
        {posts.map((post) => (
          <div key={post.id}><Post post={post} /></div>
        ))}
      </div>
    </div>
  )
}

export default Profile