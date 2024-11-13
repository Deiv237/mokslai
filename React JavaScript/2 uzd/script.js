function calculate(num1, num2, operation) {
    try {
        let result;
        switch (operation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 === 0) {
                    throw new Error ("Cannot divide by zero");
                }
                result = num1 / num2;
                break;
                default: throw new Error ("Invalid operation");
        }
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}
calculate(10, 2, "+"); // Should output 12
calculate(10, 2, "/"); // Should output 5
calculate(10, 0, "/"); // Should throw "Cannot divide by zero" error
calculate(10, 2, "&"); // Should throw "Invalid operation" error