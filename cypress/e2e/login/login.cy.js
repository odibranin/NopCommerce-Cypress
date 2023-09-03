import { USER_DATA } from '../../support/constants';

describe('Login process', () => {
    beforeEach(() => {
      cy.visit('https://demo.nopcommerce.com/');
      cy.get('.ico-login').click();
      cy.url().should('include', '/login');
    })

    it.only('Successfully log in with existing account credentials', () => {
        login(USER_DATA.email, USER_DATA.password);
        cy.get('.ico-logout').should('be.visible');
    })

    it('Log in with random username', () => {
        loginAndAssert(USER_DATA.randomEmail, USER_DATA.password, LOGIN_ERROR_MESSAGES.loginErrorMessage);
    })

    it('Log in with random password', () => {
        loginAndAssert(USER_DATA.email, USER_DATA.randomPassword, LOGIN_ERROR_MESSAGES.loginErrorMessage);
    })

    function login(username, password) {
        cy.get('#Email').type(username);
        cy.get('#Password').type(password);
        cy.get('form > .buttons > .button-1').click();
    }

    function loginAndAssert(username, password, expectedMessage) {
        login(username, password);

        if (expectedMessage) {
            cy.get('.message-error').invoke('text').then((text) => {
                const normalizedText = text.trim(); 
                expect(normalizedText).to.equal(expectedMessage);
            });
        }
    }
})
