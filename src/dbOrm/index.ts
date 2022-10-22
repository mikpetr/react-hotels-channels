import { hotels } from '@/data/hotels.json'
import { channels } from '@/data/channels.json'
import { HotelsChannels } from '@/types'

export const HOTELS = 'hotels'
export const CHANNELS = 'channels'
export const VISIBILITY_STATUSES = 'visibilityStatuses'

const dbOrm = {
  async getList(collection: string ): Promise<[]> {
    const data: string | null = localStorage.getItem(collection)
    return data && JSON.parse(data)
  },
  async setList(collection: string, data: object[]): Promise<void> {
    localStorage.setItem(collection, JSON.stringify(data))
  },
  async getVisibilityStatuses(): Promise<HotelsChannels> {
    const data: string | null = localStorage.getItem(VISIBILITY_STATUSES)
    return data && JSON.parse(data)
  },
  async setVisibilityStatuses(data: HotelsChannels): Promise<void> {
    localStorage.setItem(VISIBILITY_STATUSES, JSON.stringify(data))
  },
  initData(): Promise<Object | void> {
    const promises: Promise<Object| void>[] = [
      dbOrm.setList(HOTELS, hotels),
      dbOrm.setList(CHANNELS, channels)
    ]

    return Promise.all(promises)
  }
}

export default dbOrm