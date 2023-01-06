import { test as base, expect, request } from '@playwright/test';
import { TravelHome } from './home/TravelHome';

type Pages = {
  travelHomePage: TravelHome;
};

const test = base.extend<Pages>({
  travelHomePage: ({ page }, use) => {
    use(new TravelHome(page));
  },
});

export { test, expect, request };
