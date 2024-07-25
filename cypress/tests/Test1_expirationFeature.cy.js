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
});
