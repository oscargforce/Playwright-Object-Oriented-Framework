import { Page } from '@playwright/test';
import { OneWayTrip } from './OneWayTrip';
import { MultiTrip } from './MultiTrip';
import { RoundTrip } from './RoundTrip';
import { FlightBookingInfo, RoundTripFlight } from '../BookFlight.types';

export class BookingFactory {
  private static instance: BookingFactory;
  private _oneWayTrip: OneWayTrip;
  private _roundTrip: RoundTrip;
  private _multiTrip: MultiTrip;

  constructor(private page: Page) {
    this._oneWayTrip = OneWayTrip.getInstance(page);
    this._roundTrip = RoundTrip.getInstance(page);
    this._multiTrip = MultiTrip.getInstance(page);
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new BookingFactory(page);
    return this.instance;
  }

  async createABookingForAFlightTrip(bookingInfo: FlightBookingInfo | RoundTripFlight): Promise<void> {
    switch (bookingInfo.typeOfTicket) {
      case 'oneWayTrip':
        await this._oneWayTrip.bookAOneWayTripFlight(bookingInfo);
        break;
      case 'roundTrip':
        await this._roundTrip.bookARoundTripFlight(bookingInfo as RoundTripFlight);
        break;
      case 'multiTrip':
        await this._multiTrip.bookAMultiTripFlight(bookingInfo);
        break;
      default:
        throw new Error(`Pick either oneWay, roundTrip or multitrip as an option`);
    }
  }
}
