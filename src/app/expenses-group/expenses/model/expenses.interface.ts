import { Entity } from "src/app/shared/model/entity.inteface";

export interface IExpenses extends Entity{
    expiry: Date;
    value: number;
    paid: boolean;
    expensesGroupId: number;
    recurrent: boolean,
    indeterminate: boolean,
    installments: number
  }