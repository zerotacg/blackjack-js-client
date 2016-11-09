function parse(line) {
    var args = line.split(';');
    var cmd = args[0];
    args.shift();

    return {cmd, args};
}

function points(cards) {
    return cards.reduce((total, current) => total + current, 0);
}

function soft(cards) {
    var asses = cards.filter(value => value === 11);
    while( asses.length ) {
        var hard = points(cards);

        asses.pop();
    }
    return cards.map(value => value === 11 ? 1 : value).reduce((total, current) => total + current, 0);
}

function shouldHit(player, bank) {
    console.log('should hit', player, bank);
    if ( 4 <= player && player <= 11 && bank <= 11 ) {
        return true;
    }

    if ( player === 12 && 2 <= bank && bank <= 3 ) {
        return true;
    }

    if ( 12 <= player && player <= 16 && 7 <= bank ) {
        return true;
    }

    return false;
}

module.exports = {
    parse,
    points,
    soft,
    shouldHit
};