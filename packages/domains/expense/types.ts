export interface Expense {
    id?: string
    user_id?: string
    merchant_name: string
    amount_in_cents?: number
    amount_in_dkk?: number
    currency: string
    date_created: Date
    status: string
}
