"use client"
import React from 'react'
import TopNavbar from "@/components/layout/TopNavbar";

type Props = {
    children: React.ReactNode
}

function MainServiceLayout({ children }: Props) {
    return (
        <main className="flex flex-col w-full min-h-screen bg-gray-50">
            <TopNavbar />
            <div className="flex flex-col flex-1 w-full">
                {children}
            </div>
        </main>
    )
}

export default MainServiceLayout
