const { places, sights } = require('./places_db.json');
const { userPreferences } = require('./users.json');

module.exports = () => ({
    userPreferences: userPreferences,
    places: places,
    sights: sights
});