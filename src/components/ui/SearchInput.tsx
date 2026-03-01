import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React from 'react'

type Props = {
    onChangeSearchText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function SearchInput({ onChangeSearchText }: Props) {
    return (
        <div className='w-full relative'>
            <MagnifyingGlassIcon className='w-5 h-5 absolute left-4 top-4 z-20 text-gray-400' />
            <textarea
                onChange={onChangeSearchText}
                placeholder="통관을 위한 문서를 입력하세요"
                className="w-full h-48 border border-gray-200 pr-4 py-4 pl-12 rounded-xl font-PretendardRegular resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
        </div>
    )
}

export default SearchInput
