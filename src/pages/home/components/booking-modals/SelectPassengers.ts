import { Page, Locator } from '@playwright/test';
import { FlightBookingInfo } from '../BookFlight.types';

export class SelectPassengers {
  private static instance: SelectPassengers;
  readonly addAdultPassengerBtnElement: Locator;
  readonly addInfantPassengerBtnElement: Locator;
  readonly addChildPassengerBtnElement: Locator;
  readonly passengerDivElement: Locator;
  readonly doneBtnElement: Locator;
  readonly spanChildElement: Locator;
  readonly spanInfantElement: Locator;
  readonly spanAdultElemnt: Locator;

  private constructor(protected page: Page) {
    this.page = page;
    this.addAdultPassengerBtnElement = page.locator('#hrefIncAdt');
    this.addInfantPassengerBtnElement = page.locator('#hrefIncInf');
    this.addChildPassengerBtnElement = page.locator('#hrefIncChd');
    this.passengerDivElement = page.locator('#divpaxinfo');
    this.doneBtnElement = page.locator('#btnclosepaxoption');
    this.spanChildElement = page.locator('#spanChild');
    this.spanInfantElement = page.locator('#spanInfant');
    this.spanAdultElemnt = page.locator('#spanAudlt');
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new SelectPassengers(page);
    return this.instance;
  }
  async selectAmountOfPassengers(bookingInfo: Required<Pick<FlightBookingInfo, 'passengers'>>): Promise<void> {
    const passengers = bookingInfo.passengers;
    await this.passengerDivElement.click();

    if (passengers.amountOfAdults !== 1)
      await this.addAdultPassengerBtnElement.click({ clickCount: passengers.amountOfAdults - 1 });
    if (passengers.amountOfInfants > 0)
      await this.addInfantPassengerBtnElement.click({ clickCount: passengers.amountsOfChildren });
    if (passengers.amountsOfChildren > 0)
      await this.addChildPassengerBtnElement.click({ clickCount: passengers.amountOfInfants });

    await this.doneBtnElement.click();
  }
}
