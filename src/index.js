function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  function simpleCalculator(x, operator, y) {
    (x = +x), (y = +y);
    switch (operator) {
      case "*":
        return x * y;
        break;
      case "/":
        if (y === 0) {
          throw new Error("TypeError: Division by zero.");
        } else return x / y;
        break;
      case "+":
        return x + y;
        break;
      case "-":
        return x - y;
        break;
    }
  }

  function pureExprCalc(pureExpr) {
    pureExpr = pureExpr.trim();
    let pureExprArr = pureExpr.split(" ");
    for (let i = 0; i < pureExprArr.length - 1; i++) {
      if (pureExprArr[i] == "*" || pureExprArr[i] == "/") {
        let res = simpleCalculator(
          pureExprArr[i - 1],
          pureExprArr[i],
          pureExprArr[i + 1]
        );
        pureExprArr.splice(i - 1, 3, res);
        i = -1;
      }
    }

    for (let i = 0; i < pureExprArr.length - 1; i++) {
      if (pureExprArr[i] == "+" || pureExprArr[i] == "-") {
        let res = simpleCalculator(
          pureExprArr[i - 1],
          pureExprArr[i],
          pureExprArr[i + 1]
        );
        pureExprArr.splice(i - 1, 3, res);
        i = -1;
      }
    }
    return pureExprArr[0];
  }

  function parenthesesCheck(expr) {
    let parentheses = expr.match(/\(|\)/g);
    if (parentheses) {
      parentheses = parentheses.join('');
      for (let i = 0; i < parentheses.length; i++) {
        if (parentheses.indexOf('()') != -1) {
          parentheses = parentheses.replace('()', '');
          i = -1;
        };
      }
      if (parentheses.length > 0)
        throw new Error("ExpressionError: Brackets must be paired");
    }
  }

  parenthesesCheck(expr);
  let separatedExpr = expr.match(/[()\*\/+-]|\d+/g).join(" ");
  while (separatedExpr.includes("(")) {
    let parenthExpr = separatedExpr.match(/\([\s\d-\+\/\*.]+\)/)[0];
    let pureExpr = parenthExpr.slice(1, parenthExpr.length - 1);
    separatedExpr = separatedExpr.replace(parenthExpr, pureExprCalc(pureExpr));
  }

  return pureExprCalc(separatedExpr);





}

module.exports = {
  expressionCalculator
};