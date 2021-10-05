import { EntityType } from './@types/hsResponse'
import { isObjectEqual, onlyUnique } from './utils'
import { db } from './utils/firebase'
import { getPageTray, ParamsType } from './utils/hotstar'

const DHSRef = db.collection('DPlusHotstar')

export const UpdatePage = async (HSPages: number[]) => {
  const AssetsRef = DHSRef.doc('ASSETS')
  for (const pageNo of HSPages.slice(0, 5)) {
    const r = await getPageTray(ParamsType.PAGE_TRAY, pageNo)
    for (const a of r.slice(0, 5)) {
      const assetRef = (['MOVIE', 'SHOW', 'CHANNEL', 'EPISODE', 'CLIP'] as EntityType[]).includes(a.entityType)
        ? AssetsRef.collection(a.entityType || '').doc(`${a.contentId}` || '')
        : null
      if (assetRef) {
        try {
          await db.runTransaction(async (t) => {
            const doc = await t.get(assetRef)
            const updatedA = updatedAsset(doc.data()!, a)
            const isEqual = isObjectEqual(doc.data()!, updatedA, ['trays'])
            t.update(assetRef, updatedAsset)

            if (!isEqual) {
            }
          })
        } catch (e) {
          await assetRef.set(a)
        }

        if (a.entityType === 'SHOW') {
          const rShow = await getPageTray(ParamsType.MOVIE_DETAIL, a.contentId)
          for (const subShow of rShow) {
            console.log(`Updating ${a.contentId} : ${a.title} - ${subShow.contentId}`)

            if (subShow.assetType === 'SHOW') {
              const showRef = assetRef
              try {
                await db.runTransaction(async (t) => {
                  const showItemDoc = await t.get(showRef)
                  const updatedShowItem = updatedAsset(showItemDoc.data(), subShow)
                  t.update(showRef, updatedShowItem)
                })
              } catch (error) {}
            } else {
              const showAssetRef = assetRef.collection(subShow.entityType).doc(`${subShow.contentId}`)
              try {
                await db.runTransaction(async (t) => {
                  const showDoc = await t.get(showAssetRef)

                  const updatedAS = updatedAsset(showDoc.data(), subShow)
                  const isEqualShow = isObjectEqual(showDoc.data()!, updatedAS, ['trays'])
                  console.log(isEqualShow)
                  t.update(showAssetRef, updatedAS)
                })
              } catch (error) {
                await showAssetRef.set(subShow)
              }
            }
          }
        }
      }
    }
  }
}

const updatedAsset = (previous: any, current: any) => {
  const trays = [...previous.trays, ...previous.trays].filter(onlyUnique)
  const imageSets = [...previous.imageSets, ...current.imageSets].filter(onlyUnique)
  const lang = [...previous.lang, ...current.lang].filter(onlyUnique)
  const genre = [...previous.genre, ...current.genre].filter(onlyUnique)

  return { ...current, trays, imageSets, lang, genre }
}
