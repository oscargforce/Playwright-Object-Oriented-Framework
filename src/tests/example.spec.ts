import { test } from '../pages/fixtures';
import { FlightBookingInfo } from '../pages/home/components/BookFlight.types';
import { TypeOfTicket } from '../utilities/test-data/enums';

// This test case will do all of "book- multiTrip/oneWayTrip/roundTrip.spec.ts" test cases in one go.
// Much less code. If you wrap it up in a test.describe you can run the loop in parallel.

const typeOfFlightTicket:Pick<FlightBookingInfo, 'arrivalCity' | 'depatureCity' | 'typeOfTicket'>[] = [
  { typeOfTicket: TypeOfTicket.ONE_WAY_TRIP, arrivalCity: 'Bagdogra', depatureCity: 'Chennai' },
  { typeOfTicket: TypeOfTicket.MULTI_TRIP, arrivalCity: ['Chennai', 'Goa', 'Bangkok'], depatureCity: ['Bagdogra', 'Amritsar', 'Bhopal'] },
  { typeOfTicket: TypeOfTicket.ROUND_TRIP, arrivalCity: 'Bagdogra', depatureCity: 'Chennai' },
];

for (const ticket of typeOfFlightTicket) {
  test.describe.parallel(() => {
    test(`Should work to book a ${ticket.typeOfTicket}`, async ({ travelHomePage }) => {
      await travelHomePage.goTo();
      await travelHomePage.flightBookingComponent.bookAFlight({
        typeOfTicket: ticket.typeOfTicket,
        depatureCity: ticket.depatureCity,
        arrivalCity: ticket.arrivalCity,
        departureDate: { year: 2023, month: 'March', date: 25 },
        returnDate: { year: 2023, month: 'May', date: 22 },
        passengers: { amountOfAdults: 2, amountOfInfants: 0, amountsOfChildren: 0 },
        currency: 'USD',
      });
    });
  });
}
