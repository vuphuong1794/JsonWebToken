import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { deleteUserFailed, deleteUserStart, deleUserSuccess, getUserFailed, getUserStart, getUserSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/auth/register",
      user,
      { withCredentials: true }
    );
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    //phai co accessToken moi goi duoc
    const res = await axios.get(
      "http://localhost:8000/v1/user/getAll",
      { headers: { token: `Bearer ${accessToken}` } },
      { withCredentials: true }
    );
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id)=>{
  dispatch(deleteUserStart())
  try{
    const res = await axios.delete("http://localhost:8000/v1/user/delete/"+ id, { headers: { token: `Bearer ${accessToken}` } }, { withCredentials: true })
    dispatch(deleUserSuccess(res.data))
  }catch(err){
    dispatch(deleteUserFailed(err.response.data))
  }
}