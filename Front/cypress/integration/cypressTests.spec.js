describe("RickanMorty", () => {
    
    it("visit site", () => {
      cy.visit("http://localhost:3000");
    });
      it("detail", () => {
        cy.visit("http://localhost:3000");
        cy.wait(20000);
        cy.get('#2').click();
      });
      it("ajout", () => {
        cy.visit("http://localhost:3000");
        cy.wait(20000);
        cy.get('#2').click();
        cy.contains("Ajouter au panier").click();
        cy.wait(20000);
        cy.contains("Enregistré dans le panier");
      });
      it("panier", () => {
        cy.visit("http://localhost:3000");
        cy.wait(20000);
        cy.contains("Voir mon panier").click();

      });

      it("supp", () => {
        cy.visit("http://localhost:3000");
        cy.wait(20000);
        cy.contains("Voir mon panier").click();
        cy.wait(20000);
        cy.contains("Supprimer du panier").click();
        cy.wait(20000);
        cy.contains("Produit bien supprimé");
        
      });
  });