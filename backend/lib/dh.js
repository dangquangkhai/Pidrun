// //diffie hellman javascript
// var forge = require('node-forge');
// var BigInteger = forge.jsbn.BigInteger;
// var bigInt = require("big-integer");


// // primes are 30k+i for i = 1, 7, 11, 13, 17, 19, 23, 29
// var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
// var THIRTY = new BigInteger(null);
// THIRTY.fromInt(30);

// // generate random BigInteger
// var num = generateRandom(2048);

// // find prime nearest to random number
// findPrime(num, function(num) {
//   console.log('random', num.toString(16).toUpperCase());
// });

// function generateRandom(bits) {
//   var rng = {
//     // x is an array to fill with bytes
//     nextBytes: function(x) {
//       var b = forge.random.getBytes(x.length);
//       for(var i = 0; i < x.length; ++i) {
//         x[i] = b.charCodeAt(i);
//       }
//     }
//   };
//   var num = new BigInteger(bits, rng);

//   // force MSB set
//   var bits1 = bits - 1;
//   if(!num.testBit(bits1)) {
//     var op_or = function(x,y) {return x|y;};
//     num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, num);
//   }

//   // align number on 30k+1 boundary
//   num.dAddOffset(31 - num.mod(THIRTY).byteValue(), 0);

//   return num;
// }

// function findPrime(num, callback) {
//   /* Note: All primes are of the form 30k+i for i < 30 and gcd(30, i)=1. The
//   number we are given is always aligned at 30k + 1. Each time the number is
//   determined not to be prime we add to get to the next 'i', eg: if the number
//   was at 30k + 1 we add 6. */
//   var deltaIdx = 0;

//   // find prime nearest to 'num' for 100ms
//   var start = Date.now();
//   while(Date.now() - start < 100) {
//     // do primality test (only 2 iterations assumes at
//     // least 1251 bits for num)
//     if(num.isProbablePrime(2)) {
//       return callback(num);
//     }
//     // get next potential prime
//     num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
//   }

//   // keep trying (setImmediate would be better here)
//   setTimeout(function() {
//     findPrime(num, callback);
//   });
// }

const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createDiffieHellman(1024);
const aliceKey = alice.generateKeys();

console.log(alice.getPrime().toString('hex'));

// Generate Bob's keys...
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
//assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
