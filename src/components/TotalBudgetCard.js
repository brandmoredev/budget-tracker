import React from 'react'
import { useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard/BudgetCard';

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgets();
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0)
  const totalBudget = budgets.reduce((total, expense) => total + expense.amount, 0)

  if (totalBudget === 0) return null

  return <BudgetCard defaultName='Total' expense={totalExpense} defaultBudget={totalBudget} hiddenButton />
}

export default TotalBudgetCard
