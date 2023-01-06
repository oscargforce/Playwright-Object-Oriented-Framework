import { Page, Locator } from '@playwright/test';

export class SelectCountry {
  private static instance: SelectCountry;
  readonly departureCityDropdownElement: Locator;
  readonly arrivalCityDropdownElement: Locator;

  private constructor(protected page: Page) {
    this.page = page;
    this.departureCityDropdownElement = page.locator('div[id*="originStation"]:visible').first();
    this.arrivalCityDropdownElement = page.locator('div[id*="destinationStation"]:visible').first();
  }

  static getInstance(page: Page) {
    if (this.instance?.page && page !== this.instance.page) return (this.instance = new SelectCountry(page));
    else if (SelectCountry.instance) return this.instance;
    this.instance = new SelectCountry(page);
    return this.instance;
  }
  async selectCountry(options: { type: 'DepartureCity' | 'arrivalCity'; nameOfCity: string }): Promise<void> {
    const selectedCountry = options.nameOfCity.toLowerCase();
    const dropDownModuleElement =
      options.type === 'DepartureCity' ? this.departureCityDropdownElement : this.arrivalCityDropdownElement;

    await dropDownModuleElement.waitFor({ state: 'visible' });

    const arrayOfCountryElements = await dropDownModuleElement.locator(`li`).all();

    for (const [index, li] of arrayOfCountryElements.entries()) {
      const country = await li.textContent();
      if (country?.toLowerCase().includes(selectedCountry)) return await li.click();
      else if (index + 1 === arrayOfCountryElements.length)
        throw new Error(`Playwright were unable to find a matching locator for: ${selectedCountry}`);
    }
  }
}
