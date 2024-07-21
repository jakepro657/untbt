import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
    onClickSearchButton?: () => void
    onChangeSearchText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function SearchInput({ onChangeSearchText }: Props) {
    return (
        <div className='mx-auto w-full h-1/2 flex relative'>
            <MagnifyingGlassIcon className='w-6 h-6 absolute left-4 top-4 z-20' color='gray' />
            <button className='w-6 h-6 absolute right-4 bottom-4 z-20'>
                <ArrowUpOnSquareIcon color='gray' />
            </button>
            <textarea
                onChange={onChangeSearchText}
                placeholder="통관을 위한 문서를 입력하세요"
                className="w-full border-2 pr-2 py-[14px] pl-12 border-sky-300 rounded-2xl drop-shadow-lg font-PretendardRegular resize-none"
            />
        </div>
    )
}

export default SearchInput