import { expect, Locator, Page } from '@playwright/test';
import { FlightBookingInfo } from '../BookFlight.types';
import { BookingBase } from './BookingBase';

export class MultiTrip extends BookingBase {
  private static instance: MultiTrip;
  private alertContinueBtnElement: Locator;

  private constructor(protected page: Page) {
    super(page);
    this.page = page;
    this.alertContinueBtnElement = page.locator('#MultiCityModelAlert');
  }

  static getInstance(page: Page) {
    if (this.instance?.page && page !== this.instance.page) return (this.instance = new MultiTrip(page));
    else if (MultiTrip.instance) return this.instance;
    this.instance = new MultiTrip(page);
    return this.instance;
  }

  async bookAMultiTripFlight(bookingInfo: FlightBookingInfo): Promise<void> {
    if (!Array.isArray(bookingInfo.depatureCity) || !Array.isArray(bookingInfo.arrivalCity))
      throw new Error(`${bookingInfo.arrivalCity} and ${bookingInfo.depatureCity} needs to be of type array.`);

    await this.setTypeOfFlightTo('TripPlanner');
    await this.alertContinueBtnElement.click();

    for (let i = 0; i < bookingInfo.depatureCity.length; i++) {
      await this.depatureCities.nth(i).click();

      await this.getSelectCountryModal.selectCountry({
        type: 'DepartureCity',
        nameOfCity: bookingInfo.depatureCity[i],
      });
      await this.getSelectCountryModal.selectCountry({
        type: 'arrivalCity',
        nameOfCity: bookingInfo.arrivalCity[i],
      });
    }

    await this.departDateDivElement.click();
    await this.getSelectDateModal.setCalendarDate({ setDate: bookingInfo.departureDate });
    await expect.soft(this.returnDateElement).not.toBeVisible();

    if (bookingInfo.passengers)
      await this.getSelectPassengersModal.selectAmountOfPassengers({ passengers: bookingInfo.passengers });

    await this.selectCurrency(bookingInfo);
  }
}
