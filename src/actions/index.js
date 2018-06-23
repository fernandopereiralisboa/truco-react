import { createAction } from 'redux-actions';

export const UPDATE_PLAYED_TIME = 'UPDATE_PLAYED_TIME';
export const UNLOCK_REGION = 'UNLOCK_REGION';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const UPDATE_STRESS_LEVEL = 'UPDATE_STRESS_LEVEL';
export const UPDATE_LAST_ACCESS = 'UPDATE_LAST_ACCESS';

export const updatePlayedTime = createAction(UPDATE_PLAYED_TIME);
export const updateStressLevel = createAction(UPDATE_STRESS_LEVEL);
export const updateLastAccess = createAction(UPDATE_LAST_ACCESS);
export const updateGoal = createAction(UPDATE_GOAL);
