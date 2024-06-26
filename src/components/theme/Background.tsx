import Image from 'next/image'
import React from 'react'
import img from '/public/background.svg'

type Props = {}

function Background({ }: Props) {
    return (
        <div className='absolute bottom-0 left-0 w-full'>
            <Image
                alt='background'
                src={img}
                className='object-cover h-1/2 w-full'
                objectFit='cover'
                objectPosition='bottom'
            />
        </div>
    )
}

export default Background