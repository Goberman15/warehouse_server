const consumptionStorageCalculator = (location, totalArea, volumeQty) => {
    if (location.includes('Floor')) {
        return totalArea;
    } else if (location === 'Racking') {
        return volumeQty / 26.775;
    } else if (location === 'Shelving') {
        return volumeQty / 0.088;
    } else if (location === ' Cabinet') {
        return volumeQty / 0.02925;
    }
}

module.exports = consumptionStorageCalculator;
