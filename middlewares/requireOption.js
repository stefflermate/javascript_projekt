/**
 * Betölt egy függőséget egy objektumtárolóból
 * @param objectRepository objektumtároló
 * @param propertyName függőség neve
 * @returns {*}
 */

function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(`${propertyName} required`);
}

module.exports = requireOption;