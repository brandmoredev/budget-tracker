import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2'
import './SettingsOptions.css'
import { useBudgets } from '../../contexts/BudgetsContext'

const SettingsOptions = ({ id, setShowBudgetModal, budget}) => {
  const { deleteBudget } = useBudgets();

  return (
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true" className='customToggle' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        <IconContext.Provider value={{ style: { cursor: 'pointer', color: 'gray'} }}>
          <HiMiniEllipsisHorizontal />
        </IconContext.Provider>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => setShowBudgetModal({isOpen: true, mode: 'edit', currentBudget: budget })}>Edit</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => deleteBudget({ id })}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SettingsOptions
