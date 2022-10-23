import { describe, expect, test, beforeEach } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { store } from '@/store'
import { Provider } from 'react-redux'
import dbOrm from '@/dbOrm'

import Home from './Home'

beforeEach(() => {
  cleanup()
})

describe('Home component', async () => {
  await dbOrm.initData()

  test('Should render page', async () => {
    act(() => {
      render(<Provider store={store}><Home /></Provider>)
    })

    expect(screen.queryByTestId('home-page')).toBeTruthy()
    expect(screen.queryByText('Channel manager')).toBeTruthy()
    expect(await screen.findByTestId('hotel-select')).toBeTruthy()
    expect(screen.queryByTestId('channels-list')).toBeTruthy()
  })
})
