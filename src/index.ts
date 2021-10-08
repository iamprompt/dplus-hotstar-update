import dayjs from './utils/dayjs'
import { UpdateList, UpdatePage } from './update'
import { HSPageNo } from './utils/config'
import { prisma } from './utils/prisma'
import { CheckList } from './check'
import { ParamsType } from './utils/hotstar'

async function main() {
  await prisma.$connect()
  const startTime = Date.now()
  console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
  console.log(
    `Hotstar Watcher:: Start Updating Hotstar Movie Lists at ${dayjs(startTime).format('DD/MM/YYYY HH:mm:ss')}`
  )
  await UpdateList(HSPageNo)
  // await UpdatePage(ParamsType.MOVIE_DETAIL, 1260052105, 'SHOW', 2)
  // await CheckList()
  const stopTime = Date.now()
  console.log(
    `Done Process at ${dayjs(stopTime).format('DD/MM/YYYY HH:mm:ss')} (${dayjs
      .duration(stopTime - startTime)
      .format('HH:mm:ss')})`
  )
  console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
