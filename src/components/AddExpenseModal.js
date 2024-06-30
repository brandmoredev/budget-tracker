import React, { useRef } from 'react'
import { useBudgets } from '../contexts/BudgetsContext'
import { Button, Form, Modal } from 'react-bootstrap'

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { budgets, addExpense } = useBudgets()

  const handleSubmit = (e) => {
    e.preventDefault()

    addExpense(
    {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value
    })

    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' required ref={descriptionRef}/>
          </Form.Group>
          <Form.Group controlId='amount'>
            <Form.Label>Expense Amount</Form.Label>
            <Form.Control type='number' required min={0.1} step={0.01} ref={amountRef}/>
          </Form.Group>
          <Form.Group controlId='budgetName'>
            <Form.Label>Budget Category</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              {budgets.map(budget => {
                return <option key={budget.id} value={budget.id}>{budget.name}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <div className='d-flex justify-content-end'>
          <Button variant='primary' type='submit' className='m-3'>Add</Button>
        </div>
      </Form>

    </Modal>
  )
}

export default AddExpenseModal
