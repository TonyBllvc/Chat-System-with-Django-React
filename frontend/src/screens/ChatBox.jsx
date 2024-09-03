import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import ChatArea from "./ChatArea";
import withAuthentication from "../utils/withAuthentication";
import axios from "axios";
import { API_URL } from "../api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoad, setUserList } from "../slice/userList";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";

function ChatBox() {
  // const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.userListStatus);
  const [userToken, setUserToken, removeUserToken] = useCookie("chip", null);
  const navigate = useNavigate()


  function getAuthTokenFromCookie() {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "chip") {
        return value;
      }
    }
    return null;
  }

  useEffect(() => {
    const authToken = getAuthTokenFromCookie();
    if (authToken) {
      dispatch(setLoad(true));
      axios
        .get(`${API_URL}api/users`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response?.status === 200) {
            dispatch(setUserList(response?.data?.data));
            console.log(response?.data?.data)
            dispatch(setLoad(false));
            toast.success("Data fetched successfully!");
          } else if (response?.status === 403 || response?.status === 401) {
            toast.error("Unauthorized access. Please log in.");
            dispatch(setLoad(false));
            // clearAuthTokenCookie();
          }
          dispatch(setLoad(false));
        })
        .catch((error) => {
          console.log(error);
          if (error?.response) {
            if (error?.response?.status === 401 || error?.response?.status === 403) {
              toast.error("Unauthorized access. Please log in.");
              // clearAuthTokenCookie();
            } else {
              toast.error("An error occurred. Please try again later.");
            }
          } else {
            toast.error("Network error. Please check your connection.");
          }
          // clearAuthTokenCookie();
          removeUserToken()
          navigate('/login')
          dispatch(setLoad(false));
        });

      dispatch(setLoad(false));
    } else {
      toast.warning("Authorization token not found.");
      removeUserToken()
      navigate('/login')
      dispatch(setLoad(false));
    }
  }, []);

  return (
    <div className="flex h-screen bg-white flex-col md:flex-row">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default withAuthentication(ChatBox);
