interface Props {
  condition: boolean;
  wrapper: (child: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

function ConditionalWrapper(props: Props) {
  const { condition, wrapper, children } = props;
  return condition ? wrapper(children) : children;
}

export default ConditionalWrapper;
