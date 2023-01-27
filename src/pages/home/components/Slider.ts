import { Locator, Page } from '@playwright/test';

export class Slider {
  private static instance: Slider;
  readonly slideNavigatorBtnElements: Locator;
  readonly sectionElement: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.slideNavigatorBtnElements = page.locator('[data-ikslider-control]');
    this.sectionElement = page.locator('[class="slider-container hide-mobile"]');
  }

  static getInstance(page: Page) {
    if (this.instance && page === this.instance.page) return this.instance;
    this.instance = new Slider(page);
    return this.instance;
  }
}
