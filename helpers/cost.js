const partCost = (volume, location) => {
    if (location === 'Cabinet') {
        if (volume >= 0.0008) {
            return 102000;
        } else {
            return 68000;
        }
    } else if (location === 'Shelving') {
        return 181690;
    } else if (location === 'Racking') {
        return 109036;
    } else {
        return 77826;
    }
}

module.exports = partCost;
