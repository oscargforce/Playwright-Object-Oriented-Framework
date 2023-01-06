import { Page } from '@playwright/test';
import { HeaderNavigationBar } from '../common-components/HeaderNavigationBar';
import { BookFlight } from './components/BookFlight';
import { FooterNavigationBar } from '../common-components/FooterNavigationBar';

export class TravelHome {
  readonly headerNavBarComponent: HeaderNavigationBar;
  readonly footerNavBarComponent: FooterNavigationBar;
  readonly flightBookingComponent: BookFlight;

  constructor(private page: Page) {
    this.page = page;
    this.headerNavBarComponent = HeaderNavigationBar.getInstance(page);
    this.footerNavBarComponent = FooterNavigationBar.getInstance(page);
    this.flightBookingComponent = BookFlight.getInstance(page);
  }

  async goTo(): Promise<void> {
    await this.page.goto('/dropdownsPractise');
  }
}
