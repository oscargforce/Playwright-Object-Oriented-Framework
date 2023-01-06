import { test } from '../pages/fixtures';
import { TypeOfTicket } from '../utilities/test-data/enums';

test('Should work to book a round trip', async ({ travelHomePage }) => {
  await travelHomePage.goTo();
  await travelHomePage.flightBookingComponent.bookAFlight({
    typeOfTicket: TypeOfTicket.ROUND_TRIP,
    depatureCity: 'Bagdogra',
    arrivalCity: 'Chennai',
    departureDate: { year: 2023, month: 'March', date: 25 },
    returnDate: { year: 2023, month: 'May', date: 22 },
    passengers: { amountOfAdults: 2, amountOfInfants: 0, amountsOfChildren: 0 },
    currency: 'USD',
  });
});
