import { Page } from '@playwright/test';
import { RoundTripFlight } from '../BookFlight.types';
import { BookingBase } from './BookingBase';

export class RoundTrip extends BookingBase {
  private static instance: RoundTrip;

  private constructor(protected page: Page) {
    super(page);
    this.page = page;
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new RoundTrip(page);
    return this.instance;
  }

  async bookARoundTripFlight(bookingInfo: RoundTripFlight): Promise<void> {
    await this.setTypeOfFlightTo('RoundTrip');
    await this.depatureCities.first().click();
    await this.getSelectCountryModal.selectCountry({
      type: 'DepartureCity',
      nameOfCity: bookingInfo.depatureCity as string,
    });
    await this.getSelectCountryModal.selectCountry({
      type: 'arrivalCity',
      nameOfCity: bookingInfo.arrivalCity as string,
    });
    await this.getSelectDateModal.setCalendarDate({
      setDate: bookingInfo.departureDate,
    });

    await this.returnDateElement.click();

    await this.getSelectDateModal.setCalendarDate({
      setDate: bookingInfo.returnDate,
    });

    if (bookingInfo.passengers)
      await this.getSelectPassengersModal.selectAmountOfPassengers({ passengers: bookingInfo.passengers });

    await this.selectCurrency(bookingInfo);
  }
}
