import { expect, test } from '../pages/fixtures';

test(`Slider should switch picture automatically`, async ({ travelHomePage }) => {
  await travelHomePage.goTo();
  const slides = await travelHomePage.slideComponent.slideNavigatorBtnElements.all();
  for (let i = 0; i < slides.length; i++) {
    // Abusing playwrights first assertions with auto wait until the condition is satisfied.
    // Assert that .is-active is shown.
    await expect.soft(slides[i]).toHaveClass(/.*is-active/, { timeout: 10000 });
    // After 4 seconds .is-active should dissapear and jump over to the next slide.
    await expect.soft(slides[i]).not.toHaveClass(/.*is-active/, { timeout: 10000 });
  }
});

test(`Visual test. Slider should switch picture automatically`, async ({ travelHomePage }) => {
    await travelHomePage.goTo();
    const slides = await travelHomePage.slideComponent.slideNavigatorBtnElements.all();
    for (let i = 0; i < slides.length; i++) {
    // Using expect as a waitForStatement, for the next img to come. If the images would been switched by API I would've waited for the response instead.
    // Allthough this is a sneaky work around :) 
      await expect.soft(slides[i]).toHaveClass(/.*is-active/, { timeout: 10000 });
      await expect.soft(travelHomePage.slideComponent.sectionElement).toHaveScreenshot(`slider-img-${i}.png`)
    }
  });
