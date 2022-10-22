import dbOrm from '@/dbOrm'
import { HotelsChannels } from '@/types'

const hotelsChannelsApi = {
  async getHotelsChannelsVisibility(): Promise<HotelsChannels> {
    const res = await dbOrm.getVisibilityStatuses()
    return res || {}
  },
  async setHotelChannelVisibility(hotelId: number, channelId: number, isVisible: boolean): Promise<void> {
    const statuses: HotelsChannels = await hotelsChannelsApi.getHotelsChannelsVisibility()
    
    let hotel = statuses[hotelId]
    if (!hotel) {
      statuses[hotelId] = hotel = {}
    }
    
    hotel[channelId] = isVisible

    await dbOrm.setVisibilityStatuses(statuses)
  },
  async getHotelVisibilityInChannel(hotelId: number, channelId: number): Promise<boolean> {
    const hotelsChannels: HotelsChannels = await hotelsChannelsApi.getHotelsChannelsVisibility()
    const hotel = hotelsChannels[hotelId] || {}
    return !!hotel[channelId]
  }
}

export default hotelsChannelsApi
