interface Product{
    id?: string;
    name: string;
    category: string;
    imageLink: string;
    descLink: string;
    price: number;
    index: number;
    unit: number;
    status: "Available" | "Processing" | "Shipping" | "Sold" | undefined
}

export interface IReduxStore{
    product: Product,
    products: Product[],
    order:{
        productId: string;
        seller: string;
        buyer: string;
        escrow: string;
        product?: Product
    },

    owner: string;
    
}