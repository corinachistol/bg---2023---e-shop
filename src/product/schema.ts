const productSchema = {
    name: {type:"string"},
    priceAmount: {type:"integer"},
    priceCurrency: {type:"string"}
}

export const postProductSchema = {
    summary: "add a product",
    body: {
        //incoming request body
        type: "object",
        properties: productSchema,
        required: ["name", "priceAmount", "priceCurrency"]
    },
    response:{
        201: {
            type: "object",
            properties: productSchema
        }
    }
}