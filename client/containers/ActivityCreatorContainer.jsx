/**
 * ************************************
 *
 * @module  ActivityCreatorContainer.jsx
 * @author  Plan It Travel
 * @date    9-4-23
 * @description stateful component that renders Activity Creator component
 *
 * ************************************
 */

import React from 'react';
import ActivityCreator from '../components/ActivityCreator';

const ActivityCreatorContainer = () => {
  return (
    <div className='innerbox'>
      <ActivityCreator />
    </div>
  );
};

export default ActivityCreatorContainer;