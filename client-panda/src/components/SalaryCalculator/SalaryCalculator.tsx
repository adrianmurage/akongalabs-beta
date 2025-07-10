import React, { useState, useEffect } from 'react';
import type { Level, Step, WorkArrangement } from '../../types/salary';
import {
  ROLES,
  LEVELS,
  STEPS,
  WORK_ARRANGEMENTS,
  calculateSalary,
  getRoleById,
  getDefaultSelections
} from '../../lib/salaryCalculations';
import Dropdown from './components/Dropdown';
import CalculatorDisplay from './components/CalculatorDisplay';
import SalaryTable from './components/SalaryTable';
import InfoTooltip from './components/InfoTooltip';
import styles from './SalaryCalculator.module.css';

const SalaryCalculator: React.FC = () => {
  const defaults = getDefaultSelections();

  const [selectedRole, setSelectedRole] = useState(defaults.role);
  const [selectedLevel, setSelectedLevel] = useState<Level>(defaults.level);
  const [selectedStep, setSelectedStep] = useState<Step>(defaults.step);
  const [selectedArrangement, setSelectedArrangement] = useState<WorkArrangement>(defaults.arrangement);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Calculate salary whenever selections change
  const calculation = calculateSalary(selectedRole, selectedLevel, selectedStep, selectedArrangement);
  const currentRole = getRoleById(selectedRole);

  // Handle dropdown toggle
  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  // Handle role selection
  const handleRoleSelect = (option: any) => {
    setSelectedRole(option.id);
    setActiveDropdown(null);
  };

  // Handle level selection
  const handleLevelSelect = (option: any) => {
    setSelectedLevel(option);
    setActiveDropdown(null);
  };

  // Handle step selection
  const handleStepSelect = (option: any) => {
    setSelectedStep(option);
    setActiveDropdown(null);
  };

  // Handle arrangement selection
  const handleArrangementSelect = (option: any) => {
    setSelectedArrangement(option);
    setActiveDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Transform roles for dropdown
  const roleOptions = ROLES.map(role => ({
    id: role.id,
    name: role.name
  }));

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Salary</h1>

          <p className={styles.description}>
            We have a set system for compensation as part of being transparent.
            Salary varies based on location and level of experience.
          </p>

          <a href="#" className={styles.learnMoreLink}>
            Learn more about compensation
          </a>

          <div className={styles.form}>
            {/* Role Selector */}
            <div data-dropdown>
              <Dropdown
                label="Role"
                options={roleOptions}
                selectedOption={{ name: currentRole?.name || 'Unknown Role' }}
                onSelect={handleRoleSelect}
                isOpen={activeDropdown === 'role'}
                onToggle={() => toggleDropdown('role')}
              />
            </div>

            {/* Level Selector */}
            <div data-dropdown>
              <div className={styles.labelWithTooltip}>
                <span className={styles.label}>Level</span>
                <InfoTooltip content="Experience level affects your base salary multiplier" />
              </div>
              <Dropdown
                label=""
                options={LEVELS}
                selectedOption={selectedLevel}
                onSelect={handleLevelSelect}
                isOpen={activeDropdown === 'level'}
                onToggle={() => toggleDropdown('level')}
              />
            </div>

            {/* Step Selector */}
            <div data-dropdown>
              <div className={styles.labelWithTooltip}>
                <span className={styles.label}>Step</span>
                <InfoTooltip content="Performance step determines your position within the salary band" />
              </div>
              <Dropdown
                label=""
                options={STEPS}
                selectedOption={selectedStep}
                onSelect={handleStepSelect}
                isOpen={activeDropdown === 'step'}
                onToggle={() => toggleDropdown('step')}
              />
            </div>

            {/* Work Arrangement Selector */}
            <div data-dropdown>
              <div className={styles.labelWithTooltip}>
                <span className={styles.label}>Work Arrangement</span>
                <InfoTooltip content="Full-time or part-time work arrangement affects your total compensation" />
              </div>
              <Dropdown
                label=""
                options={WORK_ARRANGEMENTS}
                selectedOption={selectedArrangement}
                onSelect={handleArrangementSelect}
                isOpen={activeDropdown === 'arrangement'}
                onToggle={() => toggleDropdown('arrangement')}
              />
            </div>
          </div>

          {/* Calculator Results */}
          <CalculatorDisplay calculation={calculation} />

          {/* Salary Comparison Table */}
          <SalaryTable />
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
