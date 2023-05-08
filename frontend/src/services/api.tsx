import React, { useContext } from "react"
import { AuthContext } from "../routeProviders/auth"
import { LoaderContext } from "../routeProviders/Loader"

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface IMethodWithUrl {
  method: TMethod
  url: string,
  bodyData: string | undefined
}

interface IAction {
  [key: string]: {
    method: TMethod, 
    url: string,
    appendedParamToUrl?: string,
    options?: [
      {
        oneCall: boolean
      }
    ]
  }
}

export const actions: IAction = {
  'getFolders': { method: 'GET', url: 'folder' },
  'updateFolder': { method: 'PUT', url: 'folder', appendedParamToUrl: 'id' },
  'createFolder': { method: 'POST', url: 'folder' },
  'userLogin': { method: 'POST', url: 'login' },
  'userRegister': { method: 'POST', url: 'register' },
  'userLogout': { method: 'POST', url: 'logout' },
  'getUser': { method: 'POST', url: 'getUser' },
}

export function getMethodUrlAndData<RequestData>(action: keyof typeof actions, params: RequestData): IMethodWithUrl {
  
  try {
    if (!(action in actions)){
      throw new Error('ACTION DOESN\'T EXIST')
    }
    const result: IMethodWithUrl = {
      method: actions[action].method,
      url: actions[action].url,
      bodyData: undefined
    }
    if (actions[action].appendedParamToUrl) {
      result.url = result.url.concat('/' + params[actions[action].appendedParamToUrl as keyof RequestData] )
    }
    if (result.method !== 'GET') {
      result.bodyData = JSON.stringify(params)
    }
    return result
  } catch (e) {
    throw new Error(e)
  }
}

export default async function api<TRequest, TResponse>(action: keyof typeof actions, data: TRequest): Promise<TResponse> {
  const {method, url, bodyData} = getMethodUrlAndData<TRequest>(action, data)
  try {

    const response = await fetch('http://127.0.0.1:8000/api/' + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    },
    body: bodyData
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const responseData: TResponse = await response.json();
    return responseData
  } catch (error) {
    console.error(error.message)
    throw new Error(error)
  }
}

