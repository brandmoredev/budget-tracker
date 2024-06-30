import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

/**
 * BudgetModal component
 * Modal for adding or editing a budget
 * @param {object} props - Component properties
 */
const BudgetModal = ({ show, handleClose, mode, currentBudget }) => {
  const nameRef = useRef();
  const amountRef = useRef();
  const { addBudget, updateBudget } = useBudgets();

  /**
   * Handles form submission for adding or updating budgets
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formId = e.nativeEvent.submitter.id; // Get the id of the button that was clicked

    if (formId === 'addBudget') {
      addBudget({
        name: nameRef.current.value,
        amount: parseFloat(amountRef.current.value),
      });
    }

    if (formId === 'updateBudget') {
      updateBudget({
        id: currentBudget.id, // Make sure to include the id for update
        name: nameRef.current.value,
        amount: parseFloat(amountRef.current.value),
      });
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'edit' ? 'Edit Budget' : 'New Budget'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required ref={nameRef} defaultValue={currentBudget?.name} />
          </Form.Group>
          <Form.Group controlId="amount" className="mt-2">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control type="number" required min={0.1} step={0.01} ref={amountRef} defaultValue={currentBudget?.amount} />
          </Form.Group>
        </Modal.Body>
        <div className="d-flex justify-content-end">
          {mode === 'edit' ? (
            <Button id="updateBudget" variant="primary" type="submit" className="m-3">
              Update
            </Button>
          ) : (
            <Button id="addBudget" variant="primary" type="submit" className="m-3">
              Add
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default BudgetModal;
