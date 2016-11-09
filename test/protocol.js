var expect = require('chai').expect;

var parse = require('../src/protocol').parse;
var points = require('../src/protocol').points;
var soft = require('../src/protocol').soft;
var shouldHit = require('../src/protocol').shouldHit;

describe('protocol', function () {
    describe('parse', function () {
        it('should return command and arguments', function () {
            expect(parse('BANK;arg0;arg1;arg2')).to.deep.equal({cmd: 'BANK', args: ['arg0', 'arg1','arg2']});
        });
    });

    describe('points', function () {
        it('should return the amount', function () {
            expect(points([2,3])).to.equal(5);
            expect(points([2,5])).to.equal(7);
            expect(points([10,11])).to.equal(21);
        });
    });

    describe('soft', function () {
        it('should return the amount', function () {
            expect(soft([2,3])).to.equal(5);
            expect(soft([10,11])).to.equal(11);
            expect(soft([11,11])).to.equal(12);
        });
    });

    describe('shouldHit', function () {
        it('should hit if good', function () {
            expect(shouldHit(4,2)).to.be.true;
            expect(shouldHit(8,11)).to.be.true;
            expect(shouldHit(7,10)).to.be.true;
            expect(shouldHit(9,11)).to.be.true;
            expect(shouldHit(10,11)).to.be.true;
            expect(shouldHit(11,11)).to.be.true;
            expect(shouldHit(12,2)).to.be.true;
            expect(shouldHit(12,3)).to.be.true;
            expect(shouldHit(12,9)).to.be.true;
            expect(shouldHit(17,3)).to.be.false;
            expect(shouldHit(17,11)).to.be.false;
            expect(shouldHit(18,11)).to.be.false;
            expect(shouldHit(13,6)).to.be.false;
            expect(shouldHit(13,7)).to.be.true;
            expect(shouldHit(13,8)).to.be.true;
            expect(shouldHit(13,9)).to.be.true;
            expect(shouldHit(13,10)).to.be.true;
            expect(shouldHit(13,11)).to.be.true;
        });
    });
});