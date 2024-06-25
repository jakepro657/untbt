"use client";

import TopNavbar from "@/components/nav/TopNavbar";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";


export default function Home() {

  const [searchText, setSearchText] = useState('')
  const [result, setResult] = useState('')

  const onClickSearchButton = async () => {
    const response = await fetch('/api/v1/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: searchText
      }),
    })

    const data = await response.json()

    setResult(data.message)
  }

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return <div className="relative w-full h-full top-0 left-0">
    <TopNavbar />
    <div className="absolute font-IBMPlexSansKRSemiBold text-4xl text-slate-700 -translate-x-1/2 left-1/2 top-1/4">
      UNTBT입니다, 무엇을 도와드릴까요?
    </div>
    <div className="absolute w-full top-[38%] left-1/2 -translate-x-1/2">
      <SearchInput onChangeSearchText={onChangeSearchText} onClickSearchButton={onClickSearchButton} />
    </div>
    <div className="absolute w-full top-[50%] left-1/2 -translate-x-1/2 text-center">
      {result}
    </div>
  </div>
}
