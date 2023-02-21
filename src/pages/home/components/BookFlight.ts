import { Page } from '@playwright/test';
import { FlightBookingInfo, RoundTripFlight } from './BookFlight.types';
import { BookingFactory } from './booking-factory/BookingFactory';
import { SelectCountry } from './booking-modals/SelectCountry';
import { SelectDate } from './booking-modals/SelectDate';
import { SelectPassengers } from './booking-modals/SelectPassengers';

export class BookFlight {
  private static instance: BookFlight;
  private _bookingFactory: BookingFactory;
  readonly getSelectCountryModal: SelectCountry;
  readonly getSelectDateModal: SelectDate;
  readonly getSelectPassengersModal: SelectPassengers;

  private constructor(protected page: Page) {
    this.page = page;
    this.getSelectCountryModal = SelectCountry.getInstance(page);
    this.getSelectDateModal = SelectDate.getInstance(page);
    this.getSelectPassengersModal = SelectPassengers.getInstance(page);
    this._bookingFactory = BookingFactory.getInstance(page);
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new BookFlight(page);
    return this.instance;
  }

  async bookAFlight(bookingInfo: FlightBookingInfo | RoundTripFlight): Promise<void> {
    await this._bookingFactory.createABookingForAFlightTrip(bookingInfo);
  }
}
