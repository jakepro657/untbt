export function findMissingParts(original: string, comparison: string) {
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
