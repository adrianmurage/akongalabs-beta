import React from 'react';
import { ROLES, LEVELS, formatCurrency, calculateSalaryForRoleAndLevel } from '../../../../lib/salaryCalculations';
import styles from './SalaryTable.module.css';

const SalaryTable: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Salary Ranges (Monthly KES)</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Role</th>
              <th className={styles.headerCellRight}>
                Base
              </th>
              <th className={styles.headerCellRight}>
                Junior
                <br />
                <span className={styles.multiplier}>(×0.59)</span>
              </th>
              <th className={styles.headerCellRight}>
                Intermediate
                <br />
                <span className={styles.multiplier}>(×0.78)</span>
              </th>
              <th className={styles.headerCellRight}>
                Senior
                <br />
                <span className={styles.multiplier}>(×1.0)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map((role) => (
              <tr key={role.id} className={styles.bodyRow}>
                <td className={styles.roleCell}>{role.name}</td>
                <td className={styles.salaryCell}>
                  {formatCurrency(role.benchmark)}
                </td>
                <td className={styles.salaryCell}>
                  {formatCurrency(calculateSalaryForRoleAndLevel(role.id, LEVELS[0].value))}
                </td>
                <td className={styles.salaryCell}>
                  {formatCurrency(calculateSalaryForRoleAndLevel(role.id, LEVELS[1].value))}
                </td>
                <td className={styles.salaryCell}>
                  {formatCurrency(calculateSalaryForRoleAndLevel(role.id, LEVELS[2].value))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footnote}>
        <p className={styles.footnoteText}>
          * These are mid-point values. Actual salary ranges from -5% to +4% based on performance step (Learning to Expert).
        </p>
        <p className={styles.footnoteText}>
          * Part-time salaries are pro-rated based on percentage of full-time hours worked.
        </p>
      </div>
    </div>
  );
};

export default SalaryTable;
