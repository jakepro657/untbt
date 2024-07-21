import React from 'react'

type Props = {}

function CircleLoading({}: Props) {
  return (
    <div 
        className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin duration-500"
        style={{
            borderLeftColor: '#2f80ed',
            borderBottomColor: '#2f80ed',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent'
        }}
    >
    </div>
  )
}

export default CircleLoading