'use client';

import CircleLoading from '@/components/ui/CircleLoading';
import SearchInput from '@/components/ui/SearchInput';
import { useEffect, useState } from 'react';
import { findMissingParts } from '@/utils/diff';

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
        <div className="relative z-20 w-full min-h-full flex flex-col items-center px-6 py-12">
            {/* Top section: Title */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-IBMPlexSansKRSemiBold text-slate-800 mb-3">
                    TBT 통관 분석
                </h1>
                <p className="text-lg text-gray-500 font-PretendardRegular">
                    제품 문서를 입력하면 무역 장벽 규정과의 적합성을 분석합니다.
                </p>
            </div>

            {/* Input area: Full-width card */}
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-6 mb-8">
                <SearchInput onChangeSearchText={onChangeSearchText} />
                <button
                    onClick={onClickSearchButton}
                    disabled={loading}
                    className="mt-4 w-full font-PretendardMedium hover:bg-blue-700 bg-blue-600 text-white rounded-xl py-3 px-6 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '분석 중...' : '분석하기'}
                </button>
            </div>

            {/* Results section */}
            {!isInitial && (
                <div className="w-full max-w-4xl relative">
                    {/* Loading overlay */}
                    {loading && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 rounded-xl">
                            <CircleLoading />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left card: Analysis result */}
                        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                            <h2 className="text-xl font-IBMPlexSansKRSemiBold text-slate-700 mb-4 text-center">
                                분석 결과
                            </h2>
                            <div className="flex-1 bg-gray-50 rounded-lg p-4 text-gray-700 font-PretendardRegular text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[400px]">
                                {report || '분석 결과가 여기에 표시됩니다.'}
                            </div>
                        </div>

                        {/* Right card: Feedback */}
                        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                            <h2 className="text-xl font-IBMPlexSansKRSemiBold text-slate-700 mb-4 text-center">
                                피드백
                            </h2>
                            <div className="flex-1 bg-gray-50 rounded-lg p-4 text-gray-700 font-PretendardRegular text-sm leading-relaxed overflow-y-auto max-h-[400px]">
                                {removedDoc
                                    ? emphasizeDoc(originalDoc, removedDoc)
                                    : result || '피드백이 여기에 표시됩니다.'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
