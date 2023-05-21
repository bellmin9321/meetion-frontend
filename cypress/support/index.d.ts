import './commands';

type Method = 'POST' | 'GET' | 'DELETE';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, pwd: string): Chainable<null>;
    }
  }
}
