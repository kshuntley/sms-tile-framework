/**
 *	ButtonRow Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.2
 *
 *	@class ButtonRow
 *
 */
var ButtonRow = {
	/** @lends ButtonRow */

	//----- THE _btn_array & BUTTON (AND ADDING TO, REORDERING AND DELETING FROM) -----//
	
	/**
	 *	An array of Buttons.
	 *	@property {Button[]} _btn_array - An array of Button objects.
	 *	@private
	 */	
	_btn_array: [],
	
		/**
		 *	Return the Button at this index.
		 *
		 *	@method
		 *	@public
		 *	@param {number} anIndex - The index of the Button you want to access.
		 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _btn_array.
		 *	@returns {Button} The Button at specified index.
		 */
		button: function( anIndex ) {
			"use strict";
			if ( ( anIndex >= this.numberOfButtons() ) || ( anIndex < 0 ) ) {
				throw new RangeError ( "The specified argument is beyond the range of the array. i.e. You're asking for a button that doesn't exist." );
			}
			else {
				return this._btn_array[anIndex];
			}
		},

			/** @borrows button as btn */
			btn: function( anIndex ) {
			"use strict";
			return this.button( anIndex );
		},
	
			/** @borrows button as getButton */
			getButton: function( anIndex ) {
				"use strict";
				return this.button( anIndex );
			},
	
		/**
		 *	Return the number of Buttons in this ButtonRow.
		 *
		 *	@method
		 *	@public
		 *	@returns {number} The length of the _btn_array array.
		 */
		numberOfButtons: function() {
			"use strict";
			return this._btn_array.length;
		},
	
			/** @borrows numberOfButtons as numButtons */
			numButtons: function() {
				"use strict";
				return this.numberOfButtons();
			},
	
			/** @borrows numberOfButtons as numBtns */
			numBtns: function() {
				"use strict";
				return this.numberOfButtons();
			},	

		/**
		 * 	Moves a Button to a different index in the _btn_array.
		 *
		 *	@method
		 *	@public
		 *	@param {number} anIndex - The index of the Button you want to move.
		 *	@param {number} aDestination - The index to which you wish to move this Button.
		 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _btn_array.
		 *	@throws {RangeError} Will throw error if aDestination is less than 0 or greater than the length of _btn_array.		 
		 *	@returns {ButtonRow} The ButtonRow; this.		 
		 */
		moveButton: function( anIndex, aDestination ) {
				// For instance, to move row 4 to the start, you'd say moveRow(4, 0);
				"use strict";
				if ( ( aDestination > this.numberOfButtons() ) || ( aDestination < 0 ) ) {
					throw new RangeError ( "The specified destination is beyond the range of the array. i.e. You're moving a button beyond the length of the array." );
				}
				else if ( ( anIndex > this.numberOfButtons() ) || ( anIndex < 0 ) ) {
					throw new RangeError ( "The specified index is beyond the range of the array. i.e. You're moving a button that doesn't exist." );
				}

				var targetBtn = this.button( anIndex );

				// Remove the target button from the original position in the array
				this._btn_array.splice( anIndex, 1 );

				// Add the target button to the new position in the array
				this._btn_array.splice( aDestination, 0, targetBtn );

				this.renumerateButtons( BTN_IDENTIFIER_PREFIX );

				return this;
			},

			/**	@borrows moveMenuButton as moveBtn */
			moveBtn: function( anIndex, aDestination ) {
				"use strict";
				return this.reorderButton( anIndex, aDestination );
			},
	
		/**
		 * 	Resets the identifiers of Buttons based on their index of the _btn_array. 
		 *	Button at index 3 will have an identifier of "anIdentifier-3".
		 *
		 *	@method
		 *	@public
		 *	@param {string} [anIdentifier=BTN_IDENTIFIER_PREFIX] - A prefix for the identifiers.	 
		 *	@returns {ButtonRow} The ButtonRow; this.		 
		 */
		renumerateButtons: function( anIdentifier ) {
			"use strict";

			var n = this.numberOfButtons();
			var i;

			if ( ( anIdentifier === undefined ) || ( anIdentifier === null ) ) {
				anIdentifier = BTN_IDENTIFIER_PREFIX;
			}

			for ( i = 0; i < n; i++ ) {
				this.button( i ).identifier( anIdentifier + '-' + i );
			}

			return this;
		},

			/**	@borrows moveMenuButton as moveBtn */
			renumerateBtns: function( anIdentifier ) {
				"use strict";
				return this.renumerateButtons( anIdentifier );
			},
	
		/**
		 * 	Add a new Button to the ButtonRow.
		 *
		 *	@method
		 *	@public
		 *	@param {string=} aBtnText - The text you wish the Button to have.		 
		 *	@returns {ButtonRow} The ButtonRow; this.		 
		 */
		addButton: function( aBtnText ) {
			"use strict";

			var newBtn = Button.new();

			if ( ( aBtnText !== undefined ) && ( aBtnText !== null ) ) {
				newBtn.buttonText( aBtnText );
			}

			this._btn_array.push( newBtn );
			this.renumerateButtons( BTN_IDENTIFIER_PREFIX );
			return this;
		},
	
			/**	@borrows addButton as addBtn */
			addBtn: function( aBtnText ) {
			"use strict";
			return this.addButton( aBtnText );
		},
	
		/**
		 * 	Add a new Button to the ButtonRow constructed from a JSON string.
		 *
		 *	@method
		 *	@public
		 *	@param {string} aJSONString - A JSON string for a Button.	 
		 *	@returns {ButtonRow} The ButtonRow; this.		 
		 */	
		addButtonFromJSON: function( aJSONString ) {
				"use strict";
				var newBtn = Button.newFromJSON( aJSONString );
				this._btn_array.push( newBtn );		
				return this;
			},
	
			/**	@borrows addButtonFromJSON as addBtnJSON */
			addBtnJSON: function( aJSONString ) {
				"use strict";
				return this.addButtonFromJSON( aJSONString );
			},

		/**
		 * 	Copy the style of a Button to all other Buttons in the ButtonRow.
		 *
		 *	@method
		 *	@public
		 *	@param {number} [anIndex=0] - The index of the Button to copy from.	 
		 *	@returns {ButtonRow} The ButtonRow; this.		 
		 */	
		copyToAll: function( anIndex ) {
			"use strict";

			var n = this.numberOfButtons();
			var i;
			var source;
			var destination;

			if ( ( Number.isInteger( anIndex ) ) && ( anIndex >= 0 ) && ( anIndex < n ) ){
				source = this.button( anIndex );
			}
			else {
				source = this.button( 0 );
			}

			for ( i = 0; i < n; i++ ) {
				if ( i !== anIndex ) {
					destination = this.button( ( i ) );
					destination.color( source.color() );
					destination.hasDropShadow( source.hasDropShadow() );
					destination.hasNewWindow( source.hasNewWindow() );
					destination.textColor( source.textColor() );
					destination.hasCustomColor( source.hasCustomColor() );
					destination.customColor( source.customColor() );
				}
			}
			
			return this;
		},
	
		/**
		 * 	Return the Button with this identifier.
		 *
		 *	@method
		 *	@public
		 *	@param {string} anIdentifier - The value of the id attribute of the Button you want to match.
		 *	@throws {SyntaxError} Will throw error if anIdentifier is not specified.
		 *	@throws {SyntaxError} Will throw error if anIdentifier is not a string.			 
		 *	@returns {Button} The matching Button.		 
		 */
		getButtonByIdentifier: function( anIdentifer ) {
			"use strict";
			if ( ( anIdentifer === undefined )  || ( anIdentifer === null ) ) {
				throw new SyntaxError ( "A button identifier was not specified." );
			}
			else {

				// Check if the Identifier is an String and if so, return that row
				if ( ( typeof anIdentifer === "string" ) || ( anIdentifer instanceof String ) ) {

					// Strip off the prefix and parse it as an Integer
					var anIndex = parseInt( anIdentifer.replace( BTN_IDENTIFIER_PREFIX + "-", "" ) );
					return this.button( anIndex );
				}

				// If the Identifier is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}			
			}
		},

				/**	@borrows getButtonByIdentifier as getButtonByID */
				getButtonByID: function( anIdentifier ) {
					"use strict";
					return this.getButtonByIdentifier( anIdentifier );
				},

				/**	@borrows getButtonByIdentifier as getButtonById */
				getButtonById: function( anIdentifier ) {
					"use strict";
					return this.getButtonByIdentifier( anIdentifier );
				},

				/**	@borrows getButtonByIdentifier as getBtnByID */
				getBtnByID: function( anIdentifier ) {
					"use strict";
					return this.getButtonByIdentifier( anIdentifier );
				},

				/**	@borrows getButtonByIdentifier as getBtnById */
				getBtnById: function( anIdentifier ) {
					"use strict";
					return this.getButtonByIdentifier( anIdentifier );
				},
	
		/**
		 * 	Delete the Button at this index.
		 *	@public
		 *	@param {number} [anIndex] - The index of the Button you want to delete. If unspecified, last Button is deleted.		 
		 *	@returns {ButtonRow} The ButtonRow; this.		 
		 */
		deleteButton: function( anIndex ) {
			"use strict";

			if ( ( anIndex !== undefined ) && ( anIndex !== null ) ) {
				this._btn_array.splice( anIndex, 1 );
			}
			else {
				this._btn_array.pop();
			}

			this.renumerateButtons( BTN_IDENTIFIER_PREFIX );
			return this;
		},
	
			/**	@borrows deleteButton as deleteBtn */
			deleteBtn: function( anIndex ) {
				"use strict";
				return this.deleteButton( anIndex );
			},		
	
	//----- CONSTRUCTORS -----//

	/**
	 * 	Clone the ButtonRow object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	@constructs ButtonRow
	 *	@method
	 *	@public 
	 */	
	new: function() {
		"use strict";
		var newButtonRow = Object.create( this );
		newButtonRow._btn_array = []; // I was inheriting existing buttons with the new. Duh.
		return newButtonRow;
	},		

		
	/**
	 * 	Clone the ButtonRow object and then populate it with data from a JSON string.
	 *
	 *	@constructs ButtonRow
	 *	@method
	 *	@public
	 *	@param {string} anInput - A JSON string describing a ButtonRow.
	 */
	newFromJSON: function( aString ) {
		"use strict";

		var jsonObj = JSON.parse( aString );
		var aNewRow = this.new();

		for (var i = 0; i < jsonObj.buttons.length; i++ ) {
			// expecting a string, not an object
			aNewRow.addButtonFromJSON( JSON.stringify( jsonObj.buttons[i] ) );
		}

		aNewRow.renumerateButtons();
		return aNewRow;
	},
	
	//----- OUTPUT -----//
	
	/**
	 * 	Get a JSON string describing the ButtonRow (and its associated Buttons).
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */
	getJSON: function() {
		"use strict";
		
		var jsonstring = "";
				
		// Add buttons
		jsonstring += '"buttons": [ ';
		for ( var i = 0; i < this.numberOfButtons(); i++ ) {
			jsonstring += this.button(i).getJSON();
			jsonstring += ', ';
		}
		// Strip off the last comma
		jsonstring  = jsonstring.substring( 0, jsonstring.length - 2 );
		jsonstring += ' ';
		
		jsonstring += ']';
		
		jsonstring = '{ ' + jsonstring + ' }';
		return jsonstring;
	},
	
	/**
	 * 	Get the HTML to construct this ButtonRow.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} The HTML of this ButtonRow (and its associated Buttons).
	 */		
	getHTML: function() {
		"use strict";
		
		var generatedRow = "";
		var n = this.numberOfButtons();
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-button-row\">\n";
		for ( var i = 0; i < n; i++ ) {
			generatedRow += this.button(i).getHTML();
		}
		generatedRow += "</div>\n";
		
		return generatedRow;
	},
	
	/**
	 * 	Return the class name. Useful for some polymorphic functions.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} "ButtonRow".
	 */
	getClassName: function() {
		"use strict";
		return "ButtonRow";
	},
	
		/**	@borrows getClassName as class */	
		class: function() {
			"use strict";
			return this.getClassName();
		}	
};