import { Months, TypeOfTicket } from '../../../utilities/test-data/enums';

type Date = { year: number; month: Months; date: number | 'randomDate' };

type AllowedAmountOfPassengers = 0 | 1 | 2 | 3 | 4;

type FlightBookingInfo = {
  typeOfTicket: TypeOfTicket.ONE_WAY_TRIP | TypeOfTicket.ROUND_TRIP | TypeOfTicket.MULTI_TRIP;
  depatureCity: string | [string, string, string];
  arrivalCity: string | [string, string, string];
  departureDate: Date;
  passengers?: {
    amountOfAdults: AllowedAmountOfPassengers;
    amountsOfChildren: AllowedAmountOfPassengers;
    amountOfInfants: AllowedAmountOfPassengers;
  };
  currency: 'INR' | 'AED' | 'USD';
};

type RoundTripFlight = FlightBookingInfo & { returnDate: Date };

export { RoundTripFlight, FlightBookingInfo, Date };
