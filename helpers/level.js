const levelCategorizer = (weight, location) => {
    if (location === 'Cabinet') {
        return cabinetLevel(weight);
    } else if (location === 'Shelving') {
        return shelfLevel(weight);
    } else if (location === 'Racking') {
        return rackLevel(weight);
    } else {
        return '';
    }
}

const cabinetLevel = weight => {
    if (weight >= 200) {
        return 'Level A / B';
    } else if (weight >= 160) {
        return 'Level C / D / F / G';
    } else if (weight >= 80) {
        return 'Level H / J / K';
    }
}

const shelfLevel = weight => {
    if (weight >= 200) {
        return 'Level A';
    } else if (weight >= 160) {
        return 'Level B';
    } else if (weight >= 128) {
        return 'Level C';
    } else if (weight >= 102) {
        return 'Level D';
    } else if (weight >= 82) {
        return 'Level E';
    } else if (weight >= 66) {
        return 'Level F';
    } else {
        return 'Level G';
    } 
}

const rackLevel = weight => {
    if (weight >= 1600) {
        return 'Level 1';
    } else if (weight >= 1280) {
        return 'Level 2'
    } else if (weight >= 1120) {
        return 'Level 3'
    } else if (weight >= 960) {
        return 'Level 4'
    } else if (weight >= 800) {
        return 'Level 5'
    } else if (weight >= 640) {
        return 'Level 6'
    } else if (weight >= 480) {
        return 'Level 7'
    }
}

module.exports = levelCategorizer;
