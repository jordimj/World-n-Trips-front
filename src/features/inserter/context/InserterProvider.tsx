import { ReactNode, useContext, useReducer } from 'react';
import reducer, { initialState } from '../reducer';
import { InserterContext } from './InserterContext';
import { InserterDispatchContext } from './InserterDispatchContext';

interface InserterProviderProps {
  children: ReactNode;
}

export function InserterProvider(props: InserterProviderProps) {
  const { children } = props;
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
