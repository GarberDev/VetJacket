import { Tooltip } from '@mui/material';
import { classNames } from '@src/helpers/helper';
import React from 'react';

interface ComponentWithBadgeProps {
  component: React.ReactNode;
  badgeClass?: string;
  badgeEnabled?: boolean;
  badgeContent?: string;
}

const ComponentWithBadge = ({
  component,
  badgeEnabled = true,
  badgeClass = '',
  badgeContent = '',
}: ComponentWithBadgeProps) => (
  <div className="relative">
    {component}
    {badgeEnabled && (
      <span
        className={classNames(
          `absolute top-0 right-0 bg-blue-200 inline-block w-4 h-4 text-black text-xs rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2`,
          badgeClass,
        )}
      >
        {badgeContent}
      </span>
    )}
  </div>
);

export default ComponentWithBadge;
