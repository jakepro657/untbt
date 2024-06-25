
/** 키워드를 분석해서 HS code에 따라 매핑 시키는 */
export const GPT_SEMANTIC_SEARCH_PROMPT = `
    <Context>
        You have to analyze the following keywords,
        and make a decision based on TBT (Trade Barriers to Trade) HS Code.
    </Context>

    <Instructions>
        *** VERY IMPORTANT ***: JUST ANSWER WITH ONLY A NUMBER.
        You have to choose the number with following branches:
        1. Live Animals
        2. Meat and Edible Meat Offal
        3. Fish and Crustaceans, Molluscs and Other Aquatic Inbvertebrates
        4. Dairy Produce; Birds Eggs; Natural Honey; Edible Products Of Animal Origin, Not Elsewhere Specified or Included
        5. Products Of Animal Origin, Not Elsewhere Specified or Included
        6. Live Trees and Other Plants; Bulbs, Roots and The Like; Cut Flowers and Ornamental Foliage
        7. Edible Vegetables and Certain Roots and Tubers
        8. Edible Fruit and Nuts; Peel Of Citrus Fruit or Melons
        9. Coffee, Tea, Mate and Spices
        10. Cereals
        11. Products Of The Milling Industry; Malt; Starches; Inulin; Wheat Gluten
        12. Oil Seeds and Oleaginous Fruits; Miscellaneous Grains, Seeds and Fruits; İndustrial or Medicinal Plants; Straw and Fodder
        13. Lac; Gums, Resins and Other Vegetable Saps and Extracts
        14. Vegetable Plaiting Materials; Vegetable Products Not Elsewhere Specified or İncluded
        15. Animal or Vegetable Fats and Oils and Their Cleavage Products Prepared Edible Fats; Animal or Vegetable Waxes
        16. Preparations Of Meat, Of Fish or Of Crustaceans, Molluscs or Other Aquatic İnvertebrates
        17. Sugars and Sugar Confectionery
        18. Cocoa and Cocoa Preparations
        19. Preparations Of Cereals, Flour, Starch or Milk; Bakers' Wares
        20. Preparations Of Vegetables, Fruit, Nuts or Other Parts Of Plants
        21. Miscellaneous Edible Preparations
        22. Beverages, Spirits and Vinegar
        23. Residues and Waste From The Food İndustries; Prepared Animal Feed
        24. Tobacco and Manufactured Tobacco Substitutes
    </Instructions>
`

/** 세관 문서input에 대해 주요 키워드들을 뽑아내는 prompt */
export const GPT_SEMANTIC_FILTER_PROMPT = `
    <Context>
        You have to analyze the following text,
        and extract keywords related to the product.
    </Context>

    <Instructions>
        *** VERY IMPORTANT ***: JUST ANSWER ONLY WITH A LIST OF KEYWORDS.
        IMPORTANT: You have to extract all kewords related to the following category. 
        IMPORTANT: You have to reduce the keywords that are relatively less relevant to the following category to five or less.
        1 Living animals and Animal Products 
        2 Vegetable Products 
        3 Animal Products. Vegetable fats and oils and their decomposition products, prepared edible fats and animal lead 
        4 preparation food, beverage, liquor, vinegar, tobacco, manufactured tobacco substitutes 
        5 Mineral products 
        6 Products produced by chemical or related industries 
        7 Plastic and its products, rubber and its products 
        8 Products of pre-skin, leather, fur, and their products, harnesses, travel equipment, handbags and similar containers, animal gut [excluding silkworm gut]
        9 Wood and its products, charcoal, cork and other products, straw and esparto, or other structural materials, basketware and earthenware
        10 Pulp of wood or other fiber cellulose materials, recovered paper and cardboard [waste and scrap], paper and cardboard and their products
        11 Textile fiber and textiles fiber products
        12 Footwear, hats, acids, sticks, sheets, sticks, whips, horseback riding whips and their parts, and their parts, manufactured feathers and their products, harmonies, and human hair products
        13 stone, plastersr, Cement and asbestos. products of mica or similar materials, ceramic products, glass and glass products
        14 Natural pearls, Western pearls, precious stones, semi-precious stones. Metals coated with precious metals and their products, imitation new decorative items, coins
        15 Non-metals and their products
        16 Machinery and electric devices and parts, recorders, audio reproducers, video and sound recorders on televisions. Accessories 
        17 Vehicle and aircraft related to ships and transport aircraft.
        18 Optical instruments for photography, movie equipment, measuring equipment Inspection equipment Precision equipment Medical equipment, watches, musical instruments, their parts and accessories
        19 Weapons, gun shells and their parts and accessories 
        20 sundries
        21 Art supplies. Collections · Antiques
        
    </Instructions>
`

/** */
export const GPT_REPORT_PROMPT = `
    <Context>
        You have to see the following two texts.
        First is the text about user's product document for trade.
        Second is the text about the trade barrier document.
    </Context>

    <Instructions>
        *** VERY IMPORTANT ***: WRITE A REPORT THAT INFERENCES IF USER CAN TRADE THE PRODUCT OR NOT.
        You have to make a report about the following two texts.
        If it is possible to trade the product, you have to write "YES".
        If it is not possible to trade the product, you have to write "NO".
        
        *** IMPORTANT ***: The criteria for the product to be traded are as follows:
            The product is not related to the trade barrier document.
            If the product is related to the trade barrier document, the product is prohibited from trading.

        If it is not clear whether the product can be traded, you have to write "UNCLEAR".
    </Instructions>
`