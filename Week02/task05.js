function splitByPredicate(list, predicate) {
    var trueElements = [];
    var falseElement = [];

    for (var i = 0; i < list.length; ++i) {
        if (predicate(list[i])) {
            trueElements.push(list[i]);
        } else {
            falseElement.push(list[i]);
        }
    }

    return {
        trueElements,
        falseElement
    };
}

console.log(splitByPredicate([1, 2, 3, 4, 5, 6, 7], (x) => x % 2 === 0));