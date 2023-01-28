import { Locator, Page } from '@playwright/test';
import { getRandomDate } from '../../../../utilities/test-data/random-test-data';
import { Date } from '../BookFlight.types';

export class SelectDate {
  private static instance: SelectDate;
  private sectionElementCalendar: Locator;
  private calendarMonthTitleElement: Locator;
  private calendarYearTitleElement: Locator;

  private constructor(protected page: Page) {
    this.page = page;
    this.sectionElementCalendar = page.locator('.ui-datepicker-group-first');
    this.calendarMonthTitleElement = this.sectionElementCalendar.locator('.ui-datepicker-month');
    this.calendarYearTitleElement = this.sectionElementCalendar.locator('.ui-datepicker-year');
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new SelectDate(page);
    return this.instance;
  }

  async setCalendarDate(date: { setDate: Date }): Promise<void> {
    // The dummy website only has dates available 6 months ahead of time. Im simply adjusting the method to the limitations of the dummy website.
    // prettier-ignore
    const monthsOfYear = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',];

    const allowedTimeToBookInAdvance = Number(process.env.MAX_TIME_IN_MONTHS_TO_BOOK_IN_ADVANCE);
    const selectedMonth = monthsOfYear[date.setDate.month];
    const selectedYear = String(date.setDate.year);
    const selectedDate = date.setDate.date === 'randomDate' ? getRandomDate() : String(date.setDate.date);

    for (let i = 0; i < allowedTimeToBookInAdvance; i++) {
      const month = await this.calendarMonthTitleElement.textContent();
      const year = await this.calendarYearTitleElement.textContent();

      // If on correct month && year exit loop
      if (month?.toLowerCase() === selectedMonth && year === selectedYear) break;

      await this.page.locator('a[title="Next"]').click();

      // Exit loop if trying to book too far in the future.
      if (i + 1 === allowedTimeToBookInAdvance)
        throw new Error(`${date.setDate.month} is not within range of allowed time to book in advance`);
    }
    await this.sectionElementCalendar.locator(`a:has-text("${selectedDate}")`).click();
  }
}
