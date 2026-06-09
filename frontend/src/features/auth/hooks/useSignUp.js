import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "./useAuth";
import { validateEmail } from "../../../shared/utils/validation";

export default function useSignup() {
  const navigate = useNavigate();

  const { signup, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isProfessional: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    try {
      setLoading(true);

      await googleLogin(
        credentialResponse.credential,
        true
      );

      navigate("/");
    } catch {
      setError(
        "Google signup failed. Please try again."
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
      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.isProfessional
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Signup failed. Please try again."
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
    setError,

    handleChange,
    handleSubmit,
    handleGoogleSuccess,
  };
}