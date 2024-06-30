import { Button, Container, Stack } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import BudgetCard from './components/BudgetCard/BudgetCard';
import BudgetModal from './components/BudgetModal';
import { useEffect, useState } from 'react';
import { useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';

/**
 * Main App component
 * Manages state and renders the budget app
 */
function App() {
  // State for controlling the modals
  const [showBudgetModal, setShowBudgetModal] = useState({ isOpen: false, mode: null, currentBudget: null });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
  const [viewExpensesModalBudget, setShowViewExpensesModalBudget] = useState(false);
  
  // Show landing page when budgets is empty
  const[showLandingPage, setShowLandingPage] = useState(false)

  // Get budgets and their expenses from the context
  const { budgets, getBudgetExpenses } = useBudgets();

  // Open the Add Expense modal for a specific budget
  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  // Open the View Expenses modal for a specific budget
  const openViewExpensesModal = (budget) => {
    setShowViewExpensesModal(true);
    setShowViewExpensesModalBudget(budget);
  };

  useEffect(() => {
    if (budgets?.length <= 0) setShowLandingPage(true)
    else setShowLandingPage(false)
  }, [budgets])

  return (
    <div className="App">
      {showLandingPage ?
        <div className="landing-page vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>Welcome to Budget App</h1>
          <p>Track your expenses and manage your budgets efficiently.</p>
          <Button variant="primary" onClick={() => setShowLandingPage(false)}>Get Started</Button>
        </div> :

        <Container>
          <Stack direction="horizontal" gap="2" className="my-4">
            <h1 className="me-auto">Budget App</h1>
            <Button variant="primary" onClick={() => setShowBudgetModal({ isOpen: true, mode: null })}>
              Add Budget
            </Button>
            <Button variant="outline-primary" onClick={() => setShowAddExpenseModal(true)}>
              Add Expense
            </Button>
          </Stack>
        </Container>
      }

      <div className="container text-center">
        <div className="row">
          <div className="col col-md-6 col-lg-4 mb-4">
            <TotalBudgetCard />
          </div>
          <div
            className="col col-md-6 col-lg-8"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr)',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            {budgets.map((budget) => {
              const budgetExpenses = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );

              return (
                <BudgetCard
                  key={budget.id}
                  expense={budgetExpenses}
                  budget={budget}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpenseClick={() => openViewExpensesModal(budget)}
                  setShowBudgetModal={setShowBudgetModal}
                />
              );
            })}
          </div>
        </div>
      </div>

      <BudgetModal
        show={showBudgetModal.isOpen}
        handleClose={() => setShowBudgetModal({ isOpen: false })}
        mode={showBudgetModal.mode}
        currentBudget={showBudgetModal.currentBudget}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />

      <ViewExpensesModal
        show={showViewExpensesModal}
        handleClose={() => setShowViewExpensesModal(false)}
        budget={viewExpensesModalBudget}
      />
    </div>
  );
}

export default App;
