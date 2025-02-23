
// PurchaseOrder model
export interface PurchaseOrder {
    name: string
    address: string
    email: string
    deliveryDate: string
    urgent: boolean
    am: boolean
    pm: boolean
    ev: boolean
    lineItems: LineItem[]
}


// LineItem model
export interface LineItem {
    item: string
    unitPrice: number
    quantity: number
}