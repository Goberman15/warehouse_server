const handlingCategorizer = (type, weight) => {
    if (type.includes('Container')) {
        return 'Reach Stacker';
    } else if (type.includes('Tyre')) {
        return tyresHandler(weight);
    } else if (type === 'Box') {
        return 'Bale Clamp';
    } else if (type === 'Parts') {
        return partsHandler(weight);
    } else if (type === 'Pipe' || type === 'Chain') {
        return pipeChainHandler(weight);
    } else {
        return otherHandler(weight);
    }
}

const tyresHandler = weight => {
    if (weight >= 2000) {
        return 'Crane'
    } else {
        return 'Bale Clamp';
    }
}

const partsHandler = weight => {
    if (weight >= 25000) {
        return 'Crane';
    } else if (weight >= 20000) {
        return 'Forklift 25 Ton'
    } else if (weight >= 15000) {
        return 'Forklift 20 Ton';
    } else if (weight >= 10000) {
        return 'Forklift 15 Ton';
    } else if (weight >= 7000) {
        return 'Forklift 10 Ton';
    } else if (weight >= 5000) {
        return 'Forklift 7 Ton';
    } else if (weight >= 3000) {
        return 'Forklift 5 Ton';
    } else if (weight >= 1000) {
        return 'Forklift 3 Ton / Reach Truck';
    } else if (weight >= 50) {
        return 'Hand Jack';
    } else {
        return 'People';
    }
}

const pipeChainHandler = weight => {
    if (weight >= 25000) {
        return 'Crane';
    } else if (weight >= 20000) {
        return 'Forklift 25 Ton'
    } else if (weight >= 15000) {
        return 'Forklift 20 Ton';
    } else if (weight >= 10000) {
        return 'Forklift 15 Ton';
    } else if (weight >= 7000) {
        return 'Forklift 10 Ton';
    } else if (weight >= 5000) {
        return 'Forklift 7 Ton';
    } else if (weight >= 3000) {
        return 'Forklift 5 Ton';
    } else {
        return 'Forklift 3 Ton';
    }
}

const otherHandler = weight => {
    if (weight >= 25000) {
        return 'Crane';
    } else if (weight >= 20000) {
        return 'Forklift 25 Ton'
    } else if (weight >= 15000) {
        return 'Forklift 20 Ton';
    } else if (weight >= 10000) {
        return 'Forklift 15 Ton';
    } else if (weight >= 7000) {
        return 'Forklift 10 Ton';
    } else if (weight >= 5000) {
        return 'Forklift 7 Ton';
    } else if (weight >= 3000) {
        return 'Forklift 5 Ton';
    } else if (weight >= 1000) {
        return 'Forklift 3 Ton';
    } else {
        return 'Hand Jack';
    } 
}

module.exports = handlingCategorizer;
