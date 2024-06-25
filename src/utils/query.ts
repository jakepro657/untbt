
const MOCK = `
    The following communication, dated 19 June 2024, is being circulated at the request of the
    delegation of the Philippines.
    _______________
    Title: Supplemental Technical Regulations for DAO 22-06, Series of 2022 on the Mandatory Product
    Certification of Vaporized Nicotine and Non-Nicotine Products
    Reason for Addendum:
    [ ] Comment period changed - date:
    [ ] Notified measure adopted - date:
    [X] Notified measure published - date: 8 June 2024
    [ ] Notified measure enters into force - date:
    [X] Text of final measure available from1:
    https://bps.dti.gov.ph/
    https://members.wto.org/crnattachments/2024/TBT/PHL/final_measure/24_03857_00
    _e.pdf
    [ ] Notified measure withdrawn or revoked - date:
    Relevant symbol if measure re-notified:
    [ ] Content or scope of notified measure changed and text available from1:
    New deadline for comments (if applicable):
    [ ] Interpretive guidance issued and text available from1:
    [ ] Other:
    Description: -
    __            
`

/** 쿼리를 요청하는 클래스 */
class Query {

    constructor() {
    }

    /** 매핑 ID에 관한 쿼리를 요청하는 함수 */
    // Promise<TbtApiResponse>
    public async operate({ }: TbtApiParams): Promise<string> {
        const response = MOCK;

        return response;
    }
}

const QUERY_INSTANCE = new Query();

export default QUERY_INSTANCE;