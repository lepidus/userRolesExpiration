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
    it('Admin expires reviewer role in journal', function () {
        cy.login('admin', 'admin', 'publicknowledge');
        cy.contains('a', 'Website').click();
		cy.waitJQuery();
		cy.get('#plugins-button').click();
		
        cy.contains('span', 'User Roles Expiration').parent().parent().within(() => {
            cy.get('.show_extras').click();
        });
        cy.contains('a', 'Expire role').click();
        cy.get('select[name="roleSelected"]').select('Reviewer');
        cy.contains('button', 'Expire').click();
        cy.wait(2000);
    });
    it('Role expiration did not affect other roles, even in another journal', function () {
        cy.login('jjanssen', null, 'publicknowledge');
        cy.get('.app__headerActions button').eq(1).click();
        cy.contains('a', 'Edit Profile').click();
        
        cy.get('.ui-tabs-anchor:contains("Roles")').click();

        cy.contains('label', 'Reviewer').within(() => {
            cy.get('input[name^=reviewerGroup]').should('not.be.checked');
        });
        cy.contains('label', 'Author').within(() => {
            cy.get('input[name^=authorGroup]').should('be.checked');
        });

        cy.contains('span', 'Register with other journals').parent().click();
        cy.contains('label', 'Brazilian Journal of Cosmethics').parent().within(() => {
            cy.get('input[name^=reviewerGroup]').should('be.checked');
        });
    });
    it('Role expiration does not affect executor user', function () {
        cy.login('admin', 'admin', 'publicknowledge');
        cy.get('.app__headerActions button').eq(1).click();
        cy.contains('a', 'Edit Profile').click();
        cy.get('.ui-tabs-anchor:contains("Roles")').click();
        cy.contains('label', 'Reviewer').within(() => {
            cy.get('input[name^=reviewerGroup]').check();
        });
        cy.contains('button', 'Save').click();

        cy.contains('a', 'Website').click();
		cy.waitJQuery();
		cy.get('#plugins-button').click();
        cy.contains('span', 'User Roles Expiration').parent().parent().within(() => {
            cy.get('.show_extras').click();
        });
        cy.contains('a', 'Expire role').click();
        cy.get('select[name="roleSelected"]').select('Reviewer');
        cy.contains('button', 'Expire').click();
        cy.wait(2000);

        cy.get('.app__headerActions button').eq(1).click();
        cy.contains('a', 'Edit Profile').click();
        cy.get('.ui-tabs-anchor:contains("Roles")').click();
        cy.contains('label', 'Reviewer').within(() => {
            cy.get('input[name^=reviewerGroup]').should('be.checked');
        });
    });
});
