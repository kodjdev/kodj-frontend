const API_BASE_URL =
  import.meta.env.VITE_SPRING_API_URL || "http://localhost:8080/api/v1";

// generic request function with authentication 
const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  data: any = null,
  customHeaders = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    headers,
    credentials: "include",
    mode: "cors",
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = typeof data === "string" ? data : JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // we handle the redirects
    if (response.redirected) {
      console.warn("Request was redirected:", response.url);
      const redirectResponse = await fetch(response.url, options);

      if (!redirectResponse.ok) {
        throw new Error(
          `Redirect request failed with status ${redirectResponse.status}`
        );
      }

      return redirectResponse.json();
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  } catch (error) {
    console.error(`API Request Error (${method} ${url}):`, error);
    throw error;
  }
};

const apiRequestFormData = async (
  endpoint: string,
  method: string,
  formData: FormData
) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    body: formData,
    credentials: "include",
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! Status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

// export const getCurrentUser = async (
//   userData?: {
//     username?: string;
//     page?: number;
//     size?: number;
//   },
//   customHeaders = {}
// ) => {
//   console.log("getCurrentUser called with headers:", customHeaders);

//   const params = new URLSearchParams();

//   // adding default values here
//   params.append("page", (userData?.page ?? 0).toString());
//   params.append("size", (userData?.size ?? 10).toString());

//   if (userData?.username) {
//     params.append("username", userData.username);
//   }

//   // building the endpoint with query params
//   const endpoint = `/users?${params.toString()}`;

//   return apiRequest(endpoint, "GET", null, customHeaders);
// };

export const initiateGoogleLogin = async (credential: string) => {
  return apiRequest("/auth/google/sign-up", "POST", credential);
};

export const googleSignIn = async (idToken: string) => {
  try {
    const response = await apiRequest("/auth/google/sign-in", "POST", idToken);
    console.log("Full Google Sign-In Response:", response);
    return response;
  } catch (error) {
    console.error("Google Sign-In API Error:", error);
    throw error;
  }
};

export const isTokenValid = (token: string): boolean => {
  if (!token) {
    console.warn("No token provided for validation");
    return false;
  }

  try {
    // decode the token
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const payload = JSON.parse(window.atob(base64));

    const currentTime = Math.floor(Date.now() / 1000);
    const isValid = payload.exp > currentTime;

    console.log("Token Validation:", {
      current: currentTime,
      expiration: payload.exp,
      isValid: isValid,
    });

    return isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export const getUserDetails = async (token: string) => {
  try {
    console.log("Fetching user details with token:", token);
    return await apiRequest("/users/details", "GET", null, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  } catch (error: any) {
    console.error("Detailed error fetching user details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    throw error;
  }
};

export const logout = async () => {
  return apiRequest("/logout", "POST");
};

export const registerUser = async (userData: any) => {
  if (userData instanceof FormData) {
    return apiRequestFormData("/users", "POST", userData);
  }

  const formData = new FormData();
  for (const key in userData) {
    if (userData[key] !== undefined && userData[key] !== null) {
      formData.append(key, userData[key]);
    }
  }
  return apiRequestFormData("/users", "POST", formData);
};

export const registerEvent = async (formData: any) => {
  return apiRequest("/events/register", "POST", formData);
};

export const registerSpeaker = async (speakerData: any) => {
  return apiRequest("/speakers/register", "POST", speakerData);
};

export const movePassedEvent = async () => {
  return apiRequest("/events/move-passed", "POST");
};

export const getTotalUserCount = async () => {
  return apiRequest("/users/count", "GET");
};

export default {
  getUserDetails,
  googleSignIn,
  initiateGoogleLogin,
  registerUser,
  registerEvent,
  registerSpeaker,
  movePassedEvent,
  getTotalUserCount,
  logout,
};
