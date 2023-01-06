import { test } from '../pages/fixtures';
import { TypeOfTicket } from '../utilities/test-data/enums';

test('Should work to book a multi trip', async ({ travelHomePage }) => {
  await travelHomePage.goTo();
  await travelHomePage.flightBookingComponent.bookAFlight({
    typeOfTicket: TypeOfTicket.MULTI_TRIP,
    depatureCity: ['Bagdogra', 'Amritsar', 'Bhopal'],
    arrivalCity: ['Chennai', 'Goa', 'Bangkok'],
    departureDate: { year: 2023, month: 'March', date: 25 },
    passengers: { amountOfAdults: 2, amountOfInfants: 4, amountsOfChildren: 1 },
    currency: 'USD',
  });
});


