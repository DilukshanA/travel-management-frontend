"use client"
import { useGetUserDataQuery } from "@/redux/reducers/userApiSlice";

export default function Home() {

  const { data: user, isLoading, isError, error } = useGetUserDataQuery();

  console.log("User data:", user);
  console.log("Error:", isError);
  console.log("Error details:", error);
  return (
    <div className="">
      <h1>Home</h1>
    </div>
  );
}
