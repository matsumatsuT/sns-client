import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  login: (token: string) => void
  logout: () => void,
  user: null | {
    id: number,
    email: string,
    username: string
  }
}

  type AuthProviderProps = {
    children: ReactNode
  }
  
const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  user: null
})

export const useAuth = () => {
  return useContext(AuthContext)
}


export const AuthProvider = ({children}: AuthProviderProps) =>  {
  const router = useRouter()
  const [user, setUser] = useState<null | {
    id: number,
    email: string,
    username: string
  }>(null)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if(token) {
      apiClient.defaults.headers["Authorization"] = `Barer ${token}`
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user)
      })
    }
  }, [])

  const login = async (token: string) => {
    apiClient.defaults.headers["Authorization"] = `Barer ${token}`
    localStorage.setItem("auth_token", token)
    apiClient.get("/users/find").then((res) => {
      setUser(res.data.user )
    })
  }
  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    delete apiClient.defaults.headers["Authorization"]
    router.push("/login")
  }
  const value = {
    login,
    logout,
    user
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}