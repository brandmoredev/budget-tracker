import { v4 as uuidV4 } from 'uuid'

const budgetId_1 = "budgetId_1";

export const defaultBudget = [
  {
    id: budgetId_1,
    name: "Sample Budget",
    amount: 1999
  }
]


export const defaultExpenses = [
  {
    id: uuidV4(),
    description: "Flight Ticket",
    amount: 400,
    budgetId: budgetId_1 
  }
]
