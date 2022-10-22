import { Switch } from '@/components/Switch'
import { Channel } from '@/types'

import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setAvailability } from '@/store/hotelsChannelsSlice'

interface ChannelsListRowProps {
  channel: Channel,
  hotelId: number,
}

export default function ChannelsListRow(props: ChannelsListRowProps) {

  const dispatch = useDispatch()
  const isAvailable = useSelector((state: RootState) => {
    const hotel = state.hotelsChannels.value[props.hotelId] || {}
    return !!hotel[props.channel.value]
  }) 

  const onSwitchChange = (value: boolean) => {
    dispatch(setAvailability({
      hotelId: props.hotelId,
      channelId: props.channel.value,
      isAvailable: value,
    }))
  }

  return (
    <tr className="border-t border-slate-300">
      <td className="px-4 py-3 text-left leading-5">{props.channel.label}</td>
      <td className="px-4 py-3 text-right flex flex-row-reverse">
        <Switch aria-label="" className="flex" isSelected={isAvailable} onChange={onSwitchChange} />
      </td>
    </tr>
  )
}
