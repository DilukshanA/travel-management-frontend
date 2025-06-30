"use client"

import Logout from "@/components/Authentication/Logout";
import { useGetUserDataQuery } from "@/redux/reducers/authApiSlice";

export default function Home() {

  const { data: user, isLoading, isError, error } = useGetUserDataQuery();

  console.log("User data:", user);
  console.log("Error:", isError);
  console.log("Error details:", error);
  return (
    <div className="">
      <h1>Home</h1>
      <Logout/>
    </div>
  );
}
