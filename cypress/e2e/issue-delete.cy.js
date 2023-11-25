import { faker } from '@faker-js/faker';
describe('Issue details editing', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
        createissue('Delete an issue')
      });
    });
    it('Should delete an issue and verify that it has been deleted', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });
        cy.get('[data-testid="modal:confirm"]').within(() => {    
            cy.get('button[class="sc-bwzfXH dIxFno sc-kGXeez bLOzZQ"]').click();
        });
        cy.wait(3000)
        cy.reload();
        cy.contains('Issue has been successfully deleted.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').should('have.length', '4');
        });
    });
    it('Should start deleting an issue but cancel it and verify that it hasnt been deleted', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });
        cy.get('[data-testid="modal:confirm"]').within(() => {    
            cy.get('button[class="sc-bwzfXH ewzfNn sc-kGXeez bLOzZQ"]').click();
        });
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:close"]').click();
        });
        cy.wait(1000)
        cy.reload();
        cy.contains('Issue has been successfully deleted.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').should('have.length', '5');
        });
    });
});

function createissue(name) {
    cy.get('.ql-editor').type('TEST_DESCRIPTION');
    cy.get('input[name="title"]').type('Delete an issue');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').contains(name).click();
    });
} 