/**
 *	Row Class
 *	This is actually an "object literal".
 *
 *	@author [Kenneth "Scott" Huntley](kenneth.huntley3@tafensw.edu.au)
 *	@version 6.0.3 - Added functionality for Row custom color.
 *
 *	@class Row
 *
 */
var Row = {
	/** @lends Row */

	//----- ROW PROTOTYPE -----//
	
	/**
	 *	An prototype (in a subclass sense of the word). Boxes are made up of Rows. Valid Row Prototypes
	 *	are stored in ROW_PROTOTYPES.
	 *
	 *	@property {string} _row_prototype - The prototype for this Row, based the Row's function.
	 *	@see ROW_PROTOTYPES
	 *	@private
	 */	
	_row_prototype: "generic",
	
		/**
		 * 	Return the Row's prototype.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The prototpye of the Row.		 
		 */
		_getRowPrototype: function() {
			"use strict";
			return this._row_prototype;
		},
	
		/**
		 * 	Set the Row's prototype.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aRowPrototype - The new prototype, from ROW_PROTOTYPES.		 
		 *	@returns {Row} The Row; this.	 
		 */
		_setRowPrototype: function( aRowPrototype ) {
			"use strict";
			this._row_prototype = aRowPrototype;
			return this;
		},
	
		/**
		 * 	Get or Set the prototpye of this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new Row prototype.		 
		 *	@returns {(string|Row)} The prototype of this Row or the Row itself.	 
		 */
		rowPrototype: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getRowPrototype();
			}
			else {
				if (! ROW_PROTOTYPES.includes( aParameter ) ) {
					throw new SyntaxError( "The specified row prototype does not exist." );
				}							
				this._setRowPrototype( aParameter );
				return this;
			}			
		},	
	
	/**
	 *	An identifier (aka id). This will actually be added as the id attribute to HTML.
	 *
	 *	@property {string} _identifier - An identifier for this Row, based in it's order in the Box.
	 *	@private
	 */
	_identifier: "",
	
		/**
		 * 	Return the identifier of this Row.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The identifier of the Row.		 
		 */
		_getIdentifier: function() {
			"use strict";
			return this._identifier;
		},
	
		/**
		 * 	Set the identifier of this Row.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anID - The new identifier.		 
		 *	@returns {Button} The Row; this.	 
		 */
		_setIdentifier: function( anID ) {
			"use strict";
			this._identifier = anID;
			return this;
		},
	
		/**
		 * 	Get or Set the identifier of this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new identifier.		 
		 *	@returns {(string|Button)} The identifier of this Row or the Row itself.	 
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
	
	//----- ROW ICON -----//
	
	/**
	 * 	The (fa) icon class for this Row.
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.
	 *
	 *	@property {string} _icon_class
	 *	@private
	 */	
	_icon_class: "fa-graduation-cap",
	
		/**
		 * 	Return the (fa) icon class for this Row.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The (fa) icon class for the Row.		 
		 */
		_getIconClass: function() {
			"use strict";
			return this._icon_class;
		},	
	
		/**
		 * 	Set the (fa) icon class for this Row.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aClass - A string as a (fa) icon class for the Row.		 
		 *	@returns {Row} The Row; this.	 
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
		 * 	Get or Set the (fa) icon class for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new (fa) icon class.		 
		 *	@returns {(string|Row)} The (fa) icon class for this Row or the Row itself.	 
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
		 * 	Does this Row have a (fa) icon class?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */
		hasIconClass: function() {
			"use strict";
			return ( ( ( typeof this._icon_class === "string" ) || ( this._icon_class instanceof String ) ) && ( this._icon_class.length > 0 ) );
		},
	
	//----- ROW HEADERS -----//
	
	/**
	 *	The left column heading (aka sidebar or artefact column heading) is the heading at the top of the left column.
	 *	This usually only applies to "header" Rows.	
	 * 	This was a single object; it's been broken into two properties after a cloning deep copy problem.	 
	 *
	 *	@property {string} _left_column_heading
	 *	@private
	 */	
	_left_column_heading: "",
	
		/**
		 * 	Return the left column heading.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The left column heading the Row.		 
		 */	
		_getLeftHeading: function() {
			"use strict";
			return this._left_column_heading;
		},
		
		/**
		 * 	Set the left column heading for this Row.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aHeading - A string to be the left column heading for the Row.		 
		 *	@returns {Row} The Row; this.	 
		 */
		_setLeftHeading: function( aHeading ) {
			"use strict";
			if ( ( ( typeof aHeading === "string" ) || ( aHeading instanceof String ) ) && ( aHeading.length !== 0 ) ) {
				this._left_column_heading = aHeading;
			} 
			else {
				this._left_column_heading = "";
			}
			return this;
		},	
	
	/**
	 *	The right column heading (aka content columnn or summary column heading) is the heading at the top of the right column.
	 *	This usually only applies to "header" Rows.
	 * 	This was a single object; it's been broken into two properties after a cloning deep copy problem.	 
	 *
	 *	@property {string} _right_column_heading
	 *	@private
	 */	
	_right_column_heading: "",
			
		/**
		 * 	Return the right column heading.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The right column heading the Row.		 
		 */
		_getRightHeading: function() {
			"use strict";
			return this._right_column_heading;
		},
		
		/**
		 * 	Set the right column heading for this Row.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aHeading - A string to be the right column heading for the Row.		 
		 *	@returns {Row} The Row; this.	 
		 */	
		_setRightHeading: function( aHeading ) {
			"use strict";
			if ( ( ( typeof aHeading === "string" ) || ( aHeading instanceof String ) ) && ( aHeading.length !== 0 ) ) {
				this._right_column_heading = aHeading;
			} 
			else {
				this._right_column_heading = "";
			}
			return this;
		},			
		
		/**
		 * 	Get or Set the column headings for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string[]|string} aParameter - The column headings as an 
		 *		array of strings, or a single string with the pipe ('|') 
		 *		delimiting the headings.
		 *	@throws {SyntaxError} Will throw error if aParameter is not an array, string or null.		 
		 *	@returns {(string[]|Row)} An array of strings containing the headings or the Row itself.	 
		 */
		columnHeadings: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				var temp = [];
				temp.push( this._getLeftHeading() );
				temp.push( this._getRightHeading() );
				return temp;
			} 
			else {
				
				// Check if the Parameter is an Array and if so, the first two elements are the left and right
				if ( Array.isArray( aParameter ) ) {
					this._setLeftHeading( aParameter[0] );
					this._setRightHeading( aParameter[1] );					
				}
				
				// Check if the Parameter is an String and if so, the pipe character is the delimiter between the left and right
				else if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					var stringArray;
					var pipe = aParameter.indexOf( '|' );
					
					if ( pipe > 0 ) {
						stringArray = aParameter.split( '|' );
						this._setLeftHeading( stringArray[0] );
						this._setRightHeading( stringArray[1] );						
					}
					
					// If the pipe never occurs, put it all in the left
					else {
						this._setLeftHeading( aParameter );
						this._setRightHeading( '' );
					}
				}
				
				// If aParameter is not an Array or a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}

				return this;
			}	
		},		
	
		/**
		 * 	Get or Set the left column heading for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The left column heading as a string.
		 *	@throws {SyntaxError} Will throw error if aParameter is not a string or null.		 
		 *	@returns {(string|Row)} An string containing the heading or the Row itself.	 
		 */
		leftColumnHeading: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getLeftHeading();
			} 
			else {
						
				// Check if the Parameter is an String
				if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					this._setLeftHeading( aParameter );
				}
				
				// If aParameter is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}
				
				return this;
			}	
		},	
	
			/**	@borrows leftColumnHeading as artefactHeading */
			artefactHeading: function( aParameter ) {
				"use strict";
				return this.leftColumnHeading( aParameter );
			},
	
			/**	@borrows leftColumnHeading as artefactHeading */
			sidebarHeading: function( aParameter ) {
				"use strict";
				return this.leftColumnHeading( aParameter );
			},
	
		/**
		 * 	Get or Set the right column heading for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The right column heading as a string.
		 *	@throws {SyntaxError} Will throw error if aParameter is not a string or null.		 
		 *	@returns {(string[]|Row)} An string containing the heading or the Row itself.	 
		 */	
		rightColumnHeading: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getRightHeading();
			} 
			else {
						
				// Check if the Parameter is an String and if so, the pipe character is the delimiter between the left and right
				if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					this._setRightHeading( aParameter );
				}
				
				// If aParameter is not an Array or a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}
				
				return this;
			}	
		},	
	
			/**	@borrows rightColumnHeading as summaryHeading */
			summaryHeading: function( aParameter ) {
				"use strict";
				return this.rightColumnHeading( aParameter );
			},
	
			/**	@borrows rightColumnHeading as contentHeading */
			contentHeading: function( aParameter ) {
				"use strict";
				return this.rightColumnHeading( aParameter );
			},	
	
	
	//----- ROW TITLES AND SUBTITLES -----//
	
	/**
	 *	The artefact title, to be displayed in the left column. 
	 *	This usually only applies to "artefact" Rows.
	 *
	 *	@property {string} _artefact_title
	 *	@private
	 */
	_artefact_title: "eLearning: Overview of Managing Enquirires",
			
		/**
		 * 	Return the artefact title.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The artefact title.		 
		 */
		_getArtefactTitle: function() {
			"use strict";
			return this._artefact_title;
		},
		
		/**
		 * 	Set the artefact title.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aTitle - The new artefact title.		 
		 *	@returns {Row} The Row; this.	 
		 */		
		_setArtefactTitle: function( aTitle ) {
			"use strict";
			if ( ( typeof aTitle === "string" ) && ( aTitle.length !== 0 ) ) {
				this._artefact_title = aTitle;
			}
			else {
				this._artefact_title = "";
			}
			return this;
		},
			
		/**
		 * 	Does this Row have an artefact title?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */
		hasArtefactTitle: function() {
			"use strict";
			return ( ( ( typeof this._artefact_title === "string" ) || ( this._artefact_title instanceof String ) ) && ( this._artefact_title.length > 0 ) );
		},
	
		/**
		 * 	Get or Set the artefact title for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The artefact title as a string.
		 *	@throws {SyntaxError} Will throw error if aParameter is not a string or null.		 
		 *	@returns {(string|Row)} An string containing the subtitle or the Row itself.	 
		 */		
		artefactTitle: function( aParameter ) { 
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getArtefactTitle();
			} 
			else {
						
				// Check if the Parameter is an String 
				if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					this._setArtefactTitle( aParameter );
				}
				
				// If aParameter is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}
				
				return this;
			}				
		},
	
	/**
	 *	The artefact subtitle, to be displayed in the left column. 
	 *	This usually only applies to "artefact" Rows.
	 *
	 *	@property {string} _artefact_subtitle
	 *	@private
	 */	
	_artefact_subtitle: "20 minutes",
			
		/**
		 * 	Return the artefact subtitle.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The artefact subtitle.		 
		 */
		_getSubTitle: function() {
			"use strict";
			return this._artefact_subtitle;
		},
		
		/**
		 * 	Set the artefact subtitle.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aSubTitle - The new artefact subtitle.		 
		 *	@returns {Row} The Row; this.	 
		 */	
		_setSubTitle: function( aSubTitle ) {
			"use strict";
			if ( ( typeof aSubTitle === "string" ) && ( aSubTitle.length !== 0 ) ) {
				this._artefact_subtitle = aSubTitle;
			} 
			else {
				this._artefact_subtitle = "";
			}
			return this;
		},		
	
		/**
		 * 	Does this Row have an artefact subtitle?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */
		hasArtefactSubTitle: function() {
			"use strict";
			return ( ( ( typeof this._artefact_subtitle === "string" ) || ( this._artefact_subtitle instanceof String ) ) && ( this._artefact_subtitle.length > 0 ) );
		},
	
		/**
		 * 	Get or Set the artefact subtitle for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The artefact subtitle as a string.
		 *	@throws {SyntaxError} Will throw error if aParameter is not a string or null.		 
		 *	@returns {(string|Row)} An string containing the subtitle or the Row itself.	 
		 */		
		artefactSubTitle: function( aParameter ) { 
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getSubTitle();
			} 
			else {
						
				// Check if the Parameter is an String and if so, the pipe character is the delimiter between the left and right
				if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					this._setSubTitle( aParameter );
				}
				
				// If aParameter is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}
				
				return this;
			}				
		},
	
			/**	@borrows hasArtefactSubTitle as hasArtefactSubtitle */
			hasArtefactSubtitle: function() {
				"use strict";

				return this.hasArtefactSubTitle();
			},

			/**	@borrows artefactSubTitle as artefactSubtitle */	
			artefactSubtitle: function( aParameter ) { 
				"use strict";

				return this.artefactSubTitle( aParameter );
			},	
	
	//----- ROW SUMMARY PARAGRAPHS -----//
	
	/**
	 *	The summary paragraph, to be displayed in the right column. 
	 *	This usually only applies to "artefact" Rows.
	 *
	 *	@property {string} _summary_paragraph
	 *	@private
	 */	
	_summary_paragraph: "An overview of CRM including the approach to managing enquiries, functions of <strong>CRM</strong> and a <strong>CRM</strong> walkthrough.",
			
		/**
		 * 	Return the summary paragraph.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The summary paragraph, possibly in HTML format.		 
		 */
		_getSummary: function() {
			"use strict";
			return this._summary_paragraph;
		},
		
		/**
		 * 	Set the summary paragraph.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anHTMLSnippet - The new summary paragraph. Can be HTML.		 
		 *	@returns {Row} The Row; this.	 
		 */	
		_setSummary: function( anHTMLSnippet ) {
			"use strict";
			if ( ( typeof anHTMLSnippet === "string" ) && ( anHTMLSnippet.length !== 0 ) ) {
				this._summary_paragraph = anHTMLSnippet;
			} 
			else {
				this._summary_paragraph = "";
			}
			return this;
		},		
	
		/**
		 * 	Does this Row have a summary paragraph?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */
		hasSummaryParagraph: function() {
			"use strict";
			return ( ( ( typeof this._summary_paragraph === "string" ) || ( this._summary_paragraph instanceof String ) ) && ( this._summary_paragraph.length > 0 ) );
		},
	
		/**
		 * 	Get or Set the summary parapgraph for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The summary paragraph as a string.
		 *	@throws {SyntaxError} Will throw error if aParameter is not a string or null.		 
		 *	@returns {(string|Row)} An string containing the summary paragraph or the Row itself.	 
		 */	
		summaryParagraph: function( aParameter ) { 
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getSummary();
			} 
			else {
						
				// Check if the Parameter is an String and if so, the pipe character is the delimiter between the left and right
				if ( ( typeof aParameter === "string" ) || ( aParameter instanceof String ) ) {
					this._setSummary( aParameter );
				}
				
				// If aParameter is not a String, throw an error and don't set anything.
				else {
					throw new SyntaxError( "The specified parameter is of an unexpected type." );
				}
				
				return this;
			}				
		},
	
	
	//----- ROW HYPERLINKS -----//
	
	/**
	 *	The hyperlink or url the artefact relates to. 
	 *	This usually only applies to "artefact" Rows.
	 * 	This was a single object; it's been broken into two properties after a cloning deep copy problem.	 
	 *
	 *	@property {string} _artefact_hyperlink
	 *	@private
	 */
	_artefact_hyperlink: "http://tafensw.edu.au/",
	
	/**
	 *	The hyperlink title on the url that the artefact relates to. 
	 *	This usually only applies to "artefact" Rows.
	 * 	This was a single object; it's been broken into two properties after a cloning deep copy problem.	 
	 *
	 *	@property {string} _artefact_hyperlink_title
	 *	@private
	 */	
	_artefact_hyperlink_title: "TAFE NSW",
	
	/**
	 *	The artefact hyperlink can open in a new window or tab.
	 *
	 *	@property {boolean} _artefact_hyperlink_new_window - Open the link in a new window?
	 *	@private
	 */	
	_artefact_hyperlink_new_window: false,	

		/**
		 * 	Return the artefact's hyperlink.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} A url, including protocol (http://).		 
		 */
		_getHref: function() {
			"use strict";
			return this._artefact_hyperlink;
		},
		
		/**
		 * 	Set the summary paragraph.
		 *
		 *	@method
		 *	@private
		 *	@param {string} anAddress - The new url, including protocol (http://).		 
		 *	@returns {Row} The Row; this.	 
		 */
		_setHref: function( anAddress ) {
			"use strict";
			if ( ( typeof anAddress === "string" ) && ( anAddress.length !== 0 ) ) {
				this._artefact_hyperlink = anAddress;
			} 
			else {
				this._artefact_hyperlink = "";
			}
			return this;
		},	
	
		/**
		 * 	Return the artefact hyperlink's title.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} A descriptive title explaining where this hyperlink will take the visitor.		 
		 */
		_getHrefTitle: function() {
			"use strict";
			return this._artefact_hyperlink_title;
		},
		
		/**
		 * 	Set the artefact hyperlink's title.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aTitle - A descriptive title explaining where this hyperlink will take the visitor.		 
		 *	@returns {Row} The Row; this.	 
		 */	
		_setHrefTitle: function( aTitle ) {
			"use strict";
			if ( ( typeof aTitle === "string" ) && ( aTitle.length !== 0 ) ) {
				this._artefact_hyperlink_title = aTitle;
			} 
			else {
				this._artefact_hyperlink_title = "";
			}
			return this;
		},		
	
		/**
		 * 	Does this Row have a artefact hyperlink?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */
		hasArtefactURL: function() {
			"use strict";		
			return ( ( ( typeof this._artefact_hyperlink === "string" ) || ( this._artefact_hyperlink instanceof String ) ) && ( this._artefact_hyperlink.length > 0 ) );
		},
	
			/**	@borrows hasArtefactURL as hasArtefactUrl */
			hasArtefactUrl: function() {
				"use strict";
				return this.hasArtefactURL();
			},
	
			/**	@borrows hasArtefactURL as hasArtefactHyperlink */
			hasArtefactHyperlink: function() {
				"use strict";
				return this.hasArtefactURL();
			},
	
			/**	@borrows hasArtefactURL as hasArtefactLink */
			hasArtefactLink: function() {
				"use strict";
				return this.hasArtefactURL();
			},	
	
		/**
		 * 	Get or Set the artefact hyperlink for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The artefact hyperlink as a string, including the protocol (http://).	 
		 *	@returns {(string|Row)} An string containing the artefact hyperlink or the Row itself.	 
		 */	
		artefactURL: function( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getHref();
			} 
			else {
				this._setHref( aParameter );
				return this;
			}
			
		},	
	
			/**	@borrows artefactURL as artefactUrl */
			artefactUrl: function( aParameter ) {
				"use strict";
				return this.artefactURL( aParameter );
			},
	
			/**	@borrows artefactURL as artefactHyperlink */
			artefactHyperlink: function( aParameter ) {
				"use strict";
				return this.artefactURL( aParameter );
			},
	
			/**	@borrows artefactURL as artefactLink */	
			artefactLink: function( aParameter ) {
				"use strict";
				return this.artefactURL( aParameter );
			},		
	
		/**
		 * 	Does this Row's' artefact hyperlink have a title?
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if there is a string and it's length is greater than 0.	 
		 */	
		hasArtefactURLTitle: function() {
			"use strict";			
			return ( ( ( typeof this._artefact_hyperlink_title === "string" ) || ( this._artefact_hyperlink_title instanceof String ) ) && ( this._artefact_hyperlink_title.length > 0 ) );
		},
	
			/**	@borrows hasArtefactURLTitle as hasArtefactUrlTitle */
			hasArtefactUrlTitle: function() {
				"use strict";
				return this.hasArtefactURLTitle();
			},
	
			/**	@borrows hasArtefactURLTitle as hasArtefactHyperlinkTitle */	
			hasArtefactHyperlinkTitle: function() {
				"use strict";
				return this.hasArtefactURLTitle();
			},
	
			/**	@borrows hasArtefactURLTitle as hasArtefactLinkTitle */
			hasArtefactLinkTitle: function() {
				"use strict";
				return this.hasArtefactURLTitle();
			},	
	
		/**
		 * 	Get or Set the title for the artefact hyperlink for this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The title as a string, describing where the hyperlink will take a user.	 
		 *	@returns {(string|Row)} An string containing the hyperlink title or the Row itself.	 
		 */	
		artefactURLTitle: function ( aParameter ) {
			"use strict";
			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getHrefTitle();
			} 
			else {
				this._setHrefTitle( aParameter );
				return this;
			}
			
		},	
	
			/**	@borrows artefactURLTitle as artefactUrlTitle */
			artefactUrlTitle: function( aParameter ) {
				"use strict";
				return this.artefactURLTitle( aParameter );
			},
	
			/**	@borrows artefactURLTitle as artefactHyperlinkTitle */
			artefactHyperlinkTitle: function( aParameter ) {
				"use strict";
				return this.artefactURLTitle( aParameter );
			},
	
			/**	@borrows artefactURLTitle as artefactLinkTitle */
			artefactLinkTitle: function( aParameter ) {
				"use strict";
				return this.artefactURLTitle( aParameter );
			},
	
		/**
		 * 	Returns if the hyperlink for this artefact will open in a new window.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean} Return true if this hyperlink will open in a new window.		 
		 */
		_getArtefactURLNewWindow: function() {
			"use strict";
			return this._artefact_hyperlink_new_window;
		},
	
		/**
		 * 	Set if the hyperlink for this artefact should open in a new window.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Set to true if link should open in a new window.		 
		 *	@returns {Row} The Row; this.	 
		 */
		_setArtefactURLNewWindow: function( aBoolean ) {
			"use strict";
			this._artefact_hyperlink_new_window = aBoolean;
			return this;
		},
	
		/**
		 * 	Get or Set if the hyperlink on this artefact should open in a new window.
		 *
		 *	@method
		 *	@public
		 *	@param {?boolean} aParameter - Open in a new window or not.		 
		 *	@returns {(string|Row)} A boolean if it should open in a new window or the Row itself.	 
		 */
		artefactURLNewWindow: function( aParameter ) {
			"use strict";
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getArtefactURLNewWindow();
			}
			else {
				this._setArtefactURLNewWindow( aParameter );
				return this;
			}
			
		},
	
			/**	@borrows artefactURLNewWindow as hasArtefactURLNewWindow */
			hasArtefactURLNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},
	
			/**	@borrows artefactURLNewWindow as artefactUrlNewWindow */
			artefactUrlNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},
	
			/**	@borrows artefactURLNewWindow as hasArtefactUrlNewWindow */
			hasArtefactUrlNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},
	
			/**	@borrows artefactURLNewWindow as artefactHyperlinkNewWindow */
			artefactHyperlinkNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},
	
			/**	@borrows artefactURLNewWindow as hasArtefactHyperlinkNewWindow */
			hasArtefactHyperlinkNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},	
	
			/**	@borrows artefactURLNewWindow as artefactLinkNewWindow */
			artefactLinkNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},
	
			/**	@borrows artefactURLNewWindow as hasArtefactLinkNewWindow */
			hasArtefactLinkNewWindow: function( aParameter ) {
				"use strict";
				return this.artefactURLNewWindow( aParameter );
			},	
	
	//----- CUSTOM COLOR -----//
	
	/**
	 *	The Rows need to know about their parent Box's custom color inorder to draw the Clear Div correctly.
	 *	We're going to use a hexadecimal string for the color and keep reseting it to empty if no color exists
	 *
	 *	@property {string} _custom_color
	 *	@private
	 */
	_custom_color: "",
	
		/**
		 * 	Return custom colour of this Row.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string} The colour in hexadecimal notation.
		 */			
		_getCustomColor: function() {
			"use strict";
			return this._custom_color;
		},
	
		/**
		 * 	Set the custom colour of this Row.
		 *
		 *	@method
		 *	@private
		 *	@param {string} aColor - The new custom colour for the Row. It 
		 *		should be in hexadecimal notation.
		 *	@returns {Row} The Row; this.	
		 */			
		_setCustomColor: function( aColor ) {
			"use strict";		
			this._custom_color = aColor;
			return this;
		},	
	
		/**
		 * 	Get the use of a custom colour on this Row.
		 *
		 *	@method
		 *	@public		 
		 *	@returns {boolean} Returns true if the Row has a custom colour.	 
		 */	
		hasCustomColor: function() {
			"use strict";			
			if ( this._custom_color.length > 0 ) {
				return true;
			}
			else {
				return false;
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
		 * 	Get or Set the custom colour of this Row.
		 *
		 *	@method
		 *	@public
		 *	@param {?string} aParameter - The new custom colour for the Row, 
		 *		in hexadecimal notation.		 
		 *	@returns {(string|Row)} The custom colour of this Row, or the
		 *		Row itself.	 
		 */
		customColor: function( aParameter ) {
			"use strict";			
			if ( ( aParameter === undefined ) || ( aParameter === null ) ) {
				return this._getCustomColor();
			} 
			else {
				this._setCustomColor( aParameter );
				return this;
			}
		},
	
			/**	@borrows customColor as customColour */
			customColour: function( aParameter ) {
				"use strict";
				return this.customColor( aParameter );
			},
				
	
	
	//----- STRING/ARRAYS FOR MULTIPLE AND TRYME ROWS -----//
	
	/**
	 *	This string is used to replicate an array of file names in the "multiple" Row.
	 *	I needed a work around because cloning objects is not a deep copy. So, every Row has a string that represents the files for a "multiple" Row.
	 *	ASSUMPTION: No one will ever try to use the pipe ('|') in an artefact name/title/url. 
	 *
	 *	Forgive me because this can get a bit confusing. Basically, this string is actually an array, with the pipes splitting cells. All the typical array
	 *	stuff is faked, usually by breaking it into an actual array of strings, and then stitching it back together when finished.
	 *
	 *	This usually only applies to "artefact" Rows.
	 *
	 *	@property {string} _fileNamesArray
	 *	@private
	 */
	_fileNamesArray: "WI - Work Instruction 1|WI - Work Instruction 2|WI - Work Instruction 3|WI - Work Instruction 4",
	
	/**
	 *	This string is used to replicate an array of file sizes in the "multiple" Row.
	 *	This could also be used to represent time for the case of videos. 
	 *
	 *	@property {string} _fileSizesArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_fileSizesArray: "12kb|12kb|13kb|13kb",
	
	/**
	 *	This string is used to replicate an array of urls in the "multiple" Row.
	 *
	 *	@property {string} _fileLinksArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_fileLinksArray: "http://tafensw.edu.au/|http://tafensw.edu.au/|http://tafensw.edu.au/|http://tafensw.edu.au/",
	
	/**
	 *	This string is used to replicate an array of hyperlink titles in the "multiple" Row.
	 *
	 *	@property {string} _fileLinksTitleArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_fileLinksTitleArray: "TAFE NSW|TAFE NSW|TAFE NSW|TAFE NSW",
	
	/**
	 *	This string is used to replicate an array of booleans indicating whether a hyperlink should open a new window or not. This is used in the "multiple" Row.
	 *
	 *	@property {string} _fileLinksNewWindowArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_fileLinksNewWindowArray: "false|false|false|false",	
	
	/**
	 *	This string is used to replicate an array of (fa) icons for a tryme Row.
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.
	 *
	 *	@property {string} _trymeIconArray
	 *	@see _fileNamesArray	 
	 *	@private
	 */
	_trymeIconArray: "fa-book|fa-video-camera|fa-laptop|fa-graduation-cap",
	
	/**
	 *	This string is used to replicate an array of titles for a tryme Row.
	 *
	 *	@property {string} _trymeTitleArray
	 *	@see _fileNamesArray
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.	 
	 *	@private
	 */
	_trymeTitleArray: "Topic Overview|Video Demonstration|Simulation|Knowledge Check",
	
	/**
	 *	This string is used to replicate an array of titles for a tryme Row.
	 *	This could also be used to represent type and time for the case of videos. 	 
	 *
	 *	@property {string} _trymeSubTitleArray
	 *	@see _fileNamesArray
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.	 
	 *	@private
	 */
	_trymeSubTitleArray: "Presentation<br>5 minutes|Video<br>10 minutes|PeopleSoft Simulation<br>20 minutes|Quiz",
	
	/**
	 *	This string is used to replicate an array of urls in the tryme Row.
	 *
	 *	@property {string} _trymeLinkArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_trymeLinkArray: "https://tafe.learn.tafensw.edu.au/mod/scorm/view.php?id=10931|https://tafe.learn.tafensw.edu.au/mod/scorm/view.php?id=10931|https://tafe.learn.tafensw.edu.au/mod/scorm/view.php?id=10931|https://tafe.learn.tafensw.edu.au/mod/scorm/view.php?id=10931",
	
	/**
	 *	This string is used to replicate an array of hyperlink titles in the tryme Row.
	 *
	 *	@property {string} _trymeLinkTitleArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_trymeLinkTitleArray: "|||",
	
	/**
	 *	This string is used to replicate an array of booleans indicating whether a hyperlink should open a new window or not. This is used in the tryme Row.
	 *
	 *	@property {string} _trymeLinkNewWindowArray
	 *	@see _fileNamesArray
	 *	@private
	 */
	_trymeLinkNewWindowArray: "false|false|false|false",	
	
		/**
		 *	Split the _fileNamesArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of file names.			 
		 *	@see _fileNamesArray
		 */
		_splitFileNamesArray: function() {
			"use strict";
			return this._fileNamesArray.split( '|' );
		},
	
		/**
		 *	Split the _fileSizesArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of file sizes.			 
		 *	@see _fileSizesArray
		 */	
		_splitFileSizesArray: function() {
			"use strict";
			return this._fileSizesArray.split( '|' );
		},
	
		/**
		 *	Split the _fileLinksArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of file links.			 
		 *	@see _fileLinksArray
		 */	
		_splitFileLinksArray: function() {
			"use strict";			
			return this._fileLinksArray.split( '|' );
		},
	
		/**
		 *	Split the _fileLinksTitleArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of file link titles.			 
		 *	@see _fileLinksTitleArray
		 */		
		_splitFileLinksTitleArray: function() {
			"use strict";	
			return this._fileLinksTitleArray.split( '|' );
		},
	
		/**
		 *	Split the _fileLinksNewWindowArray string into an array of booleans.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean[]} Return an array of booleans indicating if a link should open in a new window.			 
		 *	@see _fileLinksNewWindowArray
		 */	
		_splitFileLinksNewWindowArray: function() {
			"use strict";
			
			var theStringArray = this._fileLinksNewWindowArray.split( '|' );
			var theBooleanArray = [];
			var n = theStringArray.length;
			
			for ( var i = 0; i < n; i++ ) {
				if ( ( theStringArray[i].trim() ) === "true" ) {
					theBooleanArray[i] = true;
				}
				else {
					theBooleanArray[i] = false;
				}
			}
			
			return theBooleanArray;			
		},	
	
		/**
		 *	Split the _trymeIconArray string into an array of strings.
		 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of (fa) icon classes.			 
		 *	@see _trymeIconArray
		 */
		_splitTrymeIconArray: function() {
			"use strict";		
			return this._trymeIconArray.split( '|' );
		},
	
		/**
		 *	Split the _trymeTitleArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of Tryme Titles.			 
		 *	@see _trymeTitleArray
		 */	
		_splitTrymeTitleArray: function() {
			"use strict";
			return this._trymeTitleArray.split( '|' );
		},
	
		/**
		 *	Split the _trymeSubTitleArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of Tryme Subtitles.			 
		 *	@see _trymeSubTitleArray
		 */
		_splitTrymeSubTitleArray: function() {
			"use strict";		
			return this._trymeSubTitleArray.split( '|' );
		},
	
		/**
		 *	Split the _trymeLinkArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of hyperlinks, with the protocol (http://).			 
		 *	@see _trymeLinkArray
		 */	
		_splitTrymeLinkArray: function() {
			"use strict";
			return this._trymeLinkArray.split( '|' );
		},
	
		/**
		 *	Split the _trymeLinkTitleArray string into an array of strings.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {string[]} Return an array of hyperlink titles.			 
		 *	@see _trymeLinkTitleArray
		 */	
		_splitTrymeLinkTitleArray: function() {
			"use strict";
			
			return this._trymeLinkTitleArray.split( '|' );
		},
	
		/**
		 *	Split the _trymeLinkNewWindowArray string into an array of booleans.
		 *
		 *	@method
		 *	@private		 
		 *	@returns {boolean[]} Return an array of booleans indicating if a link should open in a new window.			 
		 *	@see _trymeLinkNewWindowArray
		 */	
		_splitTrymeLinkNewWindowArray: function() {
			"use strict";
			var theStringArray = this._trymeLinkNewWindowArray.split( '|' );
			var theBooleanArray = [];
			var n = theStringArray.length;
			
			for ( var i = 0; i < n; i++ ) {
				// theBooleanArray[i] = ( ( theStringArray[i].trim() ) === "true" ); // - this is clever but unclear
				if ( ( theStringArray[i].trim() ) === "true" ) {
					theBooleanArray[i] = true;
				}
				else {
					theBooleanArray[i] = false;
				}
			}
			
			return theBooleanArray;
		},
	
		/**
		 *	Join an array of strings into the _fileNamesArray string.
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of file names as strings.
		 *	@returns {string} Return a string representing all the file names, delimited by the pipe ('|').			 
		 *	@see _fileNamesArray
		 */
		_joinFileNamesArray: function( anArray ) {
			"use strict";			
			if ( Array.isArray( anArray ) ) {
				this._fileNamesArray = anArray.join( '|' );		
			}
		},

		/**
		 *	Join an array of strings into the _fileSizesArray string.
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of file sizes as strings.
		 *	@returns {string} Return a string representing all the file sizes, delimited by the pipe ('|').			 
		 *	@see _fileSizesArray
		 */
		_joinFileSizesArray: function( anArray ) {
			"use strict";	
			if ( Array.isArray( anArray ) ) {
				this._fileSizesArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _fileLinksArray string.
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of file links (aka urls, including the protocol) as strings.
		 *	@returns {string} Return a string representing all the file links, delimited by the pipe ('|').			 
		 *	@see _fileLinksArray
		 */	
		_joinFileLinksArray: function( anArray ) {
			"use strict";		
			if ( Array.isArray( anArray ) ) {
				this._fileLinksArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _fileLinksTitleArray string.
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of file links titles as strings.
		 *	@returns {string} Return a string representing all the file links titles, delimited by the pipe ('|').			 
		 *	@see _fileLinksTitlesArray
		 */	
		_joinFileLinksTitleArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				this._fileLinksTitleArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _fileLinksNewWindowArray string.
		 *
		 *	@method
		 *	@private
		 *	@param {boolean[]} anArray - An array of booleans indicating whether a link should open in a new window/tab.
		 *	@returns {string} Return a string representing all the booleans, delimited by the pipe ('|').			 
		 *	@see _fileLinksNewWindowArray
		 */	
		_joinFileLinksNewWindowArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				var theStringArray = [];
				var n = anArray.length;
				for ( var i = 0; i < n; i++ ) {
					if ( anArray[i] ) {
						theStringArray[i] = "true";
					}
					else {
						theStringArray[i] = "false";
					}
				}
				
				this._fileLinksNewWindowArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _trymeIconArray string.
		 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of fa icon classes as strings.
		 *	@returns {string} Return a string representing all the icon classes, delimited by the pipe ('|').			 
		 *	@see _trymeIconArray
		 */	
		_joinTrymeIconArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				this._trymeIconArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _trymeTitleArray string.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of tryme block titles as strings.
		 *	@returns {string} Return a string representing all the titles, delimited by the pipe ('|').			 
		 *	@see _trymeTitleArray
		 */	
		_joinTrymeTitleArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				this._trymeTitleArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _trymeSubTitleArray string.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of tryme block subtitles as strings.
		 *	@returns {string} Return a string representing all the subtitles, delimited by the pipe ('|').			 
		 *	@see _trymeSubTitleArray
		 */		
		_joinTrymeSubTitleArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				this._trymeSubTitleArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _trymeLinkArray string.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of tryme hyperlinks as strings.
		 *	@returns {string} Return a string representing all the hyperlinks, delimited by the pipe ('|').			 
		 *	@see _trymeLinkArray
		 */		
		_joinTrymeLinkArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				this._trymeLinkArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of strings into the _trymeLinkTitleArray string.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string[]} anArray - An array of hyperlink titles as strings.
		 *	@returns {string} Return a string representing all the hyperlink titles, delimited by the pipe ('|').			 
		 *	@see _trymeLinkTitleArray
		 */		
		_joinTrymeLinkTitleArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				this._trymeLinkTitleArray = anArray.join( '|' );		
			}
		},
	
		/**
		 *	Join an array of booleans into the _trymeLinkNewWindowArray string.		 
		 *
		 *	@method
		 *	@private
		 *	@param {boolean[]} anArray - An array of booleans indicating if a hyperlink should open in a new window.
		 *	@returns {string} Return a string representing all booleans, delimited by the pipe ('|').			 
		 *	@see _trymeLinkNewWindowArray
		 */	
		_joinTrymeLinkNewWindowArray: function( anArray ) {
			"use strict";
			
			if ( Array.isArray( anArray ) ) {
				var theStringArray = [];
				var n = anArray.length;
				for ( var i = 0; i < n; i++ ) {
					if ( anArray[i] ) {
						theStringArray[i] = "true";
					}
					else {
						theStringArray[i] = "false";
					}
				}
				
				this._trymeLinkNewWindowArray = anArray.join( '|' );		
			}
		},	
	
		/**
		 *	Remove the last element from the _fileNamesArray and return it.		 
		 *
		 *	@method
		 *	@private
		 *	@returns {string} The last element (ie file name) in _fileNamesArray.			 
		 *	@see _fileNamesArray
		 */
		_popFileNamesArray: function() {
			"use strict";
			
			// We can actually work with the string here.
			var theString = this._fileNamesArray;
			var delim = theString.lastIndexOf( '|' );
			var end = theString.length;
			
			// Slice off the last node
			this._fileNamesArray = theString.slice( 0, delim );
			
			// Return the last node
			return theString.slice( (delim + 1), end );
		},
	
		/**
		 *	Remove the last element from the _fileSizesArray and return it.		 
		 *
		 *	@method
		 *	@private
		 *	@returns {string} The last element (ie file name) in _fileSizesArray.			 
		 *	@see _fileSizesArray
		 */	
		_popFileSizesArray: function() {
			"use strict";
			
			// We can actually work with the string here.
			var theString = this._fileSizesArray;
			var delim = theString.lastIndexOf( '|' );
			var end = theString.length;
			
			// Slice off the last node
			this._fileSizesArray = theString.slice( 0, delim );			
			
			// Return the last node
			return theString.slice( (delim + 1), end );
		},
	
		/**
		 *	Remove the last element from the _fileLinksArray and return it.		 
		 *
		 *	@method
		 *	@private
		 *	@returns {string} The last element (ie file name) in _fileLinksArray.			 
		 *	@see _fileLinksArray
		 */		
		_popFileLinksArray: function() {
			"use strict";
			
			// We can actually work with the string here.
			var theString = this._fileLinksArray;
			var delim = theString.lastIndexOf( '|' );
			var end = theString.length;
			
			// Slice off the last node
			this._fileLinksArray = theString.slice( 0, delim );			
			
			// Return the last node
			return theString.slice( (delim + 1), end );
		},
	
		/**
		 *	Remove the last element from the _fileLinksTitleArray and return it.		 
		 *
		 *	@method
		 *	@private
		 *	@returns {string} The last element (ie file name) in _fileLinksTitleArray.			 
		 *	@see _fileLinksTitleArray
		 */	
		_popFileLinksTitleArray: function() {
			"use strict";
			
			// We can actually work with the string here.
			var theString = this._fileLinksTitleArray;
			var delim = theString.lastIndexOf( '|' );
			var end = theString.length;
			
			// Slice off the last node
			this._fileLinksTitleArray = theString.slice( 0, delim );			
			
			// Return the last node
			return theString.slice( (delim + 1), end );
		},

		/**
		 *	Remove the last element from the _fileLinksNewWindowArray and return it.		 
		 *
		 *	@method
		 *	@private
		 *	@returns {boolean} The last element (ie file name) in _fileLinksNewWindowArray.			 
		 *	@see _fileLinksNewWindowArray
		 */		
		_popFileLinksNewWindowArray: function() {
			"use strict";
			
			// We can actually work with the string here.
			var theString = this._fileLinksNewWindowArray;
			var delim = theString.lastIndexOf( '|' );
			var end = theString.length;
			var theBoolean;
			
			// Slice off the last node
			this._fileLinksTitleArray = theString.slice( 0, delim );			
			
			// Return the last node
			theBoolean = theString.slice( (delim + 1), end );
			return ( theBoolean.trim() === "true" ); // If the last string is true, return true. Else return false.
		},	
	
		/**
		 *	Add a new element to the end of the _fileNamesArray. Return the length of the array.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string} aString - A new file name to add to the "array".
		 *	@throws {SyntaxError} Will throw error if aString is not a string.		 
		 *	@returns {number} The length of the "array".			 
		 *	@see _fileNamesArray
		 */
		_pushFileNamesArray: function( aString ) {
			"use strict";
			
			// Only if it really is a string.
			if ( ( typeof aString === "string" ) || ( aString instanceof String ) ) {
				
				// Add it to the array
				this._fileNamesArray = this._fileNamesArray.concat( '|', aString );		
				return this._artefactArrayLength( this._fileNamesArray );
			}
			else {
				throw new SyntaxError( "You cannot add a non-string to this array." );
			}	
		},
	
		/**
		 *	Add a new element to the end of the _fileSizesArray. Return the length of the array.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string} aString - A new file size to add to the "array".
		 *	@throws {SyntaxError} Will throw error if aString is not a string.		 
		 *	@returns {number} The length of the "array".			 
		 *	@see _fileSizesArray
		 */	
		_pushFileSizesArray: function( aString ) {
			"use strict";
			
			// Only if it really is a string.
			if ( ( typeof aString === "string" ) || ( aString instanceof String ) ) {
				this._fileSizesArray = this._fileSizesArray.concat( '|', aString );
				return this._artefactArrayLength( this._fileSizesArray );
			}
			else {
				throw new SyntaxError( "You cannot add a non-string to this array." );
			}	
		},

		/**
		 *	Add a new element to the end of the _pushFileLinksArray. Return the length of the array.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string} aString - A hyperlink (including protocol) to add to the "array".
		 *	@throws {SyntaxError} Will throw error if aString is not a string.		 
		 *	@returns {number} The length of the "array".			 
		 *	@see _pushFileLinksArray
		 */	
		_pushFileLinksArray: function( aString ) {
			"use strict";
			
			// Only if it really is a string.
			if ( ( typeof aString === "string" ) || ( aString instanceof String ) ) {
				this._fileLinksArray = this._fileLinksArray.concat( '|', aString );
				return this._artefactArrayLength( this._fileLinksArray );
			}
			else {
				throw new SyntaxError( "You cannot add a non-string to this array." );
			}	
		},
	
		/**
		 *	Add a new element to the end of the _pushFileLinksTitleArray. Return the length of the array.		 
		 *
		 *	@method
		 *	@private
		 *	@param {string} aString - A hyperlink title to add to the "array".
		 *	@throws {SyntaxError} Will throw error if aString is not a string.		 
		 *	@returns {number} The length of the "array".			 
		 *	@see _pushFileLinksTitleArray
		 */		
		_pushFileLinksTitleArray: function( aString ) {
			"use strict";
			
			// Only if it really is a string.
			if ( ( typeof aString === "string" ) || ( aString instanceof String ) ) {
				this._fileLinksTitleArray = this._fileLinksTitleArray.concat( '|', aString );
				return this._artefactArrayLength( this._fileLinksTitleArray );
			}
			else {
				throw new SyntaxError( "You cannot add a non-string to this array." );
			}	
		},	

		/**
		 *	Add a new element to the end of the _fileLinksNewWindowArray. Return the length of the array.		 
		 *
		 *	@method
		 *	@private
		 *	@param {boolean} aBoolean - Whether the relevant link should open in a new window or not.
		 *	@throws {SyntaxError} Will throw error if aBoolean is not a boolean.		 
		 *	@returns {number} The length of the "array".			 
		 *	@see _fileLinksNewWindowArray
		 */		
		_pushFileLinksNewWindowArray: function( aBoolean ) {
			"use strict";
			
			var theAddition;
			
			if ( typeof aBoolean === "boolean" ) {
				if ( aBoolean ) {
					theAddition = "true";
				}
				else {
					theAddition = "false";
				}
				
				this._fileLinksNewWindowArray = this._fileLinksNewWindowArray.concat( '|', theAddition );
				return this._artefactArrayLength( this._fileLinksNewWindowArray );				
			}
			else {
				throw new SyntaxError( "You cannot add a non-boolean to this array." );
			}	
		},
	
		/**
		 *	How long is the given "array"? This will return a count (+1) of delimiters in the ArrayString.	 
		 *
		 *	@method
		 *	@private
		 *	@param {string} aString - The "array" you want the length of. (In this context, an "array" is a string with elements delimited by pipes).	 
		 *	@returns {number} The length of the "array".			 
		 *	@see _fileNamesArray
		 */	
		_artefactArrayLength: function( aString ) {
			"use strict";
			
			// If you don't specify, we'll count the file names array
			if ( ( aString === undefined ) || ( aString === null ) ) {
				aString = this._fileNamesArray;
			}
			
			var result = 0;
			for (var i = 0; i < aString; i++) {
				if ( aString[i] === '|' ) {
					result++;
				}
			}
			return result;
		},
	
		/**
		 *	How long is the given "array"? This will actually assume the Row prototype is correct.	 
		 *
		 *	@method
		 *	@private	 
		 *	@returns {number} The length of the "array".			 
		 *	@see _artefactArrayLength
		 */		
		_trymeArrayLength: function() {
			"use strict";
			
			var thePrototype = this.rowPrototype();
			
			switch ( thePrototype ) {
				case "twoicon":   return 2;
				case "threeicon": return 3;
				case "fouricon":  return 4;
				default:          return 0;
			}
		},
	
	/**
	 * 	Get or Set filenames (i.e. artefact names) in a "multiple" Row.
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the filename being set or retrieved.
	 *	@param {?string} aString - The new filename.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _fileNamesArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The filename at that index as a string, array of filename strings if no index specified, or the Row itself if setting the filename. 
	 */
	fileNamesArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitFileNamesArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= ( this._artefactArrayLength( this._fileNamesArray ) ) ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the fileNamesArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinFileNamesArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set file sizes in a "multiple" Row.
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the file size being set or retrieved.
	 *	@param {?string} aString - The new file size (this can also be a timing if the artefact is a video).
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _fileSizesArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The file size at that index as a string, array of file size strings if no index specified, or the Row itself if setting the filesize. 
	 */	
	fileSizesArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitFileSizesArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= ( this._artefactArrayLength( this._fileSizesArray ) ) ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the fileSizesArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinFileSizesArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set hyperlinks in a "multiple" Row.
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the hyperlink being set or retrieved.
	 *	@param {?string} aString - The new hyperlink (including protocol).
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _fileLinksArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The hyperlink at that index as a string, array of hyperlink strings if no index specified, or the Row itself if setting the hyperlink. 
	 */	
	fileLinksArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitFileLinksArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= ( this._artefactArrayLength( this._fileLinksArray ) ) ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the fileLinksArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinFileLinksArray( theArray );
			}			
		}
		
		return this;
	},		
	
	/**
	 * 	Get or Set hyperlink titles in a "multiple" Row.
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the hyperlink title being set or retrieved.
	 *	@param {?string} aString - The new hyperlink title.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _fileLinksTitleArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The hyperlink title at that index as a string, array of hyperlink title strings if no index specified, or the Row itself if setting the title. 
	 */	
	fileLinksTitleArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitFileLinksTitleArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= ( this._artefactArrayLength( this._fileLinksTitleArray ) ) ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the fileLinksTitleArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinFileLinksTitleArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set if artefacts in a "multiple" Row will open in a new window
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the "new window boolean" being set or retrieved.
	 *	@param {?boolean} aBoolean - Set to true if the artefact link should open in a new window or tab.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _fileLinksNewWindowArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(boolean|boolean[]|Row)} Returns true if the link at this index should open in a new window.
	 *		Return an array of booleans if no index specified. 
	 *		Return the Row itself if setting a new window to open or not open at that index. 
	 */		
	fileLinksNewWindowArray: function( anIndex, aBoolean ) {
		"use strict";
		
		var theArray = this._splitFileLinksNewWindowArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= ( this._artefactArrayLength( this._fileLinksTitleArray ) ) ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the fileLinksTitleArray." );
			}
						
			if ( ( aBoolean === undefined ) || ( aBoolean === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aBoolean;
				this._joinFileLinksNewWindowArray( theArray );
			}			
		}
		
		return this;
	},	
	
	/**
	 * 	Get or Set (fa) icons in a "tryme" Row.
	 *	See {@link https://fontawesome.com/v4.7.0/|Font Awesome}.	 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the fa icon class being set or retrieved.
	 *	@param {?string} aString - The new fa icon class.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _trymeIconArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The fa icon class at that index as a string, array of icon class strings if no index specified, or the Row itself if setting the icon class. 
	 */	
	trymeIconArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitTrymeIconArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= this._trymeArrayLength() ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the trymeIconArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinTrymeIconArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set titles in a "tryme" Row. 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the tryme title being set or retrieved.
	 *	@param {?string} aString - The new tryme title.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _trymeTitleArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The title of that tryme box as a string, array of tryme title strings if no index specified, or the Row itself if setting the title. 
	 */	
	trymeTitleArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitTrymeTitleArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= this._trymeArrayLength() ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the trymeIconArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinTrymeTitleArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set subtitles in a "tryme" Row. 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the tryme subtitle being set or retrieved.
	 *	@param {?string} aString - The new tryme title.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _trymeSubTitleArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The subtitle of that tryme box as a string, array of tryme subtitle strings if no index specified, or the Row itself if setting the subtitle. 
	 */		
	trymeSubTitleArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitTrymeSubTitleArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= this._trymeArrayLength() ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the trymeIconArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinTrymeSubTitleArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set hyperlinks in a "tryme" Row. 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the tryme hyperlink (with protocol) being set or retrieved.
	 *	@param {?string} aString - The new tryme hyperlink (with protocol).
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _trymeLinkArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The hyperlink of that tryme box as a string, array of tryme hyperlinks if no index specified, or the Row itself if setting the hyperlink. 
	 */	
	trymeLinkArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitTrymeLinkArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= this._trymeArrayLength() ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the trymeIconArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinTrymeLinkArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set hyperlink titles in a "tryme" Row. 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the tryme hyperlink title being set or retrieved.
	 *	@param {?string} aString - The new tryme hyperlink title.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _trymeLinkTitleArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The title of that tryme hyperlink as a string, array of tryme hyperlink titles if no index specified, or the Row itself if setting the title. 
	 */		
	trymeLinkTitleArray: function( anIndex, aString ) {
		"use strict";
		
		var theArray = this._splitTrymeLinkTitleArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= this._trymeArrayLength() ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the trymeIconArray." );
			}
						
			if ( ( aString === undefined ) || ( aString === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aString.trim();
				this._joinTrymeLinkTitleArray( theArray );
			}			
		}
		
		return this;
	},
	
	/**
	 * 	Get or Set if artefacts in a "tryme" Row will open in a new window
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the "new window boolean" being set or retrieved.
	 *	@param {?boolean} aBoolean - Set to true if the tryme link should open in a new window or tab.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of _trymeLinksNewWindowArray.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(boolean|boolean[]|Row)} Returns true if the link at this index should open in a new window.
	 *		Return an array of booleans if no index specified. 
	 *		Return the Row itself if setting a new window to open or not open at that index. 
	 */	
	trymeLinkNewWindowArray: function( anIndex, aBoolean ) {
		"use strict";
		
		var theArray = this._splitTrymeLinkNewWindowArray();
		
		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			return theArray;
		}
		else {
			// If index isn't an integer, throw a syntax error
			if ( !( Number.isInteger( anIndex ) ) ) {
				throw new RangeError( "The specified index is not an integer." );
			}
			
			// If you're asking for an index greater than the length or less than 0, throw bound error
			if ( ( anIndex >= this._trymeArrayLength() ) || ( anIndex < 0 ) ) {
				throw new RangeError( "The specified index is out of the bounds of the fileLinksTitleArray." );
			}
						
			if ( ( aBoolean === undefined ) || ( aBoolean === null ) ) {
				return theArray[anIndex];
			}
			else {
				theArray[anIndex] = aBoolean;
				this._joinTrymeLinkNewWindowArray( theArray );
			}			
		}
		
		return this;
	},	
	
	/**
	 * 	Get or Set hyperlinks in a "tryme" or "multiple" Row. 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the hyperlink (with protocol) being set or retrieved.
	 *	@param {?string} aString - The new hyperlink (with protocol).
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of the array.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The hyperlink at that index, array of hyperlinks if no index specified, or the Row itself if setting the hyperlink. 
	 */
	multiLink: function( anIndex, aString) {
		"use strict";

		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			throw new SyntaxError( "An index for the hyperlink array must be specified." );
		}
		
		if ( ( aString === undefined ) || ( aString === null ) ) {
			throw new SyntaxError( "A hyperlink for the hyperlink array must be specified." );
		}
		
		if ( this.rowPrototype() === "multiple" ) {
			return this.fileLinksArray( anIndex, aString );
		}
		else {
			return this.trymeLinkArray( anIndex, aString );
		}
	},
	
	/**
	 * 	Get or Set hyperlink titles in a "tryme" or "multiple" Row. 
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the hyperlink title being set or retrieved.
	 *	@param {?string} aString - The new hyperlink title.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of the array.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(string|string[]|Row)} The title at that index, array of titles if no index specified, or the Row itself if setting the title. 
	 */	
	multiLinkTitle: function( anIndex, aString) {
		"use strict";

		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			throw new SyntaxError( "An index for the hyperlink array must be specified." );
		}
		
		if ( ( aString === undefined ) || ( aString === null ) ) {
			throw new SyntaxError( "A title for the hyperlink array must be specified." );
		}
		
		if ( this.rowPrototype() === "multiple" ) {
			return this.fileLinksTitleArray( anIndex, aString );
		}
		else {
			return this.trymeLinkTitleArray( anIndex, aString );
		}
	},
	
	/**
	 * 	Get or Set if hyperlinks in a "tryme" or "multiple" Row should open in a new window.
	 *
	 *	@method
	 *	@public
	 *	@param {?number} anIndex - The index of the "new window boolean" being set or retrieved.
	 *	@param {?boolean} aBoolean - Set to true if the hyperlink should open in a new window or tab.
	 *	@throws {RangeError} Will throw error if anIndex is less than 0 or greater than the length of the array.
	 *	@throws {RangeError} Will throw error if anIndex is not a number.	 
	 *	@returns {(boolean|boolean[]|Row)} Returns true if the link at this index should open in a new window.
	 *		Return an array of booleans if no index specified. 
	 *		Return the Row itself if setting a new window to open or not open at that index.
	 */		
	multiLinkNewWindow: function( anIndex, aBoolean) {
		"use strict";

		if ( ( anIndex === undefined ) || ( anIndex === null ) ) {
			throw new SyntaxError( "An index for the hyperlink array must be specified." );
		}
		
		if ( ( aBoolean === undefined ) || ( aBoolean === null ) ) {
			throw new SyntaxError( "A boolean for a new window for the hyperlink array must be specified." );
		}
		
		if ( this.rowPrototype() === "multiple" ) {
			return this.fileLinksNewWindowArrayArray( anIndex, aBoolean );
		}
		else {
			return this.trymeLinkNewWindowArrayArray( anIndex, aBoolean );
		}
	},
	
	/**
	 * 	Add an artefact to a "multiple" Row. This includes setting all five arrays.
	 *
	 *	@method
	 *	@public
	 *	@param {?string} aString - Of type "A file name|12kb|http://link.com|title|boolean". 
	 *	@returns {Row} The Row; this.
	 */
	addMultipleTuple: function( aString ) {
		"use strict";
		
		// aString is of type "A file name|12kb|http://link.com|title|boolean".
		// Must have 4 pipes.
		// If no string specified, add with default values
		
		var theName  = "WI - Work Instruction";
		var theSize  = "12kb";
		var theLink  = "http://tafensw.edu.au/";
		var theTitle = "TAFE NSW";
		var newWindow = false;
		
		// If aString is not a string
		if ( ( typeof aString === "string" ) || ( aString instanceof String ) )  {
			var theArray = aString.split( '|' );
			if ( theArray.length >= 5 ) {
				theName  = theArray[0].trim();
				theSize  = theArray[1].trim();
				theLink  = theArray[2].trim();
				theTitle = theArray[3].trim();
				newWindow = theArray[4].trim();
			}
		}
		
		if ( newWindow === "true" ) {
			newWindow = true;
		}
		else {
			newWindow = false;
		}
		
		this._pushFileNamesArray( theName );
		this._pushFileSizesArray( theSize );
		this._pushFileLinksArray( theLink );
		this._pushFileLinksTitleArray( theTitle );
		this._pushFileLinksNewWindowArray( newWindow );
		
		return this;
	},
	
		/**	@borrows addMultipleTuple as addMultipleArtefact */
		addMultipleArtefact: function( aString ) {
			"use strict";
			return this.addMultipleTuple( aString );
		},
	
	/**
	 * 	Delete an artefact from a "multiple" Row. This includes deleting from all five arrays.
	 *
	 *	@method
	 *	@public
	 *	@param {?number} [aNumber] - Which artefact should be deleted? If unspecified, last artefact is deleted.	
	 *	@returns {Row} The Row; this.
	 */
	deleteMultipleTuple: function( aNumber ) {
		"use strict";
		
		if ( ( aNumber === undefined ) || ( aNumber === null ) ) {
			aNumber = 1;
		}		
		
		for ( var i = 0; i < aNumber; i++ ) {
			this._popFileNamesArray();
			this._popFileSizesArray();
			this._popFileLinksArray();
			this._popFileLinksTitleArray();
			this._popFileLinksNewWindowArray();
		}
		return this;		
	},
	
		/**	@borrows deleteMultipleTuple as deleteMultipleArtefact */
		deleteMultipleArtefact: function () {
			"use strict";
			return this.deleteMultipleTuple();
		},
	
	
	//----- CONSTRUCTORS -----//
	
	/**
	 * 	Clone the Row object and return it. This might not be the proper way
	 * 	to implement a JavaScript class, and this isn't a proper constructor, but
	 *	it seems to work. I might need to revisit this one day.
	 *
	 *	@constructs Row
	 *	@example foo = Row.new("artefact").iconClass("fa-cc-mastercard");	 
	 *	@method
	 *	@public 
	 */
	new: function( aPrototype ) {
		"use strict";
		
		if ( ( aPrototype === undefined ) || ( aPrototype === null ) ) {
			aPrototype = "generic";
		}
		else {
			aPrototype = aPrototype.toLocaleLowerCase();
		}

		switch ( aPrototype ) {
			
			case "header":
				return this.newHeader();
			
			case "artefact":
				return this.newArtefact();
				
			case "multiple":
				return this.newMultiple();
				
			case "twoicon":
				return this.newTwoIcon();
				
			case "threeicon":
				return this.newThreeIcon();
				
			case "fouricon":
				return this.newFourIcon();					
				
			default:
				return Object.create( this );			
		}
	},
	
	/**
	 * 	Clone the Row object, set the rowPrototype to "header" and return it.
	 *
	 *	@constructs Row	 
	 *	@method
	 *	@public 
	 */
	newHeader: function() {
		"use strict";
		var aNewHeader = Object.create( this );	
		
		aNewHeader.rowPrototype( "header" ).columnHeadings( ["Artefact", "Summary"] );
		return aNewHeader;
	},
	
	/**
	 * 	Clone the Row object, set the rowPrototype to "artefact" and return it.
	 *
	 *	@constructs Row	 
	 *	@method
	 *	@public 
	 */	
	newArtefact: function() {
		"use strict";
		var aNewArtefact = Object.create( this );
		
		aNewArtefact.rowPrototype( "artefact" );
		return aNewArtefact;
	},
	
	/**
	 * 	Clone the Row object, set the rowPrototype to "multiple" and return it.
	 *
	 *	@constructs Row	 
	 *	@method
	 *	@public 
	 */	
	newMultiple: function() {
		"use strict";
		var aNewArtefact = Object.create( this );
		
		aNewArtefact.rowPrototype( "multiple" );
		return aNewArtefact;
	},
	
	/**
	 * 	Clone the Row object, set the rowPrototype to "twoicon" and return it.
	 *
	 *	@constructs Row	 
	 *	@method
	 *	@public 
	 */	
	newTwoIcon: function() {
		"use strict";
		var aNewArtefact = Object.create( this );
		
		aNewArtefact.rowPrototype( "twoicon" );
		return aNewArtefact;
	},
	
	/**
	 * 	Clone the Row object, set the rowPrototype to "threeicon" and return it.
	 *
	 *	@constructs Row	 
	 *	@method
	 *	@public 
	 */	
	newThreeIcon: function() {
		"use strict";
		var aNewArtefact = Object.create( this );
		
		aNewArtefact.rowPrototype( "threeicon" );
		return aNewArtefact;
	},
	
	/**
	 * 	Clone the Row object, set the rowPrototype to "fouricon" and return it.
	 *
	 *	@constructs Row	 
	 *	@method
	 *	@public 
	 */	
	newFourIcon: function() {
		"use strict";
		var aNewTryme = Object.create( this );
		
		aNewTryme.rowPrototype( "fouricon" );
		//aNewTryme.artefactHyperlink( "" ).artefactHyperlinkTitle( "" ).fileLinksArray
		return aNewTryme;
	},	
	
	/**
	 * 	Clone the Row object and then populate it with data from a JSON string.
	 *
	 *	@constructs Row
	 *	@method
	 *	@public
	 *	@param {string} anInput - A JSON string describing a Row.
	 */		
	newFromJSON: function( anInput ) {
		"use strict";
		
		var jsonObj;
		
		// Box newFromJSON feeds me an object, but logically it should be a string. Should I stringify before passing?
		if ( ( typeof anInput === "string" ) || anInput instanceof String ) {
			jsonObj = JSON.parse( anInput );
		}
		else if ( typeof anInput === "object" ) {
			jsonObj = anInput;
		}
		
		var aNewRow = this.new( jsonObj.rowPrototype );
		
		// The might be an easier way to structure this. Maybe use if else instead of switch? Switch is probably clearer but lot's of redundant code. Sorry.
		
		switch ( jsonObj.rowPrototype ) {
			case "header":
				aNewRow.columnHeadings( jsonObj.headings );
				break;
				
			case "artefact":
				aNewRow.iconClass( jsonObj.iconClass );
				aNewRow.artefactTitle( jsonObj.artefactTitle );
				aNewRow.artefactSubTitle( jsonObj.artefactSubTitle );
				aNewRow.artefactURL( jsonObj.artefactURL );
				aNewRow.artefactURLTitle( jsonObj.artefactURLTitle );
				aNewRow.artefactURLNewWindow( jsonObj.artefactURLNewWindow );				
				aNewRow.summaryParagraph( jsonObj.summaryParagraph );
				break;
				
			case "multiple":
				var tuple;
				aNewRow.iconClass( jsonObj.iconClass );
				aNewRow.artefactTitle( jsonObj.artefactTitle );
				aNewRow.artefactSubTitle( jsonObj.artefactSubTitle );
				
				// Deleting the 4 default tuples and adding as appropriate from JSON
				aNewRow.deleteMultipleTuple( 4 );
				for ( var i = 0; i < jsonObj.files.length; i++ ) {
					
					// Build the tuple
					tuple  = jsonObj.files[i].fileName + "|";
					tuple += jsonObj.files[i].fileSize + "|";
					tuple += jsonObj.files[i].fileLink + "|";
					tuple += jsonObj.files[i].fileLinkTitle + "|";
					if ( jsonObj.files[i].fileLinkNewWindow ) {
						tuple += "true";
					}
					else {
						tuple += "false";
					}
					
					// Add the tuple
					aNewRow.addMultipleTuple( tuple );
				}
				break;
				
			case "twoicon":
			case "threeicon":
			case "fouricon":
				var subProto;
				if ( jsonObj.rowPrototype === "twoicon" ) {
					subProto = 2;
				}
				else if ( jsonObj.rowPrototype === "threeicon" ) {
					subProto = 3;
				}
				else {
					subProto = 4;
				}
				
				aNewRow.iconClass( jsonObj.iconClass );
				aNewRow.artefactTitle( jsonObj.artefactTitle );
				aNewRow.artefactSubTitle( jsonObj.artefactSubTitle );
				aNewRow.summaryParagraph( jsonObj.summaryParagraph );
				for ( var j = 0; j < subProto; j++ ) {
					aNewRow.trymeIconArray( j, jsonObj.trymes[j].icon );
					aNewRow.trymeTitleArray( j, jsonObj.trymes[j].title );
					aNewRow.trymeSubTitleArray( j, jsonObj.trymes[j].subTitle );
					aNewRow.trymeLinkArray( j, jsonObj.trymes[j].link );
					aNewRow.trymeLinkTitleArray( j, jsonObj.trymes[j].linkTitle );
					if ( jsonObj.trymes[j].linkNewWindow ) {
						aNewRow.trymeLinkNewWindowArray( j, true);
					}
					else {
						aNewRow.trymeLinkNewWindowArray( j, false);
					}
				}
				break;
			
			default:
				throw new SyntaxError( "Unrecognised Row prototype in imported JSON file." );
		}
		
		return aNewRow;
	},
	
	//----- OUTPUT: JSON -----//	
	
	/**
	 * 	Get a JSON string describing the Row.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */
	getJSON: function() {
		"use strict";
		
		var thePrototype = this.rowPrototype();

		switch ( thePrototype ) {
			case "header":
				return this.getHeaderJSON();
			
			case "artefact":
				return this.getArtefactJSON();
				
			case "multiple":
				return this.getMultipleJSON();
				
			case "twoicon":
				return this.getTrymeJSON( 2 );
				
			case "threeicon":
				return this.getTrymeJSON( 3 );	
				
			case "fouricon":
				return this.getTrymeJSON( 4 );				
		}
		
		return '{"invalid-prototpye"}';				
	},
	
	/**
	 * 	Get a JSON string describing the Row as if it were a "header".
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getHeaderJSON: function() {		
		"use strict";
		
		var jsonstring = "";

		
		// Add row attributes
		jsonstring += '"rowPrototype":"header", ';
		jsonstring += '"headings":["' + this.sidebarHeading() + '","' + this.contentHeading() + '"]';
		
		jsonstring = "{ " + jsonstring + " }";
		return jsonstring;
	},
	
	/**
	 * 	Get a JSON string describing the Row as if it were an "artefact".
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getArtefactJSON: function( ) {
		"use strict";
		
		var jsonstring = "";	
		
		// Add row attributes
		jsonstring += '"rowPrototype":"artefact", ';
		jsonstring += '"iconClass":"' + this.iconClass() + '", ';
		jsonstring += '"artefactTitle":"' + this.artefactTitle() + '", ';
		if ( this.hasArtefactSubTitle() ) {
			jsonstring += '"artefactSubTitle":"' + this.artefactSubTitle() + '", ';
		}
		if ( this.hasArtefactHyperlink() ) {
			jsonstring += '"artefactURL":"' + this.artefactURL() + '", ';
			if ( this.hasArtefactURLTitle() ) {
				jsonstring += '"artefactURLTitle":"' + this.artefactURLTitle() + '", ';
			}
			jsonstring += '"artefactURLNewWindow":' + this.artefactURLNewWindow() + ', ';				
		}
		jsonstring += '"summaryParagraph":"' + this.summaryParagraph() + '"';
		
		jsonstring = "{ " + jsonstring + " }";		
		return jsonstring;
	},
	
	/**
	 * 	Get a JSON string describing the Row as if it were a "multiple" Row.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getMultipleJSON: function( ) {
		"use strict";
		
		var jsonstring = "";
		
		// Add row attributes
		jsonstring += '"rowPrototype":"multiple", ';
		jsonstring += '"iconClass":"' + this.iconClass() + '", ';
		jsonstring += '"artefactTitle":"' + this.artefactTitle() + '", ';
		if ( this.hasArtefactSubTitle() ) {
			jsonstring += '"artefactSubTitle":"' + this.artefactSubTitle() + '", ';
		}	
		
		jsonstring += '"files":[ ';
		var theFileNamesArray = this.fileNamesArray();
		var theFileSizesArray = this.fileSizesArray();
		var theFileLinksArray = this.fileLinksArray();
		var theFileLinksTitlesArray = this.fileLinksTitleArray();
		var theFileLinksNewWindowArray = this.fileLinksNewWindowArray();
		var n = theFileNamesArray.length;
		
		for ( var i = 0; i < n; i++ ) {
			jsonstring += '{ "fileName":"' + theFileNamesArray[i] + '", ';
			jsonstring += '"fileSize":"' + theFileSizesArray[i] + '", ';
			jsonstring += '"fileLink":"' + theFileLinksArray[i] + '", ';
			jsonstring += '"fileLinkNewWindow":' + theFileLinksNewWindowArray[i] + ', ';
			jsonstring += '"fileLinkTitle":"' + theFileLinksTitlesArray[i] + '" }, ';			
		}
		
		// Strip off the last comma
		jsonstring = jsonstring.substring( 0, jsonstring.length - 2 );
	
		jsonstring += ' ]';
	
		jsonstring = "{ " + jsonstring + " }";
		return jsonstring;
	},
		
	/**
	 * 	Get a JSON string describing the Row as if it were a "twoicon", "threeicon" or "fouricon" Row.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */		
	getTrymeJSON: function( aSubPrototype ) {
		"use strict";
		
		var jsonstring = "";
		
		jsonstring += '"rowPrototype":';
		
		switch ( aSubPrototype ) {
			case 2:
				jsonstring += '"twoicon", ';
				break;
			case 3:
				jsonstring += '"threeicon", ';
				break;
			default:
				jsonstring += '"fouricon", ';				
		}
		
		jsonstring += '"iconClass":"' + this.iconClass() + '", ';
		jsonstring += '"artefactTitle":"' + this.artefactTitle() + '", ';
		if ( this.hasArtefactSubTitle() ) {
			jsonstring += '"artefactSubTitle":"' + this.artefactSubTitle() + '", ';
		}		
		jsonstring += '"summaryParagraph":"' + this.summaryParagraph() + '", ';
		
		jsonstring += '"trymes":[ ';
		
		// Draw the tryme boxes
		var links      = this.trymeLinkArray();
		var linkTitles = this.trymeLinkTitleArray();
		var titles     = this.trymeTitleArray();
		var subtitles  = this.trymeSubTitleArray();
		var icons      = this.trymeIconArray();
		var newWindows = this.trymeLinkNewWindowArray();
		
		for( var i = 0; i < aSubPrototype; i++ ) {
			jsonstring += '{ "title":"' + titles[i] + '", ';
			jsonstring += '"subTitle":"' + subtitles[i] + '", ';
			jsonstring += '"icon":"' + icons[i] + '", ';
			jsonstring += '"link":"' + links[i] + '", ';			
			jsonstring += '"linkTitle":"' + linkTitles[i] + '", ';
			jsonstring += '"linkNewWindow":' + newWindows[i] + ' }, ';
		}
		
		// Strip off the last comma
		jsonstring = jsonstring.substring( 0, jsonstring.length - 2 );
		
		jsonstring += " ]";
		
		jsonstring = "{ " + jsonstring + " }";
		return jsonstring;		
		
	},	
	
	//----- OUTPUT: HTML -----//		
	
	/**
	 * 	Get the HTML to construct this Row.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} The HTML of this Row.
	 */		
	getHTML: function() {
		"use strict";
		
		var thePrototype = this.rowPrototype();
		
		switch ( thePrototype ) {
			case "header":
				return this.getHeaderHTML();
			
			case "artefact":
				return this.getArtefactHTML();
				
			case "multiple":
				return this.getMultipleHTML();
				
			case "twoicon":
				return this.getTrymeHTML( 2 );
				
			case "threeicon":
				return this.getTrymeHTML( 3 );	
				
			case "fouricon":
				return this.getTrymeHTML( 4 );				
		}
		
		return "<!-- Error: No Row Prototype Exists. -->";
	},
	
	/**
	 * 	Get the HTML to construct the Row as if it were a "header".
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getHeaderHTML: function() {
		"use strict";
		
		var generatedRow = "";
		
		generatedRow += "<!-- Row: Column Headers -->\n";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-overlay ";
		generatedRow += FRAMEWORK_PREFIX + "-box-row-header ui-state-default\" ";
		generatedRow += "id=\"" + this.identifier() + "\">\n";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-sidebar text-center\">\n";
		generatedRow += "<h5 class=\"isEditable\">";
		generatedRow += this.leftColumnHeading();
		generatedRow += "</h5></div>";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-content text-center\">\n";		
		generatedRow += "<h5 class=\"isEditable\">";
		generatedRow += this.rightColumnHeading();
		generatedRow += "</h5></div>";
		
		generatedRow += this.getClearDivHTML();
		generatedRow += "</div>\n";

		return generatedRow;			
	},
	
	/**
	 * 	Get the HTML to construct the Row as if it were an "artefact".
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */		
	getArtefactHTML: function() {
		"use strict";
		
		var generatedRow = "";
		var theTitle = "";
		
		generatedRow += "<!-- Row: Icon & Description -->\n";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-overlay ";
		generatedRow += FRAMEWORK_PREFIX + "-box-row-artefact ";		
		generatedRow += FRAMEWORK_PREFIX + "-box-row-content ui-state-default\" ";
		generatedRow += "id=\"" + this.identifier() + "\">\n";	
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-sidebar text-center\">\n";	
		generatedRow += "<p>";
		
		if ( this.hasArtefactURLTitle() ) {
			theTitle = this.artefactURLTitle();
		}
		
		if ( this.hasIconClass() ) {
			if ( this.hasArtefactURL() ) {
				generatedRow += "<a href=\"" + this.artefactURL() + "\" target=\"_blank\" class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon\"";
				if ( theTitle.length > 0 ) {
					generatedRow += " title=\"" + theTitle + "\"";
				}
				if ( this.hasArtefactURLNewWindow() ) {
					generatedRow += " target=\"_blank\"";
				}				
				generatedRow += ">\n";
			} 
			else {
				generatedRow += "<span class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon\">\n";
			}
			
			generatedRow += "<i aria-hidden=\"true\" class=\"fa ";
			generatedRow += this.iconClass();
			generatedRow += " fa-2x\"></i>\n";
			
			if ( this.hasArtefactURL() ) {
				generatedRow += "</a>\n";
			}
			else {
				generatedRow += "</span>\n";
			}
			
			generatedRow += "<br>\n";
		}
		
		if ( this.hasArtefactTitle() ) {
			if ( this.hasArtefactURL() ) {
				generatedRow += "<a href=\"" + this.artefactURL() + "\" target=\"_blank\" class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-title isEditable\"";
				if ( theTitle.length > 0 ) {
					generatedRow += " title=\"" +theTitle + "\" ";
				}
				if ( this.hasArtefactURLNewWindow() ) {
					generatedRow += " target=\"_blank\"";
				}					
				generatedRow += ">\n";
			}
			else {
				generatedRow += "<span class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-title isEditable\">";
			}
			
			generatedRow += this.artefactTitle();
			
			if ( this.hasArtefactURL() ) {
				generatedRow += "</a>\n";
			}
			else {
				generatedRow += "</span>\n";
			}
			
			generatedRow += "<br>\n";
		}
		
		if ( this.hasArtefactSubTitle() ) {
			generatedRow += "<i class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-filesize isEditable\">" + this.artefactSubTitle() + "</i>\n";
		}
		generatedRow += "</p>\n</div>";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-content\">\n";
		generatedRow += "<p class=\"isEditable\">";
		generatedRow += this.summaryParagraph();
		generatedRow += "</p>\n</div>\n";
		
		generatedRow += this.getClearDivHTML();
		generatedRow += "</div>\n";

		return generatedRow;		
	},
	
	/**
	 * 	Get the HTML to construct the Row as if it were a "mulitple" Row.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getMultipleHTML: function() {
		"use strict";
		
		var generatedRow = "";
		
		generatedRow += "<!-- Row: Icon & List Box -->\n";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-overlay ";
		generatedRow += FRAMEWORK_PREFIX + "-box-row-multiple ";		
		generatedRow += FRAMEWORK_PREFIX + "-box-row-content ui-state-default\" ";
		generatedRow += "id=\"" + this.identifier() + "\">\n";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-sidebar text-center\">\n";	
		if ( this.hasIconClass() ) {
			generatedRow += "<span class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon\">\n";
			generatedRow += "<i aria-hidden=\"true\" class=\"fa ";
			generatedRow += this.iconClass();
			generatedRow += " fa-2x\"></i>\n</span>\n";
			
			generatedRow += "<br>\n";
		}	
		if ( this.hasArtefactTitle() ) {
			generatedRow += "<span class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-title isEditable\">";
			generatedRow += this.artefactTitle();
			generatedRow += "</span>\n";
			generatedRow += "<br>\n";
		}
		generatedRow += "</div>\n";
		
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-content\">\n";
		generatedRow += "<ul class=\"" + FRAMEWORK_PREFIX + "-box-multi-list\">\n";
		
		var theFileNamesArray = this.fileNamesArray();
		var theFileSizesArray = this.fileSizesArray();
		var theFileLinksArray = this.fileLinksArray();
		var theFileLinksTitlesArray = this.fileLinksTitleArray();
		var theFileLinksNewWindowArray = this.fileLinksNewWindowArray();
		var n = theFileNamesArray.length;
		
		for ( var i = 0; i < n; i++ ) {
			generatedRow += "<li>\n";
			generatedRow += "<a href=\"" + theFileLinksArray[i] + "\" class=\"isEditable\"";
			if ( theFileLinksTitlesArray[i] !== "" ) {
				generatedRow += " title=\"" + theFileLinksTitlesArray[i] + "\"";
			}
			if ( theFileLinksNewWindowArray[i] ) {
				generatedRow += " target=\"_blank\"";
			}
			generatedRow += ">" + theFileNamesArray[i] + "</a>\n";
			generatedRow += "<span class=\"details isEditable\">(" + theFileSizesArray[i] +")</span>\n";
			generatedRow += "</li>\n";
		}
		generatedRow += "</ul>\n</div>\n";
		
		generatedRow += this.getClearDivHTML();
		generatedRow += "</div>\n";

		return generatedRow;			
	},
	
	/**
	 * 	Get the HTML to construct the Row as if it were a "twoicon", "threeicon" or "fouricon" Row.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getTrymeHTML: function( aSubPrototype ) {
		"use strict";
		
		var generatedRow = "";
		
		// Draw the comment
		generatedRow += "<!-- Row: TryMe " + aSubPrototype + " Icons -->\n";
		
		// Draw the outer box
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-shade-overlay ";
		
		switch ( aSubPrototype ) {
			case 2:
				generatedRow += FRAMEWORK_PREFIX + "-box-row-twoicon ";
				break;
			case 3:
				generatedRow += FRAMEWORK_PREFIX + "-box-row-threeicon ";
				break;
			default:
				generatedRow += FRAMEWORK_PREFIX + "-box-row-fouricon ";				
		}
		generatedRow += FRAMEWORK_PREFIX + "-box-row-content ui-state-default\" ";
		generatedRow += "id=\"" + this.identifier() + "\">\n";
				
		// Draw the sidebar icon
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-sidebar text-center\">\n";	
		if ( this.hasIconClass() ) {
			generatedRow += "<span class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon\">\n";
			generatedRow += "<i aria-hidden=\"true\" class=\"fa ";
			generatedRow += this.iconClass();
			generatedRow += " fa-2x\"></i>\n</span>\n";
			
			generatedRow += "<br>\n";
		}	
		
		// Draw the sidebar title
		if ( this.hasArtefactTitle() ) {
			generatedRow += "<span class=\"" + FRAMEWORK_PREFIX + "-box-sidebar-artefact-title isEditable\">";
			generatedRow += this.artefactTitle();
			generatedRow += "</span>\n";
			generatedRow += "<br>\n";
		}
		
		// End the sidebar
		generatedRow += "</div>\n";
		generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-content\">\n";
		
		// Draw the summary paragraph
		if ( this.hasSummaryParagraph() ) {
			generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-tryme-paragraph\">\n";
			generatedRow += "<p class=\"isEditable\">";
			generatedRow += this.summaryParagraph();
			generatedRow += "</p>\n</div>\n";			
		}
		
		// Draw the tryme boxes
		var links      = this.trymeLinkArray();
		var linkTitles = this.trymeLinkTitleArray();
		var titles     = this.trymeTitleArray();
		var subtitles  = this.trymeSubTitleArray();
		var icons      = this.trymeIconArray();
		var newWindows = this.trymeLinkNewWindowArray();
		
		console.log(linkTitles);
		
		for( var i = 0; i < aSubPrototype; i++ ) {
			
			// Draw the tryme outer box
			generatedRow += "<div class=\"" + FRAMEWORK_PREFIX + "-box-tryme " + FRAMEWORK_PREFIX + "-box-tryme-";
			switch ( aSubPrototype ) {
				case 2:
					generatedRow += "two";
					break;
				case 3:
					generatedRow += "three";
					break;
				case 4:
					generatedRow += "four";
					break;
				default:
					throw new SyntaxError( "Unrecognised Tryme Subprototype." );
			}
			generatedRow += "\">\n";
			
			// Draw the tryme icon
			generatedRow += "<p>\n";
			generatedRow += "<a href=\"" + links[i] + "\" target=\"_blank\"";
			if ( linkTitles[i] !== "" ) {
				generatedRow += " title=\"" + linkTitles[i] + "\"";
			}
			if ( newWindows[i] ) {
				generatedRow += " target=\"_blank\""; 
			}
			generatedRow += " class=\"" + FRAMEWORK_PREFIX + "-box-tryme-artefact-icon\">\n";
			generatedRow += "<i aria-hidden=\"true\" class=\"fa fa-2x " + icons[i] + "\"></i>\n";
			generatedRow += "</a>\n<br>\n";
			
			// Draw the tryme title and subtitle
			generatedRow += "<a href=\"" + links[i] + "\" target=\"_blank\"";
			if ( linkTitles[i] !== "") {
				generatedRow += " title=\"" + linkTitles[i] + "\"";
			}
			if ( newWindows[i] ) {
				generatedRow += " target=\"_blank\""; 
			}
			generatedRow += " class=\"" + FRAMEWORK_PREFIX + "-box-tryme-artefact-title isEditable\">";
			generatedRow += titles[i] + "</a>\n<br>\n";
			if ( subtitles[i] !== "" ) {
				generatedRow += "<i class=\"" + FRAMEWORK_PREFIX + "-box-tryme-artefact-filesize isEditable\">\n";
				generatedRow += subtitles[i];
				generatedRow += "\n</i>\n";
			}
			
			// End the tryme box
			generatedRow += "</p>\n</div>\n";
		}

		// End the rowtype div
		generatedRow += "</div>\n";
		
		generatedRow += this.getClearDivHTML();
		generatedRow += "</div>\n";

		return generatedRow;		
	},
	
	/**
	 * 	Get the HTML to a clear div - a small div at the end of a Row to correct shading.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string}
	 */	
	getClearDivHTML: function() { 
		"use strict";
		
		var generatedDiv = "";
		
		generatedDiv += "<!-- Clear Div -->\n";
		generatedDiv += "<div class=\"" + FRAMEWORK_PREFIX + "-box-clear-bordered\"";
		
		if ( this.hasCustomColor() ) {
			generatedDiv += " style=\"border-bottom-color: " + this.customColor() + "\"";
		}
		generatedDiv += "></div>\n";
		
		return generatedDiv;
	},
	
	//----- OUTPUT -----//
	
	/**
	 * 	Return the class name. Useful for some polymorphic functions.
	 *
	 *	@method
	 *	@public	 
	 *	@returns {string} "Row".
	 */
	getClassName: function() {
		"use strict";
		return "Row";
	},
	
		/**	@borrows getClassName as class */
		class: function() {
			"use strict";
			return this.getClassName();
		}
	
};
