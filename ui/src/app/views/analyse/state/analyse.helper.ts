import * as _ from 'lodash'

export function createTabularItemData(pData) {
    let lastveritcePoint: any;
    let sameRowText: any[] = [];
    let productArray: any[] = [];
    let finalProductArray: any[] = [];
    let finalRow: any[] = [];
    let text: string = "";
    let itemIndex: any;
    let priceIndex: any;
    let quantityIndex: any;
    let pullFlag: boolean = false;
    pData.forEach(analysedElements => {
        analysedElements['used'] = false;
    })
    lastveritcePoint = pData[0].boundingPoly.vertices[0].y;
    pData.forEach((data) => {
        if(data.locale == undefined && !data['used']) {
            lastveritcePoint = data.boundingPoly.vertices[0].y;
            pData.forEach(insideLoopData => {
                if(insideLoopData.locale == undefined) {
                    if(insideLoopData.boundingPoly.vertices[0].y > lastveritcePoint-15 && insideLoopData.boundingPoly.vertices[0].y < lastveritcePoint+15) {
                        insideLoopData['used'] = true;
                        sameRowText.push(insideLoopData);
                        if(insideLoopData.description.toLowerCase().indexOf('item') != -1 || insideLoopData.description.toLowerCase().indexOf('quantity') != -1 || insideLoopData.description.toLowerCase().indexOf('price') != -1 || insideLoopData.description.toLowerCase().indexOf('amount') != -1) {
                            pullFlag = true;
                        }
                        if(insideLoopData.description.toLowerCase().indexOf('bill') != -1|| insideLoopData.description.toLowerCase().indexOf('subtotal') != -1 || insideLoopData.description.toLowerCase().indexOf('paid') != -1 || insideLoopData.description.toLowerCase().indexOf('takeaway') != -1 || insideLoopData.description.toLowerCase().indexOf('delivery') != -1 || insideLoopData.description.toLowerCase().indexOf('del ') != -1) {
                            pullFlag = false;
                        }
                    }
                }
            });
            if(sameRowText.length > 1) {
                sameRowText.sort(function(a, b){
                        return a.boundingPoly.vertices[0].x-b.boundingPoly.vertices[0].x;
                })
            }
            if(pullFlag) {
                productArray.push(_.cloneDeep(sameRowText));
            }
            sameRowText.forEach(singleton => {
                finalRow.push(singleton);
            });
            sameRowText = [];
        }
    });
    productArray.forEach((product, index) => {
        let productData: any = {
            itemName: "",
            quantity: 0,
            price: 0
        };
        if(index == 0) {
            product.forEach(productHeader => {
                if(productHeader.description.toLowerCase().indexOf('item') !== -1 || productHeader.description.toLowerCase().indexOf('name') !== -1) {
                    itemIndex = productHeader.boundingPoly.vertices[0].x;
                }
                if(productHeader.description.toLowerCase().indexOf('qty') !== -1 || productHeader.description.toLowerCase().indexOf('qty') !== -1) {
                    quantityIndex = productHeader.boundingPoly.vertices[0].x;
                }
                if(productHeader.description.toLowerCase().indexOf('price') !== -1 || productHeader.description.toLowerCase().indexOf('rate') !== -1) {
                    priceIndex = productHeader.boundingPoly.vertices[0].x;
                }
            })
        }
        if(index != 0) {
            let stopAddingfString: boolean = false;
            let itemCountRecieved: boolean = false;
            let itemPriceReceived: boolean = false;
            let itemCount: any;
            product.forEach(productDetail => {
                if(!isNaN(productDetail.description)) {
                    stopAddingfString = true;
                    if(itemCountRecieved && !itemPriceReceived) {
                        productData.price = productDetail.description;
                        itemPriceReceived = true;
                    }
                    if(!itemCountRecieved) {
                        itemCount = productDetail.description;
                        productData.quantity = productDetail.description ;
                        itemCountRecieved = true;
                    }
                } else {
                    if(!stopAddingfString ) {
                        productData.itemName += productDetail.description + " ";
                    }
                }
            });
            finalProductArray.push(productData);
        }
    });
    return finalProductArray;
}

export function extractBillHeaderData(pData) {
    let topText: string = "";
    let topTextArray: any[] = [];
    for (var i = 0; i < pData.length; i++) {
        if(pData.charAt(i) !== '\n') {
            topText += pData.charAt(i)
        } else {
            topTextArray.push(topText);
            topText = "";
        }
    }
    return topTextArray;
}

export function assignExtractedHeaderDetails(pData) {
    let finalData: any = {};
    finalData.address = "";
    pData.forEach(analysedHeaderData => {
        if(analysedHeaderData.toLowerCase().indexOf('pvt ltd') !== -1 || analysedHeaderData.indexOf('foods') !== -1 || analysedHeaderData.toLowerCase().indexOf('hotel') !== -1) {
            finalData.establishment = analysedHeaderData;
        }
        if(analysedHeaderData.toLowerCase().indexOf('phone') !== -1 || analysedHeaderData.toLowerCase().indexOf('ph no') !== -1 || analysedHeaderData.toLowerCase().indexOf('tel no') !== -1 || analysedHeaderData.toLowerCase().indexOf('telephone') !== -1 || analysedHeaderData.toLowerCase().indexOf('ph') !== -1) {
            finalData.contact = analysedHeaderData;
        }
        if(analysedHeaderData.toLowerCase().indexOf('tin:') !== -1 || analysedHeaderData.toLowerCase().indexOf('in no') !== -1) {
            finalData.tin = analysedHeaderData;
        }
        if(analysedHeaderData.toLowerCase().indexOf('feet') !== -1 || analysedHeaderData.toLowerCase().indexOf('road') !== -1 || analysedHeaderData.toLowerCase().indexOf('bangalore') !== -1 || analysedHeaderData.toLowerCase().indexOf('bengaluru') !== -1 || analysedHeaderData.toLowerCase().indexOf('karnataka') !== -1 || analysedHeaderData.toLowerCase().indexOf('street') !== -1) {
            if(finalData.address !== "") {
                finalData.address += ','
            }
            finalData.address += analysedHeaderData;
        }
        let splitData = analysedHeaderData.split(" ");
        if(splitData.length > 2) {
            let count = 0;
            splitData.forEach(character => {
                var letterNumber = /\d/g;
                if(character.match(letterNumber)) {
                    count++;
                }
            });
        }
    });
    if(finalData.establishment == undefined && pData[0] != "")  {
        finalData.establishment = pData[0];
    }
    return finalData;
}

export function buildAddStoreData(pData) {
    return {
        "storeName": pData.establishment,
        "storeAddress": pData.address,
        "gstin": pData.tin,
        "phoneNumber": pData.contact
    }
}

export function buildAddProductData(pData) {
        let productData = {
            "storeId": pData.id,
            "guessedName": pData.productDetails.itemName,
            "correctedName": pData.productDetails.itemName,
            "perUnitPrice": pData.productDetails.price,
            "categoryId": 1,
            "quantityTypeId": 1

        };
    return productData;
}

export function buildSavedToBeData(pHeaderData, pProductData) {
    return {
        storeDetails: pHeaderData,
        productDetails: pProductData
    }
}