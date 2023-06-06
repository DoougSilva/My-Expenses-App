import { Entity } from "src/app/shared/model/entity.inteface";
import { IExpensesGroup } from "../../model/expenses-group.interface";

export interface IExpenses extends Entity{
    expiry: Date;
    value: number;
    paid: boolean;
    expensesGroupId: number;
    recurrent: boolean,
    indeterminate: boolean,
    installments: number
  }