"use client";
import React from "react";
import { SideBarData } from "../data/SideBar";
import Link from "next/link";
import { BookOpen, GraduationCap, X } from "lucide-react";
import "../styles/sidebar.scss";
interface Props {
  visible?: boolean;
  onclose?: () => void;
}
export default function Sidebar({ visible, onclose }: Props) {
  return (
    <>
      <div
        className={`sidebar-container bg-muted/40   ${
          visible ? " z-9" : " none"
        }  `}
      >
        <div className="sidebar-header">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">EduFlow</span>
          </div>
          <span className="cross" onClick={onclose}>
            <X />
          </span>
        </div>
        <div className="sidebar-link-container">
          <h2>College Dashboard</h2>
          {SideBarData.map((data, index) => {
            return (
              <div className="sidebar-container-link" key={index}>
                <Link
                  className="text-muted-foreground  flex items-center gap-3 p-2 rounded-lg transition-all hover:text-primary"
                  href={data.href}
                  onClick={onclose}
                >
                  {data.value}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
