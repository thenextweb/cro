function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function createABtest() {
    var randomChange = randomNumber % variants.length;
    createCookie(prefix + '-cookie', variants[randomChange], 9);
    if (variants[randomChange] != "0") {
        var newcookie = variants[randomChange].split('.');
        var changeID = newcookie[0];
        var variantID = newcookie[1];

        changes[changeID]['variants'][variantID].execute();
        sendDimension(changeID, variantID);
    } else {
        sendDimension(0)
    }

}
function sendDimension(changeID, variantID) {
    if (readCookie('_ga')) {
        if (changeID != 0) {
            dataLayer.push({ 'event':'abTest', 'eventCategory': 'ab-test', 'eventAction': prefix + '-' + changeID + '-' + variantID, 'eventLabel': prefix + '-' + changeID + '-' + variantID, 'eventNonInteraction': 1 });
        } else {
            dataLayer.push({ 'event':'abTest', 'eventCategory': 'ab-test', 'eventAction': prefix + '-0-0', 'eventLabel': prefix + '-0-0', 'eventNonInteraction': 1 });
        }
    }
}
function checkCookie(name) {
    ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) > -1) return true;
    }
    return false;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}

var prefix = 'tnw';
var randomNumber = {{Random Number}};
var changes = {
    1: {
        variants: {
            1: {
                execute: function () {

                }
            }
        }
    },
    2: {
        variants: {
            1: {
                execute: function () {

                }
            },
            2: {
                execute: function () {

                }
            }
        }
    }
};
var variants = ["0"];
for (var j in changes) {
    for (var x in changes[j]['variants']) {
        variants.push(j + '.' + x);
    }
}
if (readCookie(prefix + '-cookie')) {
    if (variants.indexOf(readCookie(prefix + '-cookie')) != -1) {
        var currentCookie = readCookie(prefix + '-cookie').split('.');
        var currentChangeID = currentCookie[0];
        var currentVariantID = 0;
        if (currentChangeID != 0) {
            currentVariantID = currentCookie[1];
            changes[currentChangeID]['variants'][currentVariantID].execute();
        }
        sendDimension(currentChangeID, currentVariantID);
    } else {
        eraseCookie(prefix + '-cookie');
        createABtest();
    }
} else {
    createABtest();
}