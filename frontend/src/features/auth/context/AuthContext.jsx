import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  signupUser,
  googleAuth,
  fetchCurrentUser,
} from "../services/authServices";

import {
  getToken,
  saveToken,
  removeToken,
} from "../utils/authStorage";

export const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [token, setToken] =
    useState(getToken());

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const userData =
        await fetchCurrentUser();

      setUser(userData);
    } catch (error) {
      console.error(
        "Error fetching user:",
        error
      );

      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email,
    password
  ) => {
    const data = await loginUser(
      email,
      password
    );

    saveToken(data.token);

    setToken(data.token);

    setUser(data.user);

    return data;
  };

  const signup = async (
    name,
    email,
    password,
    isProfessional
  ) => {
    const data =
      await signupUser(
        name,
        email,
        password,
        isProfessional
      );

    saveToken(data.token);

    setToken(data.token);

    setUser(data.user);

    return data;
  };

  const googleLogin = async (
    googleToken
  ) => {
    const data =
      await googleAuth(
        googleToken
      );

    saveToken(data.token);

    setToken(data.token);

    setUser(data.user);

    return data;
  };

  const logout = () => {
    removeToken();

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,

        login,
        signup,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}