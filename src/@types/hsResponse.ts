export type HSResponse = {
  body: Body
  statusCode: string
  statusCodeValue: number
}

export type Body = {
  results: Results
}

export type Results = {
  uri: string
  pageType: string
  responseType: string
  item?: AssetsItem
  trays: Trays
}

export type Trays = {
  items: TraysItem[]
  totalResults: number
  offset: number
  size: number
  totalPages: number
  totalPageResults: number
}

export type TraysItem = {
  title: string
  uri?: string
  id: number
  traySource: TraySource
  layoutType?: LayoutType
  addIdentifier: string
  assets?: Assets
  trayTypeId: number
  traySourceId: number
  uqId: string
  globalId: string
  engTitle?: string
}

export type Assets = {
  items: AssetsItem[]
  totalResults: number
  offset: number
  size: number
  totalPages: number
  totalPageResults: number
}

export type AssetsItem = {
  archived?: boolean
  id: number
  contentId: number
  categoryId?: number
  title: string
  engTitle?: string
  shortTitle?: string
  description: string
  uri: string
  entityType: EntityType
  assetType: AssetType
  genre: GenreName[]
  lang: Lang[]
  channelId?: number
  channelName?: ChannelName
  channelObj?: Obj
  seasonCnt?: number
  episodeCnt?: number
  clipCnt?: number
  premium?: boolean
  vip?: boolean
  parentalRating?: number
  parentalRatingName?: ParentalRatingName
  line2?: string
  line3?: string
  images: Images
  imageSets: ImageSets
  studioName: StudioName
  langObjs?: LangObj[]
  genreObjs?: Obj[]
  labels?: Label[]
  trailers?: string[]
  trailerObjs?: AssetsItem[]
  isSocialEnabled?: boolean
  loginNudgeStatus?: LoginNudgeStatus
  autoplayObjs?: AutoplayObj[]
  isSubTagged?: boolean
  collections?: Collection[]
  duration?: number
  contentType?: ContentType
  contentProvider?: string
  cpDisplayName?: string
  cpLogoUrl?: string
  live?: boolean
  hboContent?: boolean
  encrypted?: boolean
  startDate?: number
  endDate?: number
  year?: number
  playbackUri?: string
  studioId?: number
  contentDownloadable?: boolean
  offlineStorageTime?: number
  offlinePlaybackTime?: number
  playbackType?: PlaybackType
  monetisable?: boolean
  languageSelector?: number
  drmClass?: DrmClass
  downloadDrmClass?: DrmClass
  contentStartPointSeconds?: number
  badges?: Badge[]
  clipType?: ClipType
  orientation?: LayoutType
  detail?: string
  crisp?: Crisp
  trailerParents?: string[]
  broadCastDate?: number
  liveStartTime?: number
  seasonNo?: number
  episodeNo?: number
  supportSimulcast?: boolean
  showName?: string
  showId?: number
  showContentId?: string
  showShortTitle?: string
  seasonName?: string
  features?: any
  unifiedFeaturesObject?: any
}

export type AutoplayObj = {
  contentId: string
  playbackType: PlaybackType
  orientation: LayoutType
}

export type Obj = {
  id: number
  name: ChannelName | GenreName
  detailUrl: string
}

export type Collection = {
  name: Name
}

export type LangObj = {
  hide: boolean
  id: number
  name: Lang
  iso3code: Iso3Code
  detailUrl: string
  displayName: DisplayName
}

export type ImageSets = {
  DEFAULT: Images
}

export type Images = {
  v?: string
  h: string
  m?: string
  t?: string
  i?: string
}

