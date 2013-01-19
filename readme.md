#API#

##wa.ecom.validateCardNumber##

Checks that the number is formatted correctly and passes the Luhn check.

##wa.ecom.validateExpiry##

Checks whether or not the expiration date represents an actual month in the future.

##wa.ecom.validateCVC##

Checks whether or not the supplied number could be a valid verification code. 

##wa.ecom.cardType##

Returns the type of the card as a string. The possible types are "Visa", "MasterCard", "American Express", "Discover", "Diners Club", and "JCB". If a card isn't recognized, the return value is "Unknown".


**See tests for usage.**