import { createSlice, Slice, CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Hotel } from '@/types'

export interface HotelsState {
  value: Hotel[]
}

const initialState: HotelsState = {
  value: []
}

export const hotelsSlice: Slice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels: (state: any, action: PayloadAction<Hotel[]>) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setHotels }: CaseReducerActions<SliceCaseReducers<any>> = hotelsSlice.actions

export default hotelsSlice.reducer
