class VisitDecorator {
    constructor() {
      this.originalVisit = cy.visit; // Save the original cy.visit function
    }
  
    // Method to override cy.visit
    visit(url, options) {
      const startTime = new Date().getTime();
      
      // Log the URL being visited
      cy.log(`Navigating to: ${url}`);
  
      // Call the original cy.visit with the given arguments
      this.originalVisit(url, options);
  
      // Log the time it takes for the page to load
      cy.then(() => {
        const endTime = new Date().getTime();
        const loadTime = endTime - startTime;
        cy.log(`Page loaded in ${loadTime} ms`);
      });
    }
  }
  
  export default VisitDecorator;