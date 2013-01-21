#API#

##wa.ecom.validateCardNumber( cardNumber )##

Checks that the number is formatted correctly and passes the Luhn check.

##wa.ecom.validateExpiry( mm, yyyy )##

Checks whether or not the expiration date represents an actual month in the future.

##wa.ecom.validateCVC( cvc )##

Checks whether or not the supplied number could be a valid verification code. 

##wa.ecom.cardType( cardNumber )##

Returns the type of the card as an Object. The css and name value will be "unknown" if the card isn't recognized. The possible types are:

```javascript
{ css: 'visa', name: 'Visa' }
{ css: 'masterCard', name: 'MasterCard' }
{ css: 'americanExpress', name: 'American Express' }
{ css: 'discover', name: 'Discover' }
{ css: 'jcb', name: 'JCB' }
{ css: 'dinersClub', name: 'Diners Club' }
{ css: 'unknown', name: 'unknown' }
```

------


**See tests for usage.**