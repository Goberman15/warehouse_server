const costLocalCalculator = (location, consumptionStorage) => {
    if (location === 'Floor') {
        return (consumptionStorage * 77826);
    } else if (location === 'Racking') {
        return (consumptionStorage * 763252);
    } else if (location === 'Shelving') {
        return (consumptionStorage * 1271830);
    } else if (location === 'Cabinet') {
        return (consumptionStorage * 782000);
    }
}

module.exports = costLocalCalculator;
