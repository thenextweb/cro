// Variables
var testID = '001',
    testDays = 8,
    randomNumber = {{Random Number}},
    testVariant = readCookie(testID),
    changes = {
      1: {
        variants: {
          1: {
            execute: function() {
              //
            }
          },
          2: {
            execute: function() {
              //
            }
          }
        }
      },
      2: {
        variants: {
          1: {
            execute: function() {
              //
            }
          },
          2: {
            execute: function() {
              //
            }
          }
        }
      }
    };

// Helpers
function setCookie(testID, changeID, variantID, testDays) {
  if (typeof(testDays)==='undefined') testDays = 8;
  var date = new Date();
  date.setTime(date.getTime() + (testDays * 86400000));
  var expires = '; expires=' + date.toGMTString();
  document.cookie = 'tnw-' + testID + '=' + changeID + '-' + variantID + expires + '; path=/';
}

function readCookie(testID) {
  var nameEQ = 'tnw-' + testID + '=',
      ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length).split('-');
  }
  return null;
}

function inTest() {
  ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf("tnw") > -1) return true;
  }
  return false;
}

function sendDimension(change, variant) {
  ga("set",'dimension10','tnw-' + testID + '-' + change + '-' + variant);
}

function control(testChange, testVariant) {
  setCookie(testID, testChange, testVariant, testDays);
  sendDimension(testChange, testVariant);
}

function variant(changeID, variantID) {
  control(changeID, variantID);
  if(changeID > 0) changes[changeID]["variants"][variantID].execute();
  if(variantID > 0) changes[changeID]["variants"][variantID].execute();
}

// Check variants v.s. cookies
if(testVariant) {
  variant(testVariant[0], testVariant[1]);
} else if(!inTest()) {
  var chosen = 0,
      random1 = Math.round((Math.random() * Object.keys(changes).length));
  for (var j = 0; j <= Object.keys(changes).length; j++) {
    if(random1 == j) {
      var random2 = Math.round((Math.random() * Object.keys(changes[j]["variants"]).length));
      variant(j, random2)
    }
    chosen++;
  }
}