/// <reference types="cypress" />

import { USER_DATA, REGISTRATION_SUCCESFFUL_MESSAGE, REGISTRATION_ERROR_MESSAGES } from '../../support/constants';

describe('User registration process', () => {
    beforeEach(() => {
        cy.visit('https://demo.nopcommerce.com/');
        cy.get('.ico-register').click();
        cy.url().should('include', '/register');
    });

    it('Successfully register', () => {
        registerUser(USER_DATA);
        cy.get('.result').should('have.text', REGISTRATION_SUCCESFFUL_MESSAGE.registrationSuccessfulMessage);
    });

    it('Fail registration with empty first name field', () => {
        const userData = { ...USER_DATA, firstName: '' };
        failRegistration(userData, '#FirstName-error', REGISTRATION_ERROR_MESSAGES.emptyFirstNameFieldErrorMessage);
    });

    it('Fail registration with empty last name field', () => {
        const userData = { ...USER_DATA, lastName: '' };
        failRegistration(userData, '#LastName-error', REGISTRATION_ERROR_MESSAGES.emptyLastNameFieldErrorMessage);
    });

    it('Fail registration with empty email field', () => {
        const userData = { ...USER_DATA, email: '' };
        failRegistration(userData, '#Email-error', REGISTRATION_ERROR_MESSAGES.emptyEmailFieldErrorMessage);
    });

    it('Fail registration with invalid email format', () => {
        const userData = { ...USER_DATA, email: 'invalidEmail' };
        failRegistration(userData, '#Email-error', REGISTRATION_ERROR_MESSAGES.invalidEmailFormatErrorMessage);
    });

    it('Fail registration with invalid password length', () => {
        const userData = { ...USER_DATA, password: '123' };
        failRegistration(userData, '#Password-error', REGISTRATION_ERROR_MESSAGES.invalidPasswordLenghtMessage);
    });

    it('Fail registration with empty password field', () => {
        const userData = { ...USER_DATA, password: '' };
        failRegistration(userData, '#Password-error', REGISTRATION_ERROR_MESSAGES.emptyPasswordFieldErrorMessage);
    });

    it('Fail registration with empty confirm password field', () => {
        const userData = { ...USER_DATA, confirmPassword: '' };
        failRegistration(userData, '#ConfirmPassword-error', REGISTRATION_ERROR_MESSAGES.emptyConfirmPasswordFieldErrorMessage);
    });

    it('Fail registration because password and confirm password do not match', () => {
        const userData = { ...USER_DATA, confirmPassword: 'password1234' };
        failRegistration(userData, '#ConfirmPassword-error', REGISTRATION_ERROR_MESSAGES.passwordMismatchErrorMessage);
    });

    it('Fail registration with existing email', () => {
        registerUser(USER_DATA);
        cy.get('.result').should('have.text', REGISTRATION_ERROR_MESSAGES.emailAlreadyExistsMessage);
    });

    function registerUser(userData) {
        cy.get('#gender-male').click();
        cy.get('#FirstName').type(userData.firstName);
        cy.get('#LastName').type(userData.lastName);
        cy.get('[name="DateOfBirthDay"]').select(userData.dateOfBirthDay);
        cy.get('[name="DateOfBirthMonth"]').select(userData.dateOfBirthMonth);
        cy.get('[name="DateOfBirthYear"]').select(userData.dateOfBirthYear);
        cy.get('#Email').type(userData.email);
        cy.get('#Company').type(userData.company);
        cy.get('#Newsletter').click();
        cy.get('#Password').type(userData.password);
        cy.get('#ConfirmPassword').type(userData.confirmPassword);
        cy.get('#register-button').click();
    }

    function failRegistration(userData, errorElement, errorMessage) {
        registerUser(userData);
        cy.get(errorElement).should('have.text', errorMessage);
    }
});
