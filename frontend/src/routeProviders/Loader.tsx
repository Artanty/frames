import Loader from '@components/Loader';
import React, { createContext,  useState } from 'react';
export interface LoaderContextType {
  isLoading: boolean,
  setLoading: (value: boolean) => void
}

export const LoaderContext = createContext<LoaderContextType>(null!)

export default function LoaderProvider ({ children }: { children: React.ReactNode }) {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (value: boolean) => {
    console.log(value)
    setIsLoading(prevValue => value)
  }

  const value = {isLoading, setLoading}

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
};
