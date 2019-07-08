/**
 *	Button Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.3 - Added ARIA Role
 *
 *	@class Button
 *
 */
var Button = {
	/** @lends Button */

	//----- BUTTON IDENTIFIER -----//
	
	/**
	 *	An identifier (aka id). This will actually be added as the id attribute to HTML.
	 *
	 *	@property {string} _identifier - An identifier for this Button, based in it's order in the ButtonRow.
	 *	@private
	 */
	_identifier: "",

		/**
		 * 	Return the identifier of this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The identifier of the Button.		 
		 */
		_getIdentifier: function() {
			"use strict";
			return this._identifier;
		},

		/**
		 * 	Set the identifier of this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anID - The new identifier.		 
		 *	@returns {Button} The Button; this.	 
		 */
		_setIdentifier: function( anID ) {
			"use strict";
			this._identifier = anID;
			return this;
		},

		/**
		 * 	Get or Set the identifier of this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new identifier.		 
		 *	@returns {(string|Button)} The identifier of this Button or the Button itself.	 
		 */
		identifier: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getIdentifier();
			}
			else {
				this._setIdentifier( aParameter );
				return this;
			}

		},	
	
			/**	@borrows identifier as id */
			id: function( aParameter ) {
				"use strict";
				return this.identifier( aParameter );
			},

	//----- BUTTON TEXT -----//

	/**
	 *	The text. This is the actual text on the Button.
	 *
	 *	@property {string} _button_text - The text displayed on a Button.
	 *	@private
	 */	
	_button_text: "Button Text",
	
		/**
		 * 	Return the text on this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The text on the Button.		 
		 */
		_getButtonText: function() {
				"use strict";
				return this._button_text;
			},
	
		/**
		 * 	Set the text on this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aText - The new text for the Button.		 
		 *	@returns {Button} The Button; this.	 
		 */
		_setButtonText: function( aText ) {
			"use strict";
			this._button_text = aText;
			return this;			
		},
			
		/**
		 * 	Get or Set the text on this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text for the Button.		 
		 *	@returns {(string|Button)} The text on this Button or the Button itself.	 
		 */
		buttonText: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getButtonText();
			} 
			else {
				this._setButtonText( aParameter );
				return this;
			}		
		},
	
			/**	@borrows buttonText as btnText */
			btnText: function( aParameter ) {
				"use strict";
				return this.buttonText( aParameter );
			},
	
			/**	@borrows buttonText as btnTxt */
			btnTxt: function( aParameter ) {
				"use strict";
				return this.buttonText( aParameter );
			},	

	//----- BUTTON COLOR -----//

	/**
	 *	The colour of the Button.
	 *
	 *	@property {string} _color - The colour of the Button, as an SMS colour 
	 *		class, but stored without "sms" or "color".
	 *	@private
	 */	
	_color: "intranet-blue",
	
		/**
		 * 	Return the colour of this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The colour of the Button, prefaced with the framework 
		 *		prefix and "colour".		 
		 */
		_getColor: function() {
			"use strict";
			return addPrefix( "color-" + this._color );
		},
	
		/**
		 * 	Set the colour of this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new colour for the Button. It will 
		 *		remove the framework prefix and "color".	 
		 *	@returns {Button} The Button; this.	 
		 */
		_setColor: function( aColor ) {
			"use strict";
			this._color = removePrefix( aColor.replace( "color-", "" ) );
			return this;
		},
	
		/**
		 * 	Get or Set the colour of this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new colour for the Button, as an 
		 *		SMS colour class.		 
		 *	@returns {(string|Button)} The colour of this Button as an SMS 
		 *		colour class, or the Button itself.	 
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
			
			/* 
				Maintenance Note:

				Why not just set the property directly? Well, I could, but I'm trying to
				set up some fake encapsulation here. Any major modifications would go into
				the private. This public calls the private to do the work.

				I mean one day the colour might expand. In that case, I don't need
				to worry about the public methods, just rewrite the private ones.
			*/			
		},
	
			/**	@borrows color as colour */
			colour: function( aParameter ) {
				"use strict";
				return this.color( aParameter );
			},
	
	//----- BUTTON TEXTCOLOR -----//

	/**
	 *	The colour of the text on the Button.
	 *
	 *	@property {string} _text_color - The text can be "light" or "dark"; 
	 *		an SMS text colour class, but stored without "sms" or "text".
	 *	@private
	 */	
	_text_color: "light",
	
		/**
		 * 	Return the text colour of this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The text colour of the Button, prefaced with the 
		 *		framework prefix and "text". Should be an SMS text colour class,
		 *		i.e. either "sms-text-light" or "sms-text-dark".
		 */	
		_getTextColor: function() {
			"use strict";
			return addPrefix( "text-" + this._text_color );
		},
		
		/**
		 * 	Set the text colour of this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new text colour for the Button. It will 
		 *		remove the framework prefix and "text".	 
		 *	@returns {Button} The Button; this.	 
		 */	
		_setTextColor: function( aColor ) {
			"use strict";
			this._text_color = removePrefix( aColor.replace( "text-", "" ) );
			return this;
		},	
	
		/**
		 * 	Get or Set the text colour of this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new text colour for the Button, as 
		 *		an SMS text colour class.		 
		 *	@returns {(string|Button)} The text colour of this Button as an SMS 
		 *		text colour class, or the Button itself.	 
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
	
	//----- BUTTON DROPSHADOW -----//

	/**
	 *	The drop shadow of the Button.
	 *
	 *	@property {boolean} _drop_shadow - Does this Button have a drop shadow?
	 *	@private
	 */	
	_drop_shadow: false,
	
		/**
		 * 	Return whether this Button has a drop shadow.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Returns true if the Button has a drop shadow.		 
		 */
		_getDropShadow: function() {
			"use strict";
			return this._drop_shadow;
		},	
	
		/**
		 * 	Set the drop shadow on this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if you want the button to 
		 *		have a drop shadow.		 
		 *	@returns {Button} The Button; this.	 
		 */
		_setDropShadow: function( aBoolean ) {
			"use strict";
			this._drop_shadow = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set the drop shadow on this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if you want a drop shadow for the Button.		 
		 *	@returns {(string|Button)} Returns true if the Button has a drop shadow, or the Button itself.	 
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
	
			/**	@borrows dropShadow as useDropShadow */
			useDropShadow: function( aParameter ) {
				"use strict";
				return this.dropShadow( aParameter );
			},	

	//----- BUTTON USECUSTOMCOLOR -----//

	/**
	 *	Does this Button have a custom colour? 
	 *
	 *	@property {boolean} _use_custom_color - Use a colour not specified by 
	 *		the SMS colour classes for this Button.
	 *	@private
	 */	
	_use_custom_color: false,
	
		/**
		 * 	Return whether this Button has a custom colour.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Returns true if the Button has a custom colour.		 
		 */	
		_getUseCustom: function() {
			"use strict";
			return this._use_custom_color;
		},	
	
		/**
		 * 	Set the use of a custom colour on this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if you want the button to 
		 *		have a custom colour.		 
		 *	@returns {Button} The Button; this.	 
		 */
		_setUseCustom: function( aBoolean ) {
			"use strict";
			this._use_custom_color = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set the use of a custom colour on this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Set to true if you want a custom 
		 *		colour for the Button.		 
		 *	@returns {(string|Button)} Returns true if the Button has a custom 
		 *		colour, or the Button itself.	 
		 */
		hasCustomColor: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getUseCustom();
			}
			else {
				this._setUseCustom( aParameter );
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
	
			/**	@borrows hasCustomColor as useCustom */
			useCustom: function( aParameter ) {
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
	
	//----- BUTTON CUSTOMCOLOR -----//

	/**
	 *	The custom colour of the Button. This can be set even if the Button
	 *		isn't using the custom colour.
	 *
	 *	@property {string} _custom_color - The custom colour in hexadecimal
	 *		notation, including the #, as a string.
	 *	@private
	 */
	_custom_color: "#ccaa00",
		
		/**
		 * 	Return custom colour of this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The colour in hexadecimal notation.
		 */		
		_getCustom: function() {
			"use strict";
			return this._custom_color;
		},
		
		/**
		 * 	Set the custom colour of this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new custom colour for the Button. It 
		 *		should be in hexadecimal notation.
		 *	@returns {Button} The Button; this.	 
		 */	
		_setCustom: function( aColor ) {
			"use strict";		
			if ( ( aColor !== null ) && ( aColor.length !== 0 ) ) {
				this._custom_color = aColor;
			}
			else {
				this._value = "";
			}

			return this;
		},		
	
		/**
		 * 	Get or Set the text colour of this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new custom colour for the Button, 
		 *		in hexadecimal notation.		 
		 *	@returns {(string|Button)} The custom colour of this Button, or the
		 *		Button itself.	 
		 */
		customColor: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getCustom();
			} 
			else {
				this._setCustom( aParameter );
				return this;
			}
		},
	
			/**	@borrows customColor as customColour */
			customColour: function( aParameter ) {
				"use strict";
				return this.customColor( aParameter );
			},
	
	//----- BUTTON URL -----//
	
	/**
	 *	Where do you want users to go to when they click this Button.
	 *
	 *	@property {string} _url - The address to where users will be sent. 
	 *		Must be a URL, including protocol (http://)
	 *	@private
	 */
	_url: "http://tafensw.edu.au",
	
		/**
		 * 	Return the url of this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The url (aka hyperlink) of the Button.		 
		 */
		_getUrl: function() {
			"use strict";
			return this._url;
		},
		
		/**
		 * 	Set the url of this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAddress - The url for this Button. This should 
		 *		include the protocol.		 
		 *	@returns {Button} The Button; this.	 
		 */	
		_setUrl: function( anAddress ) {
			"use strict";
			if ( ( anAddress !== null ) || ( anAddress.length !== 0 ) ) {
				this._url = anAddress;
			} 
			else {
				this._url = "";
			}
			return this;
		},
	
		/**
		 * 	Get or Set the hyperlink on this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new url.		 
		 *	@returns {(string|Button)} The hyperlink of this Button or the 
		 *		Button itself.	 
		 */
		url: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getUrl();
			} 
			else {
				this._setUrl( aParameter );
				return this;
			}
			
		},
	
			/**	@borrows url as href */
			href: function( aParameter ) {
				"use strict";

				return this.url( aParameter );
			},
	
			/**	@borrows url as URL */
			URL: function( aParameter ) {
				"use strict";

				return this.url( aParameter );
			},
	
			/**	@borrows url as hyperlink */
			hyperlink: function( aParameter ) {
				"use strict";
				return this.url( aParameter );
			},	
	
			/**	@borrows url as link */
			link: function( aParameter ) {
				"use strict";
				return this.url( aParameter );
			},	
	
		/**
		 * 	Does the Button have a url?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a url, it's a string 
		 *		and its length is greater than 0.	 
		 */	
		hasURL: function() {
			"use strict";			
			return ( ( ( typeof this._url === 'string' ) || ( this._url instanceof String ) ) && ( this._url.length > 0 ) );
		},
	
			/**	@borrows hasURL as hasLink */
			hasLink: function() {
				"use strict";
				return this.hasURL();
			},
	
			/**	@borrows hasURL as hasHyperlink */
			hasHyperlink: function() {
				"use strict";
				return this.hasURL();
			},	
	
			/**	@borrows hasURL as hasUrl */
			hasUrl: function() {
				"use strict";
				return this.hasURL();
			},	
	
	//----- BUTTON TITLE -----//
	
	/**
	 *	The title is an option string that will aid accessibility of a 
	 *		hyperlink. It provides a human readable label for the hyperlink.
	 *
	 *	@property {string} _title - This is the value that will be assigned 
	 *		the title attribute of the hyperlink for this Button.
	 *	@private
	 */
	_title: "TAFE NSW",
	
		/**
		 * 	Return the title of hyperlink for this Button.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The title for the hyperlink of the Button.		 
		 */
		_getTitle: function() {
			"use strict";
			return this._title;
		},
		
		/**
		 * 	Set the title of the hyperlink for this Button.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aTitle - The title for the hyperlink of the Button.		 
		 *	@returns {Button} The Button; this.	 
		 */	
		_setTitle: function( aTitle ) {
			"use strict";
			this._title = aTitle;
			return this;
		}, 
	
		/**
		 * 	Get or Set the title for the hyperlink on this Button.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new title.		 
		 *	@returns {(string|Button)} The title of hyperlink for this Button 
		 *		or the Button itself.	 
		 */
		urlTitle: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getTitle();
			} 
			else {
				this._setTitle( aParameter );
				return this;
			}
			
		},
	
			/**	@borrows urlTitle as linkTitle */
			linkTitle: function ( aParameter ) {
				"use strict";

				return this.urlTitle( aParameter );				
			},
	
		/**
		 * 	Does the hyperlink on this Button have a title?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's 
		 *		length is greater than 0.	 
		 */
		hasURLTitle: function() {
			"use strict";
			return ( ( ( typeof this._title === 'string' ) || ( this._title instanceof String ) ) && ( this._title.length > 0 ) );
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
	
	//----- BUTTON NEWWINDOW -----//
	
	/**
	 *	The Button can open a link in a new window or tab.
	 *
	 *	@property {boolean} _new_window - Open the link in a new window?
	 *	@private
	 */	
	_new_window: false,
	
		/**
		 * 	Returns if the hyperlink for this Button will open in a new window.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this hyperlink will open in a new window.		 
		 */
		_getNewWindow: function() {
			"use strict";
			return this._new_window;
		},		
	
		/**
		 * 	Set if the hyperlink for this Button should open in a new window.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if link should open in a new window.		 
		 *	@returns {Button} The Button; this.	 
		 */
		_setNewWindow: function( aBoolean ) {
			"use strict";
			this._new_window = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set if the hyperlink on this Button should open in a new window.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Open in a new window or not.		 
		 *	@returns {(boolean|Button)} A boolean if it should open in a new window or the Button itself.	 
		 */
		newWindow: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getNewWindow();
			}
			else {
				this._setNewWindow( aParameter );
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
		
	//----- CONSTRUCTORS -----//
	
	/**
	 * 	Clone the Button object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	@constructs Button
	 *	@example foo = Button.new();
	 *	@method
	 *	@public 
	 */	
	new: function() {
		"use strict";	
		return Object.create( this );
	},
	
	/**
	 * 	Clone the Button object and then populate it with data from a JSON string.
	 *
	 *	@constructs Button
	 *	@method
	 *	@public
	 *	@param {string} anInput - A JSON string describing a Button.
	 */		
	newFromJSON: function( anInput ) {
		"use strict";
		var jsonObj;
		
		if ( ( typeof anInput === "string" ) || ( anInput instanceof String ) ) {
			jsonObj = JSON.parse( anInput );
		}
		else if ( typeof anInput === "object" ) {
			jsonObj = anInput;
		}
		
		var aNewBtn = this.new();
		
		aNewBtn.btnText( jsonObj.btnText );
		if ( jsonObj.customColor === undefined ) {
			aNewBtn.color( jsonObj.color );
			aNewBtn.hasCustomColor( false );
		}
		else {
			aNewBtn.customColor( jsonObj.customColor );
			aNewBtn.hasCustomColor( true );
		}
		aNewBtn.dropShadow( jsonObj.dropShadow );
		aNewBtn.textColor( jsonObj.textColor );
		aNewBtn.link( jsonObj.link );
		aNewBtn.linkTitle( jsonObj.linkTitle );
		
		return aNewBtn;
	},
	
	//----- OUTPUT -----//	
	
	/**
	 * 	Get a JSON string describing the Button.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getJSON: function(){
	 	"use strict";
		
		var jsonstring = "";
		
		jsonstring  = '"btnText":"' + this.btnText() + '", ';
		if ( this.hasCustomColor() ) {
			jsonstring += '"customColor":"' + this.customColor() + '", ';
		}
		else {
			jsonstring += '"color":"' + this.color() + '", ';
		}
		jsonstring += '"dropShadow":' + this.hasDropShadow() + ', ';
		jsonstring += '"textColor":"' + this.textColor() + '", ';
		jsonstring += '"link":"'      + this.url() + '", ';
		jsonstring += '"linkTitle":"' + this.linkTitle() + '", ';
		jsonstring += '"newWindow":'  + this.hasNewWindow();
				
		jsonstring = '{ ' + jsonstring + ' }';
		return jsonstring;
	},	
	
	/**
	 * 	Get the HTML to construct this Button.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} The HTML of this Button.
	 */		
	getHTML: function() {
		"use strict";
			
		var generatedBtn = "";
		
		generatedBtn += "<!-- Button: \"";
		generatedBtn += this.buttonText() + "\" -->\n";
		generatedBtn += "<div class=\"" + FRAMEWORK_PREFIX + "-button ";
		generatedBtn += this.color() + " ";
		generatedBtn += this.textColor();
		if ( this.hasDropShadow() ) {
			generatedBtn += " " + FRAMEWORK_PREFIX + "-shadow";
		}
		if ( this.hasCustomColor() ) {
			generatedBtn += " " + FRAMEWORK_PREFIX + "-custom-color\" ";
			generatedBtn += " style=\"background-color: " + this.customColor() + ";\" ";
		}
		else {
			generatedBtn +="\" ";
		}
		generatedBtn += "id=\"" + this.identifier() + "\">\n";
		generatedBtn += "<a href=\"" + this.url() + "\" ";
		if ( this.hasNewWindow() ) {
			generatedBtn += "target=\"_blank\" ";
		}
		generatedBtn += "role=\"button\" ";
		generatedBtn += "title=\"" + this.urlTitle() + "\">\n";
		generatedBtn += "<span class=\"" + FRAMEWORK_PREFIX + "-button-text ";
		generatedBtn += FRAMEWORK_PREFIX + "-text-big font-weight-normal isEditable\">";
		generatedBtn += this.buttonText();
		generatedBtn += "</span>\n";
		generatedBtn += "</a>\n";
		generatedBtn += "</div>\n";
		
		return generatedBtn;

	},
	
	/**
	 * 	Return the class name. Useful for some polymorphic functions.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} "Button".
	 */	
	getClassName: function() {
		"use strict";
		return "Button";
	},
	
		/**	@borrows getClassName as class */		
		class: function() {
			"use strict";
			return this.getClassName();
		}
};