/**
 *	Title Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.3 - _new_window for hyperlink added.
 *
 *	@class Tile
 *
 */
var Tile = {
	/** @lends Tile */

	//----- TILE LAYOUT -----//
	
	/**
	 *	A Tile layout.
	 *	@property {string} _layout. 
	 *	@private
	 */		
	_layout: "layout-portrait",
	
		/**
		 * 	Return the Tile's layout.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The layout of the Tile.		 
		 */
		_getLayout: function () {
			"use strict";
			return addPrefix( this._layout );
		},
	
		/**
		 * 	Set the Tile's layout.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aLayout - The new layout.		 
		 *	@returns {Tile} The Tile; this.	 
		 */
		_setLayout: function( aLayout ) {
			"use strict";
			this._layout = removePrefix( aLayout );
			return this;
		},
	
		/**
		 * 	Get or Set the layout of this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new Tile layout.		 
		 *	@returns {(string|Tile)} The layout of this Tile or the Tile itself.	 
		 */
		layout: function ( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getLayout();
			}
			else {
				this._setLayout( aParameter );
				return this;
			}
			
			/* 
				Maintenance Note:

				Why not just set the property directly? Well, I could, but I'm trying to
				set up some fake encapsulation here. Any major modifications would go into
				the private. This public calls the private to do the work.

				I mean one day the layout might expand. In that case, I don't need
				to worry about the public methods, just rewrite the private ones.
			*/			
		},
	
	//----- TILE COLOR -----//

	/**
	 *	The colour of the Tile.
	 *
	 *	@property {string} _color - The colour of the Tile, as an SMS colour 
	 *		class, but stored without "sms" or "color".
	 *	@private
	 */	
	_color: "dark-teal",
	
		/**
		 * 	Return the colour of this Tile.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The colour of the Tile, prefaced with the framework 
		 *		prefix and "color".		 
		 */
		_getColor: function () {
			"use strict";
			return addPrefix( "color-" + this._color );
		},
	
		/**
		 * 	Set the colour of this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new colour for the Tile. It will 
		 *		remove the framework prefix and "color".	 
		 *	@returns {Tile} The Tile; this.	 
		 */
		_setColor: function( aColor ) {
			"use strict";
			this._color = removePrefix( aColor.replace( "color-", "" ) );
			return this;
		},
	
		/**
		 * 	Get or Set the colour of this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new colour for the Tile, as an 
		 *		SMS colour class.		 
		 *	@returns {(string|Box)} The colour of this Tile as an SMS 
		 *		colour class, or the Tile itself.	 
		 */
		color: function ( aParameter ) {
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

	//----- TILE DROPSHADOW -----//

	/**
	 *	The drop shadow of the Tile.
	 *
	 *	@property {boolean} _drop_shadow - Does this Tile have a drop shadow?
	 *	@private
	 */		
	_drop_shadow: false,
	
		/**
		 * 	Return whether this Tile has a drop shadow.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Returns true if the Tile has a drop shadow.		 
		 */
		_getDropShadow: function() {
			"use strict";
			return this._drop_shadow;
		},		
	
		/**
		 * 	Set the drop shadow on this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if you want the Tile to 
		 *		have a drop shadow.		 
		 *	@returns {Tile} The Tile; this.	 
		 */
		_setDropShadow: function( aBoolean ) {
			"use strict";
			this._drop_shadow = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set the drop shadow on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if you want a drop shadow for the Tile.		 
		 *	@returns {(boolean|Tile)} Returns true if the Tile has a drop shadow, or the Tile itself.	 
		 */
		dropShadow: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._drop_shadow;
			}
			else {
				this._setDropShadow( aParameter );
				return this;
			}
			
			/* 
				Maintenance Note:

				Why not just set the property directly? Well, I could, but I'm trying to
				set up some fake encapsulation here. Any major modifications would go into
				the private. This public calls the private to do the work.

				I mean one day the drop shadow might expand. In that case, I don't need
				to worry about the public methods, just rewrite the private ones.
			*/
		},
	
			/**	@borrows dropShadow as hasDropShadow */
			hasDropShadow: function( aParameter ) {
				"use strict";
				return this.dropShadow( aParameter );
			},
	
	//----- TILE TEXT -----//

	/**
	 *	All the text subproperties are contained in this "object literal". i.e. to change the text color, access the _color property of the _text object literal. 
	 *	This all made much more sense when I started. I don't think I'd bother after Boxes and Rows.
	 *	@example var color = this._text._color; // Note, this is ignoring the privacy of _text and _color.
	 *	@example var color = this.textColor();  // More correct, but not illustrating that there are two levels of objects here.
	 *
	 *
	 *	@property {Object} _text - All the text properties for Tile
	 *	@private
	 */	
	_text: {
		
		/**
		 *	This is what text is on the Tile.
		 *	It is a subproperty of the _text object.
		 *
		 *	@see _text
		 *	@property {string} _value
		 *	@private
		 */			
		_value: "This is your tile text.",
		
		/**
		 *	This is the alignment of the text on the Tile, as a [bootstrap]{@link https://getbootstrap.com/docs/3.3/} class without the "text-" prefix.
		 *	It is a subproperty of the _text object.
		 *
		 *	@see _text
		 *	@property {string} _align
		 *	@private
		 */			
		_align: "left",	
		
		/**
		 *	This is the color of the text on the Tile, as an SMS text class without the framework prefix or "text-" prefix.
		 *	It is a subproperty of the _text object.
		 *
		 *	@see _text
		 *	@property {string} _color
		 *	@private
		 */			
		_color: "light",
		
		/**
		 *	This is the weight or boldness of the text on the Tile, as a [bootstrap]{@link https://getbootstrap.com/docs/3.3/} class without the "font-weight-" prefix.
		 *	It is a subproperty of the _text object.
		 *
		 *	@see _text
		 *	@property {string} _weight
		 *	@private
		 */			
		_weight: "normal",
		
		/**
		 *	This is the size of the text on the Tile, as an SMS text class without the framework prefix or "text-" prefix.
		 *	It is a subproperty of the _text object.
		 *
		 *	@see _text
		 *	@property {string} _size
		 *	@private
		 */			
		_size: "normal",
		
		/**
		 * 	Return the text on this Tile.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} Returns the Tile's text.		 
		 */
		_getText: function() {
			"use strict";
			return this._value;
		},
		
		/**
		 * 	Set the text on this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aText - This is the text on the tile. Should be text not html.		 
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _text object.
		 */		
		_setText: function( aText ) {
			"use strict";
			this._value = aText;
			return this;
		},
		
		/**
		 * 	Return the text alignment on this Tile.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} Returns either "text-left", "text-right" or "text-center".		 
		 */		
		_getAlign: function() {
			"use strict";
			return ( "text-" + this._align );
		},
		
		/**
		 * 	Set the text alignment of this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAlign - This is the text alignment. If sent, the "text-" prefix will be stripped off.		 
		 *	@returns {Tile} The Tile; this.	 
		 */		
		_setAlign: function( anAlign ) {
			"use strict";
			this._align = anAlign.replace( "text-", "" );
			return this;
		},
		
		/**
		 * 	Return the text color on this Tile.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} Returns either "sms-text-light" or "sms-text-dark".		 
		 */		
		_getColor: function() {
			"use strict";
			return addPrefix( "text-" + this._color );
		},
		
		/**
		 * 	Set the text color of this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - This is the text color, either "light" or "dark". If sent, the framework and "text-" prefixes will be stripped off.		 
		 *	@returns {Tile} The Tile; this.	 
		 */		
		_setColor: function( aColor ) {
			"use strict";
			this._color = removePrefix( aColor.replace( "text-", "" ) );
			return this;
		},
		
		/**
		 * 	Return the text weight (i.e. boldness) on this Tile.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} Returns either "font-weight-bold" or "font-weight-normal".		 
		 */		
		_getWeight: function() {
			"use strict";
			return ( "font-weight-" + this._weight );
		},
		
		/**
		 * 	Set the text weight (i.e. boldness) of this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aWeight - This is the boldness or weight of the text. It can be either "bold" or "normal". 
		 *		If sent, the "font-weight-" prefixes will be stripped off.		 
		 *	@returns {Tile} The Tile; this.	 
		 */		
		_setWeight: function( aWeight ) {
			"use strict";
			this._weight = aWeight.replace( "font-weight-" , "");
			return this;
		},
			
		/**
		 * 	Return the text size on this Tile.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} Returns the text size as an SMS class.		 
		 */		
		_getSize: function() {
			"use strict";
			return addPrefix( "text-" + this._size );
		},
		
		/**
		 * 	Set the text size of this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aSize - This is the text size, as an SMS class. If sent, the framework and "text-" prefixes will be stripped off.		 
		 *	@returns {Tile} The Tile; this.	 
		 */		
		_setSize: function( aSize ) {
			"use strict";
			this._size = removePrefix( aSize.replace( "text-", "" ) );
			return this;
		},
		
	},
	
		/**
		 * 	Get or Set the text of this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text for this Tile.		 
		 *	@returns {(string|Tile)} The text of this Tile or the Tile itself.	 
		 */
		text: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._text._getText();
			} 
			else {
				this._text._setText( aParameter );
				return this;
			}		
		},
	
		/**
		 * 	Get or Set the text alignment on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text alignment for this Tile.		 
		 *	@returns {(string|Tile)} The text alignment of this Tile or the Tile itself.	 
		 */	
		textAlign: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._text._getAlign();	
			} 
			else {
				this._text._setAlign( aParameter );
				return this;				
			}
		},
	
		/**
		 * 	Get or Set the text color of this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text color for this Tile.		 
		 *	@returns {(string|Tile)} The text color of this Tile or the Tile itself.	 
		 */		
		textColor: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._text._getColor();	
			} 
			else {
				this._text._setColor( aParameter );
				return this;				
			}
		},	
	
			/**	@borrows textColor as textColour */
			textColour: function( aParameter ) {
				"use strict";
				return this.textColor( aParameter );
			},
	
		/**
		 * 	Get or Set the text weight (boldness) of this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text weight (boldness) for this Tile.		 
		 *	@returns {(string|Tile)} The text weight of this Tile or the Tile itself.	 
		 */	
		textWeight: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._text._getWeight();	
			} 
			else {
				this._text._setWeight( aParameter );
				return this;				
			}
		},
	
			/**	@borrows textWeight as textBold */
			textBold: function( aParameter ) {
				"use strict";
				return this.textWeight( aParameter );
			},
	
		/**
		 * 	Get or Set the text size of this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text size for this Tile.		 
		 *	@returns {(string|Tile)} The text size of this Tile or the Tile itself.	 
		 */	
		textSize: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._text._getSize();	
			} 
			else {
				this._text._setSize( aParameter );
				return this;				
			}
		},		
	
	//----- TILE URL -----//

	/**
	 *	All the hyperlink subproperties are contained in this "object literal". i.e. to change the link title, access the _title property of the _url object literal. 
	 *	This all made much more sense when I started. I don't think I'd bother after Boxes and Rows.
	 *	@example var linkTitle = this._url._title; // Note, this is ignoring the privacy of _url and _title.
	 *	@example var linkTitle = this.urlTitle();  // More correct, but not illustrating that there are two levels of objects here.
	 *
	 *
	 *	@property {Object} _url - All the hyperlink properties for Tile
	 *	@private
	 */	
	_url: {
		
		/**
		 *	Does a hyperlink exist for this Tile.
		 *	It is a subproperty of the _url object.
		 *
		 *	@see _url
		 *	@property {boolean} _exists
		 *	@private
		 */
		_exists: true,
		
		/**
		 *	What is the address of the hyperlink for this Tile.
		 *	It is a subproperty of the _url object.
		 *
		 *	@see _url
		 *	@property {string} _href
		 *	@private
		 */		
		_href: "http://tafensw.edu.au",
		
		/**
		 *	What is the value of the title attribute of the hyperlink for this Tile.
		 *	It is a subproperty of the _url object.
		 *
		 *	@see _url
		 *	@property {string} _title
		 *	@private
		 */				
		_title: "",
		
		/**
		 *	Should the hyperlink for this Tile open in a new window or tab?
		 *	It is a subproperty of the _url object.
		 *
		 *	@see _url
		 *	@property {boolean} _new_window
		 *	@private
		 */			
		_new_window: false,
		
		/**
		 * 	Return if this Tile has a hyperlink or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this Tile has a hyperlink.		 
		 */
		_getURL: function() {
			"use strict";
			return this._exists;
		},
		
			/**	@borrows _getUrl as _hasUrl */
			_hasURL: function() {
				"use strict";
				return this._getUrl();				
			},
		
		/**
		 * 	Set the existance of a hyperlink for this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if this Tile is to function as a clickable hyperlink.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _url object.
		 */		
		_setURL: function( aBoolean ) {
			"use strict";
			this._exists = aBoolean;
			return this;
		},
		
		/**
		 * 	Return the address (i.e. value of the href) of this hyperlink.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The url (aka hyperlink) of the Tile.	 
		 */		
		_getHref: function() {
			"use strict";
			return this._href;
		},
		
		/**
		 * 	Set the address of a hyperlink for this Tile. Also sets _exists to true.
		 *
		 *	@method
		 *	@private
		 *	@param {?string} anAddress - The url for this Tile. This should include the protocol. If null or empty, sets _href to blank and sets _exists to false.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _url object.
		 */
		_setHref: function( anAddress ) {
			"use strict";
			if ( ( anAddress !== null ) || ( anAddress.length !== 0 ) ) {
				this._exists = true;
				this._href = anAddress;
			} 
			else {
				this._exists = false;
				this._href = "";
			}
			return this;
		},
			
		/**
		 * 	Return the title (i.e. value of the title attribute) of this hyperlink.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The title of the hyperlink on the Tile.	 
		 */		
		_getTitle: function() {
			"use strict";
			return this._title;
		},
		
		/**
		 * 	Set the title of the hyperlink for this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAddress - The title for this hyperlink. 
		 *	@returns {Tile} The Tile; this.
		 */
		_setTitle: function( aTitle ) {
			"use strict";
			this._title = aTitle;
			return this;
		},
		
		/**
		 * 	Return if the hyperlink should open in a new window or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this hyperlink should open in a new window.
		 */
		_getNewWindow: function() {
			"use strict";
			return this._new_window;
		},
				
		/**
		 * 	Set if this hyperlink should open in a new window.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if this hyperlink on the Tile should open in a new window.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _url object.
		 */		
		_setNewWindow: function( aBoolean ) {
			"use strict";
			this._new_window = aBoolean;
			return this;
		},		
		
	},
	
		/**
		 * 	Asking if the Tile does have a hyperlink, or telling the Tile to have a hyperlink. 
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if this Tile has a hyperlink.
		 *	@returns {boolean|Tile} Returns if this Tile has a hyperlink, or the 
		 *		Tile itself.	 
		 */
		hasURL: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._url._getURL();
			}
			else {
				return this._url._setURL( aParameter );
			}
		},
	
			/**	@borrows hasURL as hasUrl */
			hasUrl: function( aParameter ) {
				"use strict";
				return this.hasURL( aParameter );
			},
	
			/**	@borrows hasURL as hasLink */
			hasLink: function( aParameter ) {
				"use strict";
				return this.hasURL( aParameter );
			},
	
			/**	@borrows hasURL as hasHyoerlink */
			hasHyperlink: function( aParameter ) {
				"use strict";
				return this.hasURL( aParameter );
			},	
	
		/**
		 * 	Get or Set the hyperlink on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new url.		 
		 *	@returns {(string|Tile)} The hyperlink of this Tile or the 
		 *		Tile itself.	 
		 */
		url: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._url._getHref();
			} 
			else {
				this._url._setHref( aParameter );
				return this;
			}
			
		},
	
			/**	@borrows url as link */
			link: function( aParameter ) {
				"use strict";
				return this.url( aParameter );
			},
	
			/**	@borrows url as hyperlink */
			hyperlink: function( aParameter ) {
				"use strict";
				return this.url( aParameter );
			},
	
		/**
		 * 	Does the hyperlink on this Tile have a title?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's 
		 *		length is greater than 0.	 
		 */
		hasURLTitle: function() {
			"use strict";
			return ( ( ( typeof this.url._title === 'string' ) || ( this.url._title instanceof String ) ) && ( this._url._title.length > 0 ) );
		},
	
			/**	@borrows hasURLTitle as hasLinkTitle */
			hasLinkTitle: function() {
				"use strict";
				return this.hasURLTitle();
			},
	
			/**	@borrows hasURLTitle as hasHyperlinkTitle */
			hasHyperlinkTitle: function() {
				"use strict";
				return this.hasURLTitle();
			},	
	
			/**	@borrows hasURLTitle as hasUrlTitle */
			hasUrlTitle: function() {
				"use strict";
				return this.hasURLTitle();
			},	
	
		/**
		 * 	Get or Set the title for the hyperlink on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new title.		 
		 *	@returns {(string|Tile)} The title of hyperlink for this Tile 
		 *		or the Tile itself.	 
		 */	
		urlTitle: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._url._getTitle();
			} 
			else {
				this._url._setTitle( aParameter );
				return this;
			}	
		},
	
			/**	@borrows urlTitle as linkTitle */
			linkTitle: function( aParameter ) {
				"use strict";
				return this.urlTitle( aParameter );
			},	
	
			/**	@borrows urlTitle as hyperlinkTitle */
			hyperlinkTitle: function( aParameter ) {
				"use strict";
				return this.urlTitle( aParameter );
			},
	
		/**
		 * 	Get or Set if the hyperlink on this Tile should open in a new window.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Open in a new window or not.		 
		 *	@returns {(boolean|Tile)} A boolean if it should open in a new window or the Button itself.	 
		 */
		newWindow: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._url._getNewWindow();
			}
			else {
				this._url._setNewWindow( aParameter );
				return this;
			}		
		},
	
			/**	@borrows newWindow as hasNewWindow */
			hasNewWindow: function( aParameter ) {
				"use strict";
				return this.newWindow( aParameter );
			},
	
			/**	@borrows newWindow as openInNewWindow */
			openInNewWindow: function( aParameter ) {
				"use strict";
				return this.newWindow( aParameter );
			},	
	
	//----- TILE IMAGE -----//

	/**
	 *	All the image subproperties are contained in this "object literal". i.e. to change the image alt, access the _alt property of the _image object literal. 
	 *	This all made much more sense when I started. I don't think I'd bother after Boxes and Rows.
	 *	@example var alttag = this._image._alt; // Note, this is ignoring the privacy of _image and _alt.
	 *	@example var alttag = this.imageAlt();  // More correct, but not illustrating that there are two levels of objects here.
	 *
	 *
	 *	@property {Object} _image - All the image properties for Tile.
	 *	@private
	 */	
	_image: {
		
		/**
		 *	Does an image exist for this Tile.
		 *	It is a subproperty of the _image object.
		 *
		 *	@see _image
		 *	@property {boolean} _exists
		 *	@private
		 */		
		_exists: false,
		
		/**
		 *	Do you want to use a placeholder image from https://picsum.photos/ if no src is specified yet?
		 *	It is a subproperty of the _image object.
		 *
		 *	@see _image
		 *	@property {boolean} _use_img_placeholder
		 *	@private
		 */			
		_use_img_placeholder: true,
		
		/**
		 *	The address/src of the picture.
		 *	It is a subproperty of the _image object.
		 *
		 *	@see _image
		 *	@property {string} _src
		 *	@private
		 */			
		_src: "",
		
		/**
		 *	The alternate text of the picture.
		 *	It is a subproperty of the _image object.
		 *
		 *	@see _image
		 *	@property {string} _src
		 *	@private
		 */			
		_alt: "",
		
		/**
		 * 	Return if this Tile has an image or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this Tile has an image.		 
		 */
		_getImage: function() {
			"use strict";
			return this._exists;
		},
		
			/**	@borrows _getImage as _hasImage */
			_hasImage: function() {
				"use strict";
				return this._getImage();				
			},		
		
		/**
		 * 	Set the existance of a hyperlink for this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if this Tile is to have an image.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _image object.
		 */		
		_setImage: function( aBoolean ) {
			"use strict";
			this._exists = aBoolean;
			return this;
		},	
		
		/**
		 * 	Return if this Tile should use a placeholder image or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this Tile has an image.		 
		 */
		_getUseImgPlaceholder: function() {
			"use strict";
			return this._use_img_placeholder;
		},
		
			/**	@borrows _getUseImgPlaceholder as _useImgPlaceholder */
			_useImgPlaceholder: function() {
				"use strict";
				return this._getUseImgPlaceholder();				
			},
		
		/**
		 * 	Set the use of a placeholder image for this Tile if no image source is specified.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if this Tile is to use a placeholder image.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _image object.
		 */	
		_setUseImgPlaceholder: function( aBoolean ) {
			"use strict";
			this._use_img_placeholder = aBoolean;
			return this;
		},			
		
		/**
		 * 	Return the address (i.e. value of the href) of this hyperlink.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The source (as a url) of the image for the Tile.	 
		 */
		_getSrc: function() {
			"use strict";
			return this._src;
		},
		
		/**
		 * 	Set the image source for this Tile. Also sets _exists to true.
		 *
		 *	@method
		 *	@private
		 *	@param {?string} aSrc - The url for the image on this Tile. This should include the protocol. If null or empty, sets _href to blank and sets _exists to false.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _url object.
		 */
		_setSrc: function( aSrc ) {
			"use strict";		
			if ( ( aSrc !== null ) || ( aSrc.length !== 0 ) ) {
				this._exists = true;
				this._src = aSrc;
			}
			else {
				this._exists = false;
				this._href = "";
			}
			
			return this;
		},
		
		/**
		 * 	Return the alternate text (i.e. value of the alt attribute) of the image.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The alt text for the image on the Tile.	 
		 */		
		_getAlt: function() {
			"use strict";
			return this._alt;
		},
		
		/**
		 * 	Set the alternate text of the image on this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAlt - The alt text, as plain text, describing the image. 
		 *	@returns {Tile} The Tile; this.
		 */
		_setAlt: function( anAlt ) {
			"use strict";
			this._alt = anAlt;
			return this;
		},
		
	},
	
		/**
		 * 	Asking if the Tile does have an image, or telling the Tile to have an image. 
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if this Tile has an image.
		 *	@returns {boolean|Tile} Returns if this Tile has an image, or the 
		 *		Tile itself.	 
		 */
		hasImage: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._image._hasImage();
			}
			else {
				this._image._setImage( aParameter );
				return this;
			}
		},
	
			/**	@borrows hasImage as hasImg */
			hasImg: function( aParameter ) {
				"use strict";
				return this.hasImage( aParameter );
			},

			/**	@borrows hasImage as hasIMG */
			hasIMG: function( aParameter ) {
				"use strict";
				return this.hasImage( aParameter );
			},
	
			/**	@borrows hasImage as useImage */
			useImage: function( aParameter ) {
				"use strict";
				return this.hasImage( aParameter );
			},
	
		/**
		 * 	Asking if the Tile uses an image placeholder, or telling the Tile to have an image placeholder. 
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if this Tile should use an image placeholder.
		 *	@returns {boolean|Tile} Returns if this Tile has an image, or the 
		 *		Tile itself.	 
		 */
		useImgPlaceholder: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._image._useImgPlaceholder();
			}
			else {
				this._image._setUseImgPlaceholder( aParameter );
				return this;
			}
		},
	
			/**	@borrows useImgPlaceholder as useImagePlaceholder */
			useImagePlaceholder: function( aParameter ) {
				"use strict";
				return this.useImgPlaceholder( aParameter );
			},
	
			/**	@borrows useImgPlaceholder as hasImagePlaceholder */
			hasImagePlaceholder: function( aParameter ) {
				"use strict";
				return this.useImgPlaceholder( aParameter );
			},	
	
			/**	@borrows useImgPlaceholder as hasImgPlaceholder */
			hasImgPlaceholder: function( aParameter ) {
				"use strict";
				return this.useImgPlaceholder( aParameter );
			},		
	
		/**
		 * 	Get the url of the placeholder image from https://picsum.photos/.
		 *
		 *	@method
		 *	@public		 
		 *	@returns {string} A generated url from https://picsum.photos/ of a generic placeholder image.	 
		 */	
		getImgPlaceholder: function() {
			"use strict";
			var phurl = "";
			
			phurl += "https://picsum.photos/";
			phurl += this.imageWidth().toString() + "/";
			phurl += this.imageHeight().toString() + "/?random";
			
			return phurl;
		},
	
			/**	@borrows getImgPlaceholder as getImagePlaceholder */
			getImagePlaceholder: function() {
				"use strict";
				return this.getImgPlaceholder();
			},	
	
		/**
		 * 	Get or Set the image source for the image on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new image source, as a url including protocol.		 
		 *	@returns {(string|Tile)} The hyperlink of this image or the 
		 *		Tile itself.	 
		 */	
		imageSrc: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._image._getSrc();
			} 
			else {
				this._image._setSrc( aParameter ); 
				return this;
			}			
		},
	
			/**	@borrows imageSrc as imageSRC */
			imageSRC: function( aParameter ) {
				"use strict";		
				return this.imageSrc( aParameter );
			},
	
			/**	@borrows imageSrc as imgSRC */
			imgSRC: function( aParameter ) {
				"use strict";		
				return this.imageSrc( aParameter );
			},
	
			/**	@borrows imageSrc as imgSrc */
			imgSrc: function( aParameter ) {
				"use strict";		
				return this.imageSrc( aParameter );
			},
	
		/**
		 * 	Get or Set the alt text for the image on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new alternate text.		 
		 *	@returns {(string|Tile)} The alternate text for the image for this Tile 
		 *		or the Tile itself.	 
		 */
		imageAlt: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._image._getAlt();
			} 
			else {
				this._image._setAlt( aParameter );
				return this;
			}
			
		},
	
			/**	@borrows imageAlt as imageALT */
			imageALT: function( aParameter ) {
				"use strict";
				return this.imageAlt( aParameter );
			},
	
			/**	@borrows imageAlt as imgALT */
			imgALT: function( aParameter ) {
				"use strict";
				return this.imageAlt( aParameter );
			},
	
			/**	@borrows imageAlt as imgAlt */
			imgAlt: function( aParameter ) {
				"use strict";
				return this.imageAlt( aParameter );
			},	
	
		/**
		 * 	Get the width of the image on this Tile, based on its layout.
		 *
		 *	@method
		 *	@public	 
		 *	@returns {number} The width of an image in this layout in pixels.	 
		 */
		imageWidth: function() {
			"use strict";
			var key = this._layout;
			return LAYOUT_IMAGE_DIMENSIONS[key].width;			
		},

		/**
		 * 	Get the height of the image on this Tile, based on its layout.
		 *
		 *	@method
		 *	@public	 
		 *	@returns {number} The height of an image in this layout in pixels.	 
		 */	
		imageHeight: function() {
			"use strict";
			var key = this._layout;
			return LAYOUT_IMAGE_DIMENSIONS[key].height;
		},

	//----- TILE CUSTOM COLOR -----//

	/**
	 *	All the custom color subproperties are contained in this "object literal". i.e. to change the custom colour value, access the _value property of the _custom_color object literal. 
	 *	This all made much more sense when I started. I don't think I'd bother after Boxes and Rows.
	 *	@example var cc = this._custom_color._value; // Note, this is ignoring the privacy of _custom_color and _exists.
	 *	@example var cc = this.customColour();  // More correct, but not illustrating that there are two levels of objects here.
	 *
	 *	@property {Object} _custom_color - All the custom color properties for Tile.
	 *	@private
	 */	
	_custom_color: {
		
		/**
		 *	Does a custom colour exist for this Tile?
		 *	It is a subproperty of the _image object.
		 *
		 *	@see _custom_color
		 *	@property {boolean} _exists
		 *	@private
		 */			
		_exists: false,
		
		/**
		 *	The custom colour of the Tile. This can be set (i.e. saved) even if the Tile
	 	 *		isn't using the custom colour.
	 	 *
	 	 *	@property {string} _custom_color - The custom colour in hexadecimal
	 	 *		notation, including the #, as a string.
		 */			
		_value: "#ccaa00",
		
		/**
		 * 	Return if this Tile has a custom colour or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this Tile has a custom colour.		 
		 */
		_hasCustom: function() {
			"use strict";
			return this._exists;
		},
		
			/**	@borrows imageSrc as imgSRC */
			_getCustom: function() {
				"use strict";
				return this._hasCustom();
			},
		
		/**
		 * 	Set the use of a custom colour for this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if this Tile is to have a custom colour.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _image object.
		 */
		_setCustom: function( aBoolean ) {
			"use strict";
			this._exists = aBoolean;
			return this;
		},
		
		/**
		 * 	Return the custom colour as a string in hexadecimal notation, including the #.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The custom colour of the Tile.	 
		 */
		_getValue: function() {
			"use strict";
			return this._value;
		},
		
		/**
		 * 	Set the custom colour of this Tile. Also sets _exists to true.
		 *
		 *	@method
		 *	@private
		 *	@param {?string} aSrc - The custom colour in hexadecimal notation. If null or empty, sets _value to blank and sets _exists to false.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _url object.
		 */			
		_setValue: function( aColor ) {
			"use strict";		
			if ( ( aColor !== null ) || ( aColor.length !== 0 ) ) {
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
		 * 	Asking if the Tile does have a custom colour, or telling the Tile to have a custom colour. 
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if this Tile has a custom colour.
		 *	@returns {boolean|Tile} Returns if this Tile has a custom colour, or the 
		 *		Tile itself.	 
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
	
		/**
		 * 	Get or Set the custom colour on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The custom colour in hexadecimal notation, including the #, as a string.		 
		 *	@returns {(string|Tile)} The custom colour in hexadecimal notation, or the Tile itself.
		 *	@example aTile.customColor("#AA5C37"); // Returns the Tile, hence chainable.
		 *	@example var foo = aTile.customColor(); // Returns the color "#AA5C37", a brownish red.
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

	//----- TILE GO BUTTON -----//

	/**
	 *	All the custom color subproperties are contained in this "object literal". i.e. to change the text on the button, access the _text property of the _go_btn object literal. 
	 *	This all made much more sense when I started. I don't think I'd bother after Boxes and Rows. 
	 *		Idea: next version, be able to customise the colour and/or transparency!
	 *	@example var foo = this._go_btn._text; // Note, this is ignoring the privacy of _go_btn and _text.
	 *	@example var bar = this.goBtn();  // More correct, but not illustrating that there are two levels of objects here.
	 *
	 *	@property {Object} _go_btn - All the properties for Tile's "Go Button". Tiles on the Staff Moodle often have a small black "Go..." on the bottom of them. Wouldn't it be 
	 *	awesome to be able to change that text? 
	 *	@private
	 */	
	_go_btn: {

		
		/**
		 *	Does a Go Button exist for this Tile.
		 *	It is a subproperty of the _go_btn object.
		 *
		 *	@see _go_btn
		 *	@property {boolean} _exists
		 *	@private
		 */		
		_exists: false,
		
		/**
		 *	What text is on the Go Button on this Tile.
		 *	It is a subproperty of the _go_btn object.
		 *
		 *	@see _go_btn
		 *	@property {string} text
		 *	@private
		 */			
		_text: "Go...",
		
		/**
		 * 	Return if this Tile has a Go Button or not.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this Tile has a Go Button.		 
		 */
		_hasBtn: function() {
			"use strict";
			return this._exists;
		},
		
			/**	@borrows _hasBtn as _getBtn */
			_getBtn: function() {
				"use strict";
				return this._hasCustom();
			},		
		
		/**
		 * 	Set the use of a Go Button for this Tile.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if this Tile is to have a Go Button.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _go_btn object.
		 */		
		_setBtn: function( aBoolean ) {
			"use strict";
			this._exists = aBoolean;
			return this;
		},
		
		/**
		 * 	Return the text on a Go Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The plain text that is on the Go Button.	 
		 */
		_getText: function() {
			"use strict";
			return this._text;
		},
	
		/**
		 * 	Set the text of the Go Button this Tile. Also sets _exists to true.
		 *
		 *	@method
		 *	@private
		 *	@param {?string} aSrc - What the Go Button will say. If null or empty, sets _value to blank and sets _exists to false.
		 *	@returns {Tile} The Tile; this.	 // This could be a lie. I think actually it returns the _url object.
		 */	
		_setText: function( aText ) {
			"use strict";		
			if ( ( aText !== null ) || ( aText.length !== 0 ) ) {
				this._exists = true;
				this._text = aText;
			}
			else {
				this._exists = false;
				this._text = "";
			}

			return this;
		},	
	},
	
		/**
		 * 	Asking if the Tile does have a Go Button, or telling the Tile to have a Go Button. 
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if this Tile has a Go Button.
		 *	@returns {boolean|Tile} Returns if this Tile has a Go Button, or the 
		 *		Tile itself.	 
		 */
		hasGoBtn: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._go_btn._hasBtn();
			}
			else {
				this._go_btn._setBtn( aParameter );
				return this;
			}
		},
	
			/**	@borrows hasGoBtn as hasGoButton */
			hasGoButton: function ( aParameter ) {
				"use strict";
				return this.hasGoBtn( aParameter );
			},
		
		/**
		 * 	Get or Set the text on the Go Button on this Tile.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The text that should appear on a Go Button.		 
		 *	@returns {(string|Tile)} The text on the Go Button. or the Tile itself.
		 */
		goBtn: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._go_btn._getText();
			} 
			else {
				this._go_btn._setText( aParameter );
				return this;
			}
		},
			/**	@borrows goBtn as goButton */
			goButton: function( aParameter ) {
				"use strict";
				return this.goBtn( aParameter );
			},
	
	//----- CONSTRUCTORS -----//
	
	/**
	 * 	Clone the Tile object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	This one is probably unneccesary. It makes more sense for things like Buttons and Button Rows.
	 *
	 *	@constructs Tile
	 *	@method
	 *	@public
	 *	@example foo = Tile.new(); 
	 */		
	new: function() {
		"use strict";
		var newTile = Object.create( this );
		return newTile;
	},
	
	/**
	 * 	Clone the Tile object and then populate it with data from a JSON string.
	 *
	 *	@constructs Tile
	 *	@method
	 *	@public
	 *	@param {string} anInput - A JSON string describing a Tile.
	 */		
	newFromJSON: function( aString ) {
		"use strict";
		
		var jsonObj = JSON.parse( aString );
		var aNewTile = this.new();
		
		aNewTile.layout( jsonObj.layout );
		
		aNewTile.text( jsonObj.text.value )
				.textAlign( jsonObj.text.align )
				.textColor( jsonObj.text.color )
				.textWeight( jsonObj.text.weight )
				.textSize( jsonObj.text.size );
		
		if ( ( jsonObj.image !== undefined ) && ( jsonObj.image !== null ) ) {
			aNewTile.hasImage( true )
					.hasImagePlaceholder( jsonObj.image.placeholder )
					.imageALT( jsonObj.image.alt );
			if ( !( aNewTile.hasImagePlaceholder() ) ) {
				aNewTile.imageSRC( jsonObj.image.src );
			}
		}
		
		if ( ( jsonObj.link !== undefined ) && ( jsonObj.link !== null ) ) {
			aNewTile.url( jsonObj.link.url )
					.openInNewWindow( jsonObj.link.newWindow );
			if ( ( jsonObj.link.title !== undefined ) && ( jsonObj.link.title !== null ) ) {
				aNewTile.linkTitle( jsonObj.link.title );
			}
			else {
				aNewTile.linkTitle( "" );
			}
		}
		
		if ( ( jsonObj.gobtn !== undefined ) && ( jsonObj.gobtn !== null ) ) {
			aNewTile.goBtn( jsonObj.gobtn );
		}
		else {
			aNewTile.goBtn( "" );
		}
		
		if ( ( jsonObj.customColor !== undefined ) && ( jsonObj.customColor !== null ) ) {
			aNewTile.customColor( jsonObj.customColor );
		}
		else {
			aNewTile.color( jsonObj.color )
					.customColor( "" );
		}		

		return aNewTile;
	  },
	
	//----- OUTPUT -----//
	
	/**
	 * 	Get a JSON string describing the Tile.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getJSON: function(){
	 	"use strict";
		
		var jsonstring;
		var textstring;
		
		
		// Add Tile attributes
		jsonstring  = '"layout":"' + this.layout() + '", ';
		
		// Add text attributes
		textstring  = '"value":"'  + this.text()       + '", ';
		textstring += '"align":"'  + this.textAlign()  + '", ';		
		textstring += '"color":"'  + this.textColor()  + '", ';
		textstring += '"weight":"' + this.textWeight() + '", ';
		textstring += '"size":"'   + this.textSize()   + '"';
		textstring = '{' + textstring + '}';
		
		jsonstring += '"text":' + textstring + ', ';
		
		// Add image attributes
		if ( this.hasImage() ) {
			var imgstring;
			
			if ( this.useImgPlaceholder() ) {
				imgstring = '"placeholder": true, ';
			}
			else {
				imgstring += '"placeholder": false, ';
				imgstring += '"src":"' + this.imgSrc() + '", ';
			}
			imgstring += '"alt":"' + this.imgAlt() + '"';
			imgstring = '{' + imgstring + '}';
			
			jsonstring += '"image":' + imgstring + ', ';
		}
		
		if ( this.hasUrl() ) {
			var linkstring;
			linkstring = '"url":"' + this.url() + '", ';
			if ( this.hasUrlTitle() ) {
				linkstring += '"title":"' + this.urlTitle() + '", ';
			}
			linkstring += '"newWindow":' + this.hasNewWindow();
			linkstring = '{' + linkstring + '}';
		
			jsonstring += '"link":' + linkstring + ', ';
		}
		
		if ( this.hasGoBtn() ) {
			jsonstring += '"gobtn":"' + this.goBtn() + '", ';
		}		

		// Placing this last so we can control the final ,
		if ( this.hasCustomColor() ) {
			jsonstring += '"customColor":"' + this.customColor() + '"';
		}
		else {
			jsonstring += '"color":"' + this.color() + '"';
		}
				
		jsonstring = '{ ' + jsonstring + ' }';
		return jsonstring;
	},	
	
	/**
	 * 	Get the HTML to construct this Tile.
	 *
	 *	@method
	 *	@public	
	 *	@returns {string} The HTML of this Tile.
	 */	
	getHTML: function() {
		"use strict";
		
		var generatedTile;
				
		// Create the opening div
		var openingTag = "";
		var tileClasses = [];
		
		tileClasses.push( FRAMEWORK_PREFIX + "-tile" );
		tileClasses.push( this.layout() );
		tileClasses.push( this.textColor() );
		tileClasses.push( this.color() );
		tileClasses.push( this.textSize() );
		
		if ( this.hasDropShadow() ) {
			tileClasses.push( FRAMEWORK_PREFIX + "-shadow" );
		}
		
		openingTag += "<div class=\"" + tileClasses.join( " " ) + "\"";
		
		if ( this.hasCustomColor() ) {
			openingTag += " style=\"background-color: " + this.customColor() + ";\"";
		}
		
		openingTag += ">";
		
		
		// Create the hyperlink tag
		var hyperlinkTag = "";
		
		if ( this.hasURL() ) {
			hyperlinkTag += "<a href=\"" + this.url() + "\" ";
			if ( this.hasURLTitle() > 0 ) {
				hyperlinkTag += "title=\"" + this.urlTitle() +"\" ";
			}
			if ( this.openInNewWindow() ) {
				hyperlinkTag += "target=\"_blank\" ";
			}
			hyperlinkTag += "role=\"button\" ";
			hyperlinkTag += "class=\"" + FRAMEWORK_PREFIX + "-url\">";
			hyperlinkTag += "</a>";
		}
		
		
		// Create the image tag
		var imageTag = "";
		
		if ( this.hasImage() ) {
			
			// Get the source
			var theSrc = this.imageSRC();
			
			// If no source returned, check if to use placeholder. 
			if ( ( theSrc === null ) || ( theSrc.length === 0 ) ) {
				if ( this.useImgPlaceholder() ) {
					theSrc =  this.getImgPlaceholder();
				}
			}
			
			// Build the tag
			imageTag += "<img src=\"" + theSrc + "\" ";
			imageTag += "width=\"" + this.imageWidth() + "\" ";
			imageTag += "height=\"" + this.imageHeight() + "\" ";
			if ( this.imageALT().length > 0 ) {
				imageTag += "alt=\"" + this.imageALT() +"\" ";
			}			
			imageTag += "class=\"" + FRAMEWORK_PREFIX + "-tile-img\">";
		}
		
		
		// Create the go button div
		var goTag = "";
		
		if ( this.hasGoBtn() ) {
			goTag += "<span class=\"" + FRAMEWORK_PREFIX + "-go-btn\">";
			goTag += this.goBtn();
			goTag += "</span>";
		}
		
		
		// Create the content div
		var contentTag = "";
		var textClasses = [];
		
		textClasses.push( FRAMEWORK_PREFIX + "-tile-text" );
		textClasses.push( this.textWeight() );
		textClasses.push( this.textAlign() );
		
		contentTag += "<div class=\"" + textClasses.join( " " ) + "\">";
		contentTag += this.text();
		contentTag += goTag;
		contentTag += "</div>";
		
		
		// Create the closing tag
		var closingTag = "</div>";
		
		
		// Put all tags together
		generatedTile = openingTag + hyperlinkTag + imageTag + contentTag + closingTag;
		return generatedTile;
	},
	
	/**
	 * 	Helper function that aids in the positioning of images on Tiles.
	 *
	 *	@method
	 *	@public	
	 *	@returns {boolean} Return true if image is on top of the Tile.
	 */		
	hasImageOnTop: function() {
		"use strict";		
		var key = this._layout;
		return LAYOUT_IMAGE_DIMENSIONS[key].top;
	},
	
	/**
	 * 	Helper function that aids in the positioning of images on Tiles.
	 *
	 *	@method
	 *	@public	
	 *	@returns {boolean} Return true if image is on bottom of the Tile.
	 */			
	hasImageOnBottom: function() {
		"use strict";
		return !( this.hasImageOnTop() );
	},
	
	/**
	 * 	Return the class name. Useful for some polymorphic functions.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} "MenuItem".
	 */		
	getClassName: function() {
		"use strict";
		return "Tile";
	},
		
		/**	@borrows getClassName as class */
		class: function() {
			"use strict";
			return this.getClassName();
		}	
	
};
