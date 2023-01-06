import { expect, test } from '../pages/fixtures';

test(`You should only be able to add max 4 children and 4 infants`, async ({ travelHomePage }) => {
  const selectPassengerModal = travelHomePage.flightBookingComponent.getSelectPassengersModal;

  await travelHomePage.goTo();
  await selectPassengerModal.passengerDivElement.click();
  await selectPassengerModal.addChildPassengerBtnElement.click({ clickCount: 6 });
  await selectPassengerModal.addInfantPassengerBtnElement.click({ clickCount: 6 });

  // Some reason the "+" sign is a span. toBeDisabled() Therefor does not work. Only button, input, select, textarea, option, optgroup can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored by the browser.
  // Work around is to add more clicks to the element and check attribute and assert text.
  await expect.soft(selectPassengerModal.addChildPassengerBtnElement).toHaveAttribute('disabled', 'disabled');
  await expect.soft(selectPassengerModal.addInfantPassengerBtnElement).toHaveAttribute('disabled', 'disabled');

  await expect.soft(selectPassengerModal.spanChildElement).toHaveText('4');
  await expect.soft(selectPassengerModal.spanInfantElement).toHaveText('4');
  await expect.soft(selectPassengerModal.passengerDivElement).toHaveText('1 Adult, 4 Child, 4 Infant');
});

test(`You should only be able to add max 9 Passengers`, async ({ travelHomePage, page }) => {
  const selectPassengerModal = travelHomePage.flightBookingComponent.getSelectPassengersModal;
  let alertMessage: string | undefined;
  await travelHomePage.goTo();
  await selectPassengerModal.passengerDivElement.click();
  //  await page.pause();
  await Promise.all([
    page.on('dialog', (alertPopUp) => {
      alertMessage = alertPopUp.message();
      alertPopUp.accept();
    }),
    selectPassengerModal.addAdultPassengerBtnElement.click({ clickCount: 9, delay: 100 }),
  ]);

  expect(alertMessage).toBe(
    'You are allowed a maximum of 9 passengers per booking online. If your party is larger than this, please call our reservation center.'
  );
});

test(`Expect default passenger to be one adult`, async ({ travelHomePage }) => {
  const selectPassengerModal = travelHomePage.flightBookingComponent.getSelectPassengersModal;
  await travelHomePage.goTo();
  await expect.soft(selectPassengerModal.passengerDivElement).toHaveText('1 Adult');
  await selectPassengerModal.passengerDivElement.click();
  await expect(selectPassengerModal.spanAdultElemnt).toHaveText('1');
});
