import { ReactNode, useReducer } from 'react';
import reducer, { initialState } from '../reducer';
import { InserterContext } from './InserterContext';

interface InserterProviderProps {
  children: ReactNode;
}

export function InserterProvider(props: InserterProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InserterContext.Provider value={[state, dispatch]}>
      {children}
    </InserterContext.Provider>
  );
}
