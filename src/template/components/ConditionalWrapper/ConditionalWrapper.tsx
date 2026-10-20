import { ReactNode } from 'react';

interface Props<T extends ReactNode> {
  condition: boolean;
  wrapper: (child: T) => ReactNode;
  children: T;
}

function ConditionalWrapper<T extends ReactNode>(props: Props<T>) {
  const { condition, wrapper, children } = props;
  return condition ? wrapper(children) : children;
}

export default ConditionalWrapper;
