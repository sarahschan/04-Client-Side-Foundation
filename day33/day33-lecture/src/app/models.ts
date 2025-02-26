export interface Order {
    products: Product[]
}

export interface Product {
    name: string,
    description: string,
    quantity: number
}