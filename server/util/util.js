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

module.exports = {
    deepCopy,
    optimizeSession,
    optimizeSessions,
    isMoreThanOnePlaceExist
};