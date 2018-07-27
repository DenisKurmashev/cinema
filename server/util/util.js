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

    const result = Array.from(sessions);

    for (let i = 0; i < result.length; i++) 
        result[i] = optimizeSession(result[i]);

    return result;
};

module.exports = {
    deepCopy,
    optimizeSession,
    optimizeSessions,
};