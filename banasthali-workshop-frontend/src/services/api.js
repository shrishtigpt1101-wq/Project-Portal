import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_NGROK_URL

export const signup = async (name, email, password) => {
  try{
    const response = await axios.post(`${BACKEND_URL}/user/register`, {name, email, password});

    return response.data;
  }catch(err){
    throw new Error(err.message);
  }
}

export const login = async (email, password) => {
  try{
    const response = await axios.post(`${BACKEND_URL}/user/login`, {email, password});

    return response.data;
  }catch(err){
    throw new Error(err.message);
  }
}