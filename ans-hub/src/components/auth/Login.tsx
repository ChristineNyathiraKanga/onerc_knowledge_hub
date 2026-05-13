import { useFrappeAuth } from "frappe-react-sdk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "./Auth";

export default function LoginForm() {
  const { login } = useFrappeAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (credentials: { email: string; password: string }) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await login({
        username: credentials.email,
        password: credentials.password,
      });
      toast.success("Welcome back! Logged in successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (userData: {
    name: string;
    email: string;
    jobTitle: string;
    nationalSociety: string;
    gender: string;
  }) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // TODO: Implement sign-up API call
      // Example:
      // await frappe.call({
      //   method: "onerc_knowledge_hub.api.user.register_user",
      //   args: userData
      // });

      // Redirect to pending approval page with email parameter
      toast.success("Registration submitted successfully!");
      navigate(`/pending-approval?email=${encodeURIComponent(userData.email)}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <Auth onSignIn={handleSignIn} onSignUp={handleSignUp} />;
}
