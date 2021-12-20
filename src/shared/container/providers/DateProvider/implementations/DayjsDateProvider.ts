import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const formattedStartDate = this.convertToUTC(start_date)
    const formattedEndDate = this.convertToUTC(end_date)

    return dayjs(formattedEndDate).diff(formattedStartDate, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  currentDate(): Date {
    return dayjs().toDate()
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const formattedStartDate = this.convertToUTC(start_date)
    const formattedEndDate = this.convertToUTC(end_date)

    return dayjs(formattedEndDate).diff(formattedStartDate, 'days')
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  compareIfBefore(star_date: Date, end_date: Date): boolean {
    return dayjs(star_date).isBefore(end_date)
  }

  now(): Date {
    return dayjs().toDate()
  }
}

export { DayjsDateProvider }
