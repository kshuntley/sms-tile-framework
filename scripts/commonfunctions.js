/**
 * 	@file constants and common functions for all classes
 * 	@author Kenneth "Scott" Huntley kenneth.huntley3@tafensw.edu.au
 *
 * 	@desc I set up the less files so you could change the prefix.
 * 		There's a (slim) chance this could be used for more than
 * 		the SMS project. I'm trying not to lock all my (future) code in to
 * 		that paradigm.
 * 
 * 		I prefer double quotes (") to single quotes ('), and have written
 * 		my code to that standard (for the most part). 
 * 		Yes I know that's weird.
 * 		Yes I know it makes it a hassle when outputting html snippets with
 * 		quotes in them.
 * 		I don't care. Double quotes look right.
 */


//----- CONSTANTS -----//

/**
 * 	@const {string} The prefix for the project
 */
var FRAMEWORK_PREFIX = "sms";


/**
 * 	The size of the image for tiles is dependent upon the layout chosen. This
 * 	object matches layout to width & height, and image location.
 *
 *	@typedef LayoutImageDimentions
 * 	@type {object}
 *	@property {string} layout
 *	@property {number} width
 *	@property {number} height
 *	@property {boolean} top - Image placed on top
 * 	@const {LayoutImageDimensions[]}
*/
var LAYOUT_IMAGE_DIMENSIONS = {
	"layout-portrait":     { "width": 150, "height": 100, "top": true  },
	"layout-portrait-200": { "width": 150, "height": 100, "top": true  },
	"layout-portrait-220i":{ "width": 200, "height": 132, "top": false },
	"layout-portrait-160": { "width": 132, "height": 89,  "top": true  },
	"layout-portrait-192": { "width": 160, "height": 107, "top": true  },
	"layout-portrait-216": { "width": 180, "height": 120, "top": true  },
	"layout-portrait-240": { "width": 200, "height": 134, "top": true  },
	"layout-portrait-270": { "width": 224, "height": 152, "top": true  },
	"layout-portrait-220": { "width": 150, "height": 145, "top": false },
	"layout-hero-tile":    { "width": 400, "height": 300, "top": true  },
	"layout-small-banner": { "width": 400, "height": 160, "top": true  },
	"layout-large-portrait": { "width": 180, "height": 175, "top": false },	
};

/**
 * 	@const {string[]} valid row prototypes
 */
var ROW_PROTOTYPES = [ "generic", "header", "artefact", "multiple", "twoicon", "threeicon", "fouricon" ];

/**
 * 	@const {string} the prefix added to id attributes for rows in a box
 */
var ROW_IDENTIFIER_PREFIX = "box-builder-row";

/**
 * 	@const {string} the prefix added to id attributes for buttons
 */
var BTN_IDENTIFIER_PREFIX = "btn";

/**
 * 	@const {string} the prefix added to id attributes for menu items
 */
var MENU_IDENTIFIER_PREFIX = "menu-item";


//----- HELPER FUNCTIONS -----//

/** 
 * 	Swaps an old prefix with a new one.
 * 	Heavily influenced by https://gist.github.com/carloscabo/e0374676c614dd6e6ea19ad4b9ecf9a4
 *
 * 	The form has been written using the sms- prefix. This function will swap all those prefixes
 * 	for another defined prefix.
 *
 * 	Usage - Add this to the doc.ready function:
 *
 *		swapClassPrefix( "sms" , "aNewPrefix" );
 *	
 * 	Ex:
 *		(We might want to include a check first to see if necessary)
 *		if ( FRAMEWORK_PREFIX !== "sms" ) {
 *			swapClassPrefix( "sms" , FRAMEWORK_PREFIX );
 *		}
 * 
 *	@function swapClassPrefix
 * 	@param {string} old_prefix - The old prefix being swapped out. Probably "sms".
 * 	@param {string} new_prefix - The new prefix replacing the old.
 * 	@return {null}
 *
 */
function swapClassPrefix ( old_prefix, new_prefix ) {
	"use strict";
	$( "[class|='sms']" ).each( function() {
		var classes = $( this ).attr( "class" ).split(" ");
		var new_class;
		var regex = new RegExp(old_prefix);

		for ( var i = 0; i < classes.length; i++ ) {
			if ( regex.test( classes[i] ) ) {
				new_class = classes[i].replace( old_prefix, new_prefix );
				$( this ).addClass( new_class ).removeClass( classes[i] );
			}
		}
	});	

}

