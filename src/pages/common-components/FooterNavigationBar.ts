import { Page, Locator } from '@playwright/test';
import { FooterNavBarMenuItems } from './NavigationBar.types';

export class FooterNavigationBar {
  private static instance: FooterNavigationBar;
  private sectionElement: Locator;

  private constructor(private page: Page) {
    this.page = page;
    this.sectionElement = page.locator('#traveller-home');
  }

  static getInstance(page: Page) {
    if (this.instance?.page && page !== this.instance.page) return (this.instance = new FooterNavigationBar(page));
    else if (FooterNavigationBar.instance) return this.instance;
    this.instance = new FooterNavigationBar(page);
    return this.instance;
  }

  async clickOnMenuItem(menuItem: FooterNavBarMenuItems): Promise<void> {
    await this.sectionElement.getByText(menuItem).click();
  }
}
