'use client';

import CircleLoading from '@/components/CircleLoading';
import SearchInput from '@/components/SearchInput';
import { useState } from 'react';

function findMissingParts(original: string, comparison: string) {
    let originalIndex = 0;
    let comparisonIndex = 0;
    let missingParts = '';

    while (originalIndex < original.length) {
        // 비교할 문자열이 끝났거나, 현재 문자가 일치하지 않으면
        if (comparisonIndex >= comparison.length || original[originalIndex] !== comparison[comparisonIndex]) {
            missingParts += original[originalIndex]; // 누락된 부분을 저장
        } else {
            comparisonIndex++; // 일치하면 비교 문자열의 인덱스를 증가
        }
        originalIndex++; // 원래 문자열의 인덱스를 증가
    }

    return missingParts;
}
const MOCK = `
 담배 증류 기술은 담배 식물에서 유효 성분을 추출하고 농축하는 과정으로, 주로 니코틴과 같은 알칼로이드 성분의 농축을 목적으로 합니다. 이 기술은 담배 제품의 제조, 연구 및 개발, 그리고 의약품 생산에 중요한 역할을 합니다. 이 문서에서는 담배 증류 기술의 원리, 공정, 장비, 응용 분야 및 최신 연구 동향을 다룹니다.
 담배 증류는 기본적으로 담배 식물에서 특정 성분을 분리해내는 과정입니다. 이 과정은 여러 단계로 나누어지며, 각 단계는 물리적 또는 화학적 원리를 기반으로 합니다. 주요 단계는 다음과 같습니다:

1.1. 추출 (Extraction)

목적: 담배 잎에서 니코틴을 포함한 주요 성분을 추출.
방법: 유기 용매(예: 에탄올, 메탄올)를 사용하여 담배 잎을 침출.
원리: 용매가 담배 잎의 세포벽을 통과하여 내부의 유효 성분을 용해.
1.2. 증류 (Distillation)

목적: 추출된 용액에서 순수한 니코틴을 분리.
방법: 용액을 가열하여 성분을 증발 및 응축.
원리: 각 성분의 끓는점 차이를 이용하여 분리.
1.3. 정제 (Purification)

목적: 증류된 니코틴의 순도 향상.
방법: 재증류, 크로마토그래피 등을 이용한 정제.
원리: 불순물의 물리적, 화학적 특성 차이를 이용하여 분리.

담배 증류 공정은 여러 단계로 구성되며, 각 단계는 고유의 장비와 기술을 필요로 합니다. 아래는 전형적인 담배 증류 공정의 흐름도입니다.

2.1. 원료 준비

담배 잎 선별 및 세척: 고품질의 담배 잎을 선별하고, 이물질 제거를 위해 세척.

2.2. 추출 단계

용매 추출: 담배 잎을 용매에 침지하여 주요 성분을 추출.
추출 시간 및 온도 조절: 최적의 추출 효율을 위해 시간 및 온도 조절.
2.3. 증류 단계

1차 증류: 추출액을 가열하여 니코틴을 증류.
응축: 증발된 니코틴을 응축기로 모아 액체 상태로 변환.
2.4. 정제 단계

재증류: 필요시 니코틴을 재증류하여 순도를 높임.
크로마토그래피: 추가 정제를 위해 크로마토그래피 사용.

담배 증류 과정에서 사용되는 주요 장비는 다음과 같습니다:

3.1. 추출기 (Extractor)

종류: Soxhlet 추출기, 연속 추출기 등.
역할: 담배 잎에서 유효 성분을 추출.
3.2. 증류기 (Distiller)

종류: 간헐식 증류기, 연속식 증류기.
역할: 추출액에서 니코틴을 분리.
3.3. 응축기 (Condenser)

종류: 냉각수 응축기, 공냉식 응축기.
역할: 증발된 니코틴을 액화.
3.4. 크로마토그래피 장비 (Chromatography Equipment)

종류: 기체 크로마토그래피, 액체 크로마토그래피.
역할: 니코틴의 순도 향상.

담배 증류 기술은 다양한 분야에 응용될 수 있습니다. 주요 응용 분야는 다음과 같습니다:

4.1. 담배 제품 제조

목적: 니코틴 농도를 조절하여 담배 제품의 품질 향상.
방법: 증류된 니코틴을 재배합하여 다양한 제품 생산.
4.2. 의약품 개발

목적: 니코틴의 약리적 효과를 이용한 의약품 개발.
방법: 고순도 니코틴을 이용하여 치료제 및 금연 보조제 개발.
4.3. 연구 및 개발

목적: 니코틴 및 기타 알칼로이드의 생리적 효과 연구.
방법: 증류된 니코틴을 이용한 실험 및 연구.

최근 담배 증류 기술에 대한 연구는 지속적으로 발전하고 있으며, 주요 연구 동향은 다음과 같습니다:

5.1. 친환경 추출 및 증류 기술 개발

목표: 유기 용매 사용을 최소화하고, 친환경적이고 경제적인 방법 개발.
예: 초임계 유체 추출, 초음파 보조 추출 등.
5.2. 니코틴 대체 물질 연구

목표: 니코틴의 중독성을 줄이기 위한 대체 물질 개발.
예: 비니코틴 알칼로이드, 합성 대체물질.
5.3. 정제 기술의 고도화

목표: 니코틴의 순도 및 안정성을 높이기 위한 정제 기술 개선.
예: 나노필터 사용, 고성능 액체 크로마토그래피(HPLC).

담배 증류 기술은 담배 산업 및 의약품 개발에서 중요한 역할을 합니다. 이 기술은 고품질의 니코틴을 생산하고, 다양한 응용 분야에 활용될 수 있는 기반을 제공합니다. 최신 연구 동향을 반영하여, 더욱 친환경적이고 효율적인 방법을 개발함으로써 담배 증류 기술의 발전을 도모할 수 있습니다. 이 문서가 담배 증류 기술의 이해에 도움이 되기를 바랍니다. 추가적인 연구와 개발을 통해 이 분야의 기술이 지속적으로 발전하길 기대합니다.
`;

