import { ListState } from 'react-stately'
import { AriaListBoxOptions, ListBoxAria, useListBox } from 'react-aria'
import { useRef, MutableRefObject } from 'react'
import Option from './Option'

interface ListBoxProps extends AriaListBoxOptions<object> {
  state: ListState<object>
}

export default function ListBox(props: ListBoxProps) {
  // Create state based on the incoming props
  const state: ListState<object> = props.state

  // Get props for the listbox element
  const ref: MutableRefObject<HTMLUListElement> = useRef() as MutableRefObject<HTMLUListElement>
  const { listBoxProps, labelProps }: ListBoxAria = useListBox(props as AriaListBoxOptions<object>, state, ref)

  return (
    <div data-testid="list-box">
      <div {...labelProps}>{props.label}</div>
      <ul
        {...listBoxProps}
        ref={ref}
        className="rounded-md w-full bg-white dark:bg-slate-700 box-border text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm padding-1"
      >
        {[...state.collection].map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </ul>
    </div>
  )
}
