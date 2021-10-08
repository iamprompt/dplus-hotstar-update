import { prisma } from './utils/prisma'

export const CheckList = async () => {
  const showAssets = await prisma.asset.findMany({ where: { entityType: 'SHOW' }, include: { assetChild: true } })
  // console.log(showAssets[0])
  for (const show of showAssets) {
    if (show.episodeCnt! !== show.assetChild.length!) {
      console.log(show.contentId)
    }
  }

  console.log(showAssets.reduce((p, v) => p + v.episodeCnt!, 0))
}
