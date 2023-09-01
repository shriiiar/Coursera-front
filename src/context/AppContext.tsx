import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetProfileQuery } from "../features/api/userApi";

export const AppContextProvider = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AppContext = ({ children }: Props) => {
  // local states
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  // get token from cookie
  const [cookie] = useCookies(["token"]);

  // get api hook from rtk query to get profile
  const { data, isLoading, error, refetch } = useGetProfileQuery(
    {},
    { skip: !token, refetchOnMountOrArgChange: true }
  );

  // for set and handle
  useEffect(() => {
    if (cookie.token) {
      setToken(cookie.token);
    }
  }, [cookie]);

  useEffect(() => {
    if (data) {
      setCurrentUser(data?.data);
      setRole(data?.data?.role);
    }
  }, [data]);

  return (
    <AppContextProvider.Provider
      value={{
        token,
        currentUser,
        isLoading,
        error,
        refetch,
        role,
        setToken,
        setCurrentUser,
        setRole,
      }}
    >
      {children}
    </AppContextProvider.Provider>
  );
};

// get useContext hook here
export const useAppContext = () => {
  return useContext(AppContextProvider);
};

export default AppContext;
