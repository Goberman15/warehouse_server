const consumptionStorageCalculator = (location, totalArea, volumeQty) => {
    if (location === 'Floor') {
        return totalArea;
    } else if (location === 'Racking') {
        return volumeQty / 26775;
    } else if (location === 'Shelving') {
        return volumeQty / 0.088;
    } else if (location === ' Cabinet') {
        return volumeQty / 0.02925;
    }
}

module.exports = consumptionStorageCalculator;
