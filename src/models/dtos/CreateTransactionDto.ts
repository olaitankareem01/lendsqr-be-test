export default interface CreateTransactionDto {
    transactionRef: string,
    paymentRef: string,
    userId: number,
    summary: string,
    description:string
}