export type ClipType = 'VOD'
export type LoginNudgeStatus = 'DEFAULT'
export type ParentalRatingName = 'ALL' | 'G' | 'PG' | '13+' | '15+' | '18+' | '20+'
export type TraySource = 'CATALOG' | 'GRAVITY'
export type Name = 'Box_Office' | 'Disney+'
export type ContentType = 'CLIPS' | 'MOVIE'
export type DrmClass = 'BEST_EFFORT' | 'NO_COMPROMISE'
export type EntityType = 'CLIP' | 'MOVIE' | 'SHOW' | 'CHANNEL' | 'EPISODE' | 'TV_SEASON'
export type LayoutType = 'HORIZONTAL' | 'MASTHEAD' | 'VERTICAL'
export type PlaybackType = 'INTERNAL'
export type Badge = 'NP'
export type AssetType = 'MOVIE' | 'SHOW' | 'VIDEO'
export type Label = 'PREMIUM'

export type Lang =
  | 'Bengali'
  | 'Cantonese'
  | 'Chinese'
  | 'Dutch'
  | 'English'
  | 'Hindi'
  | 'Indonesian'
  | 'Japanese'
  | 'Korean'
  | 'Malay'
  | 'Mandarin'
  | 'Tamil'
  | 'Telugu'
  | 'Thai'

export type ChannelName =
  | 'ABC Studios'
  | 'Disney'
  | 'Disney Junior'
  | 'Fox Life'
  | 'Marvel'
  | 'Nat Geo'
  | 'Pixar'
  | 'Star Wars'
  | 'Star World'

export type GenreName =
  | 'Action'
  | 'Biopic'
  | 'Comedy'
  | 'Concert Film'
  | 'Crime'
  | 'Docudrama'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Horror'
  | 'Kids'
  | 'Music'
  | 'Musical'
  | 'Reality'
  | 'Romance'
  | 'Science'
  | 'Sport'
  | 'Superhero'
  | 'Talk Show'
  | 'Teen'
  | 'Thriller'
  | 'Travel'
  | 'Wildlife'

export type StudioName =
  | 'ABC Studios'
  | 'Act2pictures'
  | 'Beijing Enlight Pictures, Co. Ltd'
  | 'Buena Vista'
  | 'China 3D'
  | 'Clover Films Distribution Pte Ltd'
  | 'Disney'
  | 'ESPN Films'
  | 'Falcon'
  | 'FNG'
  | 'FOX'
  | 'Freeform'
  | 'FX'
  | 'GDH'
  | 'Green Film Production'
  | 'Infocus Asia'
  | 'Kantana'
  | 'Karga 7'
  | 'Kuman Pictures'
  | 'LucasFilm'
  | 'Mandarin Motion Pictures Limited'
  | 'Marvel'
  | 'MD pictures'
  | 'Media Asia Film Distribution (HK) Limited'
  | 'MM2'
  | 'Nat Geo'
  | 'Pegasus Motion Pictures Distribution Limited'
  | 'Pixar'
  | 'Primeworks Films'
  | 'Red Films'
  | 'Roadside Attractions'
  | 'Sahamongol'
  | 'SCM'
  | 'SKOP Productions'
  | 'STAR'
  | 'Star World'
  | '20th Century Studios'
  | 'Touchstone Pictures'

export type DisplayName =
  | 'Cantonese'
  | 'Chinese'
  | 'Dutch'
  | 'English'
  | 'Indonesian'
  | 'Japanese'
  | 'Korean'
  | 'Malay'
  | 'Mandarin'
  | 'हिंदी'
  | 'বাংলা'
  | 'தமிழ்'
  | 'తెలుగు'
  | 'ไทย'

export type Iso3Code =
  | 'ben'
  | 'cmn'
  | 'eng'
  | 'hin'
  | 'ind'
  | 'jpn'
  | 'kor'
  | 'msa'
  | 'nld'
  | 'tam'
  | 'tel'
  | 'tha'
  | 'yue'
  | 'zho'

export type Crisp =
  | 'Drug Usage, Language'
  | 'Horror'
  | 'Language'
  | 'Sex, Language'
  | 'Sex, Violence'
  | 'Sex, Violence, Language'
  | 'Suitable for All'
  | 'Violence'
  | 'Violence, Horror'
  | 'Violence, Language'
  | 'Violence, Language, Horror'
  | 'Violence, Language, Mature Theme'
