"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Home() {

  const [greetings, setGreetings] = useState("ACE");

  useEffect(() => {
    console.log("Hello, World!");
  }, [greetings])

  const handleClick = async () => {
    const response = await fetch("/api/v1/hello");
    const result = await response.json();

    setGreetings(result.message);
  }

  return <div>
    <Button label={greetings} onClick={handleClick} />
  </div>
}
