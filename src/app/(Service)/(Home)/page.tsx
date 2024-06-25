"use client";

import TopNavbar from "@/components/nav/TopNavbar";
import SearchInput from "@/components/SearchInput";


export default function Home() {

  return <div className="relative w-full h-full top-0 left-0">
    <TopNavbar />
    <div className="absolute font-IBMPlexSansKRSemiBold text-4xl text-slate-700 -translate-x-1/2 left-1/2 top-1/4">
      UNTBT입니다, 무엇을 도와드릴까요?
    </div>
    <div className="absolute w-full top-[38%] left-1/2 -translate-x-1/2">
      <SearchInput />
    </div>
  </div>
}
