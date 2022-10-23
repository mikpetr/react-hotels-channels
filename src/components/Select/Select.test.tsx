import { describe, expect, test, beforeEach } from 'vitest'
import { render, cleanup, waitFor, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { openMenu } from 'react-select-event'
import { Item } from 'react-stately'
import { Hotel } from '@/types'

import Select from './Select'
import SelectMock from './Select.mock'



beforeEach(() => {
  cleanup()
})

describe('Select component', () => {
  test('Should render component', async () => {
    act(() => {
      render(<Select items={SelectMock} children={null as any} label="Hotels" />)
    })

    expect(screen.queryByTestId('hotel-select')).toBeTruthy()
    expect(screen.queryByTestId('list-box')).toBe(null)
  })

  test('Should open list box after click on trigger button', async () => {
    act(() => {
      render(
        <Select items={SelectMock} label="Hotels">
          {((item: Hotel) => <Item key={item.value}>{item.label}</Item>) as any}
        </Select>
      )
    })
    
    expect(screen.queryByTestId('list-box')).toBe(null)

    const selectButton = screen.getByTestId('select-button')
    expect(selectButton).toBeTruthy()

    act(() => {
      openMenu(selectButton)
    })

    expect(await screen.findByTestId('list-box')).toBeTruthy()
  })
})
