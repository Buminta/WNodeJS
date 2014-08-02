//Basic Class for all Object in Wind Framework

(function() {
	var initializing = false, fnTest = /xyz/.test(function() { xyz;
	}) ? /\b_super\b/ : /.*/;

	/**
	 * This class is abstracted and should not be used by developers
	 * @class Base class for all objects.
	 */
	this.Class = function() {
	};

	/**
	 * Extends the current class with new methods & fields
	 * @param {Object} prop additional methods & fields to be included in new class
	 * @static
	 * @returns {Class} new class
	 */
	Class.extend = function(prop) {
		if ( typeof updateTracker != 'undefined')
			updateTracker(1);
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		prototype.currentClass = this;
		prototype.ancestors = Array();
		if (this.prototype.ancestors) {
			for (var i in this.prototype.ancestors) {
				prototype.ancestors.push(this.prototype.ancestors[i]);
			}
		}
		prototype.ancestors.push(this);
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
				return function() {
					var tmp = this._super;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]) : prop[name];
		}

		/**
		 * Implement the current class with a set of extends or interfaces width
		 * method using content in this. Implement is not support Supper
		 * if method is rewrite then method to override
		 **/
		Class.implement = function(){
			for (var i = 0; i < arguments.length; i++) {
				for (prop in arguments[i].prototype) {
					if(this.prototype[prop] == undefined){
						this.prototype[prop] = arguments[i].prototype[prop];
					}
				}
			}
			return this;
		};

		/**
		 * Interface the current class with a set of interfaces
		 * @param {InterfaceImplementor...} interfaces a set of interfaces to be implemented
		 * @static
		 * @returns {Class} current class
		 */
		Class.interface = function() {
			// Loop through each interface passed in and then check
			// that its members are implemented in the context object (this)
			for (var i = 0; i < arguments.length; i++) {
				var interf = new arguments[i];
				// Is the interface a class type

				for (prop in interf) {
					// Check methods and fields vs context object (this)
					if (prop.constructor === Function) {
						if (!this.prototype[prop] || this.prototype[prop].constructor !== Function) {
							throw new Error('Method [' + prop + '] missing from class definition.');
						}
					} else {
						if (this.prototype[prop] === undefined) {
							throw new Error('Field [' + prop + '] missing from class definition.');
						}
					}

				}
			}
			// Remember to return the class being tested
			return this;
		};
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init) {
				this.init.apply(this, arguments);
				if ( typeof updateTracker != 'undefined')
					updateTracker(this.tracker || 5, true);
			}
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();