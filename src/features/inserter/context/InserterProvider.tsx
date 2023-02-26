import { createContext, ReactNode, useContext, useReducer } from 'react';
import reducer, { initialState } from '../reducer';
import { InserterContext } from './InserterContext';
import { InserterDispatchContext } from './InserterDispatchContext';

export function InserterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InserterContext.Provider value={state}>
      <InserterDispatchContext.Provider value={dispatch}>
        {children}
      </InserterDispatchContext.Provider>
    </InserterContext.Provider>
  );
}

export function useInserterState() {
  return useContext(InserterContext);
}

export function useInserterDispatch() {
  return useContext(InserterDispatchContext);
}
