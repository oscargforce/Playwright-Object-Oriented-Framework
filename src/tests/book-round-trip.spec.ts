import { test } from '../pages/fixtures';
import { TypeOfTicket } from '../utilities/test-data/enums';
import { getCurrentYear, getNextMonth } from '../utilities/test-data/random-test-data';

test('Should work to book a round trip', async ({ travelHomePage }) => {
  const currentYear = getCurrentYear();
  const nextMonth = getNextMonth();

  await travelHomePage.goTo();
  await travelHomePage.flightBookingComponent.bookAFlight({
    typeOfTicket: TypeOfTicket.ROUND_TRIP,
    depatureCity: 'Bagdogra',
    arrivalCity: 'Chennai',
    departureDate: { year: currentYear, month: nextMonth, date: 'randomDate' },
    // randomDate is optional
    returnDate: { year: currentYear, month: getNextMonth({ addition: 2 }), date: 22 },
    passengers: { amountOfAdults: 2, amountOfInfants: 0, amountsOfChildren: 0 },
    currency: 'USD',
  });
});
