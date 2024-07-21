'use client';

import CircleLoading from '@/components/CircleLoading';
import SearchInput from '@/components/SearchInput';
import { useEffect, useState } from 'react';
import { findMissingParts } from '@/utils/utils';

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [isInitial, setIsInitial] = useState(true);
    const [report, setReport] = useState('');
    const [removedDoc, setRemovedDoc] = useState('');
    const [originalDoc, setOriginalDoc] = useState('');
    const [result, setResult] = useState('');
    const [docs, setDocs] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const onClickSearchButton = async () => {
        if (!searchText) {
            return alert('검색어를 입력해주세요.');
        }

        if (loading) return;

        setOriginalDoc(searchText);
        setLoading(true);

        try {
            const res = await fetch('/api/v1/docs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: searchText }),
            });

            const docs = await res.json();

            setDocs(docs);
            setReport(docs.message);
            setIsInitial(false);
        } catch (error) {
            console.error('Error fetching docs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            if (!docs) return;

            if (docs.isTradable) {
                setResult('통관 가능한 문서이므로 추가 피드백이 필요하지 않습니다.');
                setRemovedDoc('');
            } else {
                try {
                    const resForEmph = await fetch('/api/v1/remove', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            text: searchText,
                            tbtDocs: report,
                        }),
                    });

                    const docsForEmph = await resForEmph.json();
                    setRemovedDoc(docsForEmph.message);
                } catch (error) {
                    console.error('Error fetching removed parts:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (!isInitial) {
            init();
        }
    }, [docs, isInitial]);

    const onChangeSearchText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(e.target.value);
    };

    const emphasizeDoc = (originalDoc: string, toCompareDoc: string) => {
        const emphasizedDoc = findMissingParts(originalDoc, toCompareDoc);

        return (
            <div>
                {originalDoc
                    .trim()
                    .split('\n')
                    .map((line, index) => {
                        const l = line.trim();
                        const emphasizedLines = emphasizedDoc
                            .trim()
                            .split('\n')
                            .map(emph => emph.trim());

                        return (
                            <div key={index} className={emphasizedLines.includes(l) ? 'text-red-500' : ''}>
                                {l}
                            </div>
                        );
                    })}
            </div>
        );
    };

    return (
        <div className="relative z-20 w-full h-full flex items-center">
            <div className="flex flex-col h-full ml-auto">
                <div className="my-auto mx-auto font-IBMPlexSansKRSemiBold text-4xl text-slate-700 text-center">UNTBT입니다, 무엇을 도와드릴까요?</div>
                <SearchInput onChangeSearchText={onChangeSearchText} onClickSearchButton={onClickSearchButton} />
                <button onClick={onClickSearchButton} className="my-auto mx-auto w-full font-PretendardMedium hover:bg-blue-700 bg-blue-600 text-white rounded-full p-3">
                    검색
                </button>
            </div>
            <div className="relative top-4 h-[586px] p-6 ml-auto w-1/4 flex flex-col">
                <div className="z-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{loading && <CircleLoading />}</div>
                <div className="text-2xl h-16 flex justify-center items-center font-IBMPlexSansKRSemiBold text-center text-slate-700">
                    <p>분석 결과</p>
                </div>
                <textarea readOnly value={report} className="px-4 py-6 w-full h-full text-center resize-none drop-shadow-lg" />
            </div>
            <div className="relative top-4 h-[586px] p-6 w-1/4 flex flex-col">
                <div className="z-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{loading && <CircleLoading />}</div>
                <div className="text-2xl h-16 flex justify-center items-center font-IBMPlexSansKRSemiBold text-center text-slate-700">
                    <p>피드백</p>
                </div>
                <div className="w-full h-full text-center px-4 py-6 overflow-y-auto overflow-x-clip bg-white">{removedDoc ? emphasizeDoc(originalDoc, removedDoc) : result}</div>
            </div>
        </div>
    );
}
