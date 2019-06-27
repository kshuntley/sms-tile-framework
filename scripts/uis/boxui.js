// JavaScript Document

// Box UI

// Empty definitions for Debugging
var theModel; var FRAMEWORK_PREFIX;
function updateDisplay() { return; }
function stopEditable() { return; }

// Use a drop shadow checked
$( ".box-drop-shadow-check" ).change( function() {
	"use strict";
	
	if ( theModel.dropShadow() ) {
		// It did have a Shadow, and now it doesn't
		$( "#form-box-shadow-0" ).prop( "checked", false );
		theModel.dropShadow( false );
	} else {
		// It didn't have a Shadow, and now it does
		$( "#form-box-shadow-0" ).prop( "checked", true );
		theModel.dropShadow( true );	
	}
	
	updateDisplay();
});

// Box Colour selected
$( ".box-color-select" ).change( function() {
	"use strict";
	
	theModel.color( $( "#form-box-color" ).val() );
	updateDisplay();
	checkAim();
});

// Use a custom colour checked
$( ".box-custom-check" ).change( function() {
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
$( ".box-text-color-radio" ).change( function() {
	"use strict";		
	
	theModel.textColor( $( ".box-text-color-radio:checked" ).val() );
	updateDisplay();
});

// Add a new row clicked
	$( ".func-add-row-header" ).click( function() {
		"use strict";
		theModel.addRow( "header" );
	});

	$( ".func-add-row-artefact" ).click( function() {
		"use strict";
		theModel.addRow( "artefact" );
	});	

	$( ".func-add-row-multiple" ).click( function() {
		"use strict";
		theModel.addRow( "multiple" );
	});

	$( ".func-add-row-twoicon" ).click( function() {
		"use strict";
		theModel.addRow( "twoicon" );
	});

	$( ".func-add-row-threeicon" ).click( function() {
		"use strict";		
		theModel.addRow( "threeicon" );
	});

	$( ".func-add-row-fouricon" ).click( function() {
		"use strict";
		theModel.addRow( "fouricon" );
	});	


// Delete the last row clicked, update model
$( ".func-delete-row" ).click( function() {
	"use strict";
	theModel.deleteRow();
	updateDisplay();
});	

// Drag and drop rows clicked, update model
$( ".func-toggle-sortable" ).click( function() {
	"use strict";
		
	// Get the Sortable Button's text
	var btnText = $( "#btnSortable" ).text();
	
	// Enable or Disable the following buttons
	var disableBtns  = ".edit-row-btns button" + ", ";
		disableBtns += ".edit-icon-btns .func-edit-icon" + ", ";
		disableBtns += ".edit-link-btns .show-links" + ", ";
		disableBtns += ".edit-link-btns .dropdown-toggle" + ", ";
		disableBtns += ".func-application button" + ", ";
		disableBtns += ".func-edit-content";
	
	var disableMenus = ".nav-edit-func li, .nav-add-row-func li";
	

	// If the Sortable Button starts with En, I want to start dragging
	if ( btnText.startsWith( "En" ) ) {
		
		// Swap the word Enable with Disable
		btnText = btnText.replace( "En", "Dis" );
		
		// Disable buttons
		$( disableBtns ).prop( "disabled", true );
				
		// Disable menu functions
		$( disableMenus ).addClass( "disabled" );
		$( "#navCopyBtn, #navConvertBtn, #navImportBtn" ).parent().addClass( "disabled" );

		// Turn on Sortable (jQuery UI)
		$( "." + FRAMEWORK_PREFIX + "-box-rows" ).css( { "cursor":"grab" } ).sortable( "enable" ).sortable({
			"cursor":"move",
			"axis": "y",
			"revert": true,
			"update": function() {
				var newOrder = $( this ).sortable( "toArray" );
				theModel.rearrangeRowsByIDs( newOrder );
			}
		});

	} 
	
	// If it starts with Dis, I want to stop dragging
	else {
		
		// Swap the word Disable with Enable
		btnText = btnText.replace( "Dis", "En" );
		
		$( disableBtns ).prop( "disabled", false );

		// Enable menu functions
		$( disableMenus ).removeClass( "disabled" );
		$( "li.disabled a.nav-menu-func" ).parent().removeClass( "disabled" );

		//...but make sure Stop Editing menu is disabled
		$( ".nav-menu-func .func-stop-edit-content" ).parent().addClass( "disabled" );

		$( "." + FRAMEWORK_PREFIX + "-box-rows" ).css( { "cursor":"auto" } ).sortable( "disable" );
		updateDisplay();
	}
			
	toBeDeletedDisabled();

	$( "button.func-toggle-sortable" ).toggleClass( "btn-danger" ).toggleClass( "btn-success" ).text( btnText );

	return;
});

// Edit hyperlinks clicked
$( ".func-edit-links" ).click( function() {
	"use strict";
	
	// Is the stop editing icons button disabled? If true, we aren't editing
	var editingIcons = $( ".edit-icon-btns button.func-stop-edit-icon" ).prop( "disabled" ); 
	if ( !editingIcons ) {
		// If we are editing icons, finish that first.
		$.iconpicker.batch( ".icp.iconpicker-element", "destroy" );
		$( ".icp" ).remove();			
		$( "button.func-stop-edit-icon" ).prop( "disabled", "true" );
	}				

	// If we are editing content, force that to finish
	stopEditable();

	// Remove the hyperlink title edit box
	$( ".hyperlink-title-edit" ).remove();

	// Build a link of exemptions (i.e. don't edit these hyperlinks)
	var linkExemption  = " ." + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon, ";
		linkExemption += " .edit-link-btns a, ";
		linkExemption += " .navbar a, ";
		linkExemption += " a.webaim-href";
	
	// Select every hyperlink that has an href and is not an exception
	var linkSelector = "a[href]:not(" + linkExemption + ")";
	
	// Find all the hyperlinks (except the sidebar icons and nav links), create an edit box and add the hyperlink to it
	$( linkSelector ).after( function() {
		var theLink = $( this ).attr( "href" );
		return "<input class=\"form-control hyperlink-edit\" value=\"" + theLink.trim() + "\" type=\"text\">";
	});

	// Disable all kinds of buttons and links
	var disableBtns  = ".edit-row-btns button, .drag-sort-btns button, .func-edit-icon, .func-application button";
	var disableLinks = ".nav-menu-func.func-copy, .nav-menu-func.func-convert, .nav-menu-func.func-import, .nav-menu-func.func-toggle-sortable";
	$( disableBtns ).prop( "disabled", true );
	$( disableLinks ).parent().addClass( "disabled" );

	// Enable the Stop Editing Button
	$( ".func-stop-edit-links" ).removeAttr( "disabled" );
	$( ".dropdown-menu a.func-stop-edit-content" ).parent().removeClass( "disabled" );					

	// Disable the show links button
	$( "button.func-edit-links" ).attr( "disabled", "disabled" );		

	// Make sure the menu works, but disable the edit titles link.
	$( ".dropdown-menu a" ).parent().removeClass( "disabled" );
	$( ".dropdown-menu a.func-edit-links" ).parent().addClass( "disabled" );

	updateDisplay();				
});

// Hyperlink URL changed, update model
$( ".hyperlink-edit" ).on( "change keyup paste", function() {
	"use strict";		
	
	// Find what row I'm in
	var rowSelector = "." + FRAMEWORK_PREFIX + "-box-row-content";
	var rowID = $( this ).closest( rowSelector ).attr( "id" );
	var rowPrototype = theModel.getRowByID( rowID ).rowPrototype();
	var linkNumber;
	
	var newUrl = $( this ).val();
	if ( newUrl === "" ) { 
		newUrl = "#"; 
	}
	
	// Get the row prototype. If it's multiple or tryme, it may have several links
	if ( ( rowPrototype === "multiple" ) || ( rowPrototype.includes( "icon" ) ) ) {
		
		// Which link is this?
		linkNumber = $( rowSelector + " .hyperlink-edit" ).index( this );
	
		theModel.getRowByID( rowID ).multiLink( linkNumber, newUrl );
	}
	else {
		theModel.getRowByID( rowID ).artefactURL( newUrl );
	}
	
	updateDisplay();
});

// Edit hyperlink titles clicked
$( ".func-edit-titles" ).click( function() {
	"use strict";
	
	// Is the stop editing icons button disabled? If true, we aren't editing
	var editingIcons = $( ".edit-icon-btns button.func-stop-edit-icon" ).prop( "disabled" ); 
	if ( !editingIcons ) {
		// If we are editing icons, finish that first.
		$.iconpicker.batch( ".icp.iconpicker-element", "destroy" );
		$( ".icp" ).remove();			
		$( "button.func-stop-edit-icon" ).prop( "disabled", "true" );
	}				

	// If we are editing content, force that to finish
	stopEditable();

	// Remove the hyperlink edit box
	$( ".hyperlink-edit" ).remove();
	
	// Build a link of exemptions (i.e. don't edit these hyperlinks)
	var linkExemption  = " ." + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon, ";
		linkExemption += " .edit-link-btns a, ";
		linkExemption += " .navbar a, ";
		linkExemption += " a.webaim-href";
	
	// Select every hyperlink that has an href and is not an exception
	var linkSelector = "a[href]:not(" + linkExemption + ")";	
	
	// Find all the hyperlinks (except the sidebar icons and nav links), create an edit box and add the hyperlink title to it
	$( linkSelector ).after( function() {
		var theTitle = $( this ).attr( "title" );
		if ( theTitle === null ) { theTitle = ""; }
		return "<input class=\"form-control hyperlink-title-edit\" value=\"" + theTitle.trim() + "\" type=\"text\">";	
	});

	// Disable all kinds of buttons and links
	var disableBtns  = ".edit-row-btns button, .drag-sort-btns button, .func-edit-icon, .func-application button";
	var disableLinks = ".nav-menu-func.func-copy, .nav-menu-func.func-convert, .nav-menu-func.func-import, .nav-menu-func.func-toggle-sortable";
	$( disableBtns ).prop( "disabled", true );
	$( disableLinks ).parent().addClass( "disabled" );

	// Enable the Stop Editing Button
	$( ".func-stop-edit-links" ).removeAttr( "disabled" );
	$( ".dropdown-menu a.func-stop-edit-content" ).parent().removeClass( "disabled" );					

	// Disable the show links button
	$( "button.func-edit-links" ).attr( "disabled", "disabled" );		

	// Make sure the menu works, but disable the edit titles link.
	$( ".dropdown-menu a" ).parent().removeClass( "disabled" );
	$( ".dropdown-menu a.func-edit-links" ).parent().addClass( "disabled" );
	
	// Swap the text on the buttons
	$( "button.func-stop-edit-links" ).text( "Stop Editing Titles" );
	$( "button.func-edit-links" ).text( "Edit Titles" );	

	updateDisplay();
		
});

// Hyperlink Title changed, update model
$( ".hyperlink-title-edit" ).on( "change keyup paste", function() {
	"use strict";		
	
	// Find what row I'm in
	var rowSelector = "." + FRAMEWORK_PREFIX + "-box-row-content";
	var rowID = $( this ).closest( rowSelector ).attr( "id" );
	var rowPrototype = theModel.getRowByID( rowID ).rowPrototype();
	var linkNumber;
	
	var newTitle = $( this ).val();
	
	// Get the row prototype. If it's multiple or tryme, it may have several links
	if ( ( rowPrototype === "multiple" ) || ( rowPrototype.includes( "icon" ) ) ) {
		
		// Which link is this?
		linkNumber = $( rowSelector + " .hyperlink-title-edit" ).index( this );
	
		theModel.getRowByID( rowID ).multiLinkTitle( linkNumber, newTitle );
	}
	else {
		theModel.getRowByID( rowID ).artefactURLTitle( newTitle );
	}
	
	updateDisplay();
});

// Stop Editing Hyperlinks, Titles and Tab Indexes clicked
$( ".func-stop-edit-links" ).click( function() {
	"use strict";
	
	// Get the text on the button
	var btnText = $( "button.func-stop-edit-links" ).text();

	// Remove the editing boxes for hyperlinks and titles
	$( ".hyperlink-edit, .hyperlink-title-edit" ).remove();
	
	// Enable the Edit Links button (and any drop down button that might be disabled)
	$( "button.func-edit-links" ).removeAttr( "disabled" );
	$( ".nav-edit-func a, .edit-link-btns .dropdown-menu a" ).parent().removeClass( "disabled" );
	
	// Disable the Stop Editing buttons and menu
	$( "button.func-stop-edit-links").attr( "disabled", "disabled" );
	$( ".nav-edit-func a.func-stop-edit-content" ).parent().addClass( "disabled" );	
	
	// Enable other editing buttons
	var enableBtns  = ".edit-row-btns button,  ";
		enableBtns += ".drag-sort-btns button, ";
		enableBtns += "button.func-edit-icon, ";
		enableBtns += ".func-application button";
	$( enableBtns ).prop( "disabled", false );
	$( "#navCopyBtn, #navConvertBtn, #navImportBtn, #navDragBtn" ).parent().removeClass( "disabled" );					
	
	// If we were editing titles, swap text
	if ( btnText !== "Stop Editing Links" ) {
		$( "button.func-stop-edit-links" ).text( "Stop Editing Links" );
		$( "button.func-edit-links" ).text( "Edit Links") ;
	}
});

// Edit Content clicked
$( ".func-edit-content" ).click( function() {
	"use strict";
	
	// Check if we're editing links, titles
	var editingLinks =  ( $( "button.func-stop-edit-links" ).prop( "disabled" ) );
	var btnText = $( "button.func-stop-edit-links" ).text();
					
	if ( !( editingLinks ) ) {
		$( ".hyperlink-edit, .hyperlink-title-edit" ).remove();
		$( "button.func-edit-links" ).removeAttr( "disabled" );
		$( ".dropdown-menu a" ).parent().removeClass( "disabled" );
		$( "button.func-stop-edit-links" ).attr( "disabled", "disabled" );
		$( ".edit-row-btns button, .drag-sort-btns button, .func-edit-icon, .func-application button" ).prop( "disabled", false );

		// If editing titles, the buttons change from Links to Titles. This is to reset that text
		if ( btnText !== "Stop Editing Links" ) {
			$( "button.func-stop-edit-links" ).text( "Stop Editing Links" );
			$( "button.func-edit-links" ).text( "Edit Links" );
		}				
	}

	// Check if we were editing Icons. If so, finish that.
	var editingIcons = ( $( ".edit-icon-btns button.func-stop-edit-icon" ).prop( "disabled" ) );
	if ( !(editingIcons ) ) {
		$.iconpicker.batch( ".icp.iconpicker-element", "destroy" );
		$(".icp").remove();			
	}
				
	// What does the Content Edit button say?	
	btnText = $( "button.func-edit-content" ).text();
	
	// Enable or Disable the following buttons
	var disableBtns  = ".edit-row-btns button" + ", ";
		disableBtns += ".edit-icon-btns .func-edit-icon" + ", ";
		disableBtns += ".edit-link-btns .func-edit-links" + ", ";
		disableBtns += ".edit-link-btns .dropdown-toggle" + ", ";
		disableBtns += ".func-application button" + ", ";
		disableBtns += ".func-toggle-sortable";
	

	if ( btnText.startsWith( "Turn On" ) ) {
		// If the button starts with Turn On, we will start editing.
		btnText = btnText.replace( "Turn On", "Turn Off" );
		
		// Find anything with isEditable class and make it actually editable
		$( ".isEditable" ).attr( "contenteditable", true );
		
		$( disableBtns ).prop( "disabled", true );
		$( "#navCopyBtn, #navConvertBtn, #navImportBtn, #navDragBtn" ).parent().addClass( "disabled" );		
		$( ".nav-add-row-func li" ).addClass( "disabled" );
		$( ".nav-edit-func .func-edit-content" ).parent().addClass( "disabled" );
		$( ".nav-edit-func .func-stop-edit-content" ).parent().removeClass( "disabled" );

	} 
	else {
		btnText = btnText.replace( "Turn Off", "Turn On" );
		$( "[contenteditable='true']" ).removeAttr( "contenteditable" );
		$( disableBtns ).prop( "disabled", false );
		$( "#navCopyBtn, #navConvertBtn, #navImportBtn, #navDragBtn" ).parent().removeClass( "disabled" );
		$( ".nav-edit-func .func-stop-edit-content" ).parent().addClass( "disabled" );

		// Bug with hyperlinks not going back to pointer
		$( "a[contenteditable]" ).css( {"cursor":"pointer"} );
		updateDisplay();
	}

	$( ".isEditable" ).toggleClass( "showEditable" );
	$( '[class=""]' ).removeAttr( "class" ); // Hack to remove empty class attributes. Doesn't affect code, just make less ugly


	$( "button.edit-content" ).toggleClass( "btn-danger" ).toggleClass( "btn-success" ).text( btnText );

	toBeDeletedDisabled();

});

// Stop Edit Content clicked
$( ".func-stop-edit-content" ).click( function() {
	"use strict";
	return stopEditable();
});

// Editable Content Changed, update model
$( ".isEditable.showEditable" ).on( "change keyup paste", function() {
	"use strict";
	
	var theRowID;
	var iconNum;
	
	// If the editable field is the header, change the models's title
	if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-header h4" ) ) {
		theModel.title( $( this ).text() );
	}
	
	// if the editable field is the abstract, change the model's abstract
	else if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-abstract p" ) ) {
		theModel.abstract( $( this ).html() ); // At some point at MarkDown here
	}
	
	// If the editable field is in a header row...
	else if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-row-header h5" ) ) {
		
		// Find the Row ID
		theRowID = $( this ).parents( "." + FRAMEWORK_PREFIX + "-box-row-header" ).attr( "id" );
		
		// If it's in the sidebar, change the Sidebar Heading of that Row
		if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-sidebar h5" ) ) {
			theModel.getRowByID( theRowID ).sidebarHeading( $( this ).text() );
		}
		
		// Or if it's in the content, change the Content Heading of that Row
		else if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-content h5" ) ) {
			theModel.getRowByID( theRowID ).contentHeading( $( this ).text() );
		}
		
		// Or... uh...
		else {
			throw new SyntaxError( "Must change either Sidebar or Content headings." );
		}
	}
	
	// If the editable field is in a content row...
	else if ( $( this ).parents().is( "." + FRAMEWORK_PREFIX + "-box-row-content" ) ) { 
		
		// Find the Row ID
		theRowID = $( this ).parents( "." + FRAMEWORK_PREFIX + "-box-row-content" ).attr( "id" );
		
		// If it's the artefact title...
		if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-sidebar-artefact-title" ) ) {
			
			// Is it in the sidebar or the main content? If it's in the sidebar, it's the artefact title
			if ( $( this ).parents().is( "." + FRAMEWORK_PREFIX + "-box-sidebar" ) ) {
				theModel.getRowByID( theRowID ).artefactTitle( $( this ).text() );
			}
			
			// Otherwise, it's a tryme icon
			else {
				// Which tryme icon is this?
				iconNum = $( "#" + theRowID ).index( $( this ) );
				
				theModel.getRowByID( theRowID ).trymeTitleArray( iconNum, $( this ).text() );
			}
		}
		
		// If it's the artefact subtitle...
		else if ( $( this ).is( "." + FRAMEWORK_PREFIX + "-box-sidebar-artefact-filesize" ) ) { // -filesize should be changed to subtitle at some point
			
			// Is it in the sidebar or the main content? If it's in the sidebar, it's the artefact title
			if ( $( this ).parents().is( "." + FRAMEWORK_PREFIX + "-box-sidebar" ) ) {
				theModel.getRowByID( theRowID ).artefactSubTitle( $( this ).text() );
			}
			
			// Otherwise, it's a tryme icon
			else {
				// Which tryme icon is this?
				iconNum = $( "#" + theRowID ).index( $( this ) );
				
				theModel.getRowByID( theRowID ).trymeSubTitleArray( iconNum, $( this ).text() );
			}
		}
		
		// If it's in a multi-list
		else if ( $( this ).parents().is( "." + FRAMEWORK_PREFIX + "-box-multi-list li" ) ) {
		
			// Which file is this?
			var fileNum = $( "#" + theRowID ).index( $( this ) );
		
			// If it has the class of details, it's the filesize text
			if ( $( this ).is( ".details" ) ) {
				theModel.getRowByID( theRowID ).fileSizesArray( fileNum, $( this ).text() );
			}
		
			else {
				theModel.getRowByID( theRowID ).fileNamesArray( fileNum, $( this ).text() );
			}
	}
		
		else {
			throw new SyntaxError( "Cannot target the row text you are attempting to change." );
		}
	
	}
	
	else {
		throw new SyntaxError( "Unclear where in box the text is you are attempting to change." );
	}	

});

