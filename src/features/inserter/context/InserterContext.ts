import { createContext, Dispatch } from 'react';
import { Action } from '../actions';
import { InserterState } from '../reducer';

export const InserterContext = createContext<
  [InserterState, Dispatch<Action>] | undefined
>(undefined);
