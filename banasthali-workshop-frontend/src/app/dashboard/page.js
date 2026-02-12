"use client";

import React from "react";
import "../../app/dashboard.css";
import {useAuth} from "../../context/authContext";
import StudentDashboard from "@/components/StudentDashboard";
import MentorDashboard from "@/components/MentorDashboard";
import AdminDashboard from "@/components/AdminDashboard";


const DashboardPage = () => {
  const {user, logout} = useAuth();
  console.log(user);
  const renderDashboard = () => {
    console.log("user role: ",user?.data?.role);
    switch(user?.data?.role){
      case "student":
        return <StudentDashboard/>
      case "mentor":
        return <MentorDashboard/>
      case "admin":
        return <AdminDashboard/>
      default:
        return <div>{"UnAuthorized User"}</div>
    }
  }

  return (
    <div>
      <div className="navbar">
        <p>
          Project Portal
        </p>
        <div className="nav-info">
          <div className="user-info">
            <p>{user?.data?.name}</p>
            <p>{user?.data?.email}</p>
          </div>
          <button onClick={() => {
            logout();
          }}>
            Logout
          </button>
        </div>
      </div>
      {renderDashboard()}
    </div>
  )
}

export default DashboardPage;