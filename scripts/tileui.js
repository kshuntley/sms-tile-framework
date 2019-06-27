// JavaScript Document


// Redraw the Display
function updateDisplay() {
	"use strict";
	var generated;
	
	// Generate a Tile
	if ( ( theModel !== undefined ) || ( theModel !== null ) ) {
		generated = theModel.getHTML();
	} 
	
	// No existing 
	else {
		generated = "<div><span class='text-danger'>Error: No Builder Object Exists</div>";
	}

	$( "#wrapper" ).html( generated );
	$( "#output" ).text( generated );
}


// Show/Hide each config panel (passed as a string of css classes)
// ex. toggleConfig( "configurable-ribbon configurable-custom-color configurable-image" )
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

// Tile UI

// Layout changed
$( ".tile-layout-select" ).change( function() {
	"use strict";
	
	theModel.layout( $( "#form-tile-layout" ).val() );
	updateDisplay();
	checkAim();
});


// Text changed
$( "#form-tile-text-value" ).on( "change keyup paste", function() {
	"use strict";
	
	theModel.text( $( this ).val().replace( /\n/g, "<br>" ) );
	updateDisplay();
});


// Alignment changed
$( ".tile-text-align" ).change( function() {
	"use strict";		
	
	theModel.textAlign( $( ".tile-text-align:checked" ).val() );
	updateDisplay();
});


// Use a URL checked
$( ".tile-url-check" ).change( function() {
	"use strict";		
	
	if ( theModel.hasUrl() ) {
		// It did have a URL, and now it doesn't
		$( "#form-tile-url-0" ).prop( "checked", false );
		$( ".configurable-url" ).slideUp( 200 );
		theModel.hasUrl( false );
	} else {
		// It didn't have a URL, and now it does
		$( "#form-tile-url-0" ).prop( "checked", true );
		$( ".configurable-url" ).slideDown( 200 );
		theModel.hasUrl( true );	
	}
	
	updateDisplay();
});


// URL changed
$( ".tile-url-address" ).on( "change keyup paste", function() {
	"use strict";		
	var newUrl = $( "#form-tile-url-value" ).val();
	if ( newUrl === "" ) { 
		newUrl = "#"; 
	}
	
	theModel.url( newUrl );
	updateDisplay();
});


// URL Title changed
$( ".tile-url-title" ).on( "change keyup paste", function() {
	"use strict";		
	
	theModel.urlTitle( $( "#form-tile-url-title-value" ).val() );
	updateDisplay();
});


// Use a drop shadow checked
$( ".tile-drop-shadow-check" ).change(function() {
	"use strict";
	
	if ( theModel.dropShadow() ) {
		// It did have a Shadow, and now it doesn't
		$( "#form-tile-shadow-0" ).prop( "checked", false );
		theModel.dropShadow( false );
	} else {
		// It didn't have a Shadow, and now it does
		$( "#form-tile-shadow-0" ).prop( "checked", true );
		theModel.dropShadow( true );	
	}
	
	updateDisplay();
});


// Tile Colour selected
$( ".tile-color-select" ).change( function() {
	"use strict";
	
	theModel.color( $( "#form-tile-color" ).val() );
	updateDisplay();
	checkAim();
});


// Use an image checked
$( ".tile-image-check" ).change( function() {
	"use strict";		
	
	if ( theModel.hasImage() ) {
		// It did have an image, and now it doesn't
		$( "#form-tile-image-0" ).prop( "checked", false );
		$( ".configurable-image" ).slideUp( 200 );
		theModel.hasImage( false );
	} else {
		// It didn't have a URL, and now it does
		$( "#form-tile-image-0" ).prop( "checked", true );
		$( ".configurable-image" ).slideDown( 200 );
		theModel.hasImage( true );	
	}
	
	updateDisplay();
});


// Image src changed
$( ".tile-image-src" ).on( "change keyup paste", function() {
	"use strict";		

	theModel.imageSrc( $( "#form-tile-image-url" ).val() );
	updateDisplay();
});


