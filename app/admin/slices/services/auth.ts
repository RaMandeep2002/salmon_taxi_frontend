"use client";
import axios from "axios";

interface LoginResponse {
  token: string;
}

interface LoginCreditials {
  email: string;
  password: string;
}

const API_URL = "http://localhost:5000/";

export const login = async ({
  email,
  password,
}: LoginCreditials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}api/auth/login`,
      {
        email,
        password,
      },
    );
    console.log("response ===> ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ", error);
    throw new Error("Login failed");
  }
};