// The Box Heading has been changed, update anchor
$( "." + FRAMEWORK_PREFIX + "-box-header h4.showEditable" ).blur( function() {
	"use strict";
	var h4Con  = $( "." + FRAMEWORK_PREFIX + "-box-header h4" ).text();
	var newID  = h4Con.toLowerHyphenated() + "-box-top";

	// Set the anchor's id at the top of the box to be derived from the heading
	$(  "." + FRAMEWORK_PREFIX + "-box-header a." + FRAMEWORK_PREFIX + "-box-header-anchor" ).attr( "id", newID );
});

// Stop Editing Icons clicked
$( ".func-stop-edit-icon" ).click( function() {
	"use strict";

	// Destroy the Icon Picker
	$.iconpicker.batch( ".icp.iconpicker-element", "destroy" );
	$( ".icp" ).remove();
	
	// Enable the Edit Icon buttons
	$( ".func-edit-icon" ).removeAttr( "disabled" );
	$( ".func-stop-edit-icon" ).attr( "disabled", "disabled" );
	
	// If anything else is disabled, enable it
	var enableBtns  = ".edit-row-btns button, ";
		enableBtns += ".drag-sort-btns button, ";
		enableBtns += ".func-edit-links, ";
		enableBtns += ".edit-link-btns .dropdown-toggle, ";
		enableBtns += ".sms-functionality-btns button";
	$( enableBtns ).prop( "disabled", false );
	$( ".nav-add-row-func li" ).removeClass( "disabled" );

	updateDisplay();
});

