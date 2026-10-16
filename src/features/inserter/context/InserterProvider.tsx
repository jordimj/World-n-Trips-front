import { ReactNode, useReducer } from 'react';
import reducer, { initialState } from '../reducer';
import { InserterContext } from './InserterContext';

interface InserterProviderProps {
  children: ReactNode;
  initialKind?: 'journal';
}

export function InserterProvider(props: InserterProviderProps) {
  const { children, initialKind } = props;
  const [state, dispatch] = useReducer(
    reducer,
    initialKind ? { ...initialState, dataKind: initialKind, activeStep: 1 } : initialState
  );

  return <InserterContext value={[state, dispatch]}>{children}</InserterContext>;
}
