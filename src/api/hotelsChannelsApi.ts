import dbOrm from '@/dbOrm'
import { HotelsChannels, ChannelsStatuses } from '@/types'

const hotelsChannelsApi = {
  async getHotelsChannelsVisibility(): Promise<HotelsChannels> {
    const res: HotelsChannels = await dbOrm.getVisibilityStatuses()
    return res || {}
  },

  async setHotelChannelVisibility(hotelId: number, channelId: number, isVisible: boolean): Promise<void> {
    const statuses: HotelsChannels = await hotelsChannelsApi.getHotelsChannelsVisibility()
    
    let hotelChannelsStatuses: ChannelsStatuses = statuses[hotelId]
    if (!hotelChannelsStatuses) {
      statuses[hotelId] = hotelChannelsStatuses = {}
    }
    
    hotelChannelsStatuses[channelId] = isVisible

    await dbOrm.setVisibilityStatuses(statuses)
  },

  async getHotelVisibilityInChannel(hotelId: number, channelId: number): Promise<boolean> {
    const hotelsChannels: HotelsChannels = await hotelsChannelsApi.getHotelsChannelsVisibility()
    const hotelChannelsStatuses: ChannelsStatuses = hotelsChannels[hotelId] || {}
    return !!hotelChannelsStatuses[channelId]
  }
}

export default hotelsChannelsApi
