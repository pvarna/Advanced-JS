function argsToArray(args) {
    return [].slice.call(args);
}

function compose(fns) {
    var argumentsArr = argsToArray(arguments); 

    return function() {
        var acc = argsToArray(arguments)[0];
        for (var i = argumentsArr.length - 1; i >= 0; --i) {
            acc = argumentsArr[i](acc);
        }
        return acc;
    };
}

var addOne = (x) => x + 1;
var sqrt = (x) => x * x;
var log = (x) => console.log(x);

addOneSqrtAndPrint = compose(log, sqrt, addOne);

addOneSqrtAndPrint(1); // 4