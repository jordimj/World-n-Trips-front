import { ReactNode } from 'react';

interface Props {
  condition: boolean;
  wrapper: (child: ReactNode) => ReactNode;
  children: ReactNode;
}

function ConditionalWrapper(props: Props) {
  const { condition, wrapper, children } = props;
  return condition ? wrapper(children) : children;
}

export default ConditionalWrapper;
