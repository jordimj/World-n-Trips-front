import { createContext, Dispatch } from 'react';
import { Action } from '../reducer';

export const InserterDispatchContext = createContext<Dispatch<Action>>(() => ({}));
