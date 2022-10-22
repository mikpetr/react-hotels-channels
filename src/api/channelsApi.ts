import dbOrm, { CHANNELS } from '@/dbOrm'

export default {
  getChannels() {
    return dbOrm.getList(CHANNELS)
  }
}
