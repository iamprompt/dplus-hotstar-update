import dayjs from './utils/dayjs'
import { isObjectEqual, onlyUnique } from './utils'
import { getPageTray, ParamsType } from './utils/hotstar'
import { prisma } from './utils/prisma'

export const UpdateList = async (HSPages: number[]) => {
  for (const pageNo of HSPages) {
    await UpdatePage(ParamsType.PAGE_TRAY, pageNo)
  }
}

const updatedAsset = (previous: any, current: any) => {
  let newImageSets = []
  const newGenre = []
  previous.genre?.length > 0 && newGenre.push(...previous.genre)
  current.genre?.length > 0 && newGenre.push(...current.genre)
  previous.imageSets?.length > 0 && newImageSets.push(...previous.imageSets)
  current.imageSets?.length > 0 && newImageSets.push(...current.imageSets)
  return { ...current, imageSets: newImageSets.filter(onlyUnique), genre: newGenre.filter(onlyUnique) }
}

export const UpdatePage = async (
  paramType: ParamsType = ParamsType.PAGE_TRAY,
  pageNo: number | string,
  entityType: string = 'tray',
  depth: number = 1
) => {
  console.log(`    - Fetching Tray ${pageNo} (${paramType}) at ${dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss')}`)

  let skipDig = true
  const r = await getPageTray(paramType, pageNo, entityType)
  for (const a of r) {
    if ([''].includes(a.entityType)) continue
    const AssetExist = await prisma.asset.findFirst({
      where: { contentId: +a.contentId },
      include: { assetChild: { where: { entityType: 'EPISODE' } } },
    })
    // console.log(AssetExist)

    if (AssetExist) {
      // console.log(AssetExist)
      const newAsset = updatedAsset(AssetExist, a)
      const isEqual = isObjectEqual(AssetExist, newAsset, [
        'startDate',
        'endDate',
        'duration',
        'images',
        'imageSets',
        'seasonCnt',
        'episodeCnt',
        'clipCnt',
      ])
      // console.log(newAsset)
      // console.log(isEqual)
      await prisma.asset.update({
        where: { contentId: +a.contentId },
        data: newAsset,
        include: {
          AssetLang: { include: { lang: true } },
          AssetTray: { include: { tray: true } },
          assetParent: true,
          channel: true,
          studio: true,
        },
      })
      // console.log(a.title, a.episodeCnt, AssetExist.assetChild.length)
      if (a.entityType === 'SHOW' && a.episodeCnt !== AssetExist.assetChild.length) {
        console.log(AssetExist)
        console.log(a)
      }

      skipDig = a.entityType === 'SHOW' ? a.episodeCnt === AssetExist.assetChild.length : true

      // console.log(
      //   `[UPDATE] Asset ${a.contentId} : ${a.title} Updated Successfully with ${
      //     isEqual[0] ? `No Difference` : `${isEqual[1].join(', ')} Differences`
      //   }`
      // )
    } else {
      const createResult = await prisma.asset.create({
        data: a,
        include: {
          AssetLang: { include: { lang: true } },
          AssetTray: { include: { tray: true } },
          assetParent: true,
          channel: true,
          studio: true,
        },
      })
      console.log(`[NEW] Asset ${a.contentId} : ${a.title} Created Successfully`)
    }

    if (!['CLIP'].includes(a.entityType) && depth === 1 && !skipDig) {
      console.log(a.contentId, a.entityType)
      await UpdatePage(ParamsType.MOVIE_DETAIL, a.contentId, a.entityType, 2)
    }
  }
}
