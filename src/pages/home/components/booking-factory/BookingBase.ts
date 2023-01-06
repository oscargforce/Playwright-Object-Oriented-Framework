import { Page, Locator } from '@playwright/test';
import { FlightBookingInfo } from '../BookFlight.types';
import { SelectCountry } from '../booking-modals/SelectCountry';
import { SelectDate } from '../booking-modals/SelectDate';
import { SelectPassengers } from '../booking-modals/SelectPassengers';

export class BookingBase {
  private sectionElement: Locator;
  private selectCurrencyDropDownElement: Locator;
  protected depatureCities: Locator;
  protected arrivalCities: Locator;
  protected returnDateElement: Locator;
  protected departDateDivElement: Locator;
  readonly getSelectCountryModal: SelectCountry;
  readonly getSelectDateModal: SelectDate;
  readonly getSelectPassengersModal: SelectPassengers;
  readonly searchFlightBtnElement: Locator;

  constructor(protected page: Page) {
    this.page = page;
    this.getSelectCountryModal = SelectCountry.getInstance(page);
    this.getSelectDateModal = SelectDate.getInstance(page);
    this.getSelectPassengersModal = SelectPassengers.getInstance(page);
    this.sectionElement = page.locator('#flightSearchContainer');
    this.selectCurrencyDropDownElement = page.locator('#ctl00_mainContent_DropDownListCurrency');
    this.depatureCities = this.sectionElement.locator('input[id*="originStation"]');
    this.arrivalCities = this.sectionElement.locator('input[id*="destinationStation"]');
    this.returnDateElement = this.sectionElement.locator('.picker-second');
    this.departDateDivElement = this.sectionElement.locator('#ctl00_mainContent_view_date1');
    this.searchFlightBtnElement = this.sectionElement.locator('#ctl00_mainContent_btn_FindFlights');
  }

  protected async setTypeOfFlightTo(options: 'OneWay' | 'RoundTrip' | 'TripPlanner'): Promise<void> {
    await this.sectionElement.locator(`[value="${options}"]`).click();
  }

  protected async selectCurrency(bookingInfo: Pick<FlightBookingInfo, 'currency'>): Promise<void> {
    await this.selectCurrencyDropDownElement.selectOption(bookingInfo.currency);
    await this.searchFlightBtnElement.click();
  }
}
