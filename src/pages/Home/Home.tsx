import Logo from '@/assets/images/logo.svg'
import { useEffect, useState } from 'react'

// For react-aria
import Select from '@/components/Select'
import { Item } from 'react-stately'

import ChannelsList from './ChannelsList'

import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { setHotels } from '@/store/hotelsSlice'
import { setChannels } from '@/store/channelsSlice'
import { setHotelsChannelsAvailability } from '@/store/hotelsChannelsSlice'

import hotelsApi from '@/api/hotelsApi'
import channelsApi from '@/api/channelsApi'
import hotelsChannelsApi from '@/api/hotelsChannelsApi'

import { Hotel, Channel, HotelsChannels } from '@/types'

export default function Home() {

  const dispatch = useDispatch()
  const hotels = useSelector((state: RootState) => state.hotels.value)
  const [selectedHotel, setSelectedHotel]: [Hotel | undefined, Function] = useState()

  useEffect(() => {
    hotelsApi.getHotels().then((data: Hotel[]) => {
      dispatch(setHotels(data))

      setSelectedHotel(data[0])
    })

    channelsApi.getChannels().then((data: Channel[]) => {
      dispatch(setChannels(data))
    })

    hotelsChannelsApi.getHotelsChannelsVisibility().then((data: HotelsChannels) => {
      dispatch(setHotelsChannelsAvailability(data))
    })
  }, [])

  return (
    <div className="rounded-2xl bg-white">
      <header className="py-4 px-6 border-b border-slate-200">
        <img src={Logo} />
      </header>
      <section className="p-6">
        <h1 className="text-black text-2xl mb-5">Channel manager</h1>
        
        <div className="select-wrapper w-72">
          {hotels && selectedHotel && <Select className="hotel-select" label="Hotel" items={hotels} value={selectedHotel} onChange={setSelectedHotel}>
            {(item: Hotel) => <Item key={item.value}>{item.label}</Item>}
          </Select>}
        </div>

        {selectedHotel?.value && <ChannelsList hotelId={selectedHotel.value} className="mt-5" />}
      </section>
    </div>
  )
}
