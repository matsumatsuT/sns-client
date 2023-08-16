import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const {register, handleSubmit} = useForm<Inputs>()
  const {login} = useAuth()
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try{
      const response = await apiClient.post("/auth/login", {
        email: data.email,
        password: data.password
      })

      login(response.data.token)
      router.push("/")

    }catch(err) {
      alert("ログインに失敗しました")
    }
  }

  return (
    <div
      style={{ height: "88vh" }}
      className="flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          アカウントにログイン
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register("email")}
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register("password")}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login