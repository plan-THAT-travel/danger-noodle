/**
 * ************************************
 *
 * @module  ActivityDisplayContainer.jsx
 * @author  Plan It Travel
 * @date 9-4-23
 * @description presentation component that renders the Activity Display Component
 *
 * ************************************
 */

import React from 'react';
import ActivityDisplay from '../components/ActivityDisplay';

const ActivityDisplayContainer = () => {
  return (
    <div className='innerbox'>
      <ActivityDisplay />
    </div>
  );
};

export default ActivityDisplayContainer;