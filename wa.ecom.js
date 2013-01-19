(function( wa ) {
    "use strict";

    var ecom = wa.ecom = {}, NUMPATTERN = /^\d+$/;

    ecom.trim = function( value ) {
        return ( value + "" ).replace( /^\s+|\s+$/g, "" );
    };

    ecom.luhnCheck = function( cardNumber ) {
        var sum = 0,
            numdigits = cardNumber.length,
            parity = numdigits % 2,
            i = 0;

        for( ; i < numdigits; i++ ) {
            var digit = parseInt( cardNumber.charAt( i ), 10 );
            if( i % 2 === parity ) {
                digit *= 2;
            }
            if( digit > 9 ) {
                digit -= 9;
            }
            sum += digit;
        }

        return (sum % 10) === 0;
    };

    ecom.cardTypes = function () {
        var e, t, n, r;
        t = {};
        for ( e = n = 40; n <= 49; e = ++n ) {
            t[ e ] = "Visa";
        }

        for ( e = r = 50; r <= 59; e = ++r ) {
            t[ e ] = "MasterCard";
        }
        t[ 34 ] = t[ 37 ] = "AmericanExpress";
        t[ 60 ] = t[ 62 ] = t[ 64 ] = t[ 65 ] = "Discover";
        t[ 35 ] = "JCB";
        t[ 30 ] = t[ 36 ] = t[ 38 ] = t[ 39 ] = "DinersClub";

        return t;
    }();

    //public API
    wa.ecom.validateCardNumber = function ( cardNumber ) {
        cardNumber = ( cardNumber + "" ).replace( /\s+|-/g, "" );
        
        return cardNumber.length >= 10 && cardNumber.length <= 16 && ecom.luhnCheck( cardNumber );
    };

    wa.ecom.validateExpiry = function ( month, year ) {
        var r,
            i,
            numMonth = parseInt( month, 10 );
        
        month = ecom.trim( month );
        year = ecom.trim( year );
        
        if( !NUMPATTERN.test( month ) || !NUMPATTERN.test( year ) ||  numMonth < 1 || numMonth > 12 ) {
            return false;
        }
        i = new Date( year, month );
        r = new Date();
        i.setMonth( i.getMonth() - 1 );
        i.setMonth( i.getMonth() + 1, 1 );
        return i > r;
    };

    wa.ecom.validateCVC = function ( cvc ) {
        cvc = ecom.trim( cvc );
        return  ( NUMPATTERN.test( cvc ) && cvc.length >= 3 && cvc.length <= 4 );
    };

    wa.ecom.cardType = function( cardNumber ) {
        return ecom.cardTypes[ cardNumber.slice( 0, 2 ) ] || "Unknown";
    };

})( window.wa || ( window.wa = {} ) );