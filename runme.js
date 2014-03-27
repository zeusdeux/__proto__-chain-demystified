(function(console) {

	//initialize style vars
	var color = 'color: #333;';
	var h1 = color + ' font-size: 2em;';
	var h2 = color + ' font-size: 1.4em;';
	var code = color + 'font-size: 1.2em; font-family: monospace;';
	var comment = 'color: #999; font-style: italic';
	var normalText = color;
	var log = function() {
		return console.log.apply(console,[].splice.call(arguments,0));
	};
	var inspect = function() {
		return console.dir.apply(console,[].splice.call(arguments,0));
	};

	function A() {
		this.someValue = 20;
	}

	A.prototype.someMethodOnAPrototype = function() {
		log("Some value = %d", this.someValue);
	};

	var aObj = new A();

	function showSetupCode() {
		log('\n%c%s', code, A.toString());
		A.toString();

		log('\n%cA.prototype.someMethodOnAPrototype = %s', code, A.prototype.someMethodOnAPrototype.toString());
		A.prototype.someMethodOnAPrototype.toString();

		log('\n%cvar aObj = new A();', code);
	}

	function runTests() {
		if (!console.clear) {
			console.clear = function() {
				for (var i = 0; i < 100; i++) {
					log('\n');
				}
			};
		}

		console.clear();

		log('%c----- __proto__ chain -----', h1);

		//The Code
		log('%c\nThe Code:', h2);
		showSetupCode();

		//The Tests & Observations
		log('%c\nThe Tests & Observations:', h2);
		testsOnSimpleObject();
		testsOnUserDefinedFunction();
		testsOnFunctionObject();
		testsOnObjectObject();

		//The Inferences
		log('%c\nThe Inferences:', h2);
		showInferences();

		return "And we're done.";
	}

	function testsOnSimpleObject() {
		log('\n%caObj %c// aObj object i.e., Object of A (typeof Object and instanceof A & Object)', code, comment);
		inspect(aObj); // aObj object i.e., Object of A (typeof Object and instanceof A & Object)

		log('%caObj.__proto__ %c// equal to A.prototype i.e., prototype of A (its parent)', code, comment);
		inspect(aObj.__proto__); // equal to A.prototype i.e., prototype of A (its parent)

		log('%caObj.__proto__.__proto__ %c// equal to Object.prototype i.e., prototype of Object', code, comment);
		inspect(aObj.__proto__.__proto__); // equal to Object.prototype i.e., prototype of Object

		log('%caObj.__proto__.__proto__.__proto__ %c// equal to null (end of __proto__ chain)', code, comment);
		inspect(aObj.__proto__.__proto__.__proto__); // equal to null (end of __proto__ chain)
	}

	function testsOnUserDefinedFunction() {
		log('\n%cA %c// An object of type function', code, comment);
		inspect(A); // An object of type function

		log('%cA.__proto__ %c// equal to Function.prototype i.e., prototype of Function (its parent)', code, comment);
		inspect(A.__proto__); // equal to Function.prototype i.e., prototype of Function (its parent)

		log('%cA.__proto__.__proto__ %c// equal to Object.prototype i.e., prototype of Object', code, comment);
		inspect(A.__proto__.__proto__); // equal to Object.prototype i.e., prototype of Object

		log('%cA.__proto__.__proto__.__proto__ %c// equal to null (end of __proto__ chain)', code, comment);
		inspect(A.__proto__.__proto__.__proto__); // equal to null (end of __proto__ chain)
	}

	function testsOnFunctionObject() {
		log('\n%cFunction %c// An object of type function', code, comment);
		inspect(Function); // An object of type function

		log('%cFunction.__proto__ %c// equal to Function.prototype i.e., prototype of Function (its parent)', code, comment);
		inspect(Function.__proto__); // equal to Function.prototype i.e., prototype of Function (its parent)

		log('%cFunction.__proto__.__proto__ %c// equal to Object.prototype i.e., prototype of Object', code, comment);
		inspect(Function.__proto__.__proto__); // equal to Object.prototype i.e., prototype of Object

		log('%cFunction.__proto__.__proto__.__proto__ %c// equal to null (end of __proto__ chain)', code, comment);
		inspect(Function.__proto__.__proto__.__proto__); // equal to null (end of __proto__ chain)

	}

	function testsOnObjectObject() {
		log('\n%cObject %c// An object of type function', code, comment);
		inspect(Object); //An object of type function

		log('%cObject.__proto__ %c// equal to Function.prototype i.e., prototype of Function (its parent)', code, comment);
		inspect(Object.__proto__); // equal to Function.prototype i.e., prototype of Function (its parent)

		log('%cObject.__proto__.__proto__ %c// equal to Object.prototype i.e., prototype of Object', code, comment);
		inspect(Object.__proto__.__proto__); // equal to Object.prototype i.e., prototype of Object

		log('%cObject.__proto__.__proto__.__proto__ %c// equal to null (end of __proto__ chain)', code, comment);
		inspect(Object.__proto__.__proto__.__proto__); // equal to null (end of __proto__ chain)
	}

	function showInferences() {
		log('\n%c- (dot)%c__proto__ %ccan be chained to give us the parent\'s prototype ' +
			'(for e.g., %cA.__proto__ === Function.prototype %c)', normalText, code, normalText, code, normalText);

		log('%c- %cObject %cis actually an object of type %cFunction', normalText, code, normalText, code);

		log('%c- instanceof and typeof use %c__proto__ %cto figure out what they should reply with', normalText, code, normalText);

		log('%c- Therefore, if you change the %c__proto__ %cproperty then instanceof and typeof return values' +
			' depending on new %c__proto__ %cvalue', normalText, code, normalText, code, normalText);
	}

	return runTests();

})(console);