import React from 'react';
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import { currencyFormatter } from '../../utils';
import SettingsOptions from './SettingsOptions';

/**
 * BudgetCard component
 * Displays a card with budget details and actions
 * @param {object} props - Component properties
 */
const BudgetCard = ({ defaultName, defaultBudget, expense, budget, gray, onAddExpenseClick, hiddenButton, onViewExpenseClick, setShowBudgetModal }) => {
  const classNames = [];
  const budgetAmount = defaultBudget || budget?.amount;

  if (expense > budgetAmount) {
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (gray) {
    classNames.push('bg-light');
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between fw-normal mb-3">
          {defaultName ? <div>{defaultName}</div> : <div>{budget.name}</div>}
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(expense)}
            {budgetAmount && (
              <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(budgetAmount)}</span>
            )}
          </div>
        </Card.Title>

        {budgetAmount && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(expense, budgetAmount)}
            min={0}
            max={budgetAmount}
            now={expense}
          />
        )}

        {!hiddenButton && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <SettingsOptions id={budget.id} setShowBudgetModal={setShowBudgetModal} budget={budget} />
            <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={() => onViewExpenseClick(budget)}>
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;

/**
 * Determines the variant of the progress bar based on the expense ratio.
 * @param {number} expense - The total expense amount
 * @param {number} budgetAmount - The budget amount
 * @returns {string} The variant of the progress bar
 */
const getProgressBarVariant = (expense, budgetAmount) => {
  const ratio = expense / budgetAmount;

  if (ratio < 0.5) return 'primary';
  if (ratio < 0.75) return 'warning';
  return 'danger';
};
