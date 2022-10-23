import { ToggleProps, ToggleState, useToggleState } from 'react-stately'
import { FocusRingAria, SwitchAria, useFocusRing, useSwitch } from 'react-aria'
import { useRef, RefObject } from 'react'

interface SwitchProps extends ToggleProps {
  className?: string
}

export function Switch(props: SwitchProps) {
  const state: ToggleState = useToggleState(props)
  const ref: RefObject<HTMLInputElement> = useRef() as RefObject<HTMLInputElement>
  
  const { inputProps }: SwitchAria = useSwitch(props, state, ref)
  const { focusProps }: FocusRingAria = useFocusRing()

  return (
    <label
      style={{
        opacity: props.isDisabled ? 0.4 : 1,
      }}
      className={`flex relative items-center cursor-pointer ${props.className}`}
      data-testid="switch"
    >
      <input {...inputProps} {...focusProps} ref={ref} className="sr-only peer" /> 
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      {props.children}
    </label>
  );
}
