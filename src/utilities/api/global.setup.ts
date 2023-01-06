import { request, FullConfig } from '@playwright/test';
import { checkIfResponseIsOk } from './response';

// A joke always helps to calm the nerves before flying above 10,000 feet.

async function globalSetup(config: FullConfig) {
  const requestContext = await request.newContext();

  const randomChuckNorrisJokeUrl = `https://api.chucknorris.io/jokes/random`;

  const response = await requestContext.get(randomChuckNorrisJokeUrl);
  await checkIfResponseIsOk({
    response: response,
    nameOfFunction: 'globalSetup',
    requestURL: randomChuckNorrisJokeUrl,
  });

  const { value } = await response.json();
  console.log(value);
}
export default globalSetup;
