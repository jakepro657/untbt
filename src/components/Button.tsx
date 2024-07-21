"use client"
import React from 'react'

type Props = {
    onClick: () => void
    label: string
}

function Button({ label, onClick }: Props) {
    return (
        <button className='text-white bg-blue-600' onClick={onClick}>{label}</button>
    )
}

export default Button