/**
 * 	Add framework prefix to a string
 *
 *	@function addPrefix
 * 	@param {string} prop - A string (HTML property?) to which you're adding the prefix.
 * 	@return {string} A string with the prefix attached
 */
function addPrefix( prop ) {
	"use strict";
	return FRAMEWORK_PREFIX + "-" + prop;
}

/**
 * 	Remove the framework prefix from a string
 *
 *	@function removePrefix
 * 	@param {string} prop - A string (HTML property?) to which you're removing the prefix.
 * 	@return {string} A string without the prefix attached
 */
function removePrefix( prop ) {
	"use strict";
	return prop.replace( FRAMEWORK_PREFIX + "-", "" );
}

/**
 *	This function will copy a given node to the clipboard.
 *
 *	@function
 * 	@param {string} anElement - The node in the DOM from which you are copying the contents.
 * 	@param {string} replacement - What you want it replaced with. 
 * 	@return {string} A string with all the "foos" swapped for "bars".
 */
function copyToClipboard( anElement, aClassName ) {
	"use strict";
	
	var beginComment;
	var endComment;
	if ( ( aClassName === undefined ) || ( aClassName === null ) ) {
		beginComment = "<!-- START SNIPPET -->\n";
		endComment = "<!-- END SNIPPET -->\n\n";
	}
	else {
		beginComment = "<!-- START " + aClassName.toUpperCase() + " -->\n";
		endComment = "<!-- END " + aClassName.toUpperCase() + " -->\n\n";
	}
	
	var $temp = $( "<textarea>" );
	$( "body" ).append( $temp );
	var x = $( anElement ).html().trim().replaceAll( "<", "<" ).replaceAll( ">", ">\n" );
	x = beginComment + x + endComment;
	$temp.val(x).select();
	document.execCommand( "copy" );
	$temp.remove();
}

/**
 *	Just a quick function to get the date in ddmmyy format.
 *
 *	@function
 * 	@return {string} A string with the date in a ddmmyy format.
 */
function getDatestamp() {
	"use strict";
	var today = new Date();
	var dd = ( "0" + today.getDate() ).slice( -2 );
	var mm = ( "0" + ( today.getMonth() + 1) ).slice( -2 );
	var yy = today.getFullYear().toString().slice( -2 );
	return ( dd + mm + yy);
}

//----- HELPER FUNCTIONS: Extending the String Prototype -----//

/**
 * 	The String method .replace() only replaces the first needle in the
 * 	haystack. This will replace all needles.
 *
 *	@function replaceAll
 * 	@param {string} search - The text you want to replaced.
 * 	@param {string} replacement - What you want it replaced with. 
 * 	@return {string} A string with all the "foos" swapped for "bars".
 */
String.prototype.replaceAll = function( search, replacement ) {
	"use strict";
	var target = this;
	return target.replace( new RegExp(search, 'g'), replacement );
};

/**
 * 	Takes a sentence, drops it to lowercase, no punctuation, with hyphens between 
 * 	words. Useful for creating ids, classes, etc.
 *
 *	@function toLowerHyphenated
 *	@param 
 * 	@return {string}
 */
String.prototype.toLowerHyphenated = function() {
	"use strict";
	var newstring = this;
	return newstring.toLowerCase.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim().split(" ").join("-");
};

//----- HELPER FUNCTIONS: Extending jQuery -----//

/**
 *	An extentsion to jquery that allows the toggling of disabled.
 *	i.e. will make a disabled element enabled and vice versa.
 *
 *	@function toggleDisabled
 *
 */
(function($) {
	"use strict";
	$.fn.toggleDisabled = function() {
		return this.each(function() {
			this.disabled = !this.disabled;
		});
	};
})(jQuery);	

//----- HELPER FUNCTIONS: Extending CSS hooks -----//

/**
 *	This function returns a hexadecimal string from a decimal value
 *
 *	@function hex
 * 	@param {number} x - A number between 0 and 255.
 * 	@return {string} A string representing that number in hexadecimal notation.
 */
function hex( x ) {
	"use strict";
	return ( "0" + parseInt( x ).toString( 16 ) ).slice(-2);
}


