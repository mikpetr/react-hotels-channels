import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

import ChannelsListRow from './ChannelsListRow'

interface ChannelsListProps {
  className?: string
  hotelId: number,
}

export default function ChannelsList(props: ChannelsListProps) {
  const channels = useSelector((state: RootState) => state.channels.value)

  return (
    <div
      className={
        `border border-slate-300 dark:border-slate-500/30 rounded-lg overflow-hidden ${props.className}`
      }
      data-testid="channels-list">
      <table className="table-auto w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-700 font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">Channel</th>
            <th className="px-4 py-3 text-right">Visibility</th>
          </tr>
        </thead>
        <tbody>
          {channels.map(channel => <ChannelsListRow hotelId={props.hotelId} channel={channel} key={channel.value} />)}
        </tbody>
      </table>
    </div>
  )
}