// Image alt changed
$( ".tile-image-alt" ).on( "change keyup paste", function() {
	"use strict";		

	theModel.imageAlt( $( "#form-tile-image-alt" ).val() );
	updateDisplay();
});


// Use a custom colour checked
$( ".tile-custom-check" ).change( function() {
	"use strict";		
	
	if ( theModel.hasCustomColor() ) {
		// It did have a custom color, and now it doesn't
		$( "#form-custom-color-toggle-0" ).prop( "checked", false );
		$( ".configurable-custom-color" ).slideUp( 200 );
		theModel.hasCustomColor( false );
	} else {
		// It didn't have a custom color, and now it does
		$( "#form-custom-color-toggle-0" ).prop( "checked", true );
		$( ".configurable-custom-color" ).slideDown( 200 );
		theModel.hasCustomColor( true );
		
		// Call the spectrum
		
		$( "#form-custom-spectrum" ).spectrum({
			move: function( aColor ) {
				theModel.customColor( aColor.toHexString() );
				updateDisplay();
				checkAim();				
			},
			showInput: true,
			showInitial: true,
			showPalette: true,
			palette: [ ], 
			preferredFormat: "hex",
			clickoutFiresChange: true,
			localStorageKey: "spectrum.homepage",
		});		
	}
	
	updateDisplay();
	checkAim();
});


// Text colour changed
$( ".tile-text-color-radio" ).change( function() {
	"use strict";		
	
	theModel.textColor( $( ".tile-text-color-radio:checked" ).val() );
	updateDisplay();
});


// Font weight changed
$( ".tile-font-weight-radio" ).change( function() {
	"use strict";		
	
	theModel.textWeight( $( ".tile-font-weight-radio:checked" ).val() );
	updateDisplay();
	checkAim();
});


// Font size changed
$( ".tile-font-size-radio" ).change( function() {
	"use strict";		
	
	theModel.textSize( $( ".tile-font-size-radio:checked" ).val() );
	updateDisplay();
	checkAim();
});


// Add a Go Button checked
$( ".tile-gobtn-check" ).change( function() {
	"use strict";
	
	if ( theModel.hasGoBtn() ) {
		// It did have a Shadow, and now it doesn't
		$( "#form-tile-gobtn-0" ).prop( "checked", false );
		$( ".configurable-gobtn" ).slideUp( 200 );		
		theModel.hasGoBtn( false );
	} else {
		// It didn't have a Shadow, and now it does
		$( "#form-tile-gobtn-0" ).prop( "checked", true );
		$( ".configurable-gobtn" ).slideDown( 200 );		
		theModel.hasGoBtn( true );	
	}
	
	updateDisplay();
});


// Image alt changed
$( ".tile-gobtn-value" ).on( "change keyup paste", function() {
	"use strict";		

	theModel.goBtn( $( "#form-tile-gobtn-text" ).val() );
	updateDisplay();
});


