import dayjs from 'dayjs'
import 'dayjs/locale/th'
import duration from 'dayjs/plugin/duration'

dayjs.locale('th')
dayjs.extend(duration)

export default dayjs