/**
 *	This function returns the background-color CSS property as HEX instead of RGB.
 *	Required for the webaim api
 *
 *	@function
 * 	@param {element} elem - The node in the DOM from which you want the background colour.
 * 	@return {string} A string representing a colour in hexadecimal notation.
 */
$.cssHooks.backgroundColor = {
	get: function( elem ) {
		"use strict";
		var bg;
		if ( elem.currentStyle ) {
			bg = elem.currentStyle[ "backgroundColor" ];
		} 
		else if ( window.getComputedStyle ) {
			bg = document.defaultView.getComputedStyle( elem, null ).getPropertyValue( "background-color" );
		}
		if ( bg.search( "rgb" ) === -1 ) {
			return bg;
		} 
		else {
			bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + hex( bg[1] ) + hex( bg[2 ]) + hex( bg[3] );
		}
	}
};

/**
 *	This function returns the color CSS property as HEX instead of RGB.
 *	Required for the webaim api
 *
 *	@function
 * 	@param {element} elem - The node in the DOM from which you want the colour.
 * 	@return {string} A string representing a colour in hexadecimal notation.
 */
$.cssHooks.color = {
	get: function( elem ) {
		"use strict";
		var bg;
		if ( elem.currentStyle ) {
			bg = elem.currentStyle["color"];
		} 
		else if (window.getComputedStyle) {
			bg = document.defaultView.getComputedStyle( elem, null ).getPropertyValue( "color" );
		}
		if ( bg.search( "rgb" ) === -1) {
			return bg;
		}
		else {
			bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + hex( bg[1] ) + hex( bg[2] ) + hex( bg[3] );
		}
	}
};

// This might go...
// Convert a Tile to inline styles
function runInlineConverter() {
		"use strict";			
		var topVal = $('#wrapper .sms-tile').css("top");
		var leftVal = $('#wrapper .sms-tile').css("left");

		computedStyleToInlineStyle(document.querySelector("#wrapper .sms-tile"), {
			recursive: true,
			properties: ["background-color", "box-shadow", "-moz-box-shadow", "-webkit-box-shadow", "box-sizing", "-moz-box-siding", "-webkit-box-sizing", "color", "display", "float", "font-weight", "font-size", "height", "line-height", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "position", "top", "right", "bottom", "left", "width", "z-index"]
		});

		// Strip float, top, bottom, left, right and float from .sms-tile inline style
		var firstStyle = $('#wrapper .sms-tile').attr("style");
		var firstStyleArr = firstStyle.split(";");
		var newStyleArr = [];

		for (var i = 0; i < firstStyleArr.length; i++) {
			// Get rid of floats, tops, lefts, bottoms and rights
			firstStyleArr[i] = firstStyleArr[i].trim();


			if (!(firstStyleArr[i].startsWith("float:"))) {
				if (!(firstStyleArr[i].startsWith("top:"))) {
					if (!(firstStyleArr[i].startsWith("left:"))) {
						if  (!(firstStyleArr[i].startsWith("bottom:"))) {
							if (!(firstStyleArr[i].startsWith("right:"))) {
								newStyleArr.push(firstStyleArr[i]);						
							}
						}
					}
				}
			}
		}

		// Build a new style attribute for the first element
		firstStyle = newStyleArr.join("; ");

		// Put the style attribute back
		$('#wrapper .sms-tile').attr("style", firstStyle);



		displayTileOutput();
		inlineBool = true;

		// Sneak the float, left and top back into the display
		$('#wrapper').children('div').css({"float": "left", "top": topVal, "left": leftVal});

		return;
	}

//----- HELPER FUNCTIONS: theModel UI functions -----//

/**
 *	Redraw the display in #wrapper and in #output.
 *	Works if theModel is Tile, Box, ButtonRow or Menu.
 *	Candidate method for a superclass.
 *
 *	@function
 *	@param {string} [aPreviewElement="#wrapper"] - the selector for the element where the display will appear.
 *	@param {string} [aCodeOutputElement="#output"] - the seletor for the element where the HTML will appear.
 * 	@return {null}
 */
