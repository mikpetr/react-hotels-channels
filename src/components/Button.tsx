import { AriaButtonProps, ButtonAria, useButton } from 'react-aria'
import { useRef, RefObject, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends AriaButtonProps {
  buttonRef?: RefObject<HTMLButtonElement>
  className?: string | undefined
}

export default function Button(props: ButtonProps) {
  const ref: RefObject<HTMLButtonElement> = props.buttonRef || useRef() as RefObject<HTMLButtonElement>

  const { buttonProps }: ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>> = useButton(props, ref)
  const { children }: ButtonProps = props

  return (
    <button {...buttonProps} className={props.className} ref={ref}>
      {children}
    </button>
  )
}
