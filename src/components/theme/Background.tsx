import Image from 'next/image'
import React from 'react'
import img from '/public/background.svg'

type Props = {}

function Background({ }: Props) {
    return (
        <div className='absolute bottom-0 left-0 w-full h-1/2'>
            <Image
                alt='background'
                src={img}
                layout='fill'
                objectFit='cover'
                objectPosition='bottom'
            />
        </div>
    )
}

export default Background