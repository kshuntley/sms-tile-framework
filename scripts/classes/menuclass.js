/**
 *	Menu Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.2
 *
 *	@class Menu
 *
 */
var Menu = {
	/** @lends Menu */

	//----- THE _menu_array & MENU ITEM (AND ADDING TO, REORDERING AND DELETING FROM) -----//
	
	/**
	 *	An array of menu items.
	 *	@property {MenuItem[]} _menu_array - An array of MenuItem objects.
	 *	@private
	 */
	_menu_array: [],
	
		/**
		 *	Return the MenuItem at this index.
		 *
		 *	@method
		 *	@public
		 *	@param {number} anIndex - The index of the MenuItem you want to access.
		 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _menu_array.
		 *	@returns {MenuItem} MenuItem at specified index.
		 */
		menuItem: function( anIndex ) {
			"use strict";
			if ( ( anIndex >= this.numberOfItems() ) || ( anIndex < 0 ) ) {
				throw new RangeError ( "The specified argument is beyond the range of the array. i.e. You're asking for a menu item that doesn't exist." );
			}
			else {
				return this._menu_array[anIndex];
			}
		},
			
	 		/**	@borrows menuItem as item */
			item: function( anIndex ) {
				"use strict";
				return this.menuItem( anIndex );
			},

		/**
		 *	Return the number of MenuItems in this Menu.
		 *
		 *	@method
		 *	@public
		 *	@returns {number} The length of the _menu_array array.
		 */
		numberOfMenuItems: function() {
			"use strict";
			return this._menu_array.length;
		},

	 		/**	@borrows numberOfMenuItems as numberOfItems */
			numberOfItems: function() {
				"use strict";
				return this.numberOfMenuItems();
			},

			/**	@borrows numberOfMenuItems as numItems */
			numItems: function() {
				"use strict";
				return this.numberOfMenuItems();
			},

		/**
		 * 	Moves a MenuItem to a different index in the _menu_array.
		 *
		 *	@method
		 *	@public
		 *	@param {number} anIndex - The index of the MenuItem you want to move.
		 *	@param {number} aDestination - The index to which you wish to move this MenuItem
		 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _menu_array.
		 *	@throws {RangeError} Will throw error if aDestination is less than 0 or greater than the length of _menu_array.		 
		 *	@returns {Menu} The Menu; this.		 
		 */
		moveMenuItem: function( anIndex, aDestination ) {
			// For instance, to move row 4 to the start, you'd say moveRow(4, 0);
			"use strict";
			if ( ( aDestination > this.numberOfItems() ) || ( aDestination < 0 ) ) {
				throw new RangeError ( "The specified destination is beyond the range of the array. i.e. You're moving a menu item beyond the length of the array." );
			}
			else if ( ( anIndex > this.numberOfItems() ) || ( anIndex < 0 ) ) {
				throw new RangeError ( "The specified index is beyond the range of the array. i.e. You're moving a menu item that doesn't exist." );
			}

			var targetItem = this.menuItem( anIndex );

			// Remove the target button from the original position in the array
			this._menu_array.splice( anIndex, 1 );

			// Add the target button to the new position in the array
			this._menu_array.splice( aDestination, 0, targetItem );

			this.renumerateMenu( MENU_IDENTIFIER_PREFIX );

			return this;
		},

			/**	@borrows moveMenuItem as moveItem */
			moveItem: function( anIndex, aDestination ) {
				"use strict";
				return this.moveMenuItem( anIndex, aDestination );
			},	

		/**
		 * 	Resets the identifiers of MenuItems based on their index of the _menu_array. 
		 *	Item at index 3 will have an identifier of "anIdentifier-3".
		 *
		 *	@method
		 *	@public
		 *	@param {string} [anIdentifier=MENU_IDENTIFIER_PREFIX] - A prefix for the identifiers.	 
		 *	@returns {Menu} The Menu; this.		 
		 */	
		renumerateMenu: function( anIdentifier ) {
			"use strict";

			var n = this.numberOfItems();
			var i;

			if ( ( anIdentifier === undefined ) || ( anIdentifier === null ) ) {
				anIdentifier = MENU_IDENTIFIER_PREFIX;
			}

			for ( i = 0; i < n; i++ ) {
				this.item(i).identifier( anIdentifier + '-' + i );
			}

			return this;
		},

		/**
		 * 	Add a new MenuItem to the Menu.
		 *
		 *	@method
		 *	@public
		 *	@param {string=} aLabel - A prefix for the identifiers.	 
		 *	@returns {Menu} The Menu; this.		 
		 */		
		addMenuItem: function( aLabel ) {
			"use strict";

			var newItem = MenuItem.new();

			if ( ( aLabel !== undefined ) && ( aLabel !== null ) ) {
				newItem.label( aLabel );
			}

			this._menu_array.push( newItem );
			this.renumerateMenu();
			return this;
		},	
			
			/**	@borrows addMenuItem as addItem */
			addItem: function( aLabel ) {
				"use strict";
				return this.addMenuItem( aLabel );
			},

		/**
		 * 	Add a new MenuItem to the Menu constructed from a JSON string.
		 *
		 *	@method
		 *	@public
		 *	@param {string} aJSONString - A JSON string for a MenuItem.	 
		 *	@returns {Menu} The Menu; this.		 
		 */	
		addMenuItemFromJSON: function( aJSONString ) {
			"use strict";

			var newItem = MenuItem.newFromJSON( aJSONString );
			this._menu_array.push( newItem );		
			return this;
		},

			/**	@borrows addMenuItemFromJSON as addItemFromJSON */
			addItemFromJSON: function( aJSONString ) {
				"use strict";
				return this.addMenuItemFromJSON( aJSONString );
			},

		/**
		 * 	Return the MenuItem with this identifier.
		 *
		 *	@method
		 *	@public
		 *	@param {string} anIdentifier - The value of the id attribute of the MenuItem you want to match.
		 *	@throws {SyntaxError} Will throw error if anIdentifier is not specified.
		 *	@throws {SyntaxError} Will throw error if anIdentifier is not a string.			 
		 *	@returns {MenuItem} The matching Menu item.		 
		 */		
		getMenuItemByIdentifier: function( anIdentifer ) {
			"use strict";
			if ( ( anIdentifer === undefined )  || ( anIdentifer === null ) ) {
				throw new SyntaxError ( "A menu item identifier was not specified." );
			}
			else {

				// Check if the Identifier is an String and if so, return that row
				if ( ( typeof anIdentifer === "string" ) || ( anIdentifer instanceof String ) ) {

					// Strip off the prefix and parse it as an Integer
					var anIndex = parseInt( anIdentifer.replace( ( MENU_IDENTIFIER_PREFIX + "-" ), "" ) );
					return this.item( anIndex );
				}

				// If the Identifier is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}			

			}
		},

			/**	@borrows getMenuItemByIdentifier as getItemByIdentifier */
			getItemByIdentifier: function( anIdentifer ) {
				"use strict";
				return this.getMenuItemByIdentifier( anIdentifer );
			},

			/**	@borrows getMenuItemByIdentifier as getMenuItemByID */
			getMenuItemByID: function( anIdentifier ) {
				"use strict";
				return this.getMenuItemByIdentifier( anIdentifier );
			},

			/**	@borrows getMenuItemByIdentifier as getMenuItemById */
			getMenuItemById: function( anIdentifier ) {
				"use strict";
				return this.getMenuItemByIdentifier( anIdentifier );
			},		

			/**	@borrows getMenuItemByIdentifier as getItemByID */
			getItemByID: function( anIdentifier ) {
				"use strict";
				return this.getMenuItemByIdentifier( anIdentifier );
			},

			/**	@borrows getMenuItemByIdentifier as getItemById */
			getItemById: function( anIdentifier ) {
				"use strict";
				return this.getMenuItemByIdentifier( anIdentifier );
			},

		/**
		 * 	Delete the MenuItem at this index.
		 *	@public
		 *	@param {number} anIndex - The index of the MenuItem you want to delete.			 
		 *	@returns {Menu} The Menu; this.		 
		 */		
		deleteMenuItem: function( anIndex ) {
			"use strict";

			if ( ( anIndex !== undefined ) && ( anIndex !== null ) ) {
				this._menu_array.splice( anIndex, 1 );
			}
			else {
				this._menu_array.pop();
			}

			this.renumerateMenu();
			return this;
		},

			/**	@borrows deleteMenuItem as deleteItem */
			deleteItem: function( anIndex ) {
				"use strict";
				return this.deleteMenuItem( anIndex );
			},	
	
	
	//----- MENU TEXT ALIGNMENT -----//	
	
	/**
	 * 	The text alignment for the menu. Should be "left", "center" or "right".
	 *	@property {string} _text_align - The alignment of the MenuItems in this Menu.
	 *	@private
	 */
	_text_align: "left",
	
		/**
		 * 	Return the text alignment of this Menu.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The text alignment of the Menu as a bootstrap class.		 
		 */	
		_getTextAlign: function() {
			"use strict";
			return ( "text-" + this._text_align );
		},
		
		/**
		 * 	Set the text alignment of this Menu.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAlign - The new text alignment. Can be a bootstrap class (i.e. "left" or "text-left").		 
		 *	@returns {Menu} The Menu; this.	 
		 */			
		_setTextAlign: function( anAlign ) {
			"use strict";
			this._text_align = anAlign.replace( "text-", "" );
			return this;
		},
		
		/**
		 * 	Get or Set the text alignment of this Menu.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text alignment. Can be a bootstrap class (i.e. "left" or "text-left").		 
		 *	@returns {(string|Menu)} The text alignment of the Menu as a bootstrap class or the Menu itself.	 
		 */		
		textAlign: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getTextAlign();	
			} 
			else {
				this._setTextAlign( aParameter );
				return this;				
			}
		},
	
	
	//----- MENU TEXT WEIGHT -----//	
	
	/**
	 * 	The text alignment for the Menu. Should be "left", "center" or "right".
	 *	@property {boolean} _text_weight - If this Menu should have bold text or not. 
	 *	@private
	 */	
	_text_weight: false,
		
		/**
		 * 	Return the text weight of this Menu.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean}		 
		 */	
		_getWeight: function() {
			"use strict";
			return this._weight;
		},
		
		/**
		 * 	Set the text weight of this Menu.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - If set true, this Menu will have bold text.		 
		 *	@returns {Menu} The Menu; this.	 
		 */		
		_setWeight: function( aBoolean ) {
			"use strict";
			this._weight = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set the text weight of this Menu.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - The new text weight. If set true, this Menu will have bold text.		 
		 *	@returns {(boolean|Menu)} The text weight of the Menu as a boolean or the Menu itself.	 
		 */	
		textWeight: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getWeight();	
			} 
			else {
				this._setWeight( aParameter );
				return this;				
			}
		},
	
			/**	@borrows textWeight as textBold */
			textBold: function( aParameter ) {
				"use strict";
				return this.textWeight( aParameter );
			},	
	
	
	//----- MENU ICONS -----//	
	
	/**
	 * 	If set to true, the Menu should have (fa) icons.
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.
	 *
	 *	@property {boolean} _use_icons
	 *	@private
	 */
	_use_icons: true,
	

		/**
		 * 	Returns if this Menu should use (fa) icons or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean}		 
		 */		
		_getUseIcons: function() {
			"use strict";
			return this._use_icons;
		},	
	
		/**
		 * 	Set the use of (fa) icons for this Menu.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - If set true, this Menu will use (fa) icons.		 
		 *	@returns {Menu} The Menu; this.	 
		 */	
		_setUseIcons: function( aBoolean ) {
			"use strict";
			this._use_icons = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set the use of (fa) icons for this Menu.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - If set true, this Menu will use (fa) icons.		 
		 *	@returns {(boolean|Menu)} The use of icons in the Menu as a boolean or the Menu itself.	 
		 */	
		useIcons: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getUseIcons();
			}
			else {
				this._setUseIcons( aParameter );
				return this;
			}
		},
	
			/**	@borrows useIcons as hasIcons */
			hasIcons: function( aParameter ) {
				"use strict";
				return this.useIcons( aParameter );
			},
	
	/**
	 * 	Where should the icons for the Menu be placed? Should be "left" or "right".
	 *
	 *	@property {string} _icon_placement
	 *	@private
	 */	
	_icon_placement: "left",

		/**
		 * 	Returns the placement of the icons.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} Either "left" or "right". 		 
		 */
		_getIconPlacement: function() {
			"use strict";
			return this._icon_placement;
		},
		
		/**
		 * 	Set the placement of icons for this Menu.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAlign - This should be either "left" or "right".		 
		 *	@returns {Menu} The Menu; this.	 
		 */		
		_setIconPlacement: function( anAlign ) {
			"use strict";
			this._icon_placement = anAlign;
			return this;
		},
	
		/**
		 * 	Get or Set the placement of icons for this Menu.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - If setting the alignment, this should be either "left" or "right".		 
		 *	@returns {(string|Menu)} The use of icons in the Menu as a boolean or the Menu itself.	 
		 */		
		iconPlacement: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getIconPlacement();	
			} 
			else {
				this._setIconPlacement( aParameter );
				return this;				
			}
		},	
	
	//----- CONSTRUCTORS -----//
	
	/**
	 * 	Clone the Menu object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	@constructs Menu
	 *	@method
	 *	@public 
	 */	
	new: function() {
		"use strict";
		var aNewMenu = Object.create( this );

		aNewMenu._menu_array = []; // Don't inherit existing items
		return aNewMenu;
	},
	
	/**
	 * 	Clone the Menu object and then populate it with data from a JSON string.
	 *
	 *	@constructs Menu
	 *	@method
	 *	@public
	 *	@param {string} aString - A JSON string describing a Menu.
	 */		
	newFromJSON: function( aString ) {
		"use strict";
		
		var jsonObj = JSON.parse( aString );
		var aNewMenu = this.new();
		
		aNewMenu.textAlign( jsonObj.textAlign );
		aNewMenu.textBold( jsonObj.textBold );
		aNewMenu.iconPlacement( jsonObj.iconPlacement );			
		aNewMenu.useIcons( jsonObj.useIcons );

		for (var i = 0; i < jsonObj.menuItems.length; i++ ) {
			// expecting a string, not an object
			aNewMenu.addMenuItemFromJSON( JSON.stringify( jsonObj.menuItems[i] ) );
		}
		
		aNewMenu.renumerateMenu();
		return aNewMenu;
	},
	
	
	//----- OUTPUT -----//
	
	/**
	 * 	Get a JSON string describing the Menu (and its associated MenuItems).
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getJSON: function() {
		"use strict";
		
		var jsonstring = "";
				
		jsonstring  = '"textAlign":"' + this.textAlign() + '", ';
		jsonstring += '"textBold":' + this.textBold() + ', ';
		jsonstring += '"iconPlacement":"' + this.iconPlacement() + '", ';
		jsonstring += '"useIcons":' + this.useIcons() + ', ';		
		
		// Add menu items
		jsonstring += '"menuItems": [ ';
		for ( var i = 0; i < this.numberOfItems(); i++ ) {
			jsonstring += this.item( i ).getJSON();
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
	 * 	Get the HTML to construct this Menu.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} The HTML of this Menu (and its associated MenuItems).
	 */	
	getHTML: function() {
		"use strict";
		
		var generatedMenu = "";
		var n = this.numberOfItems();
		
		var useIcon = this.hasIcons();
		var useBold = this.textWeight();
		var textAlign = this.textAlign();
		var placeRight = false;
		
		if ( this.iconPlacement() === "right" ) {
			placeRight = true;
		}
		
		generatedMenu += "<!-- Menu -->\n";
		generatedMenu += "<ul class=\"list-group " + FRAMEWORK_PREFIX + "-menu ui-sortable ui-sortable-disabled\">";
		for ( var i = 0; i < n; i++ ) {
			generatedMenu += this.item( i ).getHTML( useIcon, useBold, textAlign, placeRight );
		}
		generatedMenu += "</ul>\n";
		
		return generatedMenu;
	},
	
	/**
	 * 	Return the class name. Useful for some polymorphic functions.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} "Menu".
	 */		
	getClassName: function() {
		"use strict";
		return "Menu";
	},
	
		/**	@borrows getClassName as class */
		class: function() {
			"use strict";
			return this.getClassName();
		}	
	
};
