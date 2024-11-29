import React from "react";
import Header from "../../common components/header";
import Footer from "../../common components/footer";
// import TopHeader from "./top header/top_header";
// import Sidebar from "./Sidebar/Sidebar";
// import ProtectedRoute from "@/utils/protected route/protected_route";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>

    );
}
