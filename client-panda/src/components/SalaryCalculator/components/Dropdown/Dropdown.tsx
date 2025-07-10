import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DropdownProps } from '../../../../types/salary';
import styles from './Dropdown.module.css';

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
  showTooltip = false,
  isOpen,
  onToggle
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onToggle();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  const handleOptionSelect = (option: typeof selectedOption) => {
    onSelect(option);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.labelContainer}>
        <span className={styles.label}>{label}</span>
        {showTooltip && (
          <span className={styles.tooltip}>?</span>
        )}
      </div>

      <div className={styles.dropdownContainer}>
        <div
          className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{selectedOption.name}</span>
          <ChevronDown
            className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
          />
        </div>

        {isOpen && (
          <div className={styles.dropdown} role="listbox">
            {options.map((option, index) => {
              const isSelected = option.name === selectedOption.name;
              return (
                <div
                  key={option.id || index}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionSelect(option);
                    }
                  }}
                >
                  <span>{option.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
