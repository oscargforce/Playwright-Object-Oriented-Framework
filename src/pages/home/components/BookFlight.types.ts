import { TypeOfTicket } from '../../../utilities/test-data/enums';

type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

type Date = { year: number; month: Months; date: number };

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
