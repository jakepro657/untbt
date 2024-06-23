"use client"
import React from 'react'

type Props = {
    onClick: () => void
    label: string
}

function Button({ label, onClick }: Props) {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

export default Button