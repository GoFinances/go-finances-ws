export default interface ICreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome" | undefined;
  category_id: string;
  user_id: string;
  dt_reference:number;
}
