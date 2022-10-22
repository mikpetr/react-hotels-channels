import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import hotelsChannelsApi from '@/api/hotelsChannelsApi'

import { HotelsChannels, HotelsChannelsState } from '@/types'

export interface HotelChannelStatus {
  hotelId: number,
  channelId: number,
  isAvailable: boolean
}

const initialState: HotelsChannelsState = {
  value: {},
}

export const hotelsSlice = createSlice({
  name: 'hotelsChannels',
  initialState,
  reducers: {
    setAvailability: (state, { payload: { hotelId, channelId, isAvailable } }: PayloadAction<HotelChannelStatus>) => {
      let hotelInstance = state.value[hotelId]

      if (!hotelInstance) {
        hotelInstance = state.value[hotelId] = {}
      }

      hotelInstance[channelId] = isAvailable

      hotelsChannelsApi.setHotelChannelVisibility(hotelId, channelId, isAvailable)
    },
    setHotelsChannelsAvailability: (state, { payload }: PayloadAction<HotelsChannels>) => {
      state.value = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAvailability, setHotelsChannelsAvailability } = hotelsSlice.actions

export default hotelsSlice.reducer
