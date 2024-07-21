'use client';
import CircleLoading from '@/components/CircleLoading';
import React, { useLayoutEffect } from 'react';

type Props = {};

function AutofixPage({}: Props) {
    const [productDocs, setProductDocs] = React.useState('');
    const [reportDocs, setReportDocs] = React.useState('');
    const [isAutoFixing, setIsAutoFixing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [histoyList, setHistoryList] = React.useState([]);
    const [modifiedDocs, setModifiedDocs] = React.useState('');
    const [knowList, setKnowList] = React.useState([]);

    useLayoutEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetch('/api/v1/history', {
                method: 'GET',
            })
                .then(d => d.json())
                .then(data => {
                    setHistoryList(data);
                }),
            fetch('/api/v1/know', {
                method: 'GET',
            })
                .then(d => d.json())
                .then(data => {
                    setKnowList(data);
                }),
        ]).then(() => {
            console.log('done');
            setIsLoading(false);
        });
    }, []);

    const loadDocs = async (id: number) => {
        setIsLoading(true);
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

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CircleLoading />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full items-center h-full gap-6 justify-center pt-6 pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">문서 자동화 페이지</h1>
            </div>
            <div className="w-full h-full relative z-50 flex">
                <div className="flex w-full justify-between gap-6">
                    <div className="w-full h-full gap-6 flex flex-col">
                        {histoyList.map((h: any) => (
                            <div key={h.id} className="w-full flex justify-evenly items-start text-sm">
                                <p>문건 {h.id}번</p>
                                <p className="truncate w-56">{h.productDocument}</p>
                                <button className="bg-blue-500 rounded-md text-white p-2" onClick={() => loadDocs(h.id)}>
                                    불러오기
                                </button>
                            </div>
                        ))}
                        <button disabled={isAutoFixing} className="mt-auto mx-auto px-4 py-2 bg-black drop-shadow-lg w-4/5 text-white rounded-lg" onClick={autoFix}>
                            자동 수정
                        </button>
                    </div>
                    <div className="w-5/6">
                        <h2 className="text-lg font-bold">원본</h2>
                        <textarea readOnly className="resize-none w-full h-full" value={productDocs} />
                    </div>
                    <div className="w-5/6">
                        <h2 className="text-lg font-bold">보고서</h2>
                        <textarea readOnly className="resize-none w-full h-full" value={reportDocs} />
                    </div>
                    <div className="w-5/6">
                        <h2 className="relative text-lg font-bold">수정</h2>
                        <textarea className="resize-none w-full h-full" value={modifiedDocs} onChange={e => setModifiedDocs(e.target.value)} />
                        <div className="z-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{isAutoFixing && <CircleLoading />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutofixPage;
