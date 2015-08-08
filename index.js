var secureRandom = require('secure-random');
var _ = require('lodash');
var dw = {};
dw.en = require('diceware-wordlist-en');

function getRandomInt(min, max) {       
    // Create byte array and fill with 1 random number
    var byteArray = secureRandom(1, {type: 'Uint8Array'}) 
 
    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt(min, max);
    return min + (byteArray[0] % range);
}

function diceRoll() {
    return getRandomInt(1, 6);
}

function diceSeq(count) {
    var seq = [];
    for(var i=0; i<count; i++) {
        seq.push(diceRoll())
    }
    return seq.join("");
}

function getDices() {
    return diceSeq(5);
}

function getRandomWord(language) {
	return dw[language][getDices()];
}

function getRandomPassword(options) {
	options = _.assign({
		'language': 'en',
		'wordcount': 6,
		'format': 'string',
	}, options);
	if (!_.includes(['en'], options.language)) {
		throw(new Error("Unsupported language: "+options.language));
	}
	var words = [];
    for(var i=0; i<options.wordcount; i++) {
     words.push(getRandomWord(options.language));
    }
    if (options.format === 'array') {
    	return words;
    }
    else {
    	return words.join(' ');
    }
}

module.exports = getRandomPassword;