function tileInlineConverter() {
	"use strict";
	
	// Get the tile div's styles
	// Constant styles
	var styleString = "margin: 0; padding: 0; display: block; position: relative; " + 
						"box-sizing: border-box; -moz-box-sizing: border-box; " + 
						"-webkit-box-sizing: border-box; ";
	
	// Variable styles
	var styleProps  = $( "." + FRAMEWORK_PREFIX + "-tile" ).css([ "background-color",
																	"box-shadow",
																	"-webkit-box-shadow",
																	"color",
																	"height",
																	"width",
																	"line-height",
																	"font-size"]);
	
	$.each( styleProps, function( prop, value ) {
		styleString += ( prop + ": " + value + "; " );
	});
	
	// Write the tile div's styles
	$( "." + FRAMEWORK_PREFIX + "-tile" ).attr( "style", styleString );	
	
	// Get the tile text's styles
	// Constant styles	
	styleString = "box-sizing: border-box; -moz-box-sizing: border-box; " + 
						"-webkit-box-sizing: border-box; display: block; " +
						" margin: 7px; position: static; ";
	
	styleProps  =  $( "." + FRAMEWORK_PREFIX + "-tile-text" ).css([ "text-align", "font-weight", "height" ]);		
	
	$.each( styleProps, function( prop, value ) {
			styleString += (prop + ": " + value + "; " );
		});
	
	// Write the tile div's styles
	$( "." + FRAMEWORK_PREFIX + "-tile-text" ).attr( "style", styleString );	
	
	
	// Get the tile's img styles
	if ( theModel.hasImg() ) {
	
		styleString = "position: static; right: 0; ";
		if ( theModel.hasImageOnTop() ) {
			styleString += "top: 0; ";
		} else {
			styleString += "bottom: 0; ";
		}

		// Write the tile's img styles
		$( "." + FRAMEWORK_PREFIX + "-tile-img" ).attr( "style", styleString );
	}
	
	// Get the tile's hyperlink styles
	if ( theModel.hasUrl() ) {
	
		// Constant styles
		styleString = "position: absolute; right: 0; top: 0; box-sizing: border-box; " +
						"-moz-box-sizing: border-box; -webkit-box-sizing: border-box; ";
		
		// Variable styles
		styleProps  =  $( "." + FRAMEWORK_PREFIX + "-url" ).css([ "height", "width" ]);
		$.each( styleProps, function( prop, value ) {
			styleString += (prop + ": " + value + "; " );
		});		

		// Write the tile's hyperlink styles
		$( "." + FRAMEWORK_PREFIX + "-url" ).attr( "style", styleString );
	}	
	
	// Get the tile's Go Btn styles
	if ( theModel.hasGoBtn() ) {
	
		// Constant styles
		styleString = "position: absolute; margin: 0; box-sizing: border-box; " +
						"-moz-box-sizing: border-box; -webkit-box-sizing: border-box; ";
		
		// Variable styles
		styleProps  =  $( "." + FRAMEWORK_PREFIX + "-go-btn" ).css([ "padding", 
																 	"right", 
																 	"bottom", 
																 	"font-size", 
																 	"background-color" ]);
		$.each( styleProps, function( prop, value ) {
			styleString += (prop + ": " + value + "; " );
		});		

		// Write the tile's hyperlink styles
		$( "." + FRAMEWORK_PREFIX + "-go-btn" ).attr( "style", styleString );
	}	
	
	$( "#output" ).text( $( "#wrapper" ).html() );
}

