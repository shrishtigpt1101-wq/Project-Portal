"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading){
      if (user){
        router.push('/dashboard');
      }else {
        router.push('/login');
      }
    }
  },[user, loading, router]);

  return (
    <div>

    </div>
  );
}
