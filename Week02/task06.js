function removeDuplicates(list, comparator) {
    var VISITED = '**___visited___**';
    var result = [];

    for (var i = 0; i < list.length; ++i) {
        if (list[i] !== VISITED) {
            result.push(list[i]);
            for (var j = i + 1; j < list.length; ++j) {
                if (comparator(list[i], list[j])) {
                    list[j] = VISITED;
                }
            }
        }
    }

    return result;
}

console.log(removeDuplicates([1, 2, 3, 1, 2, 3, 1, 1, 1, 4, 3, 3, 2, 2, 3, 1], (a, b) => a === b));