// Start Editing Icons clicked
$( ".func-edit-icon" ).click( function() {
	"use strict";
	
	// Check if we're editing links or titles
	var editingLinks = ( $( "button.func-stop-edit-links" ).prop( "disabled" ) ); // Is the Stop Editing Links button disabled?

	// if it's not disabled, we're currently editing links. Stop that!
	if ( !(editingLinks) ) {
		
		// Remove the hyperlink edit boxes
		$( ".hyperlink-edit, .hyperlink-title-edit" ).remove(); 
			
		// Disable the Stop Edting Links button
		$( "button.func-stop-edit-links" ).attr( "disabled", "disabled" );
				
		// The Stop Editing Links button could have a different label. Reset
		var btnText = $( "button.func-stop-edit-links" ).text();
		if (btnText !== "Stop Editing Links") {
			$( "button.func-stop-edit-links" ).text( "Stop Editing Links" );
			$( "button.func-edit-links" ).text( "Edit Links" );
		}				
	}
	
	// We might be editing content. Stop that!
	stopEditable();
	
	// Disable the Copy, Convert, Import menus (but leave Stop Editing turned on)
	$( "#navCopyBtn, #navConvertBtn, #navImportBtn, #navDragBtn" ).parent().addClass( "disabled" );
	$( ".nav-edit-func .func-stop-edit-content" ).parent().removeClass("disabled");		
	
	// Disable Edit Links and Titles from Menus
	$( ".nav-edit-func .func-edit-icon" ).parent().addClass( "disabled" );					

	// Disable other editing buttons
	var disableBtns  = ".edit-row-btns button, ";
		disableBtns += ".drag-sort-btns button, ";
		disableBtns += ".func-edit-links, ";
		disableBtns += ".edit-link-btns .dropdown-toggle, ";
		disableBtns += ".func-application button";
	
	$( disableBtns ).prop( "disabled", true );
	$( ".nav-add-row-func li" ).addClass("disabled");
	
	// Disbale the Edit Icon button and enable the Stop Editing Icon button
	$( ".func-edit-icon" ).attr( "disabled", "disabled" );
	$( ".func-stop-edit-icon" ).removeAttr( "disabled" );	

	// Add the icon edit box
	$( "#wrapper ." + FRAMEWORK_PREFIX + "-box-sidebar-artefact-icon .fa" ).after( function() {
		var faiconO = $( this ).attr( "class" );
		var faicon  = faiconO.replace( "fa-2x", "" ); // Get the Font-Awesome icon class
		return '<input class="form-control icp" value="' + faicon.trim() + '" type="text">'; 
	});	
	
	// Use the ICP library to display the Icon Picker
	// Here's a tip - the icons are just dumped here as an array. It's easier to edit these via Excel. I will include an Excel file with formulas built in.
	$( ".icp" ).iconpicker({
		title: 'Choose a new icon',
		mustAccept: true,
		showFooter: true,
		placement: 'right',
		icons: [{title:"fa fa-address-book",searchTerms:['Address Book']},{title:"fa fa-address-book-o",searchTerms:['Address Book Outline']},{title:"fa fa-address-card",searchTerms:['Address Card']},{title:"fa fa-address-card-o",searchTerms:['Address Card Outline']},{title:"fa fa-adjust",searchTerms:['Adjust']},{title:"fa fa-align-center",searchTerms:['Centre Align']},{title:"fa fa-align-justify",searchTerms:['Justify Align']},{title:"fa fa-align-left",searchTerms:['Left Align']},{title:"fa fa-align-right",searchTerms:['Right Align']},{title:"fa fa-amazon",searchTerms:['Amazon Logo']},{title:"fa fa-ambulance",searchTerms:['Ambulance']},{title:"fa fa-anchor",searchTerms:['Anchor']},{title:"fa fa-android",searchTerms:['Android Logo']},{title:"fa fa-angle-double-down",searchTerms:['Double Down Angles']},{title:"fa fa-angle-double-left",searchTerms:['Double Left Angles']},{title:"fa fa-angle-double-right",searchTerms:['Double Right Angles']},{title:"fa fa-angle-double-up",searchTerms:['Double Up Angles']},{title:"fa fa-apple",searchTerms:['Apple Logo']},{title:"fa fa-archive",searchTerms:['Archive Box']},{title:"fa fa-area-chart",searchTerms:['Area Chart']},{title:"fa fa-arrow-circle-down",searchTerms:['Down Arrow in Circle']},{title:"fa fa-arrow-circle-left",searchTerms:['Left Arrow in Circle']},{title:"fa fa-arrow-circle-o-down",searchTerms:['Down Arrow in Open Circle']},{title:"fa fa-arrow-circle-o-left",searchTerms:['Left Arrow in Open Circle']},{title:"fa fa-arrow-circle-o-right",searchTerms:['Right Arrow in Open Circle']},{title:"fa fa-arrow-circle-o-up",searchTerms:['Up Arrow in Open Circle']},{title:"fa fa-arrow-circle-right",searchTerms:['Right Arrow in Circle']},{title:"fa fa-arrow-circle-up",searchTerms:['Up Arrow in Circle']},{title:"fa fa-arrow-down",searchTerms:['Down Arrow']},{title:"fa fa-arrow-left",searchTerms:['Left Arrow']},{title:"fa fa-arrow-right",searchTerms:['Right Arrow']},{title:"fa fa-arrows",searchTerms:['Move']},{title:"fa fa-arrows-h",searchTerms:['Horizontal Arrows']},{title:"fa fa-arrows-v",searchTerms:['Vertical Arrows']},{title:"fa fa-arrow-up",searchTerms:['Up Arrow']},{title:"fa fa-asl-interpreting",searchTerms:['Sign Language Interpreting']},{title:"fa fa-asterisk",searchTerms:['Asterisk']},{title:"fa fa-at",searchTerms:['At Arobase Symbol']},{title:"fa fa-audio-description",searchTerms:['Audio Description']},{title:"fa fa-backward",searchTerms:['Rewind']},{title:"fa fa-balance-scale",searchTerms:['Scales']},{title:"fa fa-ban",searchTerms:['Ban Sign']},{title:"fa fa-bar-chart",searchTerms:['Bar Chart']},{title:"fa fa-barcode",searchTerms:['Barcode']},{title:"fa fa-bars",searchTerms:['Menu Bars']},{title:"fa fa-bath",searchTerms:['Bathtub']},{title:"fa fa-battery-empty",searchTerms:['Empty Battery']},{title:"fa fa-battery-full",searchTerms:['Full Battery']},{title:"fa fa-battery-half",searchTerms:['Half Battery']},{title:"fa fa-battery-quarter",searchTerms:['Quarter Battery']},{title:"fa fa-battery-three-quarters",searchTerms:['Three Quarter Battery']},{title:"fa fa-bed",searchTerms:['Bed']},{title:"fa fa-bell",searchTerms:['Bell']},{title:"fa fa-bell-o",searchTerms:['Bell Outline']},{title:"fa fa-bell-slash",searchTerms:['Strikethrough Bell']},{title:"fa fa-bell-slash-o",searchTerms:['Strikethrough Bell Outline']},{title:"fa fa-bicycle",searchTerms:['Bicycle']},{title:"fa fa-binoculars",searchTerms:['Binoculars']},{title:"fa fa-birthday-cake",searchTerms:['Birthday Cake']},{title:"fa fa-bitbucket",searchTerms:['Bitbucket Logo']},{title:"fa fa-bitbucket-square",searchTerms:['Bitbucket Logo in Square']},{title:"fa fa-blind",searchTerms:['Blind Man']},{title:"fa fa-bluetooth",searchTerms:['Bluetooth Logo']},{title:"fa fa-bluetooth-b",searchTerms:['Alternate Bluetooth Logo']},{title:"fa fa-bold",searchTerms:['Bold']},{title:"fa fa-bolt",searchTerms:['Lightning Bolt']},{title:"fa fa-bomb",searchTerms:['Bomb']},{title:"fa fa-book",searchTerms:['Book']},{title:"fa fa-bookmark",searchTerms:['Bookmark']},{title:"fa fa-bookmark-o",searchTerms:['Bookmark Outline']},{title:"fa fa-braille",searchTerms:['Braille']},{title:"fa fa-briefcase",searchTerms:['Briefcase']},{title:"fa fa-btc",searchTerms:['Bitcoin Currency Symbol']},{title:"fa fa-bug",searchTerms:['Bug']},{title:"fa fa-building",searchTerms:['Building']},{title:"fa fa-building-o",searchTerms:['Building Outline']},{title:"fa fa-bullhorn",searchTerms:['Bullhorn']},{title:"fa fa-bullseye",searchTerms:['Bullseye Target']},{title:"fa fa-bus",searchTerms:['Bus']},{title:"fa fa-cab",searchTerms:['Cab']},{title:"fa fa-calculator",searchTerms:['Calculator']},{title:"fa fa-calendar",searchTerms:['Calendar']},{title:"fa fa-calendar-check-o",searchTerms:['Checkmark in Calendar Outline']},{title:"fa fa-calendar-minus-o",searchTerms:['Minus Symbol in Calendar Outline']},{title:"fa fa-calendar-o",searchTerms:['Calendar Outline']},{title:"fa fa-calendar-plus-o",searchTerms:['Plus Symbol in Calendar Outline']},{title:"fa fa-calendar-times-o",searchTerms:['Times Symbol in Calendar Outline']},{title:"fa fa-camera",searchTerms:['Camera']},{title:"fa fa-camera-retro",searchTerms:['Retro Camera']},{title:"fa fa-car",searchTerms:['Car']},{title:"fa fa-cart-arrow-down",searchTerms:['Down Arrow in Shopping Cart']},{title:"fa fa-cart-plus",searchTerms:['Plus Symbol in Shopping Cart']},{title:"fa fa-cc",searchTerms:['Closed Captions']},{title:"fa fa-cc-amex",searchTerms:['American Express Card']},{title:"fa fa-cc-discover",searchTerms:['Discover Card']},{title:"fa fa-cc-mastercard",searchTerms:['MasterCard']},{title:"fa fa-cc-paypal",searchTerms:['PayPal Card']},{title:"fa fa-cc-stripe",searchTerms:['Stripe Card']},{title:"fa fa-cc-visa",searchTerms:['Visa Card']},{title:"fa fa-certificate",searchTerms:['Certificate Stamp']},{title:"fa fa-check",searchTerms:['Checkmark']},{title:"fa fa-check-circle",searchTerms:['Checkmark in Circle']},{title:"fa fa-check-circle-o",searchTerms:['Checkmark in Open Circle']},{title:"fa fa-check-square",searchTerms:['Checkmark in Square']},{title:"fa fa-check-square-o",searchTerms:['Checkmark in Open Square']},{title:"fa fa-chevron-circle-down",searchTerms:['Down Chevron in Circle']},{title:"fa fa-chevron-circle-left",searchTerms:['Left Chevron in Circle']},{title:"fa fa-chevron-circle-right",searchTerms:['Right Chevron in Circle']},{title:"fa fa-chevron-circle-up",searchTerms:['Up Chevron in Circle']},{title:"fa fa-chevron-down",searchTerms:['Down Chevron']},{title:"fa fa-chevron-left",searchTerms:['Left Chevron']},{title:"fa fa-chevron-right",searchTerms:['Right Chevron']},{title:"fa fa-chevron-up",searchTerms:['Up Chevron']},{title:"fa fa-child",searchTerms:['Child']},{title:"fa fa-chrome",searchTerms:['Chrome Browser Logo']},{title:"fa fa-circle",searchTerms:['Circle']},{title:"fa fa-circle-o",searchTerms:['Open Circle']},{title:"fa fa-circle-thin",searchTerms:['Thin Circle']},{title:"fa fa-clock-o",searchTerms:['Clock']},{title:"fa fa-clone",searchTerms:['Clone']},{title:"fa fa-cloud",searchTerms:['Cloud']},{title:"fa fa-cloud-download",searchTerms:['Download from Cloud']},{title:"fa fa-cloud-upload",searchTerms:['Upload to Cloud']},{title:"fa fa-code",searchTerms:['Code Symbol']},{title:"fa fa-coffee",searchTerms:['Coffee Cup']},{title:"fa fa-columns",searchTerms:['Columns']},{title:"fa fa-comment",searchTerms:['Speech Bubble']},{title:"fa fa-commenting",searchTerms:['Commenting']},{title:"fa fa-commenting-o",searchTerms:['Commenting Outline']},{title:"fa fa-comment-o",searchTerms:['Speech Bubble Outline']},{title:"fa fa-comments",searchTerms:['Discussion']},{title:"fa fa-comments-o",searchTerms:['Discussion Outline']},{title:"fa fa-compass",searchTerms:['Compass']},{title:"fa fa-compress",searchTerms:['Compress']},{title:"fa fa-copyright",searchTerms:['Copyright Symbol']},{title:"fa fa-creative-commons",searchTerms:['Creative Commons Mark']},{title:"fa fa-credit-card",searchTerms:['Credit Card']},{title:"fa fa-credit-card-alt",searchTerms:['Alternate Credit Card']},{title:"fa fa-crosshairs",searchTerms:['Crosshairs']},{title:"fa fa-css3",searchTerms:['CSS3 Logo']},{title:"fa fa-cube",searchTerms:['Cube']},{title:"fa fa-cubes",searchTerms:['Cubes']},{title:"fa fa-dashboard",searchTerms:['Dashboard']},{title:"fa fa-dashcube",searchTerms:['Dashcube Logo']},{title:"fa fa-database",searchTerms:['Database']},{title:"fa fa-deaf",searchTerms:['Deafness']},{title:"fa fa-desktop",searchTerms:['Desktop Computer']},{title:"fa fa-diamond",searchTerms:['Diamond']},{title:"fa fa-download",searchTerms:['Download']},{title:"fa fa-dropbox",searchTerms:['Dropbox Logo']},{title:"fa fa-drupal",searchTerms:['Drupal Logo']},{title:"fa fa-eject",searchTerms:['Eject']},{title:"fa fa-ellipsis-h",searchTerms:['Ellipsis']},{title:"fa fa-ellipsis-v",searchTerms:['Vertical Ellipsis']},{title:"fa fa-empire",searchTerms:['Galactic Empire']},{title:"fa fa-envelope",searchTerms:['Envelope']},{title:"fa fa-envelope-o",searchTerms:['Envelope Outline']},{title:"fa fa-envelope-open",searchTerms:['Open Envelope']},{title:"fa fa-envelope-open-o",searchTerms:['Open Envelope Outline']},{title:"fa fa-envelope-square",searchTerms:['Envelope in Square']},{title:"fa fa-envira",searchTerms:['Alternate Leaf']},{title:"fa fa-eraser",searchTerms:['Eraser']},{title:"fa fa-eur",searchTerms:['Euro Currency Symbol']},{title:"fa fa-exchange",searchTerms:['Exchange']},{title:"fa fa-exclamation",searchTerms:['Exclamation Mark']},{title:"fa fa-exclamation-circle",searchTerms:['Exclamation Mark in Circle']},{title:"fa fa-expand",searchTerms:['Expand']},{title:"fa fa-external-link-square",searchTerms:['External Link in Square']},{title:"fa fa-eye",searchTerms:['Eye']},{title:"fa fa-eyedropper",searchTerms:['Eyedropper']},{title:"fa fa-eye-slash",searchTerms:['No Eye']},{title:"fa fa-facebook",searchTerms:['Facebook Logo']},{title:"fa fa-facebook-square",searchTerms:['Facebook Logo in Square']},{title:"fa fa-fax",searchTerms:['Fax Machine']},{title:"fa fa-female",searchTerms:['Female']},{title:"fa fa-file",searchTerms:['File']},{title:"fa fa-file-audio-o",searchTerms:['Audio File Outline']},{title:"fa fa-file-code-o",searchTerms:['Code File Outline']},{title:"fa fa-file-excel-o",searchTerms:['Excel File Outline']},{title:"fa fa-file-o",searchTerms:['File Outline']},{title:"fa fa-file-pdf-o",searchTerms:['PDF File Outline']},{title:"fa fa-file-picture-o",searchTerms:['Picture File Outline']},{title:"fa fa-file-powerpoint-o",searchTerms:['PowerPoint File Outline']},{title:"fa fa-files-o",searchTerms:['Files Outline']},{title:"fa fa-file-text",searchTerms:['Text File']},{title:"fa fa-file-text-o",searchTerms:['Text File Outline']},{title:"fa fa-file-video-o",searchTerms:['Video File Outline']},{title:"fa fa-file-word-o",searchTerms:['Word File Outline']},{title:"fa fa-file-zip-o",searchTerms:['Zip File Outline']},{title:"fa fa-film",searchTerms:['Film Strip']},{title:"fa fa-filter",searchTerms:['Filter']},{title:"fa fa-fire",searchTerms:['Flame']},{title:"fa fa-fire-extinguisher",searchTerms:['Fire Extinguisher']},{title:"fa fa-firefox",searchTerms:['Firefox Browser Logo']},{title:"fa fa-flag",searchTerms:['Flag']},{title:"fa fa-flag-checkered",searchTerms:['Checkered Flag']},{title:"fa fa-flag-o",searchTerms:['Flag Outline']},{title:"fa fa-flask",searchTerms:['Chemistry Flask']},{title:"fa fa-flickr",searchTerms:['Flickr Logo']},{title:"fa fa-floppy-o",searchTerms:['Floppy Disk Outline']},{title:"fa fa-folder",searchTerms:['Folder']},{title:"fa fa-folder-o",searchTerms:['Folder Outline']},{title:"fa fa-folder-open",searchTerms:['Open Folder']},{title:"fa fa-folder-open-o",searchTerms:['Open Folder Outline']},{title:"fa fa-font",searchTerms:['Font']},{title:"fa fa-fort-awesome",searchTerms:['Castle']},{title:"fa fa-forumbee",searchTerms:['Forumbee Logo']},{title:"fa fa-forward",searchTerms:['Fast Foward']},{title:"fa fa-foursquare",searchTerms:['Foursquare Logo']},{title:"fa fa-frown-o",searchTerms:['Frowney Face']},{title:"fa fa-futbol-o",searchTerms:['Soccer Ball']},{title:"fa fa-gamepad",searchTerms:['Gamepad']},{title:"fa fa-gavel",searchTerms:['Gavel']},{title:"fa fa-gbp",searchTerms:['Pounds Currency Symbol']},{title:"fa fa-gear",searchTerms:['Gear']},{title:"fa fa-gears",searchTerms:['Gears']},{title:"fa fa-get-pocket",searchTerms:['Get Pocket Logo']},{title:"fa fa-gift",searchTerms:['Gift']},{title:"fa fa-git",searchTerms:['Git Logo']},{title:"fa fa-github",searchTerms:['Github Logo']},{title:"fa fa-github-square",searchTerms:['Github Logo in Square']},{title:"fa fa-git-square",searchTerms:['Git Logo in Square']},{title:"fa fa-glass",searchTerms:['Glass']},{title:"fa fa-globe",searchTerms:['Globe']},{title:"fa fa-google-plus",searchTerms:['Google+ Logo']},{title:"fa fa-google-plus-square",searchTerms:['Google+ Logo in Square']},{title:"fa fa-google-wallet",searchTerms:['Google Wallet']},{title:"fa fa-graduation-cap",searchTerms:['Graduation Cap']},{title:"fa fa-hand-lizard-o",searchTerms:['Lizard Hand Outline']},{title:"fa fa-hand-o-left",searchTerms:['Pointing Left Outline']},{title:"fa fa-hand-o-right",searchTerms:['Pointing Right Outline']},{title:"fa fa-hand-o-up",searchTerms:['Pointing Up Outline']},{title:"fa fa-hand-paper-o",searchTerms:['Paper Hand Outline']},{title:"fa fa-hand-peace-o",searchTerms:['Peace Hand Outline']},{title:"fa fa-hand-pointer-o",searchTerms:['Pointer Hand Outline']},{title:"fa fa-hand-rock-o",searchTerms:['Rock Hand Outline']},{title:"fa fa-hand-scissors-o",searchTerms:['Scissors Hand Outline']},{title:"fa fa-handshake-o",searchTerms:['Handshake Outline']},{title:"fa fa-hand-spock-o",searchTerms:['Spock Hand Outline']},{title:"fa fa-hashtag",searchTerms:['Hashtag']},{title:"fa fa-hdd-o",searchTerms:['Hard Drive']},{title:"fa fa-header",searchTerms:['Header']},{title:"fa fa-headphones",searchTerms:['Headphones']},{title:"fa fa-heart",searchTerms:['Heart']},{title:"fa fa-heartbeat",searchTerms:['Heartbeat']},{title:"fa fa-heart-o",searchTerms:['Heart Outline']},{title:"fa fa-history",searchTerms:['History']},{title:"fa fa-home",searchTerms:['Home']},{title:"fa fa-hospital-o",searchTerms:['Hospital Outline']},{title:"fa fa-hourglass-end",searchTerms:['End Hourglass']},{title:"fa fa-hourglass-half",searchTerms:['Halfway Hourglass']},{title:"fa fa-hourglass-start",searchTerms:['Start Hourglass']},{title:"fa fa-html5",searchTerms:['HTML5 Logo']},{title:"fa fa-id-badge",searchTerms:['ID Badge']},{title:"fa fa-id-card",searchTerms:['ID Card']},{title:"fa fa-id-card-o",searchTerms:['ID Card Outline']},{title:"fa fa-ils",searchTerms:['Shekel Currency Symbol']},{title:"fa fa-inbox",searchTerms:['Inbox']},{title:"fa fa-industry",searchTerms:['Factory Building']},{title:"fa fa-info",searchTerms:['Information']},{title:"fa fa-info-circle",searchTerms:['Information in Circle']},{title:"fa fa-inr",searchTerms:['Rupee Currency Symbol']},{title:"fa fa-instagram",searchTerms:['Instagram Logo']},{title:"fa fa-internet-explorer",searchTerms:['Internet Explorer Browser Logo']},{title:"fa fa-italic",searchTerms:['Italic']},{title:"fa fa-joomla",searchTerms:['Joomla Logo']},{title:"fa fa-jpy",searchTerms:['Yen Currency Symbol']},{title:"fa fa-key",searchTerms:['Key']},{title:"fa fa-keyboard-o",searchTerms:['Keyboard Outline']},{title:"fa fa-krw",searchTerms:['Won Currency Symbol']},{title:"fa fa-language",searchTerms:['Languages']},{title:"fa fa-laptop",searchTerms:['Laptop Computer']},{title:"fa fa-lastfm",searchTerms:['LastFM Logo']},{title:"fa fa-leaf",searchTerms:['Leaf']},{title:"fa fa-leanpub",searchTerms:['Leanpub Logo']},{title:"fa fa-lemon-o",searchTerms:['Lemon']},{title:"fa fa-level-down",searchTerms:['Level Down Arrow']},{title:"fa fa-level-up",searchTerms:['Level Up Arrow']},{title:"fa fa-life-saver",searchTerms:['Life Saver']},{title:"fa fa-lightbulb-o",searchTerms:['Light Globe']},{title:"fa fa-line-chart",searchTerms:['Line Chart']},{title:"fa fa-link",searchTerms:['Chain']},{title:"fa fa-linkedin",searchTerms:['Linkedin Logo']},{title:"fa fa-linkedin-square",searchTerms:['LinkedIn in Square']},{title:"fa fa-linux",searchTerms:['Linux Logo']},{title:"fa fa-list",searchTerms:['List']},{title:"fa fa-list-alt",searchTerms:['Alternate List']},{title:"fa fa-list-ol",searchTerms:['Ordered List']},{title:"fa fa-list-ul",searchTerms:['Unordered List']},{title:"fa fa-location-arrow",searchTerms:['Location Arrow']},{title:"fa fa-lock",searchTerms:['Lock']},{title:"fa fa-low-vision",searchTerms:['Low Vision']},{title:"fa fa-magic",searchTerms:['Magic Wand']},{title:"fa fa-magnet",searchTerms:['Magnet']},{title:"fa fa-male",searchTerms:['Male']},{title:"fa fa-map",searchTerms:['Map']},{title:"fa fa-map-marker",searchTerms:['Map Marker']},{title:"fa fa-map-pin",searchTerms:['Map Pin']},{title:"fa fa-map-signs",searchTerms:['Sign Post']},{title:"fa fa-mars",searchTerms:['Mars']},{title:"fa fa-mars-double",searchTerms:['Double Mars']},{title:"fa fa-maxcdn",searchTerms:['MaxCDN Logo']},{title:"fa fa-medkit",searchTerms:['First Aid Kit']},{title:"fa fa-meetup",searchTerms:['Meetup Logo']},{title:"fa fa-meh-o",searchTerms:['Meh']},{title:"fa fa-mercury",searchTerms:['Mercury']},{title:"fa fa-microchip",searchTerms:['Microchip']},{title:"fa fa-microphone",searchTerms:['Microphone']},{title:"fa fa-microphone-slash",searchTerms:['Disable Microphone']},{title:"fa fa-minus",searchTerms:['Minus Symbol']},{title:"fa fa-minus-square",searchTerms:['Minus Symbol in Square']},{title:"fa fa-minus-square-o",searchTerms:['Minus Symbol in Open Square']},{title:"fa fa-mobile",searchTerms:['Mobile Phone']},{title:"fa fa-money",searchTerms:['Banknote']},{title:"fa fa-moon-o",searchTerms:['Moon']},{title:"fa fa-motorcycle",searchTerms:['Motorcycle']},{title:"fa fa-mouse-pointer",searchTerms:['Mouse Pointer']},{title:"fa fa-music",searchTerms:['Music Note']},{title:"fa fa-neuter",searchTerms:['Neuter']},{title:"fa fa-newspaper-o",searchTerms:['Newspaper']},{title:"fa fa-object-group",searchTerms:['Group']},{title:"fa fa-object-ungroup",searchTerms:['Ungroup']},{title:"fa fa-opencart",searchTerms:['Opencart Logo']},{title:"fa fa-opera",searchTerms:['Opera Browser Logo']},{title:"fa fa-outdent",searchTerms:['Outdent']},{title:"fa fa-paint-brush",searchTerms:['Paint Brush']},{title:"fa fa-paperclip",searchTerms:['Paperclip']},{title:"fa fa-paragraph",searchTerms:['Paragraph']},{title:"fa fa-paste",searchTerms:['Clipboard']},{title:"fa fa-pause",searchTerms:['Pause Symbol']},{title:"fa fa-pause-circle",searchTerms:['Pause Symbol in Circle']},{title:"fa fa-pause-circle-o",searchTerms:['Pause Symbol in Circle Outline']},{title:"fa fa-paw",searchTerms:['Paw Print']},{title:"fa fa-paypal",searchTerms:['PayPal Logo']},{title:"fa fa-pencil",searchTerms:['Pencil']},{title:"fa fa-pencil-square",searchTerms:['Pencil in Square']},{title:"fa fa-pencil-square-o",searchTerms:['Pencil in Open Square']},{title:"fa fa-percent",searchTerms:['Percent Symbol']},{title:"fa fa-phone",searchTerms:['Phone']},{title:"fa fa-phone-square",searchTerms:['Phone in Square']},{title:"fa fa-picture-o",searchTerms:['Picture']},{title:"fa fa-pie-chart",searchTerms:['Pie Chart']},{title:"fa fa-pinterest",searchTerms:['Pinterest Logo']},{title:"fa fa-pinterest-p",searchTerms:['Alternate Pinterest']},{title:"fa fa-pinterest-square",searchTerms:['Pinterest Logo in Square']},{title:"fa fa-plane",searchTerms:['Plane']},{title:"fa fa-play",searchTerms:['Play Symbol']},{title:"fa fa-play-circle",searchTerms:['Play Symbol in Circle']},{title:"fa fa-play-circle-o",searchTerms:['Play Symbol in Open Circle']},{title:"fa fa-plug",searchTerms:['Electrical Plug']},{title:"fa fa-plus",searchTerms:['Plus Symbol']},{title:"fa fa-plus-circle",searchTerms:['Plus Symbol in Circle']},{title:"fa fa-plus-square",searchTerms:['Plus Symbol in Square']},{title:"fa fa-plus-square-o",searchTerms:['Plus Symbol in Open Square']},{title:"fa fa-podcast",searchTerms:['Podcast']},{title:"fa fa-power-off",searchTerms:['Power Off']},{title:"fa fa-print",searchTerms:['Print']},{title:"fa fa-puzzle-piece",searchTerms:['Puzzle Piece']},{title:"fa fa-qrcode",searchTerms:['QR Code']},{title:"fa fa-question",searchTerms:['Question Mark']},{title:"fa fa-question-circle",searchTerms:['Question Mark in Circle']},{title:"fa fa-question-circle-o",searchTerms:['Question Mark in Circle Outline']},{title:"fa fa-quote-left",searchTerms:['Left Quote Marks']},{title:"fa fa-quote-right",searchTerms:['Right Quote Marks']},{title:"fa fa-random",searchTerms:['Random Symbol']},{title:"fa fa-rebel",searchTerms:['Rebel Alliance Logo']},{title:"fa fa-recycle",searchTerms:['Recycle Logo']},{title:"fa fa-reddit",searchTerms:['Reddit Logo']},{title:"fa fa-reddit-square",searchTerms:['Reddit Logo in Square']},{title:"fa fa-refresh",searchTerms:['Refresh']},{title:"fa fa-registered",searchTerms:['Registered Mark']},{title:"fa fa-repeat",searchTerms:['Repeat']},{title:"fa fa-reply",searchTerms:['Reply Mail']},{title:"fa fa-reply-all",searchTerms:['Reply eAll Mail']},{title:"fa fa-retweet",searchTerms:['Retweet']},{title:"fa fa-road",searchTerms:['Road']},{title:"fa fa-rocket",searchTerms:['Rocketship']},{title:"fa fa-rss",searchTerms:['RSS Feed']},{title:"fa fa-rss-square",searchTerms:['RSS Feed Logo in Square']},{title:"fa fa-rub",searchTerms:['Rouble Currency Symbol']},{title:"fa fa-safari",searchTerms:['Safari Browser Logo']},{title:"fa fa-scissors",searchTerms:['Scissors']},{title:"fa fa-search",searchTerms:['Search']},{title:"fa fa-search-minus",searchTerms:['Search Minus']},{title:"fa fa-search-plus",searchTerms:['Search Plus']},{title:"fa fa-sellsy",searchTerms:['Sellsy Logo']},{title:"fa fa-send",searchTerms:['Paper Plane']},{title:"fa fa-send-o",searchTerms:['Paper Plane Outline']},{title:"fa fa-server",searchTerms:['Computer Server']},{title:"fa fa-share",searchTerms:['Forward Mail']},{title:"fa fa-share-alt",searchTerms:['Social Media Share']},{title:"fa fa-share-square",searchTerms:['Forward Mail in Square']},{title:"fa fa-share-square-o",searchTerms:['Forward Mail in Open Square']},{title:"fa fa-shield",searchTerms:['Shield']},{title:"fa fa-ship",searchTerms:['Ship']},{title:"fa fa-shopping-bag",searchTerms:['Shopping Bag']},{title:"fa fa-shopping-basket",searchTerms:['Shopping Basket']},{title:"fa fa-shopping-cart",searchTerms:['Shopping Trolley']},{title:"fa fa-shower",searchTerms:['Shower']},{title:"fa fa-signal",searchTerms:['Signal Strength']},{title:"fa fa-sign-language",searchTerms:['Sign Language']},{title:"fa fa-sign-out",searchTerms:['Sign Out']},{title:"fa fa-simplybuilt",searchTerms:['SimplyBuilt Logo']},{title:"fa fa-sing-in",searchTerms:['Sign In']},{title:"fa fa-sitemap",searchTerms:['Org Structure']},{title:"fa fa-skyatlas",searchTerms:['Sky Atlas Logo']},{title:"fa fa-skype",searchTerms:['Skype Logo']},{title:"fa fa-slack",searchTerms:['Slack Logo']},{title:"fa fa-sliders",searchTerms:['Control Sliders']},{title:"fa fa-slideshare",searchTerms:['Slideshare Logo']},{title:"fa fa-smile-o",searchTerms:['Smiley Face']},{title:"fa fa-snapchat",searchTerms:['Snapchat Logo']},{title:"fa fa-snapchat-ghost",searchTerms:['Snapchat Ghost']},{title:"fa fa-snapchat-square",searchTerms:['Snapchat Logo in Square']},{title:"fa fa-snowflake-o",searchTerms:['Snowflake']},{title:"fa fa-soundcloud",searchTerms:['SoundCloud Logo']},{title:"fa fa-spoon",searchTerms:['Spoon']},{title:"fa fa-spotify",searchTerms:['Spotify Logo']},{title:"fa fa-square",searchTerms:['Square']},{title:"fa fa-square-o",searchTerms:['Open Square']},{title:"fa fa-stack-overflow",searchTerms:['Stack Overflow Logo']},{title:"fa fa-star",searchTerms:['Star']},{title:"fa fa-star-half",searchTerms:['Half Star']},{title:"fa fa-star-o",searchTerms:['Star Outline']},{title:"fa fa-step-backward",searchTerms:['Previous Step']},{title:"fa fa-step-forward",searchTerms:['Next Step']},{title:"fa fa-stethoscope",searchTerms:['Stethoscope']},{title:"fa fa-sticky-note",searchTerms:['Sticky Note']},{title:"fa fa-sticky-note-o",searchTerms:['Sticky Note Outline']},{title:"fa fa-stop",searchTerms:['Stop Symbol']},{title:"fa fa-stop-circle",searchTerms:['Stop Symbol in Circle']},{title:"fa fa-stop-circle-o",searchTerms:['Stop Symbol in Circle Outline']},{title:"fa fa-street-view",searchTerms:['Street View Logo']},{title:"fa fa-strikethrough",searchTerms:['Strikethrough']},{title:"fa fa-subscript",searchTerms:['Subscript']},{title:"fa fa-subway",searchTerms:['Subway']},{title:"fa fa-suitcase",searchTerms:['Suitcase']},{title:"fa fa-sun-o",searchTerms:['Sun']},{title:"fa fa-superscript",searchTerms:['Superscript']},{title:"fa fa-table",searchTerms:['Table']},{title:"fa fa-tablet",searchTerms:['Tablet Computer']},{title:"fa fa-tag",searchTerms:['Tag']},{title:"fa fa-tags",searchTerms:['Tags']},{title:"fa fa-tasks",searchTerms:['Gantt Chart']},{title:"fa fa-telegram",searchTerms:['Telegram Logo']},{title:"fa fa-television",searchTerms:['Television']},{title:"fa fa-text-height",searchTerms:['Text Height']},{title:"fa fa-text-width",searchTerms:['Text Width']},{title:"fa fa-th",searchTerms:['Grid']},{title:"fa fa-thermometer-empty",searchTerms:['Empty Thermometer']},{title:"fa fa-thermometer-full",searchTerms:['Full Thermometer']},{title:"fa fa-thermometer-half",searchTerms:['Half Thermometer']},{title:"fa fa-thermometer-quarter",searchTerms:['Quarter Thermometer']},{title:"fa fa-thermometer-three-quarters",searchTerms:['Three Quarters Thermometer']},{title:"fa fa-th-large",searchTerms:['Large Grid']},{title:"fa fa-th-list",searchTerms:['Alternate List']},{title:"fa fa-thumbs-down",searchTerms:['Thumbs Down']},{title:"fa fa-thumbs-o-down",searchTerms:['Thumbs Down Outline']},{title:"fa fa-thumbs-o-up",searchTerms:['Thumbs Up Outline']},{title:"fa fa-thumbs-up",searchTerms:['Thumbs Up']},{title:"fa fa-thumb-tack",searchTerms:['Push Pin']},{title:"fa fa-ticket",searchTerms:['Ticket']},{title:"fa fa-times",searchTerms:['Letter X']},{title:"fa fa-times-circle",searchTerms:['X in Circle']},{title:"fa fa-times-circle-o",searchTerms:['X in Open Circle']},{title:"fa fa-toggle-off",searchTerms:['Toggle Off']},{title:"fa fa-toggle-on",searchTerms:['Toggle On']},{title:"fa fa-trademark",searchTerms:['Trademark']},{title:"fa fa-train",searchTerms:['Train']},{title:"fa fa-transgender",searchTerms:['Transgender Symbol']},{title:"fa fa-transgender-alt",searchTerms:['Alternate Transgender Symbol']},{title:"fa fa-trash",searchTerms:['Trash Can']},{title:"fa fa-trash-o",searchTerms:['Trash Can Outline']},{title:"fa fa-tree",searchTerms:['Tree']},{title:"fa fa-trello",searchTerms:['Trello Logo']},{title:"fa fa-tripadvisor",searchTerms:['Tripadvisor Logo']},{title:"fa fa-trophy",searchTerms:['Trophy']},{title:"fa fa-truck",searchTerms:['Truck']},{title:"fa fa-try",searchTerms:['Turkish Lira Currency Symbol']},{title:"fa fa-tty",searchTerms:['TTY']},{title:"fa fa-tumblr",searchTerms:['Tumblr']},{title:"fa fa-tumblr-square",searchTerms:['Tumblr Logo in Square']},{title:"fa fa-twitter",searchTerms:['Twitter Logo']},{title:"fa fa-twitter-square",searchTerms:['Twitter Logo in Square']},{title:"fa fa-umbrella",searchTerms:['Umbrella']},{title:"fa fa-underline",searchTerms:['Underline']},{title:"fa fa-undo",searchTerms:['Undo']},{title:"fa fa-universal-access",searchTerms:['Universal Access']},{title:"fa fa-university",searchTerms:['University Building']},{title:"fa fa-unlink",searchTerms:['Broken Chain']},{title:"fa fa-unlock",searchTerms:['Unlocked']},{title:"fa fa-unlock-alt",searchTerms:['Alternate Unlocked']},{title:"fa fa-upload",searchTerms:['Upload File']},{title:"fa fa-usb",searchTerms:['USB Logo']},{title:"fa fa-usd",searchTerms:['Dollar Currency Symbol']},{title:"fa fa-user",searchTerms:['User']},{title:"fa fa-user-circle",searchTerms:['User Circle']},{title:"fa fa-user-circle-o",searchTerms:['User Circle Outline']},{title:"fa fa-user-md",searchTerms:['Doctor']},{title:"fa fa-user-o",searchTerms:['User Outline']},{title:"fa fa-user-plus",searchTerms:['Plus Symbol on User']},{title:"fa fa-users",searchTerms:['Group']},{title:"fa fa-user-secret",searchTerms:['Secret User']},{title:"fa fa-user-times",searchTerms:['Times Symbol on User']},{title:"fa fa-venus",searchTerms:['Venus']},{title:"fa fa-venus-double",searchTerms:['Double Venus']},{title:"fa fa-video-camera",searchTerms:['Video Camera']},{title:"fa fa-vimeo",searchTerms:['Vimeo Logo in Square']},{title:"fa fa-vimeo",searchTerms:['Vimeo Logo']},{title:"fa fa-volume-down",searchTerms:['Volume Down']},{title:"fa fa-volume-off",searchTerms:['Volume Off']},{title:"fa fa-volume-up",searchTerms:['Volume Up']},{title:"fa fa-warning",searchTerms:['Warning Symbol']},{title:"fa fa-wechat",searchTerms:['WeChat Logo']},{title:"fa fa-weibo",searchTerms:['Weibo Logo']},{title:"fa fa-whatsapp",searchTerms:['Whatsapp Logo']},{title:"fa fa-wheelchair",searchTerms:['Wheelchair Symbol']},{title:"fa fa-wifi",searchTerms:['Wifi Logo']},{title:"fa fa-wikipedia-w",searchTerms:['Wikipedia Logo']},{title:"fa fa-windows",searchTerms:['Windows Logo']},{title:"fa fa-wordpress",searchTerms:['WordPress Logo']},{title:"fa fa-wrench",searchTerms:['Wrench']},{title:"fa fa-yelp",searchTerms:['Yelp Logo']},{title:"fa fa-youtube",searchTerms:['YouTube Logo']},{title:"fa fa-youtube-play",searchTerms:['YouTube Play Symbol']},{title:"fa fa-youtube-square",searchTerms:['YouTube Logo in Square']}]
	});

});

