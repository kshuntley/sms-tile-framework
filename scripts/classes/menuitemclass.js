/**
 *	MenuItem Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.3 - Added ARIA Role
 *
 *	@class MenuItem
 *
 */
var MenuItem = {
	/** @lends MenuItem */

	//----- MENUITEM IDENTIFIER -----//
	
	/**
	 *	An identifier (aka id). This will actually be added as the id attribute to HTML.
	 *
	 *	@property {string} _identifier - An identifier for this MenuItem, based in it's order in the Menu.
	 *	@private
	 */	
	_identifier: "",

		/**
		 * 	Return the identifier of this MenuItem.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The identifier of the MenuItem.		 
		 */
		_getIdentifier: function() {
			"use strict";
			return this._identifier;
		},

		/**
		 * 	Set the identifier of this MenuItem.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anID - The new identifier.		 
		 *	@returns {MenuItem} The MenuItem; this.	 
		 */
		_setIdentifier: function( anID ) {
			"use strict";
			this._identifier = anID;
			return this;
		},

		/**
		 * 	Get or Set the identifier of this MenuItem.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new identifier.		 
		 *	@returns {(string|MenuItem)} The identifier of this MenuItem or the MenuItem itself.	 
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

	//----- MENUITEM LABEL -----//
	
	/**
	 *	A label. This is the actual text on the MenuItem.
	 *
	 *	@property {string} _label - The text displayed on a MenuItem.
	 *	@private
	 */			
	_label: "Menu Item",
	
		/**
		 * 	Return the label on this MenuItem.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The label of the MenuItem.		 
		 */
		_getLabel: function() {
			"use strict";
			return this._label;
		},

		/**
		 * 	Set the label of this MenuItem.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aText - The new label.		 
		 *	@returns {MenuItem} The MenuItem; this.	 
		 */	
		_setLabel: function( aText ) {
			"use strict";
			this._label = aText;
			return this;			
		},

		/**
		 * 	Get or Set the label on this MenuItem.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new label.		 
		 *	@returns {(string|MenuItem)} The label of this MenuItem or the MenuItem itself.	 
		 */
		label: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getLabel();
			} 
			else {
				this._setLabel( aParameter );
				return this;
			}		
		},
	
	//----- MENUITEM URL -----//
	
	/**
	 *	Where do you want users to go to when they click this MenuItem.
	 *
	 *	@property {string} _url - The address to where users will be sent. 
	 *		Must be a URL, including protocol (http://)
	 *	@private
	 */
	_url: "http://tafensw.edu.au",

		/**
		 * 	Return the url of this MenuItem.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The url (aka hyperlink) of the MenuItem.		 
		 */
		_getUrl: function() {
			"use strict";
			return this._url;
		},

		/**
		 * 	Set the url of this MenuItem.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAddress - The url for this MenuItem. This should include the protocol.		 
		 *	@returns {MenuItem} The MenuItem; this.	 
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
		 * 	Get or Set the hyperlink on this MenuItem.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new url.		 
		 *	@returns {(string|MenuItem)} The hyperlink of this MenuItem or the MenuItem itself.	 
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
	
	//----- MENUITEM TITLE -----//
	
	/**
	 *	The title is an option string that will aid accessibility of a hyperlink. It provides a human readable label for the hyperlink.
	 *
	 *	@property {string} _title - This is the value that will be assigned the title attribute of the hyperlink for this MenuItem.
	 *	@private
	 */
	_title: "TAFE NSW",

		/**
		 * 	Return the title of hyperlink for this MenuItem.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The title for the hyperlink of the MenuItem.		 
		 */
		_getTitle: function() {
			"use strict";
			return this._title;
		},		
	
		/**
		 * 	Set the title of the hyperlink for this MenuItem.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aTitle - The title for the hyperlink of the MenuItem.		 
		 *	@returns {MenuItem} The MenuItem; this.	 
		 */	
		_setTitle: function( aTitle ) {
			"use strict";
			this._title = aTitle;
			return this;
		}, 
	
		/**
		 * 	Get or Set the title for the hyperlink on this MenuItem.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new title.		 
		 *	@returns {(string|MenuItem)} The title of hyperlink for this MenuItem or the MenuItem itself.	 
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
		 * 	Does the hyperlink on this MenuItem have a title?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
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

	//----- MENUITEM NEWWINDOW -----//
	
	/**
	 *	The MenuItem can open a link in a new window or tab.
	 *
	 *	@property {boolean} _new_window - Open the link in a new window?
	 *	@private
	 */
	_new_window: false,
	
		/**
		 * 	Returns if the hyperlink for this MenuItem will open in a new window.
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
		 * 	Set if the hyperlink for this MenuItem should open in a new window.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if link should open in a new window.		 
		 *	@returns {MenuItem} The MenuItem; this.	 
		 */	
		_setNewWindow: function( aBoolean ) {
			"use strict";
			this._new_window = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set if the hyperlink on this MenuItem should open in a new window.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Open in a new window or not.		 
		 *	@returns {(string|MenuItem)} A boolean if it should open in a new window or the MenuItem itself.	 
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
	
	//----- MENUITEM ICON -----//
	
	/**
	 * 	The (fa) icon class for this MenuItem. Menu class determines if it will be used or not.
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.
	 *  See {@link Menu#_use_icons}.
	 *
	 *	@property {string} _icon_class
	 *	@private
	 */			
	_icon_class: "fa-graduation-cap",
	
		/**
		 * 	Return the (fa) icon class for this MenuItem.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The (fa) icon class for the MenuItem.		 
		 */
		_getIconClass: function() {
			"use strict";
			return this._icon_class;
		},
	
		/**
		 * 	Set the (fa) icon class for this MenuItem.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aClass - A string as a (fa) icon class for the MenuItem.		 
		 *	@returns {MenuItem} The MenuItem; this.	 
		 */
		_setIconClass: function( aClass ) {
			"use strict";
			if ( ( typeof aClass === "string" ) && ( aClass.length !== 0 ) ) {
				this._icon_class = aClass;
			}
			else {
				this._icon_class = "";
			}
			return this;
		},

		/**
		 * 	Get or Set the (fa) icon class for this MenuItem.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new (fa) icon class.		 
		 *	@returns {(string|MenuItem)} The (fa) icon class for this MenuItem or the MenuItem itself.	 
		 */
		iconClass: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getIconClass();
			} 
			else {
				this._setIconClass( aParameter );
				return this;
			}	
		},
	
		/**
		 * 	Does this MenuItem have a (fa) icon class?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */
		hasIconClass: function() {
			"use strict";
			return ( ( ( typeof this._icon_class === 'string' ) || ( this._icon_class instanceof String ) ) && ( this._icon_class.length > 0 ) );
		},
	
	//----- CONSTRUCTORS -----//
	
	/**
	 * 	Clone the MenuItem object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	@constructs MenuItem
	 *	@method
	 *	@public 
	 */
	new: function() {
		"use strict";	
		return Object.create( this );
	},
	
	/**
	 * 	Clone the MenuItem object and then populate it with data from a JSON string.
	 *
	 *	@constructs MenuItem
	 *	@method
	 *	@public
	 *	@param {string} anInput - A JSON string describing a MenuItem.
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
		
		var aNewItem = this.new();
		
		aNewItem.label( jsonObj.label );
		aNewItem.link( jsonObj.link );
		aNewItem.linkTitle( jsonObj.linkTitle );
		aNewItem.newWindow( jsonObj.newWindow );
		aNewItem.iconClass( jsonObj.iconClass );
		
		return aNewItem;
	},
	
	//----- OUTPUT -----//
	
	/**
	 * 	Get a JSON string describing the MenuItem.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getJSON: function(){
	 	"use strict";
		
		var jsonstring = "";
		
		// Add MenuItem attributes
		jsonstring  = '"label":"' + this.label() + '", ';
		jsonstring += '"link":"'      + this.url() + '", ';
		jsonstring += '"linkTitle":"' + this.linkTitle() + '", ';
		jsonstring += '"newWindow":'  + this.hasNewWindow() + ', ';
		jsonstring += '"iconClass":"'  + this.iconClass() + '"';
				
		jsonstring = '{ ' + jsonstring + ' }';
		return jsonstring;
	},
	
	/**
	 * 	Get the HTML to construct this MenuItem.
	 *
	 *	@method
	 *	@public	
	 *	@param {boolean} useIcon - Whether the icon should be displayed or not.
	 *	@param {boolean} useBold - Whether the MenuItems should be bold or not.
	 *	@param {string} textAlign - The text alignment of the Menu, as a bootstrap class ("text-left", etc).
	 *	@param {boolean} placeRight - Whether the icon on this MenuItems should be place on the right of the label or not.	 
	 *	@returns {string} The HTML of this MenuItem.
	 */	
	getHTML: function( useIcon, useBold, textAlign, placeRight ) {
		"use strict";
			
		var generatedItem = "";
		
		if ( ( useIcon === undefined ) || ( useIcon === null ) ) {
			useIcon = false;
		}
		
		if ( ( useBold === undefined ) || ( useBold === null ) ) {
			useBold = false;
		}
		
		if ( ( textAlign === undefined ) || ( textAlign === null ) ) {
			textAlign = "text-left";
		} 
		
		if ( ( placeRight === undefined ) || ( placeRight === null ) ) {
			placeRight = false;
		}		
		
		// Comment
		generatedItem += "<!-- MenuItem: \"";
		generatedItem += this.label() + "\" -->\n";
		
		// Open tag
		generatedItem += "<li class=\"list-group-item ui-state-default ui-sortable-handle ";
		generatedItem += textAlign + "\" role=\"none\"";
		generatedItem += " id=\"" + this.identifier() + ">\n";
		
		// URL
		generatedItem += "<a href=\"" + this.href() + "\"";
		generatedItem += " contenteditable=\"false\"";
		generatedItem += " role=\"menuitem\"";
		if ( this.hasNewWindow() ) {
			generatedItem += " target=\"_blank\"";
		}
		generatedItem += " title=\"" + this.urlTitle() + "\">\n";
		
		// Icon
		if ( useIcon && !(placeRight) ) {
			generatedItem += "<i class=\"fa " + this.iconClass() + " fa-fw\" aria-hidden=\"true\"></i>\n";
		}
		
		// Label
		if ( useBold ) {
			generatedItem += "<strong>" + this.label() + "</strong>\n";
		}
		else {
			generatedItem += this.label() + "\n";	
		}
		
		// Icon
		if ( useIcon && placeRight ) {
			generatedItem += "<i class=\"fa " + this.iconClass() + "\" aria-hidden=\"true\"></i>\n";
		}		
		
		generatedItem += "</a>\n</li>\n";
		
		return generatedItem;
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
		return "MenuItem";
	},
	
		/**	@borrows getClassName as class */	
		class: function() {
			"use strict";
			return this.getClassName();
		}	
};