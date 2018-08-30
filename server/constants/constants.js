// In real world you should pick an object for this case and you should omit the 0 places.
const DEFAULT_ROOM_SCHEMAS = [
    {
        placeSchema: [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 2, 2, 0, 2, 2, 0, 0, 3, 3, 3 ],
        ]
    },
    {
        placeSchema: [
            [ 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1 ],
            [ 0, 2, 2, 0, 2, 2, 0 ],
        ]
    }
];

module.exports = {
    DEFAULT_ROOM_SCHEMAS
};