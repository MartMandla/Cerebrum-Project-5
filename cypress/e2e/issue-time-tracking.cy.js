describe('Issue details editing', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
        cy.get('[data-testid="modal:issue-create"]').within(() => {
            cy.get('.ql-editor').type('TEST_DESCRIPTION');
            cy.get('input[name="title"]').type('title');
            cy.get('[data-testid="select:userIds"]').click();
            cy.get('[data-testid="select-option:Lord Gaben"]').click();
            cy.get('button[type="submit"]').click();
        });
        cy.wait(10000)
        cy.contains('title')
        .click()
      });
    });
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const getTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
    const inputfield ='input[class="sc-dxgOiQ HrhWu"]'
    const Estimated = 'h estimated';
    const Logged = 'h logged';
    const Remainng = 'h remaining';

    const estimatedTime = '45' ;
    const estimatedTimeUpdated = '25';
    const loggedTime = '10';
    const remainingTime = '5'
    it('Should add, edit and remove time estimation',() =>  {
        getIssueDetailsModal().within(() => {
            cy.contains('No time logged')
            cy.get(inputfield).type(estimatedTime);
            cy.contains(`${estimatedTime}${Estimated}`).should('be.visible');
            
            cy.get(inputfield).clear().type(estimatedTimeUpdated);
            cy.contains(`${estimatedTimeUpdated}${Estimated}`).should('be.visible');
           
            cy.get(inputfield).clear()
            cy.contains('No time logged').should('be.visible');
        });
    });    
    it('Should add and Remove time logged and time remaining ',() =>  {
        getIssueDetailsModal().within(() => {
            cy.contains('No time logged')
            cy.get(inputfield).type(estimatedTime);
            cy.get('[data-testid="icon:stopwatch"]').click();
        });
        getTrackingModal().within(() => {
            cy.get(inputfield).eq(0).type(loggedTime);
            cy.contains(`${loggedTime}${Logged}`).should('be.visible');
            cy.contains(`${estimatedTime}${Estimated}`).should('be.visible');
                
            cy.get(inputfield).eq(1).type(remainingTime);
            cy.contains(`${loggedTime}${Logged}`).should('be.visible');
            cy.contains(`${remainingTime}${Remainng}`).should('be.visible');
            
            cy.get(inputfield).eq(0).clear()
            cy.get(inputfield).eq(1).clear()
            cy.get('[data-testid="icon:close"]').click()
        });
        getIssueDetailsModal().within(() => {
            cy.get(inputfield).clear()
            cy.contains('No time logged').should('be.visible');
        });     
        
    });

});