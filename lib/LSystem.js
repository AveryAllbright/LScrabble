/* L-System Class
 * Author: Steven Yi
 *
 * Alphabet is implicit, encoded within the rules and processing code
 */
class LSystem {
  constructor() { 
    // holds our production rules, mapping from input char to output
    this.rules = new Map();
  }

  // Chainable addRule() implementation
  addRule(c, rule) {
    this.rules.set(c, rule);
    return this;
  }

  // process sentence character by character
  // concatenating the production successor values
  // and returns the result. Will pass through any symbols
  // that do not have any production rules attached.
  // If an array as found as the rule, process it as a 
  // stochastic rule and test against probability
  process(sentence) {
    let result = '';
    for(let i = 0; i < sentence.length; i++) {
      let c = sentence[i];

      if(this.rules.has(c)) {
        let rule = this.rules.get(c); 
       
        if(typeof(rule) == 'string') {
          result += rule;
        } else {
          // assume it is a list
          let randVal = Math.random();
          let test = 0;
          for(let i = 0; i < rule.length; i += 2) {
            test += rule[i];
            if(randVal < test) {
              result += rule[i + 1];
              break;
            }
          }
        }

      } else {
        result += c;
      }
    }
    return result;
  }

  // Generatie result of processing axiom x number of generations
  // where generation 0 is the axiom itself
  generate(axiom, generations) {
    let current = axiom;
    for(let i = 0; i < generations; i++) {
      current = this.process(current); 
    }
    return current;
  }
}
