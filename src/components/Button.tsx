import { AriaButtonProps, useButton } from 'react-aria'
import { useRef, RefObject } from 'react'

interface ButtonProps extends AriaButtonProps {
  buttonRef?: RefObject<HTMLButtonElement>
  className?: string | undefined,
}

export default function Button(props: ButtonProps) {
  const ref: RefObject<HTMLButtonElement> = props.buttonRef || useRef() as RefObject<HTMLButtonElement>

  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button {...buttonProps} className={props.className} ref={ref}>
      {children}
    </button>
  )
}