// New icon selected from the Icon Picker
$( "body" ).on( "iconpickerSelected", ".icp", function (e) {
	"use strict";
	
	var faiconF = e.iconpickerValue;
	var faicon  = faiconF.replace( "fa", "" );

	var theIcon = e.iconpickerItem.closest( "." + FRAMEWORK_PREFIX + "box-sidebar-artefact-icon" ).querySelector( ".fa" );
	theIcon.classList.add( "selectedIcon" );
	
	// Model Changes
	// Find what row this icon is in
	var rowID = e.iconpickerItem.parents( "." + FRAMEWORK_PREFIX + "box-row-content" ).attr( "id" );
	
	// Is this icon in a tryme?
	var trymeBool = e.iconpickerItem.parents().is( "." + FRAMEWORK_PREFIX + "box-tryme" );
	if ( trymeBool ) {
		// Find the index of the selectedIcon
		var iconNumber = e.iconpickerItem.parents( "." + FRAMEWORK_PREFIX + "box-content" ).index( ".selectedIcon" );
		theModel.getRowByID( rowID ).trymeIconArray( iconNumber, faicon );
	}
	
	// Icon is in the sidebar
	else {
		theModel.getRowByID( rowID ).iconClass( faicon );
	}

	// Update the display
	$( ".selectedIcon" ).removeClass( function ( index, className ) {
		return( className.match(/(^|\s)fa-\S+/g) || []).join(' ');
	}).addClass( faicon ).addClass( "fa-2x fa" ).removeClass( "selectedIcon" );
	updateDisplay();	
});

