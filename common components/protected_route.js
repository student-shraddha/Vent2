import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { AuthContext } from "@/context/auth_context";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
const Loader = dynamic(() => import("./loader"));

const ProtectedRoute = ({ children }) => {

  const { data: session, status } = useSession();
  const RouterRef = useRouter();

  if (status === "loading") {
    return (
      <div
        style={{
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Loader />
        <p style={{ marginTop: "45px", fontFamily: "Nunito" }}>Loading...</p>
      </div>
    )
  } else if (status === "authenticated") {
    return <div>{children}</div>;
  } else if (status === "unauthenticated") {
    RouterRef.replace("/");
  }

};

export default ProtectedRoute;
