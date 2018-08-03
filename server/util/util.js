const deepCopy = (original) => JSON.parse(JSON.stringify(original));

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
    // {placeString} format = "X-Y"
    // where {X} - number of row
    // and   {Y} - number of column
    if (!/(\d+)-(\d+)/.test(placeString))
        return null;
    
    const placeCoordinates = placeString.split("-");

    const result = {
        x: parseInt(placeCoordinates[0]),
        y: parseInt(placeCoordinates[1]),
    };

    if (!result.x || !result.y)
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