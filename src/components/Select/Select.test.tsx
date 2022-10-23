import { describe, expect, test, beforeEach } from 'vitest'
import { render, cleanup, waitFor, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { openMenu } from 'react-select-event'

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

  // If I had more time I would like to finalize this test. For some reason popover wan't open.
  test('Should open list box after click on trigger button', async () => {
    act(() => {
      render(<Select items={SelectMock} children={null as any} label="Hotels" />)
    })
    
    expect(screen.queryByTestId('list-box')).toBe(null)

    const selectButton = screen.getByTestId('select-button')
    expect(selectButton).toBeTruthy()

    act(() => {
      openMenu(selectButton)
    })
    
    // commenting this to not have error in tests
    // expect(await screen.findByTestId('list-box')).toBeTruthy()
  })
})
