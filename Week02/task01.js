function argsToArray(args) {
    return [].slice.call(args);
}

function areEqual(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }

    return true;
}

function memoize(fn) {
    var pastPassedArguments = [];
    var answers = [];

    function getIndexOfArguments(args) {
        for (var i = 0; i < pastPassedArguments.length; ++i) {
            if (areEqual(args, pastPassedArguments[i])) {
                return i;
            }
        }

        return -1;
    }

    return function() {
        var result;
        var argumentsArr = argsToArray(arguments);
        
        var index = getIndexOfArguments(argumentsArr);
        if (index == -1) {
            console.log("SMQTAM");
            var answer = fn.apply(undefined, argumentsArr);
            pastPassedArguments.push(argumentsArr);
            answers.push(answer);

            result = answer;
        } else {
            console.log("NE SMQTAM");
            result = answers[index];
        }

        return result;
    }
}

var sum = function (x, y) { return x + y; }
var memSum = memoize(sum);
console.log(memSum(2,3)); // пресмята, връща 5
console.log(memSum(3,3)); // пресмята, връща 6
console.log(memSum(2,3)); // директно връща 5 без да смята