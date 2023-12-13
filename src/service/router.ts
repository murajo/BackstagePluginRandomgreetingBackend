import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { Config } from '@backstage/config';

export interface RouterOptions {
  logger: Logger;
  config?: Config;
}

interface Greeting {
  id: number;
  greeting: string;
  imageurl: string;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });
  
  router.get('/greeting', (_, response) => {
    handleGreetingRequest(response);
  });

  router.use(errorHandler());
  return router;
}

function handleGreetingRequest(response: express.Response) {
  const greetings: Greeting[] = [
    { id: 1, greeting: 'Good morning', imageurl: 'https://3.bp.blogspot.com/-OVuA7GeexRo/WM9YAotBRiI/AAAAAAABCu0/NSY8q78nM2gAeGQGEzewiUWJiwhSjI_hQCLcB/s400/nebusoku_tetsuya_ake_man_smile.png' },
    { id: 2, greeting: 'Hello', imageurl: 'https://4.bp.blogspot.com/-6zjo3kUu7ko/VJ6XK2pggVI/AAAAAAAAqGg/skf8wO3bD_w/s400/time2_hiru.png' },
    { id: 3, greeting: 'Good evening', imageurl: 'https://3.bp.blogspot.com/-AtR9JsjOzGw/UchCEu3G3cI/AAAAAAAAVJ0/uDhqCfTbz2Q/s400/nebusoku.png' },
  ];
  const randomGreeting = getRandomElement(greetings);
  response.json(randomGreeting);
}

function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