function tileImporter() {
	"use strict";
	var inputTile = "";
	var oldWrapper;

	inputTile = $( '#importModal' ).find( '#ImportTextarea' ).val();
	inputTile = inputTile.replace( /<!--[\s\S]*?-->/g, "" ); // Strip out comments
	oldWrapper = $( "#wrapper" ).html(); // Save the old tile


	$( "#wrapper" ).html( inputTile ); // Replace the tile

	// Check if the tile is valid
	if ( !( $( "#wrapper div" ).hasClass( FRAMEWORK_PREFIX + "-tile" ) ) ) {
		$( "#wrapper" ).html( oldWrapper ); // If not, go back to the old tile

	}

	// Undo any configs that might be open
	$( ":checkbox" ).removeAttr( "checked" );
	$( ".configurable" ).slideUp( 200 );


	// Match the tile text to the imported text.
	var importedText = $( "#wrapper .sms-tile-text" ).clone().children().remove().end().text().trim();
	$( "#form-tile-text-value" ).text( importedText );
	theModel.text( importedText );

	// Match the tile URL to the imported URL.
	if ( $( "#wrapper ." + FRAMEWORK_PREFIX + "-url" ).length ) {
		var importedHref = $( "." + FRAMEWORK_PREFIX + "-url" ).attr( "href" );
		$( "#form-tile-url-value" ).text( importedHref );
		theModel.url( importedHref );

		var importedTitle = $( "#wrapper ." + FRAMEWORK_PREFIX + "-url" ).attr( "title" );
		if (typeof importedTitle !== typeof undefined && importedTitle !== false ) {
			$( "#form-tile-url-title-value" ).text( $( "." + FRAMEWORK_PREFIX + "-url" ).attr( "title" ) );
			theModel.urlTitle( importedTitle );
		} 
	} else {
		theModel.hasUrl( false );
	}

	// Check if there's an image
	if ($( "#wrapper img" ).length ) { 
		$( "#form-tile-image-0" ).prop( "checked", true ); // Set the image slide to open
		$( ".configurable-image" ).slideDown( 200 );
		var importedImgSrc = $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile-img" ).attr( "src" );
		var importedImgAlt = $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile-img" ).attr( "alt" );
		$( "#form-tile-image-url" ).val( importedImgSrc ); // Set the img url src tag
		$( "#form-tile-image-alt" ).val( importedImgAlt ); // Set the alt tag

		theModel.hasImage( true ).imageSrc( importedImgSrc ).imageAlt( importedImgAlt );
	} else {
		theModel.hasImage( false );
	}

	// Check if there's a dropshadow
	if ( $( "#wrapper div" ).hasClass( FRAMEWORK_PREFIX + "-shadow" ) ) {
		$( "#form-tile-shadow-0" ).attr( "checked", "checked" );
		theModel.hasDropShadow( true );
	} else {
		theModel.hasDropShadow( false );
	}

	// Check if there's a Go button
	if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-go-btn" ).length ) {
		var importedGoBtn = $( "#wrapper ." + FRAMEWORK_PREFIX + "-go-btn" ).text();
		$( "#form-tile-gobtn-0" ).prop( "checked", true ); // Set the image slide to open
		$( ".configurable-gobtn" ).slideDown( 200 );
		$( "#form-tile-gobtn-text" ).val( importedGoBtn ); // Set the alt tag
		theModel.hasGoBtn( true ).goBtn( importedGoBtn );
	} else {
		theModel.hasGoBtn( false );
	}

	// Check what layout it is
	// Get all the classes for the tile and then match for a class starting with sms-layout-
	var needle = new RegExp( "layout-\\S+", "g" );
	var importedLayout = $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile" ).attr( "class" ).match( needle ).join();
	theModel.layout( importedLayout );

	// Go through the layout options and when finding a matching one, add selected to that option
	$( "#form-tile-layout option" ).each( function() {
		$( this ).removeAttr( "selected" );
		if ( $( this ).attr( "value" ) == importedLayout ) {
			$( this ).attr( "selected", "selected" );
		}
	});

	// Check what colour it is
	// Get all the classes for the tile and then match for a class starting with sms-color-
	needle = new RegExp( "color-\\S+", "g" );
	var importedColor = $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile" ).attr( "class" ).match( needle ).join();
	theModel.color( importedColor );

	// Go through the layout options and when finding a matching one, add selected to that option
	$( "#form-tile-color option" ).each( function() {
		$( this ).removeAttr( "selected" );	
		if ( $( this ).attr( "value" ) === importedColor ) {
			$( this ).attr( "selected", "selected" );
		}
	});		

	// Check what the alignment is
	// See if there's a text-right or text-center class in the sms-tile-text class, and if so check appropriate
	if ( $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile-text.text-center" ).length ) {
		$( "#form-tile-text-align-0" ).prop( "checked", false );
		$( "#form-tile-text-align-2" ).prop( "checked", false );			
		$( "#form-tile-text-align-1" ).prop( "checked", true );
		theModel.textAlign( "text-center" );

	} else if ( $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile-text.text-right" ).length ) {
		$( "#form-tile-text-align-0" ).prop( "checked", false );
		$( "#form-tile-text-align-1" ).prop( "checked", false );			
		$( "#form-tile-text-align-2" ).prop( "checked", true );
		theModel.textAlign( "text-right" );			

	} else {
		$( "#form-tile-text-align-1" ).prop( "checked", false );
		$( "#form-tile-text-align-2" ).prop( "checked", false );			
		$( "#form-tile-text-align-0" ).prop( "checked", true );	
		theModel.textAlign( "text-left" );			
	}

	// Light vs Dark
	// See if there's a sms-text-light or sms-text-dark class in the tile, and if so check appropriate

	if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-text-dark" ).length ) {
		$( "#form-tile-text-color-0" ).prop( "checked", false );	
		$( "#form-tile-text-color-1" ).prop( "checked", true );
		theModel.textColor( FRAMEWORK_PREFIX + "-text-dark" );

	} else {
		$( "#form-tile-text-color-0" ).prop( "checked", true );
		$( "#form-tile-text-color-1" ).prop( "checked", false );
		theModel.textColor( FRAMEWORK_PREFIX + "-text-light" );			
	}	

	// Set the text size
	// See if there's a text-right or text-center class in the sms-tile-text class, and if so check appropriate
	if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-text-big" ).length ) {
		$( "#form-tile-text-size-0" ).prop( "checked", false );
		$( "#form-tile-text-size-1" ).prop( "checked", true );			
		$( "#form-tile-text-size-4" ).prop( "checked", false );
		$( "#form-tile-text-size-2" ).prop( "checked", false );
		$( "#form-tile-text-size-3" ).prop( "checked", false );
		theModel.textSize( FRAMEWORK_PREFIX + "-text-big" );

	} else if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-text-very-big" ).length ) {
		$( "#form-tile-text-size-0" ).prop( "checked", false );
		$( "#form-tile-text-size-1" ).prop( "checked", false );			
		$( "#form-tile-text-size-4" ).prop( "checked", true );
		$( "#form-tile-text-size-2" ).prop( "checked", false );
		$( "#form-tile-text-size-3" ).prop( "checked", false );	
		theModel.textSize( FRAMEWORK_PREFIX + "-text-very-big" );			

	} else if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-text-small" ).length ) {
		$( "#form-tile-text-size-0" ).prop( "checked", false );
		$( "#form-tile-text-size-1" ).prop( "checked", false );			
		$( "#form-tile-text-size-4" ).prop( "checked", false );
		$( "#form-tile-text-size-2" ).prop( "checked", true );
		$( "#form-tile-text-size-3" ).prop( "checked", false );
		theModel.textSize( FRAMEWORK_PREFIX + "-text-small" );

	} else if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-text-very-small" ).length ) {
		$( "#form-tile-text-size-0" ).prop( "checked", false );
		$( "#form-tile-text-size-1" ).prop( "checked", false );			
		$( "#form-tile-text-size-4" ).prop( "checked", false );
		$( "#form-tile-text-size-2" ).prop( "checked", false );
		$( "#form-tile-text-size-3" ).prop( "checked", true );
		theModel.textSize( FRAMEWORK_PREFIX + "-text-very-small" );

	} else {
		$( "#form-tile-text-size-0" ).prop( "checked", true );
		$( "#form-tile-text-size-1" ).prop( "checked", false );			
		$( "#form-tile-text-size-4" ).prop( "checked", false );
		$( "#form-tile-text-size-2" ).prop( "checked", false );
		$( "#form-tile-text-size-3" ).prop( "checked", false );
		theModel.textSize( FRAMEWORK_PREFIX + "-text-normal" );

	}

	// Look for custom colors
	if ($( "#wrapper ." + FRAMEWORK_PREFIX + "-custom-color" ).length ) {
		var customColor = "#ccaa00";
		var currentInlineStyles = $( "#wrapper ." + FRAMEWORK_PREFIX + "-tile" ).attr( "style" );

		if ( ( currentInlineStyles !== undefined) && ( currentInlineStyles.length !== 0 ) ) {
			currentInlineStyles = currentInlineStyles.toLowerCase();
			var bgcolorStart = currentInlineStyles.indexOf( "background-color" );
			if (bgcolorStart > -1) {
				var bgcolorEnd = currentInlineStyles.indexOf( ";", bgcolorStart );
				if (bgcolorEnd > -1) {
					customColor = currentInlineStyles.slice( bgcolorStart, bgcolorEnd );
				} else {
					customColor = currentInlineStyles.slice( bgcolorStart );
				}
				customColor = customColor.replace( "background-color:", "" );
				customColor = customColor.trim();
			}		
		}

		$( "#wrapper ." + FRAMEWORK_PREFIX + "-tile" ).removeAttr( "style" ).find( "*" ).removeAttr( "style" ); // Drop all styles
		$( "#wrapper ." + FRAMEWORK_PREFIX + "-tile" ).attr( { "style":( "background-color: " + customColor ) }); 

		$( "#form-custom-color-toggle-0" ).prop( "checked", true );
		$( "#form-tile-color" ).attr( "disabled", true );			
		$( "#customColorConfigurables" ).slideDown( 200 );
		$( "#form-custom-color" ).val( customColor );
		theModel.customColor( customColor );
	} else {
		$( "#wrapper ." + FRAMEWORK_PREFIX + "-tile" ).removeAttr( "style" ).find( "*" ).removeAttr( "style" );
		theModel.hasCustomColor( false );
	}

	checkAim();
	$( "#output" ).text( $( "#wrapper" ).html() );	
	$( '#importModal' ).modal( 'hide' );
}


