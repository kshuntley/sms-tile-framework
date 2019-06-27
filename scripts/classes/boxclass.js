/**
 *	Box Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.2
 *
 *	@class Box
 *
 */
var Box = {
	/** @lends Box */

	//----- THE _row_array & ROW (AND ADDING TO, REORDERING AND DELETING FROM) -----//
	
	/**
	 *	An array of Rows.
	 *	@property {Row[]} _row_array - An array of Row objects.
	 *	@private
	 */	
	_row_array: [],
			
		/**
		 *	Return the Row at this index.
		 *
		 *	@method
		 *	@public
		 *	@param {number} anIndex - The index of the Row you want to access.
		 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _row_array.
		 *	@returns {Row} The Row at specified index.
		 */
		row: function( anIndex ) {
			"use strict";
			if ( ( anIndex >= this._row_array.length ) || ( anIndex < 0 ) ) {
				throw new RangeError ( "The specified argument is beyond the range of the array. i.e. You're asking for a box row that doesn't exist." );
			}
			else {
				return this._row_array[ anIndex ];
			}
		},
	
			/** @borrows row as getRow */
			getRow: function( anIndex ) {
				"use strict";
				return this.getRow( anIndex );
			},
	
		/**
		 *	Return the number of Rows in this Box.
		 *
		 *	@method
		 *	@public
		 *	@returns {number} The length of the _row_array array.
		 */
		numberOfRows: function() {
			"use strict";
			return this._row_array.length;
		},
	
			/** @borrows numberOfRows as rowsLength */
			rowsLength: function() {
				"use strict";
				return this.numberOfRows();
			},

			/** @borrows numberOfRows as numRows */
			numRows: function() {
				"use strict";
				return this.numberOfRows();
			},
		
		/**
		 * 	Moves a Row to a different index in the _row_array.
		 *
		 *	@method
		 *	@public
		 *	@param {number} anIndex - The index of the Row you want to move.
		 *	@param {number} aDestination - The index to which you wish to move this Row.
		 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _row_array.
		 *	@throws {RangeError} Will throw error if aDestination is less than 0 or greater than the length of _row_array.		 
		 *	@returns {ButtonRow} The Box; this.		 
		 */
		moveRow: function( anIndex, aDestination ) {
			// For instance, to move row 4 to the start, you'd say moveRow(4, 0);
			"use strict";
			if ( ( aDestination > this.numberOfRows() ) || ( aDestination < 0 ) ) {
				throw new RangeError ( "The specified destination is beyond the range of the array. i.e. You're moving a box row beyond the length of the array." );
			}
			else if ( ( anIndex > this.numberOfRows() ) || ( anIndex < 0 ) ) {
				throw new RangeError ( "The specified index is beyond the range of the array. i.e. You're moving a box row that doesn't exist." );
			}
			
			var targetRow = this.row( anIndex );
			
			// Remove the targetRow from the original position in the array
			this._row_array.splice( anIndex, 1 );
			
			// Add the targetRow to the new position in the array
			this._row_array.splice( aDestination, 0, targetRow );
			
			this.renumerateRows( ROW_IDENTIFIER_PREFIX );
			
			return this;
		},
	
		/**
		 * 	Moves Rows to a different indexes in the _row_array, based on Row IDs.
		 *
		 *	@method
		 *	@public
		 *	@param {string[]|string} aParameter - An array of strings 
		 *		containing Row IDs, or a string with Row IDs delimited by the pipe character ('|'). 
		 *	@throws {SyntaxError} Will throw error if aParameter is not an array or a string.
		 *	@throws {SyntaxError} Will throw error if aParameter array has a longer length than numRows.		 
		 *	@returns {Box} The Box; this.		 
		 */	
		rearrangeRowsByIdentifier: function( aParameter ) {
			"use strict";
			
			var desiredOrder = [];
			var newOrder = [];
			
			// Check if it's an Array or a String. If it's neither, throw an error
			if ( Array.isArray( aParameter ) )  {
				desiredOrder = aParameter;
			}
			else if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					desiredOrder = aParameter.split('|');
			}
			else {
				throw new SyntaxError ( "Invalid parameter for specified operation (i.e. looking for an array or string)." ); 
			}
			
			// Check if the length of desiredOrder is the same as thisrowsLength. If not, throw an error
			if ( desiredOrder.length !== this.rowsLength() ) {
				throw new SyntaxError ( "Row count does not match between desired and existing. Cannot rearrange rows." ); 
			}

			for ( var i = 0; i < desiredOrder.length; i++) {
				// Build a new array based on the desired order
				newOrder[i] = this.getRowByID( desiredOrder[i] );
			}
			
			this._row_array = newOrder;
			return this;
		},
	
			/** @borrows rearrangeRowsByIdentifier as rearrangeRowsByIDs */
			rearrangeRowsByIDs: function( aParameter ) {
				"use strict";
				this.rearrangeRowsByIdentifier( aParameter );
			},
	
			/** @borrows rearrangeRowsByIdentifier as rearrangeRowsByIds */
			rearrangeRowsByIds: function( aParameter ) {
				"use strict";
				this.rearrangeRowsByIdentifier( aParameter );
			},				
		
		/**
		 * 	Resets the identifiers of Rows based on their index of the _row_array. 
		 *	Row at index 3 will have an identifier of "anIdentifier-3".
		 *
		 *	@method
		 *	@public
		 *	@param {string} [anIdentifier=ROW_IDENTIFIER_PREFIX] - A prefix for the identifiers.	 
		 *	@returns {ButtonRow} The Box; this.		 
		 */
		renumerateRows: function( anIdentifier ) {
			"use strict";
			
			var numRows = this.numberOfRows();
			
			if ( ( anIdentifier === undefined ) || ( anIdentifier === null ) ) {
				anIdentifier = ROW_IDENTIFIER_PREFIX;
			}
			
			for ( var i = 0; i < numRows; i++ ) {
				this._row_array[i].identifier( anIdentifier + '-' + i );
			}
			
			return this;
		},
		
		/**
		 * 	Add a new Row to the Box.
		 *
		 *	@method
		 *	@public
		 *	@param {string=} aRowPrototype - What type of Row do you want? Must be from ROW_PROTOTYPES.
		 *	@throws {SyntaxError} Will throw error if aRowPrototype isn't from ROW_PROTOTYPES.
		 *	@returns {Box} The Box; this.		 
		 */
		addRow: function( aRowPrototype ) {
			"use strict";
			
			if ( ( aRowPrototype === undefined ) || ( aRowPrototype === null ) ) {
				aRowPrototype = "generic";
			}

			if ( ROW_PROTOTYPES.includes( aRowPrototype ) ) {
				var newRow = Row.new( aRowPrototype );
				this._row_array.push( newRow );
				this.renumerateRows( ROW_IDENTIFIER_PREFIX );
			}
			else {
				throw new SyntaxError( "The specified row prototype does not exist." );
			}
			
			return this;
		},
	
		/**
		 * 	Add a new Row to the Box constructed from a JSON string.
		 *
		 *	@method
		 *	@public
		 *	@param {string} aJSONString - A JSON string for a Row.	 
		 *	@returns {ButtonRow} The Box; this.		 
		 */
		addRowFromJSON: function( aJSONString ) {
			"use strict";
			
			var newRow = Row.newFromJSON( aJSONString );
			this._row_array.push( newRow );
			this.renumerateRows( ROW_IDENTIFIER_PREFIX );
			
			return this;
		},
	
		/**
		 * 	Return the Row with this identifier.
		 *
		 *	@method
		 *	@public
		 *	@param {string} anIdentifier - The value of the id attribute of the Row you want to match.
		 *	@throws {SyntaxError} Will throw error if anIdentifier is not specified.
		 *	@throws {SyntaxError} Will throw error if anIdentifier is not a string.			 
		 *	@returns {Row} The matching Row.		 
		 */	
		getRowByIdentifier: function( anIdentifer ) {
			"use strict";
			if ( ( anIdentifer === undefined )  || ( anIdentifer === null ) ) {
				throw new SyntaxError ( "A row identifier was not specified." );
			}
			else {

				// Check if the Identifier is an String and if so, return that row
				if ( ( typeof anIdentifer === "string" ) || ( anIdentifer instanceof String ) ) {
					
					// Strip off the prefix and parse it as an Integer
					var anIndex = parseInt( anIdentifer.replace( ROW_IDENTIFIER_PREFIX + "-", "" ) );
					return this.getRow( anIndex );
				}
				
				// If the Identifier is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}			

			}
		},	
	
			/** @borrows getRowByIdentifier as getRowByID */
			getRowByID: function( anIdentifier ) {
				"use strict";

				return this.getRowByIdentifier( anIdentifier );
			},
	
			/** @borrows getRowByIdentifier as getRowById */
			getRowById: function( anIdentifier ) {
				"use strict";

				return this.getRowByIdentifier( anIdentifier );
			},
	
		/**
		 * 	Delete the Row at this index.
		 *	@public
		 *	@param {number} [anIndex] - The index of the Row you want to delete. If unspecified, last Row is deleted.		 
		 *	@returns {Box} The Box; this.		 
		 */
		deleteRow: function( anIndex ) {
			"use strict";
			
			if ( ( anIndex !== undefined ) && ( anIndex !== null ) ) {
				this._row_array.splice( anIndex, 1 );
			}
			else {
				this._row_array.pop();
			}
			
			this.renumerateRows( ROW_IDENTIFIER_PREFIX );
			return this;
		},

	//----- BOX TITLE -----//

	/**
	 *	A title. This appears as a heading at the top of the Box.
	 *
	 *	@property {string} _title - A title for this Box.
	 *	@private
	 */
	_title: "Getting Started",
	
		/**
		 * 	Return the title of this Box.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The title of the Box.		 
		 */	
		_getTitle: function() {
			"use strict";
			return this._title;
		},
	
		/**
		 * 	Set the title of this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aTitle - The new title.		 
		 *	@returns {Box} The Box; this.	 
		 */	
		_setTitle: function( aTitle ) {
			"use strict";
			this._title = aTitle;
			return this;
		},	
	
		/**
		 * 	Get or Set the title of this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new title.		 
		 *	@returns {(string|Box)} The title of this Box or the Box itself.	 
		 */	
		title: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getTitle();
			}
			else {
				this._setTitle( aParameter );
				return this;
			}
			
			/* 
				Maintenance Note:

				Why not just set the property directly? Well, I could, but I'm trying to
				set up some fake encapsulation here. Any major modifications would go into
				the private. This public calls the private to do the work.

				I mean one day the title might expand. In that case, I don't need
				to worry about the public methods, just rewrite the private ones.
			*/			
		},	

	//----- BOX ABSTRACT -----//

	/**
	 *	An abstract. This appears as a summary at the top of the Box.
	 *
	 *	@property {string} _abstract - An abstract for this Box, possibly in HTML.
	 *	@private
	 */
	_abstract: "<i>This topic includes an overview of <strong>CRM</strong> and how it is used for managing enquiries at <strong>TAFE NSW</strong> as well as resources to help you set up and get started.</i>",
	
		/**
		 * 	Return the abstract of this Box.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The abstract of the Box, possibly in text or HTML.	 
		 */
		_getAbstract: function() {
			"use strict";
			return this._abstract;
		},
	
		/**
		 * 	Set the abstract of this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAbstract - The new abstract.		 
		 *	@returns {Box} The Box; this.	 
		 */	
		_setAbstract: function( anAbstract ) {
			"use strict";
			this._abstract = anAbstract;
			return this;
		},	
	
		/**
		 * 	Get or Set the abstract of this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new abstract.		 
		 *	@returns {(string|Box)} The abstract of this Box or the Box itself.	 
		 */	
		abstract: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getAbstract();
			}
			else {
				this._setAbstract( aParameter );
				return this;
			}
			
			/* 
				Maintenance Note:

				Why not just set the property directly? Well, I could, but I'm trying to
				set up some fake encapsulation here. Any major modifications would go into
				the private. This public calls the private to do the work.

				I mean one day the color might expand. In that case, I don't need
				to worry about the public methods, just rewrite the private ones.
			*/			
		},	

	//----- BOX COLOR -----//

	/**
	 *	The colour of the Box.
	 *
	 *	@property {string} _color - The colour of the Box, as an SMS colour 
	 *		class, but stored without "sms" or "color".
	 *	@private
	 */	
	_color: "intranet-blue",
	
		/**
		 * 	Return the colour of this Box.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The colour of the Box, prefaced with the framework 
		 *		prefix and "color".		 
		 */
		_getColor: function() {
			"use strict";
			return addPrefix( "color-" + this._color);
		},
	
		/**
		 * 	Set the colour of this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new colour for the Box. It will 
		 *		remove the framework prefix and "color".	 
		 *	@returns {Box} The Box; this.	 
		 */
		_setColor: function( aColor ) {
			"use strict";
			this._color = removePrefix( aColor.replace( "color-", "" ) );
			return this;
		},
	
		/**
		 * 	Get or Set the colour of this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new colour for the Box, as an 
		 *		SMS colour class.		 
		 *	@returns {(string|Box)} The colour of this Box as an SMS 
		 *		colour class, or the Box itself.	 
		 */
		color: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getColor();
			}
			else {
				this._setColor( aParameter );
				return this;
			}		
		},
	
			/**	@borrows color as colour */	
			colour: function( aParameter ) {
				"use strict";
				return this.color( aParameter );
			},

	//----- BOX DROPSHADOW -----//

	/**
	 *	The drop shadow of the Box.
	 *
	 *	@property {boolean} _drop_shadow - Does this Box have a drop shadow?
	 *	@private
	 */	
	_drop_shadow: false,
	
		/**
		 * 	Return whether this Box has a drop shadow.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Returns true if the Box has a drop shadow.		 
		 */
		_getDropShadow: function() {
			"use strict";
			return this._drop_shadow;
		},
	
		/**
		 * 	Set the drop shadow on this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if you want the box to 
		 *		have a drop shadow.		 
		 *	@returns {Box} The Box; this.	 
		 */
		_setDropShadow: function( aBoolean ) {
			"use strict";
			this._drop_shadow = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set the drop shadow on this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if you want a drop shadow for the Box.		 
		 *	@returns {(boolean|Box)} Returns true if the Box has a drop shadow, or the Box itself.	 
		 */
		dropShadow: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getDropShadow();
			}
			else {
				this._setDropShadow( aParameter );
				return this;
			}
		},
	
			/**	@borrows dropShadow as hasDropShadow */
			hasDropShadow: function( aParameter ) {
				"use strict";
				return this.dropShadow( aParameter );
			},
	
			/**	@borrows dropShadow as useDropShadow */
			useDropShadow: function( aParameter ) {
				"use strict";
				return this.dropShadow( aParameter );
			},
	
	//----- BOX TEXTCOLOR -----//

	/**
	 *	The colour of the text on the Box.
	 *
	 *	@property {string} _text_color - The text can be "light" or "dark"; 
	 *		an SMS text colour class, but stored without "sms" or "text".
	 *	@private
	 */	
	_text_color: "light",
	
		/**
		 * 	Return the text colour of this Box.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The text colour of the Box, prefaced with the 
		 *		framework prefix and "text". Should be an SMS text colour class,
		 *		i.e. either "sms-text-light" or "sms-text-dark".
		 */	
		_getTextColor: function() {
			"use strict";
			return addPrefix( "text-" + this._text_color );
		},
		
		/**
		 * 	Set the text colour of this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new text colour for the Box. It will 
		 *		remove the framework prefix and "text".	 
		 *	@returns {Box} The Box; this.	 
		 */	
		_setTextColor: function( aColor ) {
			"use strict";
			this._text_color = removePrefix( aColor.replace( "text-", "" ) );
			return this;
		},	
	
		/**
		 * 	Get or Set the text colour of this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text colour for the Box, as 
		 *		an SMS text colour class.		 
		 *	@returns {(string|Box)} The text colour of this Box as an SMS 
		 *		text colour class, or the Box itself.	 
		 */
		textColor: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getTextColor();	
			} 
			else {
				this._setTextColor( aParameter );
				return this;				
			}
		},	
	
			/**	@borrows textColor as textColour */
			textColour: function( aParameter ) {
				"use strict";
				return this.textColor( aParameter );
			},	
	
	//----- BOX CUSTOMCOLOR -----//
	
	/**
	 *	Does this Box have a custom colour? And if so, what is it?
	 *
	 *	@typedef _custom_color
	 *	@property {boolean} _exists - Indicates whether the Box will have a custom color.
	 *	@property {string} _value - The custom colour in hexadecimal
	 *		notation, including the #, as a string.
	 *	@private
	 */	
	_custom_color: {
		_exists: false,
		_value: "#ccaa00",
		
		/**
		 * 	Return whether this Box has a custom colour.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Returns true if the Box has a custom colour.		 
		 */	
		_hasCustom: function() {
			"use strict";
			return this._exists;
		},
		
		/**
		 * 	Set the use of a custom colour on this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if you want the button to 
		 *		have a custom colour.		 
		 *	@returns {Box} The Box; this. // Actually I think it returns _custom_color. Does it matter?
		 */		
		_setCustom: function( aBoolean ) {
			"use strict";
			this._exists = aBoolean;
			return this;
		},
		
		/**
		 * 	Return custom colour of this Box.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The colour in hexadecimal notation.
		 */			
		_getValue: function() {
			"use strict";
			return this._value;
		},
		
		/**
		 * 	Set the custom colour of this Box.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new custom colour for the Box. It 
		 *		should be in hexadecimal notation.
		 *	@returns {Button} The Button; this.	 // See _setCustom for note on return 
		 */			
		_setValue: function( aColor ) {
			"use strict";		
			if ( ( aColor !== null ) && ( aColor.length !== 0 ) ) {
				this._exists = true;
				this._value = aColor;
			}
			else {
				this._exists = false;
				this._value = "";
			}

			return this;
		},		
	},
	
		/**
		 * 	Get or Set the use of a custom colour on this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if you want a custom 
		 *		colour for the Button.		 
		 *	@returns {(string|Box)} Returns true if the Box has a custom 
		 *		colour, or the Box itself.	 
		 */	
		hasCustomColor: function( aParameter ) {
			"use strict";		
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._custom_color._hasCustom();
			}
			else {
				this._custom_color._setCustom( aParameter );
				return this;
			}
		},
	
			/**	@borrows hasCustomColor as hasCustomColour */
			hasCustomColour: function( aParameter ) {
				"use strict";
				return this.hasCustomColor( aParameter );
			},
	
			/**	@borrows hasCustomColor as hasCustom */
			hasCustom: function( aParameter ) {
				"use strict";
				return this.hasCustomColor( aParameter );
			},
	
			/**	@borrows hasCustomColor as useCustomColor */
			useCustomColor: function( aParameter ) {
				"use strict";
				return this.hasCustomColor( aParameter );
			},
	
			/**	@borrows hasCustomColor as useCustomColour */
			useCustomColour: function( aParameter ) {
				"use strict";
				return this.hasCustomColor( aParameter );
			},	
	
			/**	@borrows hasCustomColor as useCustom */
			useCustom: function( aParameter ) {
				"use strict";
				return this.hasCustomColor( aParameter );
			},	
	
		/**
		 * 	Get or Set the custom colour of this Box.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new custom colour for the Box, 
		 *		in hexadecimal notation.		 
		 *	@returns {(string|Button)} The custom colour of this Box, or the
		 *		Box itself.	 
		 */
		customColor: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._custom_color._getValue();
			} 
			else {
				this._custom_color._setValue( aParameter );
				return this;
			}
		},
	
			/**	@borrows customColor as customColour */
			customColour: function( aParameter ) {
				"use strict";
				return this.customColor( aParameter );
			},
	
	//----- CONSTRUCTORS -----//
	
	/**
	 * 	Clone the Box object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	@constructs Box
	 *	@method
	 *	@public
	 *	@example foo = Box.new(); 
	 */		
	new: function() {
		"use strict";
		var newBox = Object.create( this );
		newBox._row_array = [];
		return newBox;
	},
	
	/**
	 * 	Clone the Box object and then populate it with data from a JSON string.
	 *
	 *	@constructs Box
	 *	@method
	 *	@public
	 *	@param {string} anInput - A JSON string describing a Box.
	 */		
	newFromJSON: function( aString ) {
		"use strict";
		
		var jsonObj = JSON.parse( aString );
		var aNewBox = this.new();
		
		aNewBox.title( jsonObj.title );
		aNewBox.abstract( jsonObj.abstract );
		if ( ( jsonObj.customColor !== undefined ) && ( jsonObj.customColor !== null ) ) {
			aNewBox.customColor( jsonObj.customColor );
		}
		else if ( ( jsonObj.color !== undefined ) && ( jsonObj.color !== null ) ) {
			aNewBox.color( jsonObj.color );
		}
		aNewBox.dropShadow( jsonObj.dropShadow );
		aNewBox.textColor( jsonObj.textColor );
		
		for (var i = 0; i < jsonObj.rows.length; i++ ) {
			// expecting a string, not an object
			aNewBox.addRowFromJSON( JSON.stringify( jsonObj.rows[i] ) );
		}
		
		aNewBox.renumerateRows();
		
		return aNewBox;
	  },
	
	//----- OUTPUT -----//
	
	/**
	 * 	Get a JSON string describing the Box (and its associated Rows).
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getJSON: function() {
		"use strict";
		
		var jsonstring = "";
		
		// Add box attributes
		jsonstring  = '"title":"' + this.title() + '", ';
		jsonstring += '"abstract":"' + this.abstract() + '", ';
		if ( this.hasCustomColor() ) {
			jsonstring += '"customColor":"' + this.customColor() + '", ';
		}
		else {
			jsonstring += '"color":"' + this.color() + '", ';
		}
		jsonstring += '"dropShadow":' + this.hasDropShadow() + ', ';
		jsonstring += '"textColor":"' + this.textColor() + '", ';
		
		// Add rows
		jsonstring += '"rows": [ ';
		for ( var i = 0; i < this.rowsLength(); i++ ) {
			jsonstring += this.getRow(i).getJSON();
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
	 * 	Get the HTML to construct this Box.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} The HTML of this Box (and its associated Rows).
	 */	
	getHTML: function() {
		"use strict";
		
		var generatedBox = "";
		
		// START BOX
		generatedBox += "<!-- START BOX -->\n";
		generatedBox += "<div class=\"" + FRAMEWORK_PREFIX + "-box " + this.color() + "\">\n";
		
		// BOX HEADER
		generatedBox += "<!-- Box Header -->\n";
		generatedBox += "<div>\n<div class=\"" + FRAMEWORK_PREFIX + "-box-header text-capitalize ";
		generatedBox += this.textColor() + "\">";
		generatedBox += "<h4 class=\"isEditable\">" + this.title() + "</h4>\n</div>\n</div>\n";
		
		// BOX ABSTRACT
		generatedBox += "<!-- Box Abstract -->\n";
		generatedBox += "<div class=\"" + FRAMEWORK_PREFIX + "-box-abstract\">\n";
		generatedBox += "<p class=\"isEditable\">\n";
		generatedBox += this.abstract();
		generatedBox += "\n</p>\n</div>\n";
		
		// SHADE PATTERNS
		generatedBox += "<!-- Shade Pattern 1/3 Left -->\n";
		generatedBox += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-container " + FRAMEWORK_PREFIX + "-box-shade-pattern-left-third\">\n";
		generatedBox += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-left "  + FRAMEWORK_PREFIX + "-box-shade-underlay\"></div>\n";
		generatedBox += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-right " + FRAMEWORK_PREFIX + "-box-shade-underlay\"></div>\n";		

		// DRAW ROWS
		generatedBox += "<div class=\"" + FRAMEWORK_PREFIX + "-box-rows ui-sortable ui-sortable-disabled\">\n";
		for ( var i = 0, n = this.rowsLength(); i < n; i++ ) {
			var currentRow = this.getRow(i);
			generatedBox += currentRow.getHTML();
		}
		generatedBox += "<!-- End Rows Div -->\n";
		generatedBox += "</div>\n";
		
		// END PATTERN
		generatedBox += "<!-- End Pattern Div -->\n";
		generatedBox += "</div>\n";		

		// END BOX
		generatedBox += "<!-- End Box Div -->\n";
		generatedBox += "</div>\n";
		
		return generatedBox;
	},

	/**
	 * 	Return the class name. Useful for some polymorphic functions.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} "Box".
	 */	
	getClassName: function() {
		"use strict";
		return "Box";
	},
	
		/**	@borrows getClassName as class */
		class: function() {
			"use strict";
			return this.getClassName();
		}	
};
