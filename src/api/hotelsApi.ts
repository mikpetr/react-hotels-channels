import dbOrm, { HOTELS } from '@/dbOrm'

export default {
  getHotels(): Promise<[]> {
    return dbOrm.getList(HOTELS)
  }
}
