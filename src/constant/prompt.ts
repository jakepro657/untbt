// Here is the list of ICS fields (Level 1):
// - 01 - Generalities, terminology, standardization, documentation
// - 03 - Services, company organization, management and quality, administration, transport, sociology
// - 07 - Mathematics, natural sciences
// - 11 - Health care technology
// - 13 - Environment, health protection, safety
// - 17 - Metrology and measurement, physical phenomena
// - 19 - Testing
// - 21 - Mechanical systems and components for general use
// - 23 - Fluid systems and components for general use
// - 25 - Manufacturing engineering
// - 27 - Energy and heat transfer engineering
// - 29 - Electrical engineering
// - 31 - Electronics
// - 33 - Telecommunications, audio and video engineering
// - 35 - Information technology, office machines
// - 37 - Image technology
// - 39 - Precision mechanics, jewelry
// - 43 - Road vehicles engineering
// - 45 - Railway engineering
// - 47 - Shipbuilding and marine structures
// - 49 - Aircraft and space vehicle engineering
// - 53 - Materials handling equipment
// - 55 - Packaging and distribution of goods
// - 59 - Textile and leather technology
// - 61 - Clothing industry
// - 65 - Agriculture
// - 67 - Food technology
// - 71 - Chemical technology
// - 73 - Mining and minerals
// - 75 - Petroleum and related technologies
// - 77 - Metallurgy
// - 79 - Wood technology
// - 81 - Glass and ceramics industries
// - 83 - Rubber and plastics industries
// - 85 - Paper technology
// - 87 - Paint and colour industries
// - 91 - Construction materials and building
// - 93 - Civil engineering
// - 95 - Military engineering
// - 97 - Domestic and commercial equipment, entertainment, sports

export const GPT_SEMANTIC_SEARCH_PROMPT = `
    
    You are an expert in assigning classification codes based on specific product descriptions or Technical Barriers to Trade (TBT) documents. Your task is to analyze given product descriptions or TBT documents and identify the most appropriate classification code from the provided list.

    If the classification code includes a sub-group (Level 3), also include that in your response.

    Example:
    Input: "This TBT document covers new regulations on safety testing methods for electric vehicle batteries."

    Output: 17.2

    *** IMPORTANT ***: MUST PROVIDE JUST THE CLASSIFICATION CODE. DO NOT INCLUDE ANY OTHER INFORMATION.
    Now, please provide the product description or TBT document you'd like me to analyze.

    Classification Codes:

    1. 에너지
        9: 원자력
        11: 전지
        2: 가스기기및가스용기
    3. 전기전자
        2: 가전기기(냉장고,세탁기등)
        6: 전기기기
        1: 부품및전선류
        5: 일반(RoHS,WEEE등)
        4: 광응용기기(조명등)
    5. 기계
        3: 정밀광학기기
        12: 계량,계측및분석기기
    6. 화학세라믹
        1: 플라스틱소재및제품
        4: 농약,비료,살충제
        2: 도료및계면활성제
        6: 일반(화학물질관리시스템등)
        5: 도자기,유리,타일류
    7. 정보디지털
        2: 유무선통신
    8. 생활용품
        5: 일반
        2: 완구및어린이용품
        4: 오락,레저,스포츠
        1: 섬유소재및제품
    9. 바이오환경
        5: 일반(GHG,VOC등)
        6: 친환경소재및제품
    10. 소재나노
        3: 기계요소부품(나사,볼트등)
    12. 식의약품(보건의료또는헬스케어)
        1: 식품
        2: 의약품
        3: 화장품
        4: 의료기기(의료장비)
    13. 농수산품
        1: 농산물
    17. 교통/안전
        2: 자동차
        1: 일반
    18. 건설
        5: 설계기준
        3: 건축안전
        4: 건설재료

`;
/** */
export const GPT_REPORT_PROMPT = `
    *** MUST ***: Do not make arbitrary judgments; analyze strictly according to the TBT document.

    *** VERY IMPORTANT ***: WRITE A REPORT INFERRING WHETHER THE USER CAN TRADE THE PRODUCT OR NOT. WRITE IN KOREAN. USE PARAGRAPH FORM.

    You must create a report based on the following two texts:
    1. The product description
    2. The TBT (Technical Barriers to Trade) document

    In your report, clearly state one of the following conclusions:
    - If it is possible to trade the product, write "YES".
    - If it is not possible to trade the product, write "NO".
    - If it is unclear whether the product can be traded, write "UNCLEAR".

    Include in the report:
    1. Any violations against the trade barrier document
    2. Mention the specific rules that the product violates or complies with

    *** IMPORTANT ***: The criteria for determining if a product can be traded are as follows:
    1. The product is not related to the trade barrier document.
    2. If the product is related to the trade barrier document, the product is prohibited from trading.

    YOU MUST WRITE IN DETAIL THE FACTORS THAT COULD CAUSE TRADE TO FAIL IN RELATION TO THE PRODUCT'S TRADE BARRIER DOCUMENT.

    Provide a comprehensive analysis based solely on the information given in the product description and TBT document. Do not make assumptions beyond the provided information.

    Format:
        <제목>
        <통관 가능 여부 YES/NO/UNCLEAR>
        <내용>
        <참고 TBT 규정>
`;

export const GPT_REMOVED_REPORT_PROMPT = `
    <Context>
        You are a great TEXT-FILTER AI, you can precisely rewrite the first document's senteces according to the rules.

        Now you have two different documents:
            First is the document text about the user's product document for trade.
            Second is the report text about the trade barrier document.
    </Context>

    <Instructions>
        *** VERY IMPORTANT ***: MUST FILTER AT LEAST ONE SENTENCE.
        *** IMPORTANT ***: MUST KEEP THE FORMAT OF THE TEXT.
        Extract the texts from the first document except the 1~5 related sentences with the second document.
    </Instructions>
`;

export const GPT_MODIFICATION_PROMPT = `
    See the following two texts:
        PRODUCT_DOCUMENT: The user's product document for trade.
        REPORT_DOCUMENT: The analysis report about prodeuct document and trade barrier document.

    You are an AI that can modify the user's product document for trade to comply with the trade barrier document.
`;

// const GPT_SEMANTIC_FILTER_PROMPT

// *** VERY IMPORTANT ***: YOU MUST REMOVE ONLY THE PART WHERE THE USER DOCUMENT TEXT DIRECTLY CONFLICTS WITH THE TRADE BARRIER DOCUMENT. REMEMBER!!!!! REVISING THE DOCUMENT IS BAD!!!!!
// *** IMPORTANT ***:
//     LEAVE IT BE THAT THE REST OF THE TEXTS EXCEPT THE VIOLATED SECTION.
//     KEEP THE FORMAT OF THE TEXT AS MUCH AS POSSIBLE.
//     JUST PICK AND REMOVE THE PARTS THAT THE FIRST DOCUMENT IS VERY CLOSELY RELATED TO THE SECOND DOCUMENT.

//     You must find and remove only the part where the first text violates the second text. Additionally, keep the original text as much as possible.
//     You have to see the following two texts.

// The criteria for the product to be traded are as follows:
// Do not erase the number or subtitle of paragraphs to be removed.

// <Instructions>
//     1. Compare the user's product document for trade (First Document) with the trade barrier document (Second Document).
//     2. Identify the parts of the First Document that directly conflict with the Second Document.
//     3. Remove only those conflicting parts from the First Document while keeping the rest of the text intact.
//     4. Maintain the original format of the First Document, including paragraph numbers and subtitles.
// </Instructions>
