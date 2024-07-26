describe('User Roles Expiration - Plugin configuration', function () {
	it('Configures plugin', function() {
		cy.login('dbarnes', null, 'publicknowledge');
		cy.contains('a', 'Website').click();

		cy.waitJQuery();
		cy.get('#plugins-button').click();

		cy.get('input[id^=select-cell-userrolesexpirationplugin]').check();
		cy.get('input[id^=select-cell-userrolesexpirationplugin]').should('be.checked');
	});
	it('Creates new journal on site', function () {
		cy.login('admin', 'admin', 'publicknowledge');
		cy.contains('.app__navItem', 'Administration').click();
		cy.contains('a', 'Hosted Journals').click();
		cy.contains('a', 'Create Journal').click();
		cy.waitJQuery();

		cy.get('input[name="name-en"]').type('Brazilian Journal of Cosmethics', {delay:0});
		cy.get('input[name="acronym-en"]').type('RBCOSME', {delay:0});
		cy.get('input[name="contactName"]').type('Solange Manfredo', {delay:0});
		cy.get('input[name="contactEmail"]').type('solange.manfredo@gmail.com', {delay:0});
		cy.get('select[name="country"]').select('Brazil');
		cy.get('input[name="urlPath"]').type('rbcosme', {delay:0});
		cy.get('input[name="supportedLocales"][value="en"]').check();
		cy.get('input[name="supportedLocales"][value="fr_CA"]').check();
		cy.get('input[name="primaryLocale"][value="en"]').check();
		cy.get('input[name="enabled"]').check();
		cy.get('.pkp_modal_panel button:contains("Save")').click();

		cy.get('.pkpFormPage__status:contains("Saving")', {timeout:25000}).should('not.exist');

		cy.contains('a', 'Hosted Journals').click();
		cy.contains('span', 'Brazilian Journal of Cosmethics');
		cy.contains('span', 'rbcosme');
	});
});
