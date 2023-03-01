import { createContext, Dispatch } from 'react';
import { Action } from '../actions';

export const InserterDispatchContext = createContext<Dispatch<Action>>(() => ({}));
