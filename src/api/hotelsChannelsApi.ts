import dbOrm from '@/dbOrm'
import { HotelsChannels } from '@/types'

const hotelsChannelsApi = {
  getHotelsChannelsVisibility(): Promise<HotelsChannels> {
    return dbOrm.getVisibilityStatuses()
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
