/**
 * TypeScript interfaces for the Salary Calculator
 * Defines the data structures used throughout the compensation calculator
 */

export interface Role {
  id: string;
  name: string;
  benchmark: number; // KES per month
}

export interface Level {
  name: string;
  value: number; // multiplier (e.g., 0.59 for Junior)
}

export interface Step {
  name: string;
  min: number; // minimum multiplier
  max: number; // maximum multiplier
}

export interface WorkArrangement {
  name: string;
  value: number; // multiplier (1.0 = full-time, 0.8 = 80% part-time)
}

export interface SalaryCalculation {
  benchmark: number;
  levelMultiplier: number;
  stepRange: {
    min: number;
    max: number;
  };
  arrangementMultiplier: number;
  finalRange: {
    min: number;
    max: number;
  };
}

export interface SalaryCalculatorState {
  selectedRole: string;
  selectedLevel: Level;
  selectedStep: Step;
  selectedArrangement: WorkArrangement;
}

export interface DropdownOption {
  id?: string;
  name: string;
  value?: number;
  min?: number;
  max?: number;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  showTooltip?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}
