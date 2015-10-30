var expect = require('chai').expect,
	_ = require('lodash'),
  scapegoat = require('../index');

describe('wordlist', function() {
  it('should return a string by default', function() {
    expect(scapegoat()).to.be.a('string');
  });

  it('should return 6 words by default', function() {
    expect(scapegoat().split(' ').length).to.equal(6);
  });

  it('should return an array if requested', function() {
    expect(scapegoat({'format': 'array'})).to.be.a('array');
  });

  it('should return an 6 item array in array mode by default', function() {
    expect(scapegoat({'format': 'array'}).length).to.equal(6);
  });

  it('should obey requested length in string mode', function() {
    expect(scapegoat({'wordcount': 11}).split(' ').length).to.equal(11);
  });

  it('should obey requested length in array mode', function() {
    expect(scapegoat({'format': 'array', 'wordcount': 11}).length).to.equal(11);
  });

  it('should support en', function() {
    expect(function() {
      scapegoat({'language': 'en'});
    }).to.not.throw(Error);
  });

  it('should support jp', function() {
    expect(function() {
      scapegoat({'language': 'jp'});
    }).to.not.throw(Error);
  });

  it('should support swe', function() {
    expect(function() {
      scapegoat({'language': 'swe'});
    }).to.not.throw(Error);
  });

  it('should support sp', function() {
    expect(function() {
      scapegoat({'language': 'sp'});
    }).to.not.throw(Error);
  });

  it('should throw an error if asked for an unsupported language', function() {
    expect(function() {
      scapegoat({'language': 'bogusTalk'});
    }).to.throw(Error);
  });
});
