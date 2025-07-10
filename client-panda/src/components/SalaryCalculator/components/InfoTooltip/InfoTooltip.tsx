import React, { useState } from 'react';
import styles from './InfoTooltip.module.css';

interface InfoTooltipProps {
  content?: string;
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content = "Additional information",
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <span
        className={styles.trigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="button"
        aria-label="More information"
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        ?
      </span>

      {isVisible && (
        <div
          className={styles.tooltip}
          id="tooltip-content"
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