const MOCK2 = `
### 서론

식품 연구는 인류의 건강과 안전, 그리고 삶의 질을 향상시키기 위해 필수적인 분야입니다. 이 연구는 식품의 영양성분, 안전성, 저장성, 그리고 새로운 식품 개발 등을 포함합니다.

### 연구 내용

식품 연구는 주로 영양학, 미생물학, 화학, 공학 등의 학문을 바탕으로 진행됩니다. 영양학 연구에서는 식품의 영양성분 분석과 이를 통한 건강 증진 방법을 모색합니다. 미생물학 연구는 식품 안전성을 위해 유해 미생물의 검출 및 제어 방법을 개발합니다. 화학적 연구는 식품 첨가물, 보존제, 그리고 식품의 화학적 변화 등을 다룹니다. 공학적 접근은 식품의 가공, 포장, 저장 기술을 개선하여 신선도와 맛을 유지하는 방법을 찾습니다.

### 응용 및 발전

최근에는 식품의 기능성을 강화하기 위한 연구가 활발히 진행되고 있습니다. 이는 특정 건강 문제를 해결하거나 예방할 수 있는 기능성 식품 개발로 이어집니다. 예를 들어, 프로바이오틱스나 항산화제 함유 식품은 면역력 증진과 노화 방지에 기여할 수 있습니다.

### 결론

식품 연구는 인류의 건강과 복지에 큰 영향을 미치며, 지속적인 연구와 혁신을 통해 더욱 안전하고 영양가 높은 식품을 제공할 수 있습니다. 이러한 연구는 미래 식량 문제 해결에도 중요한 역할을 할 것입니다.
`;

export default function Home() {
    const [searchText, setSearchText] = useState('');
    // const [result, setResult] = useState('')
    const [report, setReport] = useState('');
    const [removedDoc, setRemovedDoc] = useState('');
    const [originalDoc, setOriginalDoc] = useState('');
    const [result, setResult] = useState('');

    const [loading, setLoading] = useState(false);

    const onClickSearchButton = async () => {
        if (loading) return;

        setOriginalDoc(searchText);

        setLoading(true);

        const res = await fetch('/api/v1/docs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: searchText,
            }),
        });

        const docs = await res.json();

        setReport(docs.message);

        if (docs.isTradable) {
            setLoading(false);
            setResult('통관 가능한 문서이므로 추가 피드백이 필요하지 않습니다.');
            setRemovedDoc('');
            return;
        } else {
            const resForEmph = await fetch('/api/v1/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: searchText,
                    // tbtDocs: report,
                }),
            });

            const docsForEmph = await resForEmph.json();

            setRemovedDoc(docsForEmph.message);

            setLoading(false);
        }
    };

    const onChangeSearchText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchText(e.target.value);
    };

    const emphasizeDoc = (originalDoc: string, toCompareDoc: string) => {
        // console.log('originalDoc', originalDoc);
        // console.log('toCompareDoc', toCompareDoc);

        const emphasizedDoc = findMissingParts(originalDoc, toCompareDoc);

        // console.log('emphasizedDoc', emphasizedDoc);

        return (
            <>
                {originalDoc
                    .trim()
                    .split('\n')
                    .map((line, index) => {
                        const l = line.trim();
                        const emphasizedLines = emphasizedDoc
                            .trim()
                            .split('\n')
                            .map(emph => emph.trim());

                        if (emphasizedLines.includes(l)) {
                            return (
                                <div key={index} className="text-red-500">
                                    {l}
                                </div>
                            );
                        }
                        return (
                            <div key={index} className="">
                                {l}
                            </div>
                        );
                    })}
            </>
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
                {/* <textarea readOnly className="w-full h-full text-center resize-none drop-shadow-lg" /> */}
            </div>
        </div>
    );
}
