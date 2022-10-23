import { ListState } from 'react-stately'
import { AriaOptionProps, FocusRingAria, mergeProps, OptionAria, useFocusRing, useOption } from 'react-aria'
import { useRef, RefObject } from 'react'

interface OptionProps extends AriaOptionProps {
  item: any,
  state: ListState<object>
}

export default function Option({ item, state }: OptionProps) {
  // Get props for the option element
  const ref: RefObject<HTMLLIElement> = useRef() as RefObject<HTMLLIElement>
  const { optionProps, isSelected, isDisabled }: OptionAria = useOption(
    { key: item.key },
    state,
    ref
  )

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps }: FocusRingAria = useFocusRing()

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        outline: isFocusVisible ? '2px solid orange' : 'none'
      }}
      className={`${isSelected ? 'text-white bg-indigo-600 dark:bg-slate-800 dark:text-white' : 'text-gray-900'} relative cursor-default select-none py-2 pl-3 pr-9 w-72 dark:text-slate-400`}
      data-testid="select-option"
    >
      {item.rendered}
    </li>
  )
}
