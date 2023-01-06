import { APIResponse, Response } from '@playwright/test';

export async function checkIfResponseIsOk(data: {
  response: APIResponse | Response;
  nameOfFunction: string;
  requestURL: string;
}) {
  if (data.response.status() >= 400) {
    throw new Error(
      `Im at function ${data.nameOfFunction}
         RequestURL: ${data.requestURL}
         Status code: ${data.response.status()}
         Response body: ${await data.response.text()}`
    );
  }
}
