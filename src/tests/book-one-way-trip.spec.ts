import { test } from '../pages/fixtures';
import { TypeOfTicket } from '../utilities/test-data/enums';

  test.skip('Should work to book a one way trip', async ({ travelHomePage }) => {
    await travelHomePage.goTo();
    await travelHomePage.flightBookingComponent.bookAFlight({
      typeOfTicket: TypeOfTicket.ONE_WAY_TRIP,
      depatureCity: 'Bagdogra',
      arrivalCity: 'Vishakhapatnam',
      departureDate: { year: 2023, month: 'March', date: 25 },
      passengers: { amountOfAdults: 2, amountOfInfants: 0, amountsOfChildren: 0 },
      currency: 'USD',
    });
  });

