import { describe, expect, test, beforeEach } from 'vitest'
import { render, cleanup, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import fireEvent from '@testing-library/user-event'

import { store } from '@/store'
import { setChannels } from '@/store/channelsSlice'
import { Provider } from 'react-redux'

import ChannelsList from './ChannelsList'
import ChannelsListMock from './ChannelsList.mock'

beforeEach(() => {
  cleanup()
})

describe('ChannelsList component', async () => {
  test('Should render list', async () => {
    const {
      queryByTestId,
      queryByText,
      queryAllByTestId
    } = render(<Provider store={store}><ChannelsList hotelId={2} /></Provider>)

    expect(queryByTestId('channels-list')).toBeTruthy()
    expect(queryByText('Channel')).toBeTruthy()
    expect(queryByText('Visibility')).toBeTruthy()

    act(() => {
      store.dispatch(setChannels(ChannelsListMock))
    })

    const rows = queryAllByTestId('channels-row')
    expect(rows).toBeTruthy()
    expect(rows.length).toBe(2)
  })

  test('Should update store when toggle turned on', async () => {
    const { queryAllByTestId } = render(<Provider store={store}><ChannelsList hotelId={2} /></Provider>)

    expect(store.getState().hotelsChannels.value[2]).not.toBeTruthy()

    const switches = queryAllByTestId('switch')

    expect(switches.length).toBe(2)

    await fireEvent.click(switches[1])  

    waitFor(() => {
      expect(store.getState().hotelsChannels.value[2][1]).toBeTruthy()
      expect(store.getState().hotelsChannels.value[1]).not.toBeTruthy()
    })
  })
})

