var validCardNumbers = {
	visa: '4242424242424242',
	mastercard: {
		one: '5155555555554444',
		two: '5255555555554444',
		three: '5355555555554444',
		four: '5455555555554444',
		five: '5555555555554444'
	},
	ax: { 
		one:'378282246310005',
		two:'348282246310005'
	},
	discover: { 
		one: '6011111111111117',
		two: '6511111111111117'
	},
	dinersclub: { 
		one: '30569309025904',
		two: '30469309025904',
		three: '30369309025904',
		four: '30269309025904',
		five: '30169309025904',
		six: '30069309025904',
		seven: '36569309025904',
		eight: '38569309025904'
	},
	jcb: { 
		one: '3530111333300000',
		two: '213111133330000',
		three: '180011133330000'
	},
	withSpaces: '4242 4242 4242 4242',
	withDashes: '4242-4242-4242-4242'
},
invalidCardNumbers = {
	toManyChars: '42424242424242424242',
	failLuhnNumeric: '12345678',
	failLuhnAlpha: 'mistake'
};

// -------------------------->
// wa.ecom.validateCardNumber
// Checks that the number is formatted correctly and passes the Luhn check
describe( 'when using wa.ecom.validateCardNumber', function() {
	
	describe( 'with valid card numbers', function() {
		it( 'should return true when passed a Visa card number', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.visa );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a MasterCard card number', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.mastercard.five );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a American Express card number', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.ax.one );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a Discover card number', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.discover.one );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a Diners Club card number', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.dinersclub.one );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a JCB card number', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.jcb.one );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a card number with spaces', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.withSpaces );
			expect( isValid ).toBe( true );
		});

		it( 'should return true when passed a card number with dashes', function(){
			var isValid = wa.ecom.validateCardNumber( validCardNumbers.withDashes );
			expect( isValid ).toBe( true );
		});
	});

	describe( 'with invalid card numbers', function() { 

		it( 'should return false when passed a card number with over 16 chars', function(){
			var isValid = wa.ecom.validateCardNumber( invalidCardNumbers.toManyChars );
			expect( isValid ).toBe( false );
		});

		it( 'should return false when passed number that will fail Luhn', function(){
			var isValid = wa.ecom.validateCardNumber( invalidCardNumbers.failLuhnNumeric );
			expect( isValid ).toBe( false );
		});

		it( 'should return false when passed text that will fail Luhn', function(){
			var isValid = wa.ecom.validateCardNumber( invalidCardNumbers.failLuhnAlpha );
			expect( isValid ).toBe( false );
		});

	});
});

// -------------------------->
// wa.ecom.validateExpiry
// Checks whether or not the expiration date represents an actual month in the future. 
describe( 'when using wa.ecom.validateExpiry', function() { 

	describe( 'with valid month and year', function() { 
		it( 'should return true for string month 10 and string year 2013', function() {
			var isValid = wa.ecom.validateExpiry( '10', '2013' );
			expect( isValid ).toBe( true );
		});

		it( 'should return true for number month 10 and string year 2025', function() {
			var isValid = wa.ecom.validateExpiry( 10, 2025 );
			expect( isValid ).toBe( true );
		});
	});

	describe( 'with invalid month and year', function() { 
		it( 'should return false for string month 10 and string year 2010', function() {
			var isValid = wa.ecom.validateExpiry( '10', '2010' );
			expect( isValid ).toBe( false );
		});

		it( 'should return false for string month 10 and string year 10', function() {
			var isValid = wa.ecom.validateExpiry( '10', '10' );
			expect( isValid ).toBe( false );
		});

		it( 'should return false for number month 10 and string year 2010', function() {
			var isValid = wa.ecom.validateExpiry( 10, 2010 );
			expect( isValid ).toBe( false );
		});

		it( 'should return false for number month 10 and string year 10', function() {
			var isValid = wa.ecom.validateExpiry( 10, 10 );
			expect( isValid ).toBe( false );
		});

	});
});