// CUSTOM COLOR CRAP HERE

// Spectrum Custom Colour initialisation
$( "#form-custom-spectrum" ).spectrum( {
	// Check the Spectrum documentation for how this works.
	change: function( aColor ) {
		"use strict";
		processCustomColor( aColor.toHexString() );
		updateDisplay();
	},		
	showInput: true,
	showInitial: true,
	showPalette: true,
	palette: [ ], 
	preferredFormat: "hex",
	//localStorageKey: "spectrum.homepage", // Any Spectrum with the same string will share selection
	clickoutFiresChange: true
});


// Totally need to rethink these methods wrt theModel model 
	// Show Custom Colour Configurables
    $("#sms-form-custom-color-toggle-0").change(function() {
		'use strict';		
		toggleCustomColorConfigs();
		updateDisplay();
	});		
		
	function toggleCustomColorConfigs() {
		'use strict';	
		$("#customColorConfigurables").slideToggle(200);
		$("#sms-form-box-color").toggleDisabled();	
		processCustomColor();
	}

function processCustomColor( aCustomColor ) {
	
	
	"use strict";		
	var customColor;
	//var useCustomColour = $( "#sms-form-custom-color-toggle-0" ).prop("checked"); -- Moving this to the change.... maybe merge with the change?
	//var customColor = $("#sms-form-custom-color").val();
	//var t = $("#sms-form-custom-spectrum").spectrum("get");
	var currentBoxInlineStyles = "";		
	var newBoxInlineStyles = "";
	var currentBorderInlineStyles = "";		
	var newBorderInlineStyles = "";
	var currentRightInlineStyles = "";		
	var newRightInlineStyles = "";			

	if ( ( typeof aCustomColor === "undefined" ) || ( aCustomColor === "" ) ) {
		//customColor = "#ccaa00";
		customColor = $( "form-custom-spectrum" ).spectrum( "get" ).toString();
	} else {
		customColor = aCustomColor;
	}


	if (useCustomColour) {
		$("#wrapper .sms-box").addClass("sms-custom-color");
	} else {
		$("#wrapper .sms-box").removeClass("sms-custom-color");
	}

	$("#sms-form-custom-spectrum").spectrum("set", customColor);

	// If there is a custom colour, remove it.
	currentBoxInlineStyles = $("#wrapper .sms-tile").attr("style");

	if (currentBoxInlineStyles !== undefined) {
		if (currentBoxInlineStyles.length !== 0) {
			var bgcolorStart = currentBoxInlineStyles.indexOf("background-color");
			if (bgcolorStart > -1) {
				var bgcolorEnd = currentBoxInlineStyles.indexOf(";", bgcolorStart);
				newBoxInlineStyles = currentBoxInlineStyles.slice(0, bgcolorStart);
				if (bgcolorEnd > -1) {
					newBoxInlineStyles += currentBoxInlineStyles.slice(bgcolorEnd+1);
				}
			}
		}
	}

	if ((useCustomColour) && (customColor.length > 0)) {
		newBoxInlineStyles += "background-color:" + customColor + ";";
	} 

	if (newBoxInlineStyles.length === 0) {
		$("#wrapper .sms-box").removeAttr("style");
	} else {
		$("#wrapper .sms-box").attr("style", newBoxInlineStyles);			
	}


	// If there is a custom colour, remove it.
	currentBorderInlineStyles = $("#wrapper .sms-box-clear-bordered").attr("style");

	if (currentBorderInlineStyles !== undefined) {
		if (currentBorderInlineStyles.length !== 0) {
			var bgcolorStart = currentBorderInlineStyles.indexOf("border-bottom-color");
			if (bgcolorStart > -1) {
				var bgcolorEnd = currentBorderInlineStyles.indexOf(";", bgcolorStart);
				newBorderInlineStyles = currentBorderInlineStyles.slice(0, bgcolorStart);
				if (bgcolorEnd > -1) {
					newBorderInlineStyles += currentBorderInlineStyles.slice(bgcolorEnd+1);
				}
			}
		}
	}

	if ((useCustomColour) && (customColor.length > 0)) {
		newBorderInlineStyles += "border-bottom-color:" + customColor + ";";
	} 

	if (newBorderInlineStyles.length === 0) {
		$("#wrapper .sms-box-clear-bordered").removeAttr("style");
	} else {
		$("#wrapper .sms-box-clear-bordered").attr("style", newBorderInlineStyles);			
	}


	// If there is a custom colour, remove it.
	currentRightInlineStyles = $("#wrapper .sms-box-clear-bordered").attr("style");

	if (currentRightInlineStyles !== undefined) {
		if (currentRightInlineStyles.length !== 0) {
			var bgcolorStart = currentRightInlineStyles.indexOf("border-left-color");
			if (bgcolorStart > -1) {
				var bgcolorEnd = currentRightInlineStyles.indexOf(";", bgcolorStart);
				newRightInlineStyles = currentRightInlineStyles.slice(0, bgcolorStart);
				if (bgcolorEnd > -1) {
					newRightInlineStyles += currentRightInlineStyles.slice(bgcolorEnd+1);
				}
			}
		}
	}

	if ((useCustomColour) && (customColor.length > 0)) {
		newRightInlineStyles += "border-left-color:" + customColor + ";";
	} 

	if (newRightInlineStyles.length === 0) {
		$("#wrapper .sms-box-shade-pattern-left-third .sms-box-shade-right").removeAttr("style");
	} else {
		$("#wrapper .sms-box-shade-pattern-left-third .sms-box-shade-right").attr("style", newRightInlineStyles);			
	}		


	return;
}	

