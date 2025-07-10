import React from 'react';
import type { SalaryCalculation } from '../../../../types/salary';
import { formatCurrency } from '../../../../lib/salaryCalculations';
import styles from './CalculatorDisplay.module.css';

interface CalculatorDisplayProps {
  calculation: SalaryCalculation;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ calculation }) => {
  const {
    benchmark,
    levelMultiplier,
    stepRange,
    arrangementMultiplier,
    finalRange
  } = calculation;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Salary calculator</h2>

      <div className={styles.calculationSteps}>
        <div className={styles.step}>
          <span className={styles.stepLabel}>Benchmark (Kenya)</span>
          <span className={styles.stepValue}>KES {formatCurrency(benchmark)}</span>
        </div>

        <div className={styles.step}>
          <span className={styles.stepLabel}>× Level modifier</span>
          <span className={styles.stepValue}>{levelMultiplier.toFixed(2)}</span>
        </div>

        <div className={styles.step}>
          <span className={styles.stepLabel}>× Step modifier</span>
          <span className={styles.stepValue}>
            {stepRange.min.toFixed(2)} - {stepRange.max.toFixed(2)}
          </span>
        </div>

        <div className={styles.step}>
          <span className={styles.stepLabel}>× Work arrangement</span>
          <span className={styles.stepValue}>{arrangementMultiplier.toFixed(2)}</span>
        </div>

        <div className={styles.finalResult}>
          <span className={styles.finalLabel}>Salary</span>
          <div className={styles.finalValue}>
            <div className={styles.salaryRange}>
              KES {formatCurrency(finalRange.min)} - KES {formatCurrency(finalRange.max)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
