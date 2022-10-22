import { configureStore } from '@reduxjs/toolkit'
import hotelsSlice from './hotelsSlice'
import channelsSlice from './channelsSlice'
import hotelsChannelsSlice from './hotelsChannelsSlice'

export const store = configureStore({
  reducer: {
    hotels: hotelsSlice,
    channels: channelsSlice,
    hotelsChannels: hotelsChannelsSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
