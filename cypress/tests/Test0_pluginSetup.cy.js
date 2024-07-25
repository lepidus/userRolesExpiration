describe('User Roles Expiration - Plugin configuration', function () {
	it('Configures plugin', function() {
		cy.login('dbarnes', null, 'publicknowledge');
		cy.contains('a', 'Website').click();

		cy.waitJQuery();
		cy.get('#plugins-button').click();

		cy.get('input[id^=select-cell-userrolesexpirationplugin]').check();
		cy.get('input[id^=select-cell-userrolesexpirationplugin]').should('be.checked');
	});
});
