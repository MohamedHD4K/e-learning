const API_URL = "http://localhost:3000/api/auth";

const request = async (endpoint: string, data: any) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return res.json();
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  console.log(data);
  return request("/login", data);
};

export const signupUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  console.log(data);
  return request("/signup", data);
};