// -------------------------->
// wa.ecom.validateCVC
// Checks whether or not the supplied number could be a valid verification code. 
describe( 'when using wa.ecom.validateCVC', function() { 
	describe( 'with a vali cvc', function() { 
		it( 'should return true for a number ( string ) with a length of 3', function() {
			var isValid = wa.ecom.validateCVC( '111' );
			expect( isValid ).toBe( true );
		});

		it( 'should return true for a number ( string ) with a length of 4', function() {
			var isValid = wa.ecom.validateCVC( '1111' );
			expect( isValid ).toBe( true );
		});

		it( 'should return true for a number ( int ) with a length of 3', function() {
			var isValid = wa.ecom.validateCVC( 111 );
			expect( isValid ).toBe( true );
		});

		it( 'should return true for a number ( int ) with a length of 4', function() {
			var isValid = wa.ecom.validateCVC( 1111 );
			expect( isValid ).toBe( true );
		});
	});

	describe( 'with a invali cvc', function() { 
		it( 'should return false for a number ( string ) with a length greater than 4', function() {
			var isValid = wa.ecom.validateCVC( '11111' );
			expect( isValid ).toBe( false );
		});

		it( 'should return false for a number ( string ) with a length less than 3', function() {
			var isValid = wa.ecom.validateCVC( '11' );
			expect( isValid ).toBe( false );
		});

		it( 'should return false for a number ( int ) with a length greater than 4', function() {
			var isValid = wa.ecom.validateCVC( 11111 );
			expect( isValid ).toBe( false );
		});

		it( 'should return false for a number ( int ) with a length less than 3', function() {
			var isValid = wa.ecom.validateCVC( 11 );
			expect( isValid ).toBe( false );
		});

		it( 'should return false when passed an empty string', function() {
			var isValid = wa.ecom.validateCVC( '' );
			expect( isValid ).toBe( false );
		});

		it( 'should return false when passed any letters', function() {
			var isValid = wa.ecom.validateCVC( '11d' );
			expect( isValid ).toBe( false );
		});


	});
});

// -------------------------->
// wa.ecom.cardType
// Returns the type of the card as a string. 
// The possible types are "Visa", "MasterCard", "American Express", "Discover", "Diners Club", and "JCB". 
// If a card isn't recognized, the return value is "Unknown". 

describe( 'when using wa.ecom.cardType', function() { 
	
	describe( 'with valid card numbers', function() { 
		it( 'should return Visa when passed a card number that begins with 4', function() {
			var result = wa.ecom.cardType( validCardNumbers.visa );
			expect( result ).toBe( 'Visa' );
		});

		it( 'should return Visa when passed a card number with 13 digits', function() {
			var result = wa.ecom.cardType( '4242424242424' );
			expect( result ).toBe( 'Visa' );
		});

		it( 'should return MasterCard when passed a card number that begins with 51', function() {
			var result = wa.ecom.cardType( validCardNumbers.mastercard.one );
			expect( result ).toBe( 'MasterCard' );
		});

		it( 'should return MasterCard when passed a card number that begins with 52', function() {
			var result = wa.ecom.cardType( validCardNumbers.mastercard.two );
			expect( result ).toBe( 'MasterCard' );
		});

		it( 'should return MasterCard when passed a card number that begins with 53', function() {
			var result = wa.ecom.cardType( validCardNumbers.mastercard.three );
			expect( result ).toBe( 'MasterCard' );
		});

		it( 'should return MasterCard when passed a card number that begins with 54', function() {
			var result = wa.ecom.cardType( validCardNumbers.mastercard.four );
			expect( result ).toBe( 'MasterCard' );
		});

		it( 'should return MasterCard when passed a card number that begins with 55', function() {
			var result = wa.ecom.cardType( validCardNumbers.mastercard.five );
			expect( result ).toBe( 'MasterCard' );
		});

		it( 'should return AmericanExpress when passed a card number that begins with 37', function() {
			var result = wa.ecom.cardType( validCardNumbers.ax.one );
			expect( result ).toBe( 'AmericanExpress' );
		});

		it( 'should return AmericanExpress when passed a card number that begins with 34', function() {
			var result = wa.ecom.cardType( validCardNumbers.ax.two );
			expect( result ).toBe( 'AmericanExpress' );
		});

		it( 'should return DinersClub when passed a card number that begins with 305', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.one );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 304', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.two );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 303', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.three );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 302', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.four );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 301', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.five );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 300', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.six );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 36', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.seven );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return DinersClub when passed a card number that begins with 38', function() {
			var result = wa.ecom.cardType( validCardNumbers.dinersclub.eight );
			expect( result ).toBe( 'DinersClub' );
		});

		it( 'should return Discover when passed a card number that begins with 6011', function() {
			var result = wa.ecom.cardType( validCardNumbers.discover.one );
			expect( result ).toBe( 'Discover' );
		});

		it( 'should return Discover when passed a card number that begins with 65', function() {
			var result = wa.ecom.cardType( validCardNumbers.discover.two );
			expect( result ).toBe( 'Discover' );
		});

		it( 'should return JCB when passed a card number that begins with 3530', function() {
			var result = wa.ecom.cardType( validCardNumbers.jcb.one );
			expect( result ).toBe( 'JCB' );
		});

	});

	describe( 'with invalid card numbers', function() { 
		it( 'should return Unknown for card number with letters', function() {
			var result = wa.ecom.cardType( invalidCardNumbers.failLuhnAlpha );
			expect( result ).toBe( 'Unknown' );
		});
	});
});

