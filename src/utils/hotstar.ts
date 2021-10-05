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
  [ParamsType.MOVIE_DETAIL]: (contentId: string | number) => `o/v1/show/detail?contentId=${contentId}`,
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
  } = await HotstarAPI.get<HSResponse>(Routes[paramType](param), {
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
  assets.images && images.push(...Object.values(assets.images))
  assets.imageSets && images.push(...Object.values(assets.imageSets.DEFAULT))

  delete assets.parentalRatingName
  delete assets.parentalRating
  delete assets.langObjs
  delete assets.genreObjs
  delete assets.channelObj
  delete assets.collections
  delete assets.isSocialEnabled
  delete assets.labels
  delete assets.isSubTagged
  delete assets.premium
  delete assets.vip
  delete assets.archived
  delete assets.loginNudgeStatus
  delete assets.autoplayObjs
  delete assets.hboContent
  delete assets.playbackUri
  delete assets.playbackType
  delete assets.drmClass
  delete assets.downloadDrmClass
  delete assets.badges
  delete assets.orientation
  delete assets.trailers
  delete assets.contentDownloadable
  delete assets.offlinePlaybackTime
  delete assets.offlineStorageTime
  delete assets.languageSelector
  delete assets.live
  delete assets.liveStartTime
  delete assets.contentStartPointSeconds
  delete assets.monetisable
  delete assets.cpDisplayName
  delete assets.cpLogoUrl
  delete assets.trailerObjs
  delete assets.features
  delete assets.unifiedFeaturesObject
  delete assets.trailerParents

  const obj = {
    ...assets,
    title: assets.title?.replaceAll('\n', ''),
    engTitle: assets.engTitle?.replaceAll('\n', ''),
    description: assets.description?.replaceAll('\n', ''),
    images: assets.images?.h,
    imageSets: images.filter(onlyUnique),
    trays: [trayItem?.title],
  }

  Object.keys(obj).forEach((key) => {
    // @ts-expect-error
    if (Array.isArray(obj[key])) obj[key] = obj[key].filter((x) => x !== undefined)
    // @ts-expect-error
    if (obj[key] === undefined) delete obj[key]
  })

  return obj
  // return {
  //   trays: [trayItem.title],
  //   contentId: assets.contentId,
  //   title: assets.title.replaceAll('\n', ''),
  //   engTitle: assets.engTitle?.replaceAll('\n', ''),
  //   description: assets.description,
  //   episodeCnt: assets.episodeCnt,
  //   entityType: assets.entityType,
  //   studioName: assets.studioName,
  //   encrypted: assets.encrypted,
  //   year: assets.year,
  //   images: images.filter(onlyUnique),
  //   mainImages: assets.images?.h,
  //   startDate: assets.startDate,
  //   endDate: assets.endDate,
  //   duration: assets.duration,
  //   broadCastDate: assets.broadCastDate,
  //   showName: assets.showName,
  //   showContentId: assets.showContentId,
  //   seasonNo: assets.seasonNo,
  //   episodeNo: assets.episodeNo,
  //   genre: assets.genre,
  //   lang: assets.lang,
  //   showId: assets.showId,
  //   supportSimulcast: assets.supportSimulcast,
  //   contentProvider: assets.contentProvider,
  // } as HSMovieFormat
}
