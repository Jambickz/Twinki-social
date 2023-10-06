import { useState } from 'react'
import './MultiDropDown.scss'

export const MultiDropDown = ({ disabled, onChange, options, value, pluralizeOptions }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownMenuStyle = {
    height: isOpen && !disabled ? getDropdownMenuHeight(50, options.length) : 0,
    border: 'none'
  }

  const keySet = new Set(value.map((val) => val.key))

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleOptionClick = (option) => () => {
    const newValue = keySet.has(option.key)
      ? value.filter((v) => !keySet.has(v.key))
      : [...value, option]
    onChange(newValue)
  }

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false)
          }
        }}
        className={'multi-dropdown'}
      >
        <button
          className={`dropdown_toggle ${isOpen ? 'focused' : ''}`}
          id="multiDropdownMenuButton"
          type="button"
          disabled={disabled}
          onClick={handleDropdownClick}
        >
          {pluralizeOptions(value)}
        </button>
        <ul
          style={dropdownMenuStyle}
          className={'dropdown_menu'}
          role={'menuitem'}
          aria-expanded="false"
          aria-labelledby="multiDropdownMenuButton"
        >
          {options.map((option) => (
            <li
              key={option.key}
              onClick={handleOptionClick(option)}
              className={`dropdown_menu_item ${keySet.has(option.key) ? 'dropdown_menu_item__active' : ''}`} 
            >
              {option.value}
            </li>
          ))}
        </ul>
        {isOpen && (
          <div className={'backdrop'} onClick={() => setIsOpen(false)} />
        )}
      </div>
    </>
  )
}

const getDropdownMenuHeight = (optionHeight, optionLength) =>
  optionHeight * optionLength - 9
