'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var secureRandom = require('secure-random');

var getRandomInt = function getRandomInt(min, max) {
  // Create byte array and fill with 1 random number
  var byteArray = secureRandom(1, { type: 'Uint8Array' });
  var r = max - min + 1;
  var maxRange = 256;
  if (byteArray[0] >= Math.floor(maxRange / r) * r) return getRandomInt(min, max);
  return min + byteArray[0] % r;
};

var diceRoll = function diceRoll() {
  return getRandomInt(1, 6);
};

var range = function range(max) {
  return Array.apply(null, Array(max)).map(function (_, i) {
    return i;
  });
};

var diceSeq = function diceSeq(count) {
  return range(count).map(function () {
    return diceRoll();
  }).join('');
};

var getDices = function getDices() {
  return diceSeq(5);
};

var getRandomWord = function getRandomWord(language) {
  return language[getDices()];
};

var getRandomPassword = function getRandomPassword(options) {
  options = Object.assign({
    'wordcount': 6,
    'format': 'string'
  }, options);
  if (_typeof(options.language) !== 'object') {
    throw new Error('Language empty');
  }
  if (Object.keys(options.language).length !== 7776) {
    throw new Error('Language length wrong');
  }
  var words = range(options.wordcount).map(function () {
    return getRandomWord(options.language);
  });
  return options.format === 'array' ? words : words.join(' ');
};

module.exports = getRandomPassword;