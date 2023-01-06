# Playwright Object-Oriented Framework.

This repository is just a demo framework for automation.  
I use an object-oriented approach using the Playwright Test library and implement known design patterns such as:
- Singleton pattern
- Strategy design pattern
- Factory design pattern 
- Single responsibility principle
- Page object model.

Please see the MIRO for the architectural design.

## A brief explanation of how the code works:

##### Practise page: https://rahulshettyacademy.com/dropdownsPractise/

See the config file for general information such as BaseUrl, global setup and more path: src/config/flight.config.ts. 

The framework starts at src/pages/fixtures.ts. Here we are using the playwrights' fixture feature and creating a new page object of the home page which can be imported to each test. See the documentation here.

The page I'm using is just a practice page with no other pages available.
We would initialize more page objects in this file if there were more pages.

The homepage is too big for one class to hold, so I've broken it into multiple components. Each component is an independent class with a single responsibility. For example, the booking component is only responsible for booking, not the navigation bar above.

The parent class "homepage" has one property, creating a new component instance in its constructor. Thus one can quickly jump between the classes with chaining. 

Example: 
```js
await travelHomePage.flightBookingComponent.bookAFlight()
```

I've then implemented "interfaces" or well types since I like the syntax more, so the tester won't make any type mistakes for each method.

For fun, I also added in some random test data and parametrized test data using JSON files.


For a complete detailed explanation, See the MIRO once again.