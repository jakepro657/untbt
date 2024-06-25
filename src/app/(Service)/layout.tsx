import Background from '@/components/theme/Background'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function MainServiceLayout({ children }: Props) {
    return (
        <div className="flex flex-col justify-start items-center w-screen h-screen bg-gradient-to-b">
            <Background />
            {children}
        </div>
    )
}

export default MainServiceLayout