const productSchema = {
    name: {type:"string"},
    amount: {type:"integer"},
    currency: {type:"string"}
}

export const postProductSchema = {
    summary: "add a product",
    body: {
        //incoming request body
        type: "object",
        properties: productSchema,
        required: ["name", "amount", "currency"]
    },
    response:{
        201: {
            type: "object",
            properties: productSchema
        }
    }
}