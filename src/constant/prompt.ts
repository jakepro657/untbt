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
        25. Salt; Sulfur; Earths and Stone; Plastering Materials, Lime and Cement
        26. Ores, Slag and Ash
        27. Mineral Fuels, Mineral Oils and Products Of Their Distillation; Bituminous Substances; Mineral Waxes
        28. Inorganic Chemicals; Organic or İnorganic Compounds Of Precious Metals, Of Rare-Earth Metals,Of Radioactive Elements or Of İsotopes
        29. Organic Chemicals
        30. Pharmaceutical Products
        31. Fertilizers
        32. Tanning or Dyeing Extracts; Dyes, Pigments, Paints, Varnishes, Putty and Mastics
        33. Essential Oils and Resinoids; Perfumery, Cosmetic or Toilet Preparations
        34. Soap, Organic Surface-Active Agents, Washing Preparations, Lubricating Preparations, Artificial Waxes, Prepared Waxes, Polishing or Scouring Preparations, Candles and Similar Articles, Modeling Pastes, Dental Waxes and Dental Preparations With A Basis Of Plaster
        35. Albuminoidal Substances; Modified Starches; Glues; Enzymes
        36. Explosives; Pyrotechnic Products; Matches; Pyrophoric Alloys; Certain Combustible Preparations
        37. Photographic or Cinematographic Goods
        38. Miscellaneous Chemical Products
        39. Plastics and Articles Thereof
        40. Rubber and Articles Thereof
        41. Raw Hides and Skins (Other Than Furskins) and Leather
        42. Articles Of Leather; Saddlery and Harness; Travel Goods, Handbags and Similar Containers; Articles Of Animal Gut (Other Than Silkworm Gut)
        43. Furskins and Artificial Fur; Manufactures Thereof
        44. Wood and Articles Of Wood; Wood Charcoal
        45. Cork and Articles Of Cork
        46. Manufactures Of Straw, Of Esparto or Of Other Plaiting Materials; Basketware and Wickerwork
        47. Pulp Of Wood or Of Other Fibrous Cellulosic Material; Waste and Scrap Of Paper or Paperboard
        48. Paper and Paperboard; Articles Of Paper Pulp, Of Paper or Of Paperboard
        49. Printed Books, Newspapers, Pictures and Other Products Of The Printing İndustry; Manuscripts, Typescripts and Plans
        50. Silk
        51. Wool, Fine or Coarse Animal Hair; Horsehair Yarn and Woven Fabric
        52. Cotton
        53. Other Vegetable Textile Fibers; Paper Yarn and Woven Fabric Of Paper Yarn
        54. Man-Made Filaments
        55. Man-Made Staple Fibers
        56. Wadding, Felt and Nonwovens; Special Yarns, Twine, Cordage, Ropes and Cables and Articles Thereof
        57. Carpets and Other Textile Floor Coverings
        58. Special Woven Fabrics; Tufted Textile Fabrics; Lace, Tapestries; Trimmings; Embroidery
        59. Impregnated, Coated, Covered or Laminated Textile Fabrics; Textile Articles Of A Kind Suitable For İndustrial Use
        60. Knitted or Crocheted Fabrics
        61. Articles Of Apparel and Clothing Accessories, Knitted or Crocheted
        62. Articles Of Apparel and Clothing Accessories, Not Knitted or Crocheted
        63. Other Made Up Textile Articles; Sets; Worn Clothing and Worn Textile Articles; Rags
        64. Footwear, Gaiters and The Like; Parts Of Such Articles
        65. Headgear and Parts Thereof
        66. Umbrellas, Sun Umbrellas, Walking Sticks, Seatsticks, Whips, Riding-Crops and Parts Thereof
        67. Prepared Feathers and Down and Articles Made Of Feathers or Of Down; Artificial Flowers; Articles Of Human Hair
        68. Articles Of Stone, Plaster, Cement, Asbestos, Mica or Similar Materials
        69. Ceramic Products
        70. Glass and Glassware
        71. Natural or Cultured Pearls, Precious or Semi-Precious Stones,Precious Metals, Metals Clad With Precious Metal and Articles Thereof; İmitation Jewelry; Coin
        72. Iron and Steel
        73. Articles Of İron or Steel
        74. Copper and Articles Thereof
        75. Nickel and Articles Thereof
        76. Aluminum and Articles Thereof
        78. Lead and Articles Thereof
        79. Zinc and Articles Thereof
        80. Tin and Articles Thereof
        81. Other Base Metals; Cermets; Articles Thereof
        82. Tools, İmplements, Cutlery, Spoons and Forks, Of Base Metal; Parts Thereof Of Base Metal
        83. Miscellaneous Articles Of Base Meta49. 
        84. Nuclear Reactors, Boilers, Machinery and Mechanical Appliances; Parts Thereof
        85. Electrical Machinery and Equipment and Parts Thereof; Sound Recorders and Reproducers, Television İmage and Sound Recorders and Reproducers, and Parts and Accessories Of Such Articles
        86. Railway or Tramway Locomotives, Rolling-Stock and Parts Thereof; Railway or Tramway Track Fixtures and Fittings and Parts Thereof; Mechanical (İncluding Electro-Mechanical) Traffic Signalling Equipment Of All Kinds
        87. Vehicles Other Than Railway or Tramway Rolling Stock, and Parts and Accessories Thereof
        88. Aircraft, Spacecraft, and Parts Thereof
        89. Ships, Boats and Floating Structures
        90. Optical, Photographic, Cinematographic, Measuring, Checking, Precision, Medical or Surgical İnstruments and Apparatus; Parts and Accessories Thereof
        91. Clocks and Watches and Parts Thereof
        92. Musical İnstruments; Parts and Accessories Of Such Articles
        93. Arms and Ammunition; Parts and Accessories Thereof
        94. Furniture; Bedding, Mattresses, Mattress Supports, Cushions and Similar Stuffed Furnishings; Lamps and Lighting Fittings, Not Elsewhere Specified or İncluded; İlluminated Sign İlluminated Nameplates and The Like; Prefabricated Buildings
        95. Toys, Games and Sports Requisites; Parts and Accessories Thereof
        96. Miscellaneous Manufactured Articles
        97. Works Of Art, Collectors' Pieces and Antiques
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
        1 Live Animals, Animal Products 
        2 Fresh Fruits and Vegetables & Other Vegetable Products
        3 Animal and Vegetable Fats & Oils, Prepared Edible Fats, Animal Or Vegetable Waxes
        4 Prepared Foodstuffs, Beverages, Spirits, Vinegar & Tobacco Products
        5 Mineral Products 
        6 Chemical Products
        7 Plastic and Rubber Products
        8 Leather, Handbags,Travel Goods, Saddlery, Harness, Raw Hides and Skins, Furskins & Animal Gut Products
        9 Wood & Wood Products, Wood Charcoal, Cork, Basketware, Wickerwork
        10 Paper & Paperboard Products, Wood Pulp, Paper Waste & Scrap
        11 Textile, Clothing & Home Textiles
        12 Footwear, Headgear, Artificial Flowers, Umbrellas, Walking Sticks, Seatsticks, Whips, Riding-Crops, Prepared Feathers, Human Hair Products
        13 Stone, Marble, Plaster, Cement, Asbestos, Mica Products,Ceramic Products, Glass & Glassware
        14 NJewelry, Precious Metals, Precious&Semiprecious Stones, Pearls, Imitation Jewelry, Coin
        15 Metals & Metal Products
        16 Machinery, Electronics, Electrical Equipment
        17 Vehicles, Aircraft, Vessels & Other Transport Equipment
        18 Antiques, Art Works, Collectors' Pieces
        19 Medical Instruments, Optical, Photographic, Cinematographic, Measuring, Checking, Precision Instruments, Clocks&Watches, Musical instruments
        20 Arms And Ammunition
        21 Furniture, Bedding, Mattresses, Cushions, Lamps and Lighting Fittings, İlluminated Signs, Prefabricated Buildings & Miscellaneous Products
        
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