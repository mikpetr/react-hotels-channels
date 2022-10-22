import dbOrm, { HOTELS } from '@/dbOrm'

export default {
  getHotels() {
    return dbOrm.getList(HOTELS)
  }
}
