'use client';
import CircleLoading from '@/components/ui/CircleLoading';
import React, { useLayoutEffect } from 'react';

type Props = {};

function AutofixPage({}: Props) {
    const [productDocs, setProductDocs] = React.useState('');
    const [reportDocs, setReportDocs] = React.useState('');
    const [isAutoFixing, setIsAutoFixing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [historyList, setHistoryList] = React.useState([]);
    const [modifiedDocs, setModifiedDocs] = React.useState('');
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    useLayoutEffect(() => {
        setIsLoading(true);
        fetch('/api/v1/history', {
            method: 'GET',
        })
            .then(d => d.json())
            .then(data => {
                setHistoryList(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const loadDocs = async (id: number) => {
        setIsLoading(true);
        setSelectedId(id);
        const d = await fetch('/api/v1/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        const data = await d.json();
        setProductDocs(data.productDocument);
        setReportDocs(data.report);

        setIsLoading(false);
    };

    const autoFix = async () => {
        setIsAutoFixing(true);
        const d = await fetch('/api/v1/autofix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productDocument: productDocs,
                report: reportDocs,
            }),
        });
        const data = await d.json();
        setModifiedDocs(data.modifiedDocument);
        setIsAutoFixing(false);
    };

    return (
        <div className="relative z-20 w-full min-h-full flex flex-col px-6 py-12">
            {/* Page header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-IBMPlexSansKRSemiBold text-slate-800 mb-3">
                    문서 자동화
                </h1>
                <p className="text-lg text-gray-500 font-PretendardRegular">
                    분석 이력을 선택하고 자동 수정 기능을 통해 문서를 개선합니다.
                </p>
            </div>

            {/* Loading overlay for initial load */}
            {isLoading && !selectedId && (
                <div className="flex-1 flex items-center justify-center">
                    <CircleLoading />
                </div>
            )}

            {/* Main layout: sidebar + content */}
            {!(isLoading && !selectedId) && (
                <div className="flex flex-1 gap-6 w-full max-w-7xl mx-auto">
                    {/* Left sidebar - History list */}
                    <div className="w-1/4 flex flex-col">
                        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col flex-1">
                            <h2 className="text-lg font-IBMPlexSansKRSemiBold text-slate-700 mb-4">
                                분석 이력
                            </h2>

                            {historyList.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-gray-400 font-PretendardRegular text-sm text-center">
                                        분석 이력이 없습니다.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                                    {historyList.map((h: any) => (
                                        <button
                                            key={h.id}
                                            onClick={() => loadDocs(h.id)}
                                            className={`w-full text-left p-3 rounded-lg border-2 transition-colors duration-200 ${
                                                selectedId === h.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
                                            }`}
                                        >
                                            <p className="text-sm font-PretendardMedium text-slate-700">
                                                문건 {h.id}번
                                            </p>
                                            <p className="text-xs text-gray-400 font-PretendardRegular truncate mt-1">
                                                {h.productDocument}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <button
                                disabled={isAutoFixing || !productDocs}
                                className="w-full font-PretendardMedium hover:bg-blue-700 bg-blue-600 text-white rounded-xl py-3 px-6 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                                onClick={autoFix}
                            >
                                {isAutoFixing ? '수정 중...' : '자동 수정'}
                            </button>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="w-3/4 flex flex-col gap-6 relative">
                        {/* Loading overlay for document load */}
                        {isLoading && selectedId && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 rounded-xl">
                                <CircleLoading />
                            </div>
                        )}

                        {!selectedId && !productDocs ? (
                            /* Empty state */
                            <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow-sm">
                                <div className="text-center">
                                    <p className="text-gray-400 font-PretendardRegular text-lg mb-2">
                                        문서를 선택해주세요
                                    </p>
                                    <p className="text-gray-300 font-PretendardRegular text-sm">
                                        좌측 이력에서 문건을 선택하면 내용이 표시됩니다.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* Document cards */
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                                {/* Original document card */}
                                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                                    <h2 className="text-xl font-IBMPlexSansKRSemiBold text-slate-700 mb-4 text-center">
                                        원본 문서
                                    </h2>
                                    <div className="flex-1 bg-gray-50 rounded-lg p-4 text-gray-700 font-PretendardRegular text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[400px]">
                                        {productDocs || '원본 문서가 여기에 표시됩니다.'}
                                    </div>
                                </div>

                                {/* Report card */}
                                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                                    <h2 className="text-xl font-IBMPlexSansKRSemiBold text-slate-700 mb-4 text-center">
                                        분석 보고서
                                    </h2>
                                    <div className="flex-1 bg-gray-50 rounded-lg p-4 text-gray-700 font-PretendardRegular text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[400px]">
                                        {reportDocs || '분석 보고서가 여기에 표시됩니다.'}
                                    </div>
                                </div>

                                {/* Modified document card - full width */}
                                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col lg:col-span-2 relative">
                                    <h2 className="text-xl font-IBMPlexSansKRSemiBold text-slate-700 mb-4 text-center">
                                        수정된 문서
                                    </h2>
                                    {isAutoFixing && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 rounded-xl">
                                            <CircleLoading />
                                        </div>
                                    )}
                                    <textarea
                                        className="flex-1 bg-gray-50 rounded-lg p-4 text-gray-700 font-PretendardRegular text-sm leading-relaxed resize-none min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200"
                                        value={modifiedDocs}
                                        onChange={e => setModifiedDocs(e.target.value)}
                                        placeholder="자동 수정 결과가 여기에 표시됩니다."
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AutofixPage;
