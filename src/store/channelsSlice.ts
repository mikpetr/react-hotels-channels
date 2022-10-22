import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Channel } from '@/types'

export interface ChannelsState {
  value: Channel[]
}

const initialState: ChannelsState = {
  value: [],
}

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setChannels } = channelsSlice.actions

export default channelsSlice.reducer
