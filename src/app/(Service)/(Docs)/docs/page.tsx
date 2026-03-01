import React from 'react';

const DOCUMENT_1 = `무역 명세서

제품명: XYZ 맛 스낵

제품 설명: 다양한 향신료와 허브로 만든 짭짤한 스낵으로, 모든 연령대가 즐길 수 있습니다.

HS 코드: 1905.90

원산지: 슬로베니아

제조사: XYZ 식품 산업

생산일자: 2024-06-15

유통기한: 2025-06-15

성분:

밀가루
식물성 기름
향신료
인공 향료
방부제
라벨링 정보:

소금 함량: 언급 없음
영양 정보:
칼로리: 200 kcal
총 지방: 10g
나트륨: 언급 없음
총 탄수화물: 20g
단백질: 3g
포장단위: 100g

유통경로: 일반 슈퍼마켓 및 편의점`;

const DOCUMENT_2 = `무역 명세서

제품명:
프리미엄 미드 음료

제품 코드:
PRM-MD-2024

HS 코드:
2206.00.90

원산지:
슬로베니아

제조업체:
슬로베니아 미드 컴퍼니

제품 설명:
고대 레시피를 따라 발효된 꿀로 만든 전통 알코올 음료로, 풍부하고 진정한 맛을 제공합니다. 이 프리미엄 미드는 고급 식품 매장 및 전문 주류 매장에 이상적인 세련된 병에 담겨 있습니다.

포장 세부사항:

750 ml 유리병
상자당 12병
상자 크기: 40 x 30 x 35 cm
상자당 총중량: 15 kg
성분:

물
꿀
효모
알코올 함량:
12% ABV

보관 조건:
직사광선을 피해 서늘하고 건조한 곳에 보관하십시오.

유통 기한:
생산일로부터 2년

라벨 정보:

라벨에는 슬로베니아의 문화 유산을 강조하는 예술적 디자인이 포함되어 있습니다.
성분과 알코올 함량은 영어로만 표시됩니다.
규정 준수 사항:
이 제품은 슬로베니아 현지 식품 및 음료 규정을 준수합니다. 생산 과정에서 모든 필요한 건강 및 안전 기준을 충족했습니다.
본 생산품은 봉밀주와 탄산봉밀주의 라벨링을 명시하지 않습니다.

수출 세부사항:

수출 항구: 코퍼, 슬로베니아
선적 조건: FOB
예상 배송 시간: 30일
규제 노트:
이 제품은 국제 무역 기준에 맞춰 평가되었습니다. 주문 전에 알코올 음료에 대한 현지 수입 규정을 검토하시기 바랍니다.

연락처 정보:
슬로베니아 미드 컴퍼니
주소: 123 미드 스트리트, 류블랴나, 슬로베니아
이메일: sales@slovenianmead.si
전화: +386 1 234 5678`;

function DocsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">샘플 문서</h1>
                <p className="mt-2 text-gray-500">
                    분석 테스트를 위한 샘플 무역 명세서입니다.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card 1: XYZ 맛 스낵 */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        XYZ 맛 스낵
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            HS 1905.90
                        </span>
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            슬로베니아
                        </span>
                    </div>
                    <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {DOCUMENT_1}
                    </div>
                </div>

                {/* Card 2: 프리미엄 미드 음료 */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        프리미엄 미드 음료
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            HS 2206.00.90
                        </span>
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            슬로베니아
                        </span>
                    </div>
                    <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {DOCUMENT_2}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocsPage;
