/**
 * Salary calculation utilities and data constants
 * Contains all the business logic for compensation calculations
 */

import type { Role, Level, Step, WorkArrangement, SalaryCalculation } from '../types/salary';

// Kenya salary benchmarks (KES per month)
export const KENYA_BENCHMARKS: Record<string, number> = {
  'engineer': 100000,
  'content-marketer': 80000,
  'virtual-assistant': 40000
};

// Available roles
export const ROLES: Role[] = [
  { id: 'engineer', name: 'Engineer', benchmark: KENYA_BENCHMARKS['engineer'] },
  { id: 'content-marketer', name: 'Content Marketer', benchmark: KENYA_BENCHMARKS['content-marketer'] },
  { id: 'virtual-assistant', name: 'Virtual Assistant', benchmark: KENYA_BENCHMARKS['virtual-assistant'] }
];

// Experience levels
export const LEVELS: Level[] = [
  { name: 'Junior (0.59)', value: 0.59 },
  { name: 'Intermediate (0.78)', value: 0.78 },
  { name: 'Senior (1)', value: 1.0 }
];

// Performance steps
export const STEPS: Step[] = [
  { name: 'Learning (0.85 - 0.94)', min: 0.85, max: 0.94 },
  { name: 'Established (0.95 - 1.04)', min: 0.95, max: 1.04 },
  { name: 'Thriving (1.05 - 1.1)', min: 1.05, max: 1.1 },
  { name: 'Expert (1.11 - 1.2)', min: 1.11, max: 1.2 }
];

// Work arrangements
export const WORK_ARRANGEMENTS: WorkArrangement[] = [
  { name: 'Full-time', value: 1.0 },
  { name: 'Part-time (80%)', value: 0.8 },
  { name: 'Part-time (60%)', value: 0.6 },
  { name: 'Part-time (50%)', value: 0.5 }
];

/**
 * Calculate salary range based on selected parameters
 */
export function calculateSalary(
  roleId: string,
  level: Level,
  step: Step,
  arrangement: WorkArrangement
): SalaryCalculation {
  const benchmark = KENYA_BENCHMARKS[roleId];

  if (!benchmark) {
    throw new Error(`No benchmark found for role: ${roleId}`);
  }

  const minSalary = Math.round(benchmark * level.value * step.min * arrangement.value);
  const maxSalary = Math.round(benchmark * level.value * step.max * arrangement.value);

  return {
    benchmark,
    levelMultiplier: level.value,
    stepRange: {
      min: step.min,
      max: step.max
    },
    arrangementMultiplier: arrangement.value,
    finalRange: {
      min: minSalary,
      max: maxSalary
    }
  };
}

/**
 * Get role by ID
 */
export function getRoleById(roleId: string): Role | undefined {
  return ROLES.find(role => role.id === roleId);
}

/**
 * Format currency for display (KES)
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString();
}

/**
 * Calculate salary for a specific role and level (used in comparison table)
 */
export function calculateSalaryForRoleAndLevel(roleId: string, levelMultiplier: number): number {
  const benchmark = KENYA_BENCHMARKS[roleId];
  if (!benchmark) return 0;

  return Math.round(benchmark * levelMultiplier);
}

/**
 * Get default selections for initial state
 */
export function getDefaultSelections() {
  return {
    role: 'engineer',
    level: LEVELS[0], // Junior
    step: STEPS[1], // Established
    arrangement: WORK_ARRANGEMENTS[0] // Full-time
  };
}
