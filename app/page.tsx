import React from "react";
import SideBar from "./components/Sidebar/Sidebar";
import Authentication from "./Authentication/Authentication";

export default async function Home() {
  return (
    <>
      <Authentication />
      <SideBar />
    </>
  );
}
