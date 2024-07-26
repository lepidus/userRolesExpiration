describe('User Roles Expiration - Expiration feature', function () {
	it('Expiration is only available to admin user', function() {
		cy.login('rvaca', null, 'publicknowledge');
		cy.contains('a', 'Website').click();
		cy.waitJQuery();
		cy.get('#plugins-button').click();
		cy.contains('span', 'User Roles Expiration').parent().parent().within(() => {
            cy.get('.show_extras').click();
        });
        cy.contains('a', 'Expire role').click();
        cy.contains('Only the site administrator can use this feature!');
        cy.logout();

        cy.login('admin', 'admin', 'publicknowledge');
        cy.contains('a', 'Website').click();
		cy.waitJQuery();
		cy.get('#plugins-button').click();
		cy.contains('span', 'User Roles Expiration').parent().parent().within(() => {
            cy.get('.show_extras').click();
        });
        cy.contains('a', 'Expire role').click();
        cy.contains('Please select which user role you wish to expire on this journal');
	});
    it('User changes own roles, also registering as reviewer in another journal', function () {
        cy.login('jjanssen', null, 'publicknowledge');
        cy.get('.app__headerActions button').eq(1).click();
        cy.contains('a', 'Edit Profile').click();
        
        cy.get('.ui-tabs-anchor:contains("Roles")').click();

        cy.contains('label', 'Author').within(() => {
            cy.get('input[name^=authorGroup]').check();
        });

        cy.contains('span', 'Register with other journals').parent().click();
        cy.contains('label', 'Brazilian Journal of Cosmethics').parent().within(() => {
            cy.get('input[name^=reviewerGroup]').check();
        });

        cy.contains('button', 'Save').click();
    });
});
