import dbOrm, { CHANNELS } from '@/dbOrm'

export default {
  getChannels(): Promise<[]> {
    return dbOrm.getList(CHANNELS)
  }
}
