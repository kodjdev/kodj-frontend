import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, message } from "antd";
import { Button } from "@/components/Button/Button";
import apiService from "@/service/apiService";

export default function CompleteProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { userData } = location.state || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!userData) {
        messageApi.error("User data not available");
        setLoading(false);
        return;
      }

      if (!userData.email) {
        messageApi.error("Email is required but not available");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      // later i changed this into a dynamic logic (test as of now)
      formData.append(
        "username",
        userData.username || userData.email.split("@")[0]
      );
      formData.append("email", userData.email);
      formData.append("phone", phone);
      formData.append("firstName", userData.firstName || "");
      formData.append("lastName", userData.lastName || "");
      formData.append("password", "StrongPassword164756343!");
      formData.append("region", userData.region || "SEOUL");

      const emptyBlob = new Blob([""], { type: "image/png" });
      formData.append("profileImage", emptyBlob, "empty.png");

      const response = await apiService.registerUser(formData);

      if (response.statusCode === 200 || response.statusCode === "200") {
        messageApi.success("Profile completed successfully!");
        alert("acocunt is created succesfully");
        navigate("/login");
      } else {
        messageApi.error("Failed to create an account!");
      }
    } catch (error: any) {
      console.error("Error completing profile:", error);
      try {
        let errorData;

        if (typeof error.message === "string") {
          const match = error.message.match(/\{.*\}/s);
          if (match) {
            errorData = JSON.parse(match[0]);
          }
        }

        // we check if it's a duplicate phone error
        if (
          errorData?.data &&
          typeof errorData.data === "string" &&
          errorData.data.includes("phone") &&
          errorData.data.includes("already exists")
        ) {
          messageApi.error(
            "This phone number is already registered. Please use a different one."
          );
        } else {
          messageApi.error("Failed to complete profile. Please try again.");
        }
      } catch (parseError) {
        messageApi.error("Failed to complete profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Complete Your Profile
          </h2>

          {userData && userData.email && (
            <div className="mb-4 text-gray-300 text-center">
              Continue registration for: <br />
              <span className="text-blue-400">{userData.email}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full bg-gray-700 text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Button color="blue" size="md" fullWidth={true} type="submit">
              Complete Registration
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
