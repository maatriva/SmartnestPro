import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { validateEmail } from "../../../shared/utils/validation";

export default function useLogin() {
  const navigate = useNavigate();

  const { login, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    try {
      setLoading(true);

      await googleLogin(
        credentialResponse.credential
      );

      navigate("/");
    } catch (err) {
      setError(
        "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    if (!validateEmail(formData.email)) {
      setError(
        "Please enter a valid email address."
      );

      setLoading(false);

      return;
    }

    try {
      await login(
        formData.email,
        formData.password
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    showPassword,

    setShowPassword,

    handleChange,
    handleSubmit,
    handleGoogleSuccess,
    setError,
  };
}