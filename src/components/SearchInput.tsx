import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React from 'react'

type Props = {
    onClickSearchButton?: () => void
    onChangeSearchText?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchInput({ onChangeSearchText, onClickSearchButton }: Props) {
    return (
        <div className='mx-auto w-1/2 h-12 flex relative'>
            <MagnifyingGlassIcon className='w-6 h-6 absolute left-4 top-[10px] z-20' color='gray' />
            <input
                onChange={onChangeSearchText}
                type="text"
                placeholder="통관을 위한 문서를 입력하세요"
                className="w-full border-2 pr-2 py-2 pl-12 border-sky-300 rounded-full drop-shadow-lg font-PretendardRegular"
            />
            <button onClick={onClickSearchButton} className='font-PretendardMedium hover:bg-blue-600 right-4 top-[8px] absolute bg-blue-500 text-white rounded-full px-3 py-1'>
                검색
            </button>
        </div>
    )
}

export default SearchInput