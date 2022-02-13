/*
 * Exercise: Refactor the code!
 *
 * This file is a collection of functions you've been asked to refactor.
 *
 * The primary purpose of this exercise is to use your judgement to decide when
 * and where to introduce appropriate abstractions, and whether you can use
 * either abstractions provided by JavaScript, or write your own.
 *
 * The command
 *   npm run s1.functions
 * will run tests to ensure the functions do what they should. They should all
 * still pass when you've finished refactoring.
 *
 * Advice:
 * + Try to recognise common patterns in the code.
 * + When you have recognised a pattern, think about if you could make a
 *   function to encapsulate it, instead of repeating code in several places.
 */
'use strict';


// ahmed => Ahmed
function capitalize (str) {
  return str.slice(0, 1).toUpperCase().concat(str.slice(1));
}
function reverse (str) {
  return str.split('').reverse().join('');
}
function incrementByOne (number) {
  return number + 1;
}


function capitalizeObjectKeys (input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      acc[capitalize(key)] = input[key];
      return acc;
    }, {});
}


function capitalizeObjectValues (input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      acc[key] = capitalize(input[key]);
      return acc;
    }, {});
}

function incrementObjectValues (input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      acc[key] = incrementByOne(input[key]);
      return acc;
    }, {});
}

function reverseObjectKeys (input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      const reversedKey = reverse(key);
      acc[reversedKey] = input[key];
      return acc;
    }, {});
}

module.exports = {
  capitalizeObjectKeys,
  capitalizeObjectValues,
  incrementObjectValues,
  reverseObjectKeys,
};
