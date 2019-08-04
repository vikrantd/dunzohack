export function parseRequestObject(pData) {
    pData['parent-type'] = pData.parentType;
    delete pData.parentType;
    return pData;
}

export function segregateCategoryAndProducts(pData, pCategoryData) {
    let result = { flag:  false , position: -1};
    pCategoryData.forEach((data, index) => {
        if(data.name == pData.category) {
            result = { flag: true, position: index};
            return result;
        }
    });
    return result;
}

export function buildData(pData) {
    let result = {
        name: pData.category,
        products: [
            {
                productId: pData.productId,
                storeId: pData.storeId,
                perUnitPrice: pData.perUnitPrice,
                guessedName: pData.guessedName,
                correctedName: pData.correctedName
            }
            
        ]
    };
    return result;
}