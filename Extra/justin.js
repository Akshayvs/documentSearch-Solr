map([1, 2, 3, 4, 5], function(error, result) {
    if (error) {
        throw error;
    } else {
        console.log(result);
    }
    //outputs: [ 2, 3, 4, 5, 6 ]
});

function map(items, callback) {
    mapRecursive(items, 0, [], callback);
}

function mapRecursive(items, index, results, callback) {

    if(items.length === index) {
        return callback(null, results);
    }

    addOneAsync(items[index], function(error, result) {
        if(error) {
            return callback(error);
        }
        results[index] = result;
        mapRecursive(items, index + 1, results, callback);
    });
}

function addOneAsync(input, callback) {
    process.nextTick(callback.bind(null, null, input + 1));
}