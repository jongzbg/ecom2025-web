// import moment from 'moment'
import moment from 'moment/min/moment-with-locales'

export const dateFormat = (date) => {
    return moment(date).locale('en').format('ll')
}