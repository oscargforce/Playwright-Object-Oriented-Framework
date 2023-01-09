import { test } from '../pages/fixtures';
import { Months, TypeOfTicket } from '../utilities/test-data/enums';
import { getCurrentYear, getNextMonth } from '../utilities/test-data/random-test-data';

// Bad way.
test.skip('Should work to book a one way trip ', async ({ travelHomePage, page }) => {
  await travelHomePage.goTo();
  await travelHomePage.flightBookingComponent.bookAFlight({
    typeOfTicket: TypeOfTicket.ONE_WAY_TRIP,
    depatureCity: 'Bagdogra',
    arrivalCity: 'Vishakhapatnam',
    // After 2023/01/25 I have to update to a future date, since you can't go back in time and book a flight. With multiple test cases = high maintaincance
    departureDate: { year: 2023, month: Months.JANUARY, date: 25 },
    passengers: { amountOfAdults: 2, amountOfInfants: 0, amountsOfChildren: 0 },
    currency: 'USD',
  });
});

// Taking advantage of dayjs library which will always set current year / next month / random date. No maintaincance
test('Should work to book a one way trip', async ({ travelHomePage, page }) => {
  const nextMonth = getNextMonth();
  const currentYear = getCurrentYear();

  await travelHomePage.goTo();
  await travelHomePage.flightBookingComponent.bookAFlight({
    typeOfTicket: TypeOfTicket.ONE_WAY_TRIP,
    depatureCity: 'Bagdogra',
    arrivalCity: 'Vishakhapatnam',
    departureDate: { year: currentYear, month: nextMonth, date: 'randomDate' },
    passengers: { amountOfAdults: 2, amountOfInfants: 0, amountsOfChildren: 0 },
    currency: 'USD',
  });
});
