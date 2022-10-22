export interface Hotel extends Object {
  value: number,
  label: string
}

export interface Channel extends Object {
  value: number,
  label: string
}

export interface ChannelsStatuses {
  [key: string]: boolean
}

export interface HotelsChannels {
  [key: string]: ChannelsStatuses
}

export interface HotelsChannelsState {
  value: HotelsChannels
}