// Check Colour Contrast
// Assumes you're using jQuery
function checkAim() {
	"use strict";

	// The URL for the webaim contrast checker
	var webaimURL = "https://webaim.org/resources/contrastchecker/?";
	var webaimAPI;

	// The fore and background colours
	var webaimFColor;
	var webaimBColor;
	var isAA = false;
	var isAAA = false;

	// Reset the AA and AAA badges
	$(".webaim-is-aa, .webaim-is-aaa").removeClass("label-success").addClass("label-default");

	// Get the foreground & background colours, but remove the hash (API not expecting a #)
	webaimFColor = $("#wrapper .sms-tile").css('color');
	webaimFColor = webaimFColor.replace("#","");		

	webaimBColor = $("#wrapper .sms-tile").css('backgroundColor');
	webaimBColor = webaimBColor.replace("#","");

	// Build the URL by attaching the foreground colour and background colour
	// The API is the same, but with &api at the end
	webaimURL = webaimURL + "fcolor=" + webaimFColor + "&bcolor=" + webaimBColor;
	webaimAPI = webaimURL + "&api";

	// Attach the URL to the anchor
	$("a.webaim-href").attr("href", webaimURL);


	// Call the API
	$.getJSON(webaimAPI).done(function (data) {
		//console.log(data);

		// Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
		// i.e sms-text-very-big (21px) and font-weight-bold for "larger"

		var calcFontSize = $("#wrapper .sms-tile").css("font-size");
		var calcFontBold =  $("#wrapper .sms-tile-text").css("font-weight");
		var calcLarger = false;

		// Convert the font size to a float
		calcFontSize = parseFloat(calcFontSize);
		if (((calcFontSize >= 18) && (calcFontBold >= 700)) || (calcFontSize >= 24)) {
			calcLarger = true;
		}

		// Determine if it's AA or AAA based on if it's larger text or not
		if (calcLarger) {
			if (data.AALarge === "pass") {
				isAA = true;
			}
			if (data.AAALarge === "pass") {
				isAAA = true;
			}				
		} else {
			if (data.AA === "pass") {
				isAA = true;
			}
			if (data.AAA === "pass") {
				isAAA = true;
			}					
		}

		// Colour the AA & AAA badges as appropriate
		if (isAA) {
			$(".webaim-is-aa").removeClass("label-default").addClass("label-success");
		}

		if (isAAA) {
			$(".webaim-is-aaa").removeClass("label-default").addClass("label-success");
		}			
	});

}