"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Home() {

  const [greetings, setGreetings] = useState("ACE");
  const [tbt, setTbt] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("Hello, World!");
  }, [greetings])

  const handleClick = async () => {
    // const response = await fetch("/api/v1/hello");
    const response = await fetch("/api/v1/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: "ACE"
      })
    });

    const result = await response.json();

    setTbt(result.message);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  return <div className="flex flex-col">
    <div className="text-xl fontbold">분기: {tbt}</div>
    <textarea className="h-64 bg-slate-400 resize-none" value={input} onChange={handleChange} />
    <Button label={"TBT 분석"} onClick={handleClick} />
  </div>
}
