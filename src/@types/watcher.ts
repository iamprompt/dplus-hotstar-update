import { EntityType, StudioName } from './hsResponse'

export type HSWatcherConfig = {
  cronExp: string
  watchField: Array<keyof HSMovieFormat>
  channelsRegistered: string[]
}

export type HSOriginalJSON = {
  [key in EntityType]: HSObjectJSON
}

export type HSObjectJSON = { [key: string | number]: HSMovieFormat }

export type HSMovieFormat = {
  trays: string[]
  contentId: number
  title: string
  engTitle?: string
  description: string
  episodeCnt?: number
  entityType: EntityType
  studioName: StudioName
  encrypted?: boolean
  year?: number
  images: string[]
  mainImages: string
  startDate?: number
  endDate?: number
  duration?: number
  broadCastDate?: number
  showContentId?: string
  showName?: string
  seasonNo?: number
  episodeNo?: number
  genre: string[]
  lang: string[]
  showId?: number
  supportSimulcast?: boolean
  contentProvider?: string
}
