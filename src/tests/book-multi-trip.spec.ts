import { test } from '../pages/fixtures';
import { TypeOfTicket } from '../utilities/test-data/enums';
import { getCurrentYear, getNextMonth } from '../utilities/test-data/random-test-data';

test('Should work to book a multi trip', async ({ travelHomePage }) => {
  await travelHomePage.goTo();
  await travelHomePage.flightBookingComponent.bookAFlight({
    typeOfTicket: TypeOfTicket.MULTI_TRIP,
    depatureCity: ['Bagdogra', 'Amritsar', 'Bhopal'],
    arrivalCity: ['Chennai', 'Goa', 'Bangkok'],
    departureDate: { year: getCurrentYear(), month: getNextMonth(), date: 'randomDate' },
    passengers: { amountOfAdults: 2, amountOfInfants: 4, amountsOfChildren: 1 },
    currency: 'USD',
  });
});


