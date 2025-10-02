describe('Create Employee Page', () => {
  it('affiche le formulaire et permet de créer un employé', () => {
    cy.visit('http://localhost:5173/') // adapte l’URL si besoin

    // Vérifie la présence du titre
    cy.contains('Create Employee').should('be.visible')

    // Remplit le formulaire
    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="dateOfBirth"]').click()
    cy.get('.calendar-day-btn').contains('1').click()
    cy.get('input[name="startDate"]').click()
    cy.get('.calendar-day-btn').contains('20').click()
    cy.get('input[name="street"]').type('123 Main St')
    cy.get('input[name="city"]').type('New York')
    cy.get('select[name="state"]').select('NY')
    cy.get('input[name="zipCode"]').type('10001')
    cy.get('select[name="department"]').select('Sales')

    // Soumet le formulaire
    cy.get('button[type="submit"]').click()

    // Vérifie l’apparition du modal de succès
    cy.contains('Employee created successfully!').should('be.visible')
  })
})