function updateDisplay( aPreviewElement, aCodeOutputElement ) {
	"use strict";
	var generated;
	
	// Generate a Tile, Box, Button Row or Menu
	if ( !( ( theModel === undefined ) || ( theModel === null ) ) ) {
		generated = theModel.getHTML();
	}
	else {
		generated = "<div><span class='text-danger'>Error: No Builder Object Exists</div>";
	}	
	
	// Set the preview if unspecified
	if ( !( (aPreviewElement === undefined ) || ( aPreviewElement === null ) ) ) {
		aPreviewElement = "#wrapper";
	}
	
	// Set the output if unspecified
	if ( !( ( aCodeOutputElement === undefined ) || ( aCodeOutputElement === null ) ) ) {
		aCodeOutputElement = "#output";
	} 		

	$( "#wrapper" ).html( generated );
	$( "#output" ).text( generated );
	
	// Hack to remove empty class attributes. Doesn't affect code, just make less ugly	
	// Literally select all elements that have a class attribute with an empty property and remove the class attribute from that element.
	$( '[class=""]' ).removeAttr("class"); 	
}

/**
 *	Show/Hide each config panel.
 *
 *	@function
 *	@example
 *		toggleConfig( "configurable-ribbon configurable-custom-color configurable-image" )
 *	@param {string} [aString] - a string of classes to toggle. If not specified, any element with a class of "configurable" will be toggled.
 * 	@return {null}
 */
function toggleConfig( aString ) {
	"use strict";
	
	if ( ( aString === null ) || ( aString.length = 0) ) {
		// If empty string, toggle all configurables
		$( ".configurable" ).slideToggle( 200 );
	
	} else {
		
		var configClasses = aString.split( " " );

		configClasses.forEach( function( aConfig ) {
			$( "." + aConfig ).slideToggle( 200 );
		});
	} 
}

//----- TILE BUILDER APPLICATION FUNCTIONS -----//

/**
 *	Take the contents of #wrapper and make it available to the clipboard. Display the copied modal.
 *
 *	@function
 * 	@return {null}
 */
$( ".copyFunc" ).click( function() {
	"use strict";
	copyToClipboard( "#wrapper" );
	$( "#copiedModal" ).modal();
});

/**
 *	Convert the contents of #wrapper to have inline css styles. Display the copied modal.
 *
 *	@function
 * 	@return {null}
 */
$( ".convertFunc" ).click( function() {
	"use strict";
	// theModel.inlineConverter(); // This calls tileInlineConverter() from Tile object, or boxInlineConverter() from Box.
	// Include tileInlineConverter() in tileui.js
	
	tileInlineConverter(); // Will need to polymorphise this... getModel and then call appropriate?
	$( "#convertModal" ).modal();		
});

/**
 *	Import HTML of a Tile, Box, Button Row, or Menu into the editor.
 *
 *	@function
 * 	@return {null}
 */
$( ".importFunc" ).click( function() {
	"use strict";
	
	// theModel.import(); // This calls tileImporter() from Tile object, or boxImporter() from Box
	tileImporter();	// See note above
	$( "#importModal" ).modal( 'hide' );	
});

/**
 *	Load a Tile, Box, Button Row, or Menu into the editor.
 *
 *	@function
 * 	@return {null}
 */
$( ".func-load-file" ).click( function(e) {
	"use strict";
	e.preventDefault();
	$( ".func-load-file" ).after( '<input id="tempupload" type="file" style="margin-left:-9999px">' );
	$( "#tempupload" ).click();
	$( "body" ).on("change", "#tempupload", function() {
		"use strict";
		var jsonString;
		var file = this.files[0];
		var reader = new FileReader();

		reader.readAsText(file);
		reader.onloadend = function() {
			jsonString = reader.result;
			theModel = theModel.newFromJSON( jsonString );
			$( "#drawme" ).html( theModel.getHTML() );
			$( "#tempupload" ).remove();
		}	
	});
});

/**
 *	Save a Tile, Box, Button Row, or Menu as a JSON file.
 *
 *	@function
 * 	@return {null}
 */
$( ".func-save-file" ).click( function() {
	"use strict";
	
	var jsonData = theModel.getJSON();
	var jsonPretty = JSON.stringify( JSON.parse(jsonData), null, '\t' );
	var blob = new Blob( [ jsonPretty ], { type: "application/octet-stream" });
	var url = URL.createObjectURL( blob );
	var filename = theModel.getClassName() + " " + getDatestamp() + ".json";
	
	$( ".func-save-file" ).after( '<a id="templink" download="' + filename + '" href="' + url + '"></a>' );
	$( "#templink" )[0].click();
	$( "#templink" ).remove();
});