// END CUSTOM COLOUR CRAP

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
	$( ".webaim-is-aa, .webaim-is-aaa" ).removeClass( "label-success" ).addClass( "label-default" );

	// Get the foreground & background colours, but remove the hash (API not expecting a #)
	webaimFColor = $( "#wrapper " + FRAMEWORK_PREFIX + "-box" ).css( "color" );
	webaimFColor = webaimFColor.replace( "#", "" );		

	webaimBColor = $( "#wrapper " + FRAMEWORK_PREFIX + "-box-header" ).css( "backgroundColor" );
	webaimBColor = webaimBColor.replace( "#", "" );

	// Build the URL by attaching the foreground colour and background colour
	// The API is the same, but with &api at the end
	webaimURL = webaimURL + "fcolor=" + webaimFColor + "&bcolor=" + webaimBColor;
	webaimAPI = webaimURL + "&api";

	// Attach the URL to the anchor
	$( "a.webaim-href" ).attr( "href", webaimURL );


	// Call the API
	$.getJSON( webaimAPI ).done( function( data ) {
		//console.log(data);

		// Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
		// i.e sms-text-very-big (21px) and font-weight-bold for "larger"

		var calcFontSize = $( "#wrapper " + FRAMEWORK_PREFIX + "-box-header" ).css( "font-size" );
		var calcFontBold =  $( "#wrapper " + FRAMEWORK_PREFIX + "-box-header" ).css( "font-weight" );
		var calcLarger = false;

		// Convert the font size to a float
		calcFontSize = parseFloat(calcFontSize);
		if ( ( ( calcFontSize >= 18 ) && ( calcFontBold >= 700 ) ) || ( calcFontSize >= 24 ) ) {
			calcLarger = true;
		}

		// Determine if it's AA or AAA based on if it's larger text or not
		if ( calcLarger ) {
			if ( data.AALarge === "pass" ) {
				isAA = true;
			}
			if ( data.AAALarge === "pass" ) {
				isAAA = true;
			}				
		} else {
			if ( data.AA === "pass" ) {
				isAA = true;
			}
			if ( data.AAA === "pass" ) {
				isAAA = true;
			}					
		}

		// Colour the AA & AAA badges as appropriate
		if ( isAA ) {
			$( ".webaim-is-aa" ).removeClass( "label-default" ).addClass( "label-success" );
		}

		if (isAAA) {
			$( ".webaim-is-aaa" ).removeClass( "label-default" ).addClass( "label-success" );
		}			
	});

}

