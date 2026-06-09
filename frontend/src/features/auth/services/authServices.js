import API from "../../../shared/services/api";

export const loginUser = async (
  email,
  password
) => {
  const res = await API.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return res.data;
};

export const signupUser = async (
  name,
  email,
  password,
  isProfessional
) => {
  const res = await API.post(
    "/auth/signup",
    {
      name,
      email,
      password,
      isProfessional,
    }
  );

  return res.data;
};

export const googleAuth = async (
  googleToken
) => {
  const res = await API.post(
    "/auth/google",
    {
      token: googleToken,
    }
  );

  return res.data;
};

export const fetchCurrentUser =
  async () => {
    const res = await API.get(
      "/auth/me"
    );

    return res.data;
  };