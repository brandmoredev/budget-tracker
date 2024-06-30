import React from 'react'
import { useBudgets } from '../contexts/BudgetsContext'
import { Modal } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import { IconContext } from 'react-icons'

const ViewExpensesModal = ({ show, budget, handleClose }) => {
  const { expenses, deleteExpense } = useBudgets()

  const budgetExpenses = expenses.filter(expense => {
    return expense.budgetId === budget.id
})

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{budget.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { budgetExpenses.length === 0 ? <span>No expense record</span> :
          budgetExpenses.map(expense => {
            return (
              <div className='container' key={expense.id}>
                <div className='row'>
                  <p className='col-10 text-truncate'>{expense.description}</p>
                  <span className='col-1'>{expense.amount}</span>
                  <IconContext.Provider value={{ style: { cursor: 'pointer', color: 'gray'} }}>
                    <MdDeleteOutline className='col-1' onClick={() => deleteExpense({id: expense.id})}/>
                  </IconContext.Provider>
                </div>
              </div>
            )
          })
          }
        </Modal.Body>

    </Modal>
  )
}

export default ViewExpensesModal
