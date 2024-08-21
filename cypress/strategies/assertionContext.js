class AssertionContext {
    setStrategy(strategy) {
      this.strategy = strategy;
      return this;
    }
  
    executeStrategy(...args) {
      if (!this.strategy) {
        throw new Error('Strategy not set');
      }
      this.strategy.execute(...args);
      return this;
    }
  }
  
  export default AssertionContext;  