import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Channel, ChannelsStatuses } from '@/types'

import { RootState } from '@/store'
import { setAvailability } from '@/store/hotelsChannelsSlice'

import hotelsChannelsApi from '@/api/hotelsChannelsApi'

import Switch from '@/components/Switch'

interface ChannelsListRowProps {
  channel: Channel
  hotelId: number
}

export default function ChannelsListRow(props: ChannelsListRowProps) {

  useEffect(() => {
    // Here is a different way to fetch hotel visibility per hotel per channel based on bonus requirements
    // Although this is not used right now.
    hotelsChannelsApi.getHotelVisibilityInChannel(props.hotelId, props.channel.value).then((isVisible: boolean) => {
      // console.log(isVisible)
    })
  }, [])

  const dispatch: Function = useDispatch()

  const isAvailable: boolean = useSelector((state: RootState): boolean => {
    const hotelChannelStatuses: ChannelsStatuses = state.hotelsChannels.value[props.hotelId] || {}
    return !!hotelChannelStatuses[props.channel.value]
  })

  const onSwitchChange = (value: boolean): void => {
    dispatch(setAvailability({
      hotelId: props.hotelId,
      channelId: props.channel.value,
      isAvailable: value,
    }))
  }

  return (
    <tr
      className="border-t border-slate-300 dark:border-slate-500/30 dark:bg-slate-800"
      data-testid="channels-row"
    >
      <td className="px-4 py-3 text-left leading-5">{props.channel.label}</td>
      <td className="px-4 py-3 text-right flex flex-row-reverse">
        <Switch aria-label="" className="flex" isSelected={isAvailable} onChange={onSwitchChange} />
      </td>
    </tr>
  )
}
