// Purchase Order Model
export interface PurchaseOrder {
    name: string
    address: string
    email: string
    deliveryDate: string
    availability: string[]
    urgent: boolean
}