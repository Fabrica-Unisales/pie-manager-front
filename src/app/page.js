"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";

const Home = () => {
  const router = useRouter();

  return (
    <div className="App">
      this is the home page
      <Button type="primary" onClick={() => router.push("/home")}>
        Button
      </Button>
    </div>
  );
};

export default Home;