// Check if the Delete Buttons should be disabled
function toBeDeletedDisabled() {
	"use strict";
	var theLength = theModel.rowsLength();
	
	if ( theLength < 2) {
		$( "button.func-delete-row" ).prop( "disabled", true );
		$( ".nav-add-row-func .func-delete-row" ).parent().addClass( "disabled" );
	}
	else {
		$( "#btnDeleteRow" ).prop( "disabled", false );
		$( ".nav-add-row-func .func-delete-row" ).parent().removeClass( "disabled" );		
	}
}

// Stops the editing of content if other edit buttons are clicked (?)
function stopEditable() {	
	"use strict";
	
	// Get the text on the Edit Content button
	var btnText = $( "button.func-edit-content" ).text();
	
	// If it's "Turn Off Editable Content", we must be editing content
	if ( btnText.startsWith( "Turn Off" ) ) {
		
		// Flip the Edit Content button back to it's Turn On state
		$( "button.func-edit-content" ).toggleClass( "btn-danger" )
									   .toggleClass( "btn-success" )
									   .text( "Turn On Editable Content" );
		
		// Remove the contenteditable attribute for any element that has it (with a value of true)
		$( "[contenteditable='true']" ).removeAttr( "contenteditable" );
		
		// Find various disabled edit buttons and turn them back on
		var btnSelector  = ".edit-row-btns button, "; 				// All the add row buttons
		    btnSelector += ".edit-row-btns .dropdown-toggle, ";
			btnSelector += ".edit-icon-btns .func-edit-icon, ";		// Edit Icon button
			btnSelector += ".edit-link-btns .func-edit-links, "; 	// All the Edit Links and Titles buttons
			btnSelector += ".edit-link-btns .func-edit-links, ";
			btnSelector += ".func-application button, ";			// The Copy, Convert and Import buttons
			btnSelector += "button.func-toggle-sortable";			// The Enable Drag button
		
		$( btnSelector ).prop( "disabled", false );

		// Bug with hyperlinks not going back to pointer
		$( "a[contenteditable]" ).css( {"cursor":"pointer"} );

		// Remove the editable highlight
		$( ".isEditable" ).removeClass( "showEditable" );		

		updateDisplay();			
	}

}

// Untested - should create a json file of the box and download file.
$( "#func-save-file" ).click( function() {
	"use strict";
	
	var jsonData = theModel.getJSON();
	var blob = new Blob( [ jsonData ], { type: "application/octet-stream" });
	var url = URL.createObjectURL( blob );
	var selector = "." + FRAMEWORK_PREFIX + "-box-header-anchor";
	var filename = ( $( selector ).attr( "id" )) + ".json";
	
	$( this ).append( '<a id="templink" download="' + theFilenname + ' href="' + url + '"></a>' );
	$( "#templink" )[0].click().remove();
});
