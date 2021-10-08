import { Asset, Prisma, PrismaClient } from '.prisma/client'
import axios, { AxiosInstance } from 'axios'
import { onlyUnique } from '.'
import { AssetsItem, HSResponse, TraysItem } from '../@types/hsResponse'
import { HSMovieFormat } from '../@types/watcher'

/** Hotstar Axios Instance */
export const HotstarAPI: AxiosInstance = axios.create({
  baseURL: 'https://api.hotstar.com',
  headers: {
    'accept-language': 'tha',
    'x-country-code': 'TH',
    'x-client-code': 'LR',
    'x-platform-code': 'PCTV',
  },
})

export enum ParamsType {
  PAGE_TRAY = 'page_tray',
  MOVIE_DETAIL = 'movie_detail',
}

const Routes = {
  [ParamsType.PAGE_TRAY]: (pageId: string | number) => `o/v1/page/${pageId}`,
  [ParamsType.MOVIE_DETAIL]: (contentId: string | number, entityType: string) =>
    `o/v1/${entityType.toLowerCase()}/detail?contentId=${contentId}`,
}

/**
 * Get Movies from Page ID
 * @param pageId Page ID
 * @param limit Limit the number of results
 * @param offset Offset the result for pagination
 * @returns List of movie
 */
export const getPageTray = async (
  paramType: ParamsType = ParamsType.PAGE_TRAY,
  param: number | string = 1959,
  entityType: string = 'tray',
  limit: number = 1000,
  offset: number = 0
) => {
  const {
    data: {
      body: {
        results: {
          item,
          trays: { items },
        },
      },
    },
  } = await HotstarAPI.get<HSResponse>(Routes[paramType](param, entityType), {
    params: {
      offset,
      size: limit,
      tao: offset,
      tas: limit,
    },
  })

  // console.log(item)

  const itemResult = item && AssetMap(item)
  const resultTray = items.flatMap((trayItem) => trayItem.assets?.items?.map((a) => AssetMap(a, trayItem)) || [])

  if (itemResult) {
    return [itemResult, ...resultTray]
  } else return resultTray
}

const AssetMap = (assets: AssetsItem, trayItem?: TraysItem) => {
  // console.log(assets)
  const images: string[] = []
  const assetParent: Prisma.Enumerable<Prisma.AssetWhereUniqueInput> = []
  assets.images && images.push(...Object.values(assets.images))
  assets.imageSets && images.push(...Object.values(assets.imageSets.DEFAULT))
  assets.trailerParents &&
    assetParent.push(
      ...assets.trailerParents.map((tP) => ({
        contentId: parseInt(tP),
      }))
    )

  assets.showContentId && assetParent.push({ contentId: +assets.showContentId })

  const obj: Prisma.AssetCreateInput = {
    contentId: +assets.contentId,
    id: `${assets.id}`,
    title: assets.title?.replaceAll('\n', ''),
    shortTitle: assets.shortTitle?.replaceAll('\n', '') || null,
    engTitle: assets.engTitle?.replaceAll('\n', '') || null,
    description: assets.description?.replaceAll('\n', '') || null,
    studio: assets.studioId
      ? {
          connectOrCreate: {
            where: { id: `${assets.studioId}` },
            create: {
              id: `${assets.studioId}`,
              name: assets.studioName,
            },
          },
        }
      : undefined,
    channel: assets.channelObj
      ? {
          connectOrCreate: {
            where: { id: `${assets.channelObj.id}` },
            create: {
              id: `${assets.channelObj.id}`,
              name: assets.channelObj.name!,
            },
          },
        }
      : undefined,
    contentProvider: assets.contentProvider || null,
    productionHouse: assets.productionHouse,
    entityType: assets.entityType,
    contentType: assets.contentType || null,
    assetType: assets.assetType,
    clipType: assets.clipType || null,
    startDate: assets.startDate ? new Date(assets.startDate * 1000) : null,
    endDate: assets.endDate ? new Date(assets.endDate * 1000) : null,
    broadCastDate: assets.broadCastDate ? new Date(assets.broadCastDate * 1000) : null,
    genre: assets.genre,
    AssetLang: {
      connectOrCreate: assets.langObjs
        ? Object.values(assets.langObjs).map((v) => ({
            where: { assetId_langId: { langId: v.id, assetId: +assets.contentId } },
            create: {
              lang: {
                connectOrCreate: {
                  where: { id: v.id },
                  create: {
                    id: v.id,
                    name: v.name,
                    displayName: v.displayName,
                    iso3Code: v.iso3code,
                  },
                },
              },
            },
          }))
        : [],
    },
    year: assets.year || null,
    duration: assets.duration || null,
    clipCnt: assets.clipCnt || null,
    images: assets.images?.h,
    imageSets: images.filter(onlyUnique),
    AssetTray: trayItem
      ? {
          connectOrCreate: {
            where: {
              assetId_trayId: { assetId: assets.contentId, trayId: trayItem.id },
            },
            create: {
              tray: {
                connectOrCreate: {
                  where: { id: trayItem.id },
                  create: {
                    id: trayItem.id,
                    title: trayItem.title,
                    engTitle: trayItem.engTitle,
                    uqId: trayItem.uqId,
                  },
                },
              },
            },
          },
        }
      : undefined,
    seasonCnt: assets.seasonCnt || null,
    episodeCnt: assets.episodeCnt || null,
    seasonNo: assets.seasonNo || null,
    seasonName: assets.seasonName || null,
    episodeNo: assets.episodeNo || null,
    supportSimulcast: assets.supportSimulcast || null,
    encrypted: assets.encrypted || null,
    assetParent:
      assets.entityType === 'EPISODE'
        ? {
            connect: assetParent,
          }
        : undefined,
  }

  Object.keys(obj).forEach((key) => {
    // @ts-expect-error
    if (Array.isArray(obj[key])) obj[key] = obj[key].filter((x) => x !== undefined)
    // @ts-expect-error
    if (obj[key] === null || obj[key] === undefined) delete obj[key]
  })

  return obj
}
