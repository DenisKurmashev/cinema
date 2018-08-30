const deepCopy = (original) => { 
    let result = null;

    try {
        // Should remeber that parse+stringidy not works with non-serializable props
        // Also Dates will be parsed as Strings, not as Dates.
        var o = {
            a: 1,
            b: 2,
            sum: function() { return a + b; },
            data: new Date()
           };
           
           var o2 = JSON.parse(JSON.stringify(o));

        result = JSON.parse(JSON.stringify(original));
    } catch(ex) {
        console.log(ex);
        result = null;
    }

    return result;
}

const optimizeSession = (session) => {
    const roomNumber = session.roomNumber;
    let result = deepCopy(session);
    
    const currentRoomSchema = deepCopy(session.cinema.rooms[roomNumber]);
    delete currentRoomSchema._id;
    
    result.cinema.roomSchema = currentRoomSchema.placeSchema;

    delete result.cinema._id;
    delete result.cinema.rooms;
    delete result.film._id;

    return result;
};

const optimizeSessions = (sessions) => {
    if (!Array.isArray(sessions))
        return sessions;

    return sessions.map(item => optimizeSession(item)).reverse();
};

// Constants plz
const getPlaceCountFromRoomSchema = (schema) => {
    if (!Array.isArray(schema))
        return null;

    let count = 0;

    for (line of schema) 
        for (item of line) {
            if (item === 1) count++;
            else if (item === 2) count += count / 2;
            else if (item === 3) count += count / 3;
        }
        
    return Math.round(count);
};

const isMoreThanOnePlaceExist = (sessions) => {
    if (!Array.isArray(sessions)) 
        return sessions;

    return sessions.filter(item => {
        if (!item.selectedPlaces && !item.pendingPlaces)
            return true;

        const currentRoom = deepCopy(item.cinema.rooms[item.roomNumber]);

        const placeCount = getPlaceCountFromRoomSchema(currentRoom);

        if (item.selectedPlaces.length === placeCount || item.pendingPlaces.length === placeCount)
            return false;

        return true;
    });

};

// Constants plz
// Also, try to think how to would refactor this, e.g.:
// you need to sum all array up: [1,2,3,4...]
// imperative:
// let sum = 0;
// // for (let i =0; i< arr.length; i++) {
//  sum += arr[i]
// }
// vs declarate
// arr.reduce((curr, acc) => acc + curr, 0)
// Try to find a balance between good readability, good quality, optimize/speed and future extendable/maintainable
const findPlaceTypes = (roomSchema) => {
    let result = [];

    for (let i = 0; i < roomSchema.length; i++)
        for (let j = 0; j < roomSchema[i].length; j++) {
            if (roomSchema[i][j] === 1) { 
                result.push(1);
                continue;
            }
            if (roomSchema[i][j] === 2) { 
                result.push(2);
                continue;
            }
            if (roomSchema[i][j] === 3) {
                result.push(3);
                continue;
            }
        }

    return result;
};

const getUniqueArrayElements = (array) => {
    let obj = {};
    array.forEach(el => obj[el] = null);
    return Object.keys(obj);
}

const addRoomTypes = (_types, _session) => {
    const types = deepCopy(_types)
        .map(el => {
            delete el._id;
            return el;
        });

    let result = findPlaceTypes(_session.cinema.rooms[_session.roomNumber].placeSchema);
    result = getUniqueArrayElements(result);

    // set model field 'typesOfRoomSeats' equal empty array
    let session = deepCopy(_session);
    session.typesOfRoomSeats = [];

    for (let i = 0; i < types.length; i++) 
        for (let j = 0; j < result.length; j++) 
            if (types[i].matrixNumber === parseInt(result[j])) 
                session.typesOfRoomSeats.push(types[i]);

    return session;
}

const parsePlaceString = (placeString) => {
    let placeCoordinates;

    try {
        placeCoordinates = JSON.parse(placeString);
    } catch(ex) {
        console.log(ex);
        return null;
    }
    
    const result = {
        x: parseInt(placeCoordinates.x),
        y: parseInt(placeCoordinates.y),
    };

    if (result.x === null || !result.y === null)
        return null;
    
    return result;
}

module.exports = {
    deepCopy,
    optimizeSession,
    optimizeSessions,
    isMoreThanOnePlaceExist,
    findPlaceTypes,
    addRoomTypes,
    parsePlaceString,
};