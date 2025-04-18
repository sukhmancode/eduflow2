/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./styles/sidebar.scss";
import axios from "axios";
import "./styles/index.scss";
import Card from "./components/Card";

export default function page() {
  const [collegeName, setCollegeName] = useState<string>();
  const [collegeid, setCollegeId] = useState<string | null>();
  const [classes, setClasses] = useState<number>(0);
  const [teachers, setTeachers] = useState<number>(0);

  const handleCollegeDetails = (college_id: string) => {
    const url1 = `https://ai-teacher-api-xnd1.onrender.com/college/${college_id}/details
`;
    const url2 = `https://ai-teacher-api-xnd1.onrender.com/college/${college_id}/class_list/`;
    const teacher = `https://ai-teacher-api-xnd1.onrender.com/college/${college_id}/teacher_list/`;
    axios
      .get(url1)
      .then(({ data }) => {
        console.log(data);
        setCollegeName(data.Colname);
      })
      .catch(() => {
        console.log("error");
      });
    axios
      .get(url2)
      .then(({ data }) => {
        setClasses(data.length);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(teacher)
      .then(({ data }) => {
        setTeachers(data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const collegeId = sessionStorage.getItem("collegeId");
    setCollegeId(collegeId);
    if (collegeId) {
      handleCollegeDetails(collegeId);
    }
  }, []);
  return (
    <>
      <div className="parent-container flex ">
        <div className="sidebar-container-page ">
          <Sidebar />
        </div>
        <div className="content-container w-full">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="college-details-container">
            <h2 className="welcome-message ">Welcome, {collegeName}</h2>
            <div className="cards">
              <Card
                secondaryHeading="Total Number of Students "
                number={classes}
                secondary=" Classes"
              />
              <Card
                secondaryHeading="Total Number of Teachers "
                number={teachers}
                secondary=" Teachers"
                href={"/dashboard/colleges/viewteachers"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
