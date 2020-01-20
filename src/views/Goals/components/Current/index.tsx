import React from 'react';

import GoalCard from '../GoalCard';

export type CurrentProps = {};
export const Current: React.FC<CurrentProps> = ({}) => {
  console.log({});
  return (
    <div>
      <GoalCard />
    </div>
  );
};

export default Current;
