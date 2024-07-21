import React from 'react';

type Props = {};

function DocsPage({}: Props) {
    return (
        <textarea
            readOnly
            className="absolute z-40 w-full h-full"
            value={`
            무역 명세서

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

            유통경로: 일반 슈퍼마켓 및 편의점
            `}
        />
    );
}

export default DocsPage;
