import { expect, Page } from '@playwright/test';
import { FlightBookingInfo } from '../BookFlight.types';
import { BookingBase } from './BookingBase';

export class OneWayTrip extends BookingBase {
  private static instance: OneWayTrip;

  private constructor(protected page: Page) {
    super(page);
    this.page = page;
  }

  static getInstance(page: Page) {
    if (this.instance?.page && page !== this.instance.page) return (this.instance = new OneWayTrip(page));
    else if (OneWayTrip.instance) return this.instance;
    this.instance = new OneWayTrip(page);
    return this.instance;
  }

  async bookAOneWayTripFlight(bookingInfo: FlightBookingInfo): Promise<void> {
    await this.setTypeOfFlightTo('OneWay');
    await this.depatureCities.first().click();
    await this.getSelectCountryModal.selectCountry({
      type: 'DepartureCity',
      nameOfCity: bookingInfo.depatureCity as string,
    });
    await this.getSelectCountryModal.selectCountry({
      type: 'arrivalCity',
      nameOfCity: bookingInfo.arrivalCity as string,
    });
    await this.getSelectDateModal.setCalendarDate({ setDate: bookingInfo.departureDate });
    // Dummy website does not disable the inputfield for oneway trip, only change the opacity so that it looks disabled.
    await expect.soft(this.returnDateElement).toHaveAttribute('style', 'display: block; opacity: 0.5;');

    if (bookingInfo.passengers)
      await this.getSelectPassengersModal.selectAmountOfPassengers({ passengers: bookingInfo.passengers });

    await this.selectCurrency(bookingInfo);
  }
}
