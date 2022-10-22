import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Hotel } from '@/types'

export interface HotelsState {
  value: Hotel[]
}

const initialState: HotelsState = {
  value: [],
}

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setHotels } = hotelsSlice.actions

export default hotelsSlice.reducer
