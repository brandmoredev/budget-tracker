import { createContext, useContext } from "react"
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"
import { defaultBudget, defaultExpenses } from "./defaultBudget";


const BudgetsContext = createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", defaultBudget)
  const [expenses, setExpenses] = useLocalStorage("expenses", defaultExpenses)

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter(expense =>  expense.budgetId === budgetId)
  }

  const addBudget = ({ name, amount }) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, amount }]
    })
  }

  const deleteBudget = ( { id }) => {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })

    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.budgetId !== id)
    })
  }

  const updateBudget = ({ id, name, amount }) => {
    setBudgets(prevBudgets => {
      return prevBudgets.map(budget => {
        if (budget.id === id) {
          return { ...budget, name, amount }; // Update the budget with the new values
        } else {
          return budget; // Keep other budgets unchanged
        }
      });
    });
  }

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId}]
    })

  }

  const deleteExpense = ({ id }) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }



  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetExpenses,
      addExpense,
      addBudget,
      updateBudget,
      deleteBudget,
      deleteExpense
    }}>
      { children }
    </BudgetsContext.Provider>
  )
}
