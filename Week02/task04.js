function getMinElement(list, comparator) {
    var min = list[0];

    for (var i = 1; i < list.length; ++i) {
        if (comparator(list[i], min)) {
            min = list[i];
        }
    }

    return min;
}

var lessOrEqual = (a, b) => a <= b;

console.log(getMinElement([5, 3, 7, -2, 10], lessOrEqual));