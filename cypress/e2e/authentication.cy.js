/// <reference types="cypress" />

describe('User registration process', () => {
    beforeEach(() => {
      cy.visit('https://demo.nopcommerce.com/');
      cy.get('.ico-register').click();
      cy.url().should('include', '/register');
    });
  
    it('Successfully register with new email', () => {
      cy.get('#gender-male').click();
      cy.get('#FirstName').type('John');
      cy.get('#LastName').type('Dough');

      cy.get('[name="DateOfBirthDay"]').select('10')  
      cy.get('[name="DateOfBirthMonth"]').select('9') 
      cy.get('[name="DateOfBirthYear"]').select('1999') 
      
      cy.get('#Email').type('johndough13@gmail.com');
      cy.get('#Company').type("Cinema City")
      cy.get('#Newsletter').click()
      cy.get('#Password').type("password123")
      cy.get('#ConfirmPassword').type("password123") 
      cy.get('#register-button').click();

      cy.get('.result').should('have.text', 'Your registration completed');
    });
  
    it('Fail registration with existing email', () => {
      cy.get('#gender-male').click();
      cy.get('#FirstName').type('John');
      cy.get('#LastName').type('Dough');

      cy.get('[name="DateOfBirthDay"]').select('10')  
      cy.get('[name="DateOfBirthMonth"]').select('9') 
      cy.get('[name="DateOfBirthYear"]').select('1999') 

      cy.get('#Email').type('johndough13@gmail.com'); 
      cy.get('#Company').type("Cinema City")
      cy.get('#Newsletter').click()
      cy.get('#Password').type("password123")
      cy.get('#ConfirmPassword').type("password123") 

      cy.get('#register-button').click();
      cy.get('.result').should('have.text', 'The specified email already exists');
    });
  });