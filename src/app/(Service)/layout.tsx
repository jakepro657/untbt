"use client"
import Background from '@/components/theme/Background'
import React from 'react'
import TopNavbar from "@/components/nav/TopNavbar";

type Props = {
    children: React.ReactNode
}

function MainServiceLayout({ children }: Props) {
    return (
        <main className="flex flex-col justify-center items-center w-full h-full bg-gray-50 overflow-clip">
            <TopNavbar />
            <Background />
            <div className="select-none flex flex-col justify-start items-center w-full h-full overflow-y-scroll scrollbar-hide font-IBMPlexSansKRSemiBold overflow-x-clip">
                {children}
            </div>
        </main>
    )
}

export default MainServiceLayout