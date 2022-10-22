import { useSelectState, SelectState } from 'react-stately'
import {
  HiddenSelect,
  useSelect,
  OverlayContainer,
  AriaSelectOptions,
  SelectAria,
  useOverlayPosition,
  useOverlayTrigger,
  OverlayProvider,
  OverlayTriggerAria,
  PositionAria
} from 'react-aria'
import { useRef, RefObject } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// Reuse the ListBox, Popover, and Button from your component library. See below for details.
import Button from './Button'
import ListBox from './ListBox'
import { Popover } from './Popover'

interface SelectProps extends AriaSelectOptions<object> {
  value: {
    value: string | number
  } | undefined,
  onChange: Function,
  className: string | undefined,
}

export default function Select(props: SelectProps) {
  // Create state based on the incoming props
  const state: SelectState<object> = useSelectState({
    ...props,
    selectedKey: props?.value?.value.toString(),
    onSelectionChange: (key) => {
      props.onChange(state.collection.getItem(key).value)
    }
  })

  // Get props for child elements from useSelect
  const buttonRef: RefObject<HTMLButtonElement> = useRef() as RefObject<HTMLButtonElement>
  const overlayRef: RefObject<HTMLDivElement> = useRef() as RefObject<HTMLDivElement>

  const {
    labelProps,
    valueProps,
    menuProps,
  }: SelectAria<object> = useSelect(props, state, buttonRef)

  const { overlayProps, triggerProps }: OverlayTriggerAria = useOverlayTrigger(
    { type: 'dialog' },
    state,
    buttonRef
  )

  const { overlayProps: positionProps }: PositionAria = useOverlayPosition({
    targetRef: buttonRef,
    overlayRef,
    placement: 'bottom left',
    offset: 5,
    isOpen: state.isOpen
  })

  return (
    <div>
      <OverlayProvider>
        <div {...labelProps} className="text-base">{props.label}</div>
        <HiddenSelect
          state={state}
          triggerRef={buttonRef}
          label={props.label}
          name={props.name}
        />
        <Button
          {...triggerProps}
          buttonRef={buttonRef}
          className="inline-flex w-full justify-between rounded-md border border-gray-300 dark:border-slate-500/30 bg-white dark:bg-slate-800 px-3 py-2 text-base font-medium text-gray-700 dark:text-slate-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:ring-blue-800"
        >
          <span {...valueProps}>
            {state.selectedItem
              ? state.selectedItem.rendered
              : 'Select an option'}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
        {state.isOpen &&
          (
            <OverlayContainer>
              <Popover {...overlayProps} {...positionProps} isOpen={state.isOpen} onClose={state.close} ref={overlayRef} >
                <ListBox
                  {...menuProps}
                  selectionMode="single"
                  state={state}
                />
              </Popover>
            </OverlayContainer>
          )}
      </OverlayProvider>
    </div>
  )
}
