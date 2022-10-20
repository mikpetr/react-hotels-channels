import Logo from '@/assets/images/logo.svg'
import { useState } from 'react'

// For react-aria
import Select from '@/components/Select'
import { Item } from 'react-stately'
import { Switch } from '@/components/Switch'

interface Hotel extends Object {
  value: number,
  label: string
}

export default function Home() {

  const hotels: Hotel[] = [
    {value: 1, label: 'Aerospace'},
    {value: 2, label: 'Mechanical'},
    {value: 3, label: 'Civil'},
    {value: 4, label: 'Biomedical'},
    {value: 5, label: 'Nuclear'},
    {value: 6, label: 'Industrial'},
    {value: 7, label: 'Chemical'},
    {value: 8, label: 'Agricultural'},
    {value: 9, label: 'Electrical'}
  ];

  const [hotel, setHotel]: [Hotel | undefined, Function] = useState(hotels[2])

  const onSwitchChange = (value) => {
    console.log(value)
  }

  return (
    <div className="rounded-2xl bg-white">
      <header className="py-4 px-6 border-b border-slate-200">
        <img src={Logo} />
      </header>
      <section className="p-6">
        <h1 className="text-black text-2xl mb-5">Channel manager</h1>
        
        <div className="select-wrapper w-72">
          <Select className="hotel-select" label="Hotel" items={hotels} value={hotel} onChange={setHotel}>
            {(item: Hotel) => <Item key={item.value}>{item.label}</Item>}
          </Select>
        </div>

        <div className="mt-5 border border-slate-300 rounded-lg overflow-hidden">
          <table className="table-auto w-full text-sm">
            <thead className="bg-slate-50 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Channel</th>
                <th className="px-4 py-3 text-right">Visibility</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-300">
                <td className="px-4 py-3 text-left leading-5">Channel 1</td>
                <td className="px-4 py-3 text-right flex flex-row-reverse">
                  <Switch aria-label="" className="flex" onChange={onSwitchChange} />
                </td>
              </tr>
              <tr className="border-t border-slate-300">
                <td className="px-4 py-3 text-left leading-5">Channel 2</td>
                <td className="px-4 py-3 text-right flex flex-row-reverse">
                  <Switch aria-label="" className="flex" onChange={onSwitchChange} />
                </td>
              </tr>
              <tr className="border-t border-slate-300">
                <td className="px-4 py-3 text-left leading-5">Channel 3</td>
                <td className="px-4 py-3 text-right flex flex-row-reverse">
                  <Switch aria-label="" className="flex" onChange={onSwitchChange} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </section>
    </div>
  )
}
