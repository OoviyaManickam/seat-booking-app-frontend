import React from "react";
import Layout from "./Layout";import AdminAnimatedText from "../Components/AdminAnimatedText";
import ComplexButton from "../Components/ComplexButton";
 
 
function AdminHome() {
    return (
      <div className="Home">
        <Layout />
        <ComplexButton />
        <AdminAnimatedText />
      </div>
  );
}
 
export default AdminHome;