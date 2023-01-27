import { Locator, Page } from '@playwright/test';
import { HeaderNavBarMenuItems } from './NavigationBar.types';

export class HeaderNavigationBar {
  private static instance: HeaderNavigationBar;
  private sectionElement: Locator;

  private constructor(private page: Page) {
    this.page = page;
    this.sectionElement = page.locator('.search-buttons-heading');
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new HeaderNavigationBar(page);
    return this.instance;
  }

  async clickOn(menuItem: HeaderNavBarMenuItems): Promise<void> {
    await this.sectionElement.getByTitle(menuItem).click();
  }
}
