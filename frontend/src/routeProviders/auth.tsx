import { GetUserApiResponse, LoginApiRequest, LoginApiResponse, RegisterApiRequest } from "@interfaces/api/auth";
import api from "@services/api";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "./Loader";

export interface AuthContextType {
  user: GetUserApiResponse;
  signin: (user: LoginApiRequest, callback: VoidFunction) => void;
  register: (user: RegisterApiRequest, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const loader = useContext(LoaderContext)
  const navigate = useNavigate();
  let [user, setUser] = React.useState<any>(null);
  
  const signin = (formData: LoginApiRequest, callback: VoidFunction) => {
    loader.setLoading(true)
    return api<LoginApiRequest, LoginApiResponse>('userLogin', formData).then(res => {
      localStorage.setItem('token', res.token)
      setUser(res.user)
      callback()
      loader.setLoading(false)
    })
  }

  const register = (formData: RegisterApiRequest, callback: VoidFunction) => {
    loader.setLoading(true)
    return api<RegisterApiRequest, LoginApiResponse>('userRegister', formData).then(res => {
      localStorage.setItem('token', res.token)
      setUser(res.user)
      callback()
      loader.setLoading(false)
    })
  };

  const signout = (callback: VoidFunction) => {
    loader.setLoading(true)
    return api<null, null>('userLogout', null).then(res => {
      localStorage.removeItem('token')
      setUser(null);
      callback()
      loader.setLoading(false)
    })
  };
  
  const getUser = () => {
    try {
      if (localStorage.getItem('token')) {
        loader.setLoading(true)
        api<null, GetUserApiResponse>('getUser', null)
        .then(res => {
          setUser(res)
          loader.setLoading(false)
          navigate('/')
        })
      } else {
        signout(()=>navigate('/login'))
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect (() => {
    getUser()
  }, [])
 
  let value = { user, signin, signout, register }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}