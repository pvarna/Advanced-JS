function argsToArray(args) {
    return [].slice.call(args);
}

function curry(fn) {
    return function helper() {
        var arity = fn.length;
        // console.log('Arity: ', arity);
        var argumentsArr = argsToArray(arguments);
        var numberofArgumentsPassed = argumentsArr.length;
        // console.log('Number of arguments: ', numberofArgumentsPassed, 'arguments', argumentsArr);

        if (arity === numberofArgumentsPassed) {
            return fn.apply(undefined, argumentsArr);
        } else {
            return function() {
                var allArguments = argumentsArr.concat(argsToArray(arguments));
                return helper.apply(undefined, allArguments);
            }
        }
    }
}

function trippleAdd(a, b, c) {
    return a + b + c;
}

cTrippleAdd = curry(trippleAdd);

console.log(cTrippleAdd(1)(2)(3)); //6
console.log(cTrippleAdd(1, 2)(3)); //6
console.log(cTrippleAdd(1, 2, 3)); //6