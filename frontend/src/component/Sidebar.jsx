import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, LinearProgress, List } from "@mui/material";
import UserItems from "./UserItems";

export default function Sidebar() {

  const { userList, loadin } = useSelector((state) => state.userListStatus);

  useEffect(() => {
    console.log(userList)
    console.log(loadin)
  }, [userList])

  return (
    <div className=" flex-[1] bg-[#2c3e50] text-white p-[20px] overflow-y-auto md:w-1/4 w-full md:flex-initial">
      {loadin ? (
        <Box sx={{ width: '100%' }} >
          <LinearProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%', maxWidth: "360", bgcolor: "background.paper" }}>
          {userList && userList.map((user, index) => (
            <UserItems email={user?.email} name={`${user?.first_name} ${user?.last_name}`} id={user?.id} key={index} />
          ))}
        </List>
      )}
    </div>
  )
}
