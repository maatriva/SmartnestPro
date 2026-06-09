import { useState } from "react";

import { validateEmail } from "../../../shared/utils/validation";
import API from "../../../shared/services/api";

export default function useContactForm(closeModal) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: null,
        message: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });

      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "/contacts",
        formData
      );

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        setStatus({
          type: "success",
          message: "Message sent successfully!",
        });

        setFormData({
          name: "",
          email: "",
          organization: "",
          message: "",
        });

        setTimeout(() => {
          setStatus({
            type: null,
            message: "",
          });

          closeModal();
        }, 2000);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.error ||
          "Failed to send message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    status,
    handleChange,
    handleSubmit,
  };
}