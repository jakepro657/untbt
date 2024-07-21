import prisma from './prisma';

/** 쿼리를 요청하는 클래스 */
class Query {
    constructor() {}

    /** 매핑 ID에 관한 쿼리를 요청하는 함수 */
    // Promise<TbtApiResponse>
    public async operate({ itemCategoryCode, middleCategoryCode }: TbtApiParams): Promise<string[] | null> {
        const response = await prisma.tradeDocument.findMany({
            where: {
                middleCategoryCode,
                itemCategoryCode,
                notificationYear: 2019,
                continentName: '유럽',
            },
        });

        // console.log(response);

        const result = response.sort((a, b) => (a.notificationDate?.getTime()! < b.notificationDate?.getTime()! ? 1 : -1)).map(doc => `${doc.itemNameKorean} ${doc.mainContentKorean}`);

        console.log(result);

        return result;
    }
}

const QUERY_INSTANCE = new Query();

export default QUERY_INSTANCE;
