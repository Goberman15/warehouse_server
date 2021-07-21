const dimensionCategorizer = (type, volume, diameter) => {
    if (type.includes('Tyre')) {
        return tyreCategorizer(diameter);
    } else if (type === 'Pallet' && type.includes('Container')) {
        return '';
    } else {
        return nonTyreCategorizer(volume);
    } 
}

const tyreCategorizer = diameter => {
    if (diameter >= 90) {
        return 'Giant';
    } else if (diameter >= 60) {
        return 'Large';
    } else if (diameter >= 40) {
        return 'Medium'
    } else {
        return 'Small';
    }
}

const nonTyreCategorizer = volume => {
    if (volume >= 0.006) {
        return 'Large';
    } else if (volume >= 0.001) {
        return 'Medium';
    } else if (volume >= 0.000125) {
        return 'Small'
    } else {
        return 'Very Small';
    }
}

module.exports = dimensionCategorizer;