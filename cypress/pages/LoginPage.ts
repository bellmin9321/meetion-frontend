export class LoginPage {
  loginPage_email = '[type="email"]';
  loginPage_pwd = '[type="password"]';
  loginPage_loginBtn = '[type="submit"]';

  navigate(url: string) {
    cy.visit(url);
  }

  typeEmail(email: string) {
    cy.get(this.loginPage_email).type(email);
  }

  typePassword(pwd: string) {
    cy.get(this.loginPage_pwd).type(pwd);
  }

  clickLogin() {
    cy.get(this.loginPage_loginBtn).click();
  }
}
