var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var BPromise = require('bluebird');

var parse = require('./src/protocol').parse;
var points = require('./src/protocol').points;
var shouldHit = require('./src/protocol').shouldHit;

var initialBet = 1;
var state = undefined;
var shouldBet = true;
var Command = {
    'ROUND STARTING': reset,
    'SET': bet,
    'CARD': card,
    'BANK': bank,
    'STAY_OR_CARD': stayOrCard,
    'ROUND ENDED': nop
};

function nop() {}

function reset() {
    state = {
        cards: [],
        bank: []
    };
}

function bet() {
    shouldBet = true;

    if (shouldBet) {
        set(initialBet);
    }
    else {
        set(0);
    }
}

function card(value) {
    state.cards.push(parseCard(value));
}

function parseCard(value) {
    return Number.parseInt(value);
}

function bank(value) {
    state.bank.push(parseCard(value));
}

function stayOrCard() {
    var shouldHit = shouldHitCards();
    if ( shouldHit ) {
        requestCard();
    }
    else {
        stay();
    }
}

function shouldHitCards() {
    var player = points(state.cards);
    var bank = points(state.bank);

    return shouldHit(player, bank);
}

function stay() {
    send(`STAY;${name}`);
}

function requestCard() {
    send(`CARD;${name}`);
}

var host = '192.168.1.14';
var port = 22040;
var name = 'tobi';

function send(msg) {
    console.log('send', msg);
    return BPromise.fromCallback(callback => client.send(msg, port, host, callback));
}
function join() {
    return send(`JOIN;${name}`);
}

function set(amount) {
    return send(`SET;${amount};${name}`);
}

join();

client.on('message', msg => {
    var line = msg.toString('utf8');
    console.log('line', line);
    var message = parse(line);
    var cmd = Command[message.cmd] || nop;

    cmd.apply(this, message.args);
});

