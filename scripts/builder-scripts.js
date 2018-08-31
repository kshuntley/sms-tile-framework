    /*

        SMS Tile Builder script
        KSH Aug 14, 2018

    */
	
	var  inlineBool = false;
	
    // Totes borrowed from https://codepen.io/shaikmaqsood/pen/XmydxJ/
    function copyToClipboard(element) {
		'use strict';
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text().trim()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function getPortaitHTML() {
		'use strict';
        return '<div class="sms-tile sms-layout-portrait sms-text-light"><a href="#" class="sms-url"></a><div class="sms-tile-text">This is your tile text.</div></div>';
    }

	function processDropShadow() {
		'use strict';		
        $("#wrapper .sms-tile").toggleClass("sms-shadow");
		displayTileOutput();
	}
	
	function toggleImageConfigs() {
		'use strict';
		$("#imageConfigurables").slideToggle(200);
		processImage();
	}
	
	function toggleCustomColorConfigs() {
		'use strict';		
		$("#customColorConfigurables").slideToggle(200);
		$("#sms-form-tile-color").toggleClass("disabled");	
		processCustomColor();
	}	
	
	function toggleRibbonConfigs() {
		'use strict';
		$("#ribbonConfigurables").slideToggle(200);
		processRibbon();
	}
	
	function toggleGoBtnConfigs() {
		'use strict';		
		$("#gobtnConfigurables").slideToggle(200);
		processGoBtn();
	}	
	
	function processLayout() {
		'use strict';		
		var newLayout = $("#sms-form-tile-layout").val();

		// Remove existing tile layout, and then set tile layout
		$("#wrapper .sms-tile").removeClass(function (index, className) {
			return(className.match (/(^|\s)sms-layout-\S+/g) || []).join(' ');
		});
		$("#wrapper .sms-tile").addClass(newLayout);

		processColor();
		//processCustomColor();
		processTriangles();
		processRibbon();

		processGoBtn();
		processImage();

		displayTileOutput();
	}
	
	function processText() {
		'use strict';		
		var newText = $("#sms-form-tile-text-value").val().replace(/\n/g,"<br>");
		
        // Change the tile's text
        if (newText === "") { newText = "This is your tile text."; }
        $("#wrapper .sms-tile-text").html(newText);		
		
		processGoBtn();
	}
	
	function processImage() {
		'use strict';			
        var includeImage  = $("#sms-form-tile-image-0").prop("checked");
		var newLayout = $("#sms-form-tile-layout").val();
		
		// Get rid of any existing image
        $("#wrapper .sms-tile-img").remove();		
		
		// If you want an image...
        if (includeImage) {
            var imgURL = "";
            var imgHTML = "";
            var imgWidth = 0;
            var imgHeight = 0;
            var imgAlt = "";

            // Set imgURL and imgAlt to be the value from the form.
            imgURL = $("#sms-form-tile-image-url").val();
            imgAlt = $("#sms-form-tile-image-alt").val();

            // If the form is empty, pick a default url...
            switch(newLayout) {
                case "sms-layout-portrait":
                case "sms-layout-portrait-200":
                    imgWidth = 150;
                    imgHeight = 100;
                    break;
					
                case "sms-layout-portrait-216":
                    imgWidth = 180;
                    imgHeight = 120;
                    break;					

                case "sms-layout-portrait-220":
                    imgWidth = 150;
                    imgHeight = 145;
                    break;
					
                case "sms-layout-portrait-220i":
                    imgWidth = 200;
                    imgHeight = 132;
                    break;					

                //case "sms-layout-large-portrait":
                default:
                    imgWidth = 180;
                    imgHeight = 175;
            }

            // Set some defaults in case of empty fields
            if (imgURL === "") {
                imgURL = "https://picsum.photos" + "/" + imgWidth + "/" + imgHeight + "/?random";
            }

            if (imgAlt === "") {
                imgAlt = "A generic picture";
            }

            // Build the img tag
            imgHTML = '<img src="' + imgURL + '" width="' + imgWidth + '" height="' + imgHeight + '" alt="' + imgAlt + '" class="sms-tile-img" />';

            // Add the new image.
            switch(newLayout) {
                case "sms-layout-portrait":
                case "sms-layout-portrait-200":
                    $("#wrapper .sms-url").after(imgHTML);
                    break;

                //case "sms-layout-portrait-220":
                //case "sms-layout-portrait-220i":					
                //case "sms-layout-large-portrait":
                default:
                    $("#wrapper .sms-url").before(imgHTML);
            }

        } 		
	}
	
	function processURL() {
		'use strict';	
        var newURL = $("#sms-form-tile-url-value").val();
		
        // Change the tile's URL
        if (newURL === "") { newURL = "#"; }
        $("#wrapper .sms-url").attr("href", newURL);		
	}
	
	function processRibbon() {
		'use strict';	
        var includeRibbon = $("#sms-form-tile-ribbon-0").prop("checked");

		// Get rid of any existing ribbons
		$("#wrapper .sms-ribbon").remove();		

        // If you want a ribbon...
        if (includeRibbon) {
            var ribbonText = "";
            var ribbonColor = "";
            var ribbonLocation = "";
            var ribbonHTML = "";

            // Set the ribbonText and the ribbonColor to be the value from the form
            ribbonText  = $("#sms-form-tile-ribbon-text").val();
            ribbonColor = $("#sms-form-tile-ribbon-color").val();
            ribbonLocation = $("input[name=sms-form-tile-ribbon-location]:checked").val();

            // Build the ribbon HTML
            if (ribbonText === "") { ribbonText = "New!"; }
            ribbonHTML = '<div class="sms-ribbon"><span>' + ribbonText + '</span></div>';

            // Add the ribbon
            $("#wrapper .sms-tile-text").before(ribbonHTML);
			$("#wrapper .sms-layout-landscape").append(ribbonHTML);

            // Color the ribbon
            $("#wrapper .sms-ribbon").addClass(ribbonColor);

            // Position the ribbon
            $("#wrapper .sms-ribbon").addClass(ribbonLocation);

        }		
	}
	
	function processGoBtn() {
		'use strict';	
        var includeGoBtn  = $("#sms-form-tile-gobtn-0").prop("checked");
		
		// Remove any existing Go Buttons
		$("#wrapper .sms-go-btn").remove();		
		
		// If you want a Go button...
        if (includeGoBtn) {
            var goBtnHTML = "";
            var goBtnText  = $("#sms-form-tile-gobtn-text").val();


            // Build the Go Button
            if (goBtnText === "") { goBtnText = "Go..."; }
            goBtnHTML = '<span class="sms-go-btn">' + goBtnText + '</span>';

            // Add the Go button
            $("#wrapper .sms-tile-text").append(goBtnHTML);
        } 
	}
	
	function processTriangles() {
		'use strict';			
        var newTriangle = $("input[name=sms-form-tile-triangle]:checked").val();
		
        // Remove all existing triangles, then add the correct triangle
        $("#wrapper .sms-tile").removeClass("sms-tri").removeClass(function (index, className) {
            return(className.match (/(^|\s)sms-tri-\S+/g) || []).join(' ');
        });
        if (newTriangle === "sms-tri-none") { 
        	$("#wrapper .sms-tile").removeClass("sms-tri-bgcolor-white sms-tri-bgcolor-offwhite");
			$("#sms-form-tile-tri-color-0").prop("checked", true);
			$("input[name=sms-form-tile-tri-color]").prop("disabled", true);
		} else {
            $("#wrapper .sms-tile").addClass(newTriangle).addClass("sms-tri");
			$("input[name=sms-form-tile-tri-color]").prop("disabled", false);
			processTriColor();
        } 
		
	}
	
	function processTriColor() {
		'use strict';			
        var newTriColor = $("input[name=sms-form-tile-tri-color]:checked").val();
		
        // Remove all existing triangles, then add the correct triangle
        $("#wrapper .sms-tile").removeClass("sms-tri-bgcolor-white sms-tri-bgcolor-offwhite");
        if (newTriColor !== "sms-tri-bgcolor-natural") {
            $("#wrapper .sms-tile").addClass(newTriColor);
        }		
	}	
	
	function processColor() {
		'use strict';			
        var newColor = $("#sms-form-tile-color").val();	
		
        // Remove exisiting color, then add the new color
        $("#wrapper .sms-tile").removeClass(function (index, className) {
            return(className.match (/(^|\s)sms-color-\S+/g) || []).join(' ');
        });
        $("#wrapper .sms-tile").addClass(newColor);	
		
	}
	
	function processTextColor() {
		'use strict';			
        var newTextColor  = $("input[name=sms-form-tile-text-color]:checked").val();

        // Remove existing text color, and then set text color
        $("#wrapper .sms-tile").removeClass("sms-text-light sms-text-dark");
        $("#wrapper .sms-tile").addClass(newTextColor);
        $("#wrapper .sms-box-header").removeClass("sms-text-light sms-text-dark");
        $("#wrapper .sms-box-header").addClass(newTextColor);		
	}
	
	function processTextSize() {
		'use strict';	
        var newTextSize   = $("input[name=sms-form-tile-text-size]:checked").val();		
		
		// Remove existing text size, and then set text size
        $("#wrapper .sms-tile").removeClass("sms-text-size sms-text-big sms-text-small sms-text-very-small sms-text-very-big");
        if (newTextSize !== "sms-text-size") {
            $("#wrapper .sms-tile").addClass(newTextSize);
        }
	}
		
	function processTextAlign() {
		'use strict';			
		var newTextAlign = $("input[name=sms-form-tile-text-align]:checked").val();
		
        // Remove existing text alignment, and then set text alignment
        $("#wrapper .sms-tile-text").removeClass("text-left text-right text-center");
        $("#wrapper .sms-tile-text").addClass(newTextAlign);			
	}
		
	function displayTileOutput() {
		'use strict';			
		// Show the HTML preview
        var outputHTML = $("#wrapper").html();

        // Write the output so it can be copied
        $("#output").text(outputHTML);	
	}	
	
	function processCustomColor() {
		'use strict';			
		var useCustomColour = $("#sms-form-custom-color-toggle-0").prop("checked");
		var customColor = $("#sms-form-custom-color").val();
		var currentInlineStyles = "";		
		var newInlineStyles = "";
		//var oldColor = "";
		
		// If there is a custom colour, remove it.
		currentInlineStyles = $("#wrapper .sms-tile").attr("style");
		
		if (currentInlineStyles !== undefined) {
			if (currentInlineStyles.length !== 0) {
				var bgcolorStart = currentInlineStyles.indexOf("background-color");
				if (bgcolorStart > -1) {
					var bgcolorEnd = currentInlineStyles.indexOf(";", bgcolorStart);
					newInlineStyles = currentInlineStyles.slice(0, bgcolorStart);
					if (bgcolorEnd > -1) {
						newInlineStyles += currentInlineStyles.slice(bgcolorEnd+1);
					}
				}
			}
		}
		
		if ((useCustomColour) && (customColor.length > 0)) {
			newInlineStyles += "background-color:" + customColor + ";";
		} 
		
		if (newInlineStyles.length === 0) {
			$("#wrapper .sms-tile").removeAttr("style");
		} else {
			$("#wrapper .sms-tile").attr("style", newInlineStyles);			
		}
		
		return;
	}	
	
	function runInlineConverter() {
		'use strict';			
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
	
		// Remove any class that starts with .sms
		//$('#wrapper *').removeClass(function (index, className) {
		//	return (className.match(/(^|\s)sms-\S+/g) ||[]).join(' ');
		//});
		
		// Strip out any empty classes
		//$('#wrapper *[class=""]').removeAttr('class');
		
		displayTileOutput();
		inlineBool = true;
		
		// Sneak the float, left and top back into the display
		$('#wrapper').children('div').css({"float": "left", "top": topVal, "left": leftVal});
		
		return;
	}

	function resetTile() {
		'use strict';		
		processLayout();
		processText();
		processURL();
		processTriangles();
		processTextColor();
		processTextSize();
		processTextAlign();
		
        displayTileOutput();
	}
	
    // Doc Ready
    $(function() {
		'use strict';		
        $(".configurable").hide();
		
		// Can't figure out why this one won't hide!
		//$("#customColorConfigurables").hide();
		
        $("#wrapper").html(getPortaitHTML());
	
		resetTile();		

    });
	
	$("#tilebuilder-form select, #tilebuilder-form textarea, #tilebuilder-form input").focus(function() {
		'use strict';		
		if(inlineBool) {
			$("#wrapper").html(getPortaitHTML());
			resetTile();
		}
	});

	
    // Show Image Configurables
    $("#sms-form-tile-image-0").change(function() {
		'use strict';		
		toggleImageConfigs();
		displayTileOutput();
	});
	
	// Show Custom Colour Configurables
    $("#sms-form-custom-color-toggle-0").change(function() {
		'use strict';		
		toggleCustomColorConfigs();
		displayTileOutput();
	});	
		
    // Show Ribbon Configurables
    $("#sms-form-tile-ribbon-0").change(function() {
		'use strict';		
		toggleRibbonConfigs();
		displayTileOutput();
	});

    // Show Go Button Configurables
    $("#sms-form-tile-gobtn-0").change(function() {
		'use strict';		
		toggleGoBtnConfigs();
		displayTileOutput();
	});
	
	// Layout changes
	$("#sms-form-tile-layout").change(function() {
		'use strict';		
		processLayout();
		displayTileOutput();
	});
	
	// Text changes
	$("#sms-form-tile-text-value").on('change keyup paste', function() {
		'use strict';		
		processText();
		displayTileOutput();
	});
	
	// Alignment changes
	$("input[name=sms-form-tile-text-align]").change(function() {
		'use strict';		
		processTextAlign();
		displayTileOutput();
	});

	// URL changes
	$("#sms-form-tile-url-value").on('change keyup paste', function() {
		'use strict';		
		processURL();
		displayTileOutput();
	});

	// Image Toggle
	$("#sms-form-tile-shadow-0").change(function() {
		'use strict';
		processDropShadow();
	});
	
	// Image Toggle
	$("#sms-form-tile-image-0").change(toggleImageConfigs());
	
		// Image URL changes
		$("#sms-form-tile-image-url").on('change paste', function() {
			'use strict';			
			processImage();
			displayTileOutput();
		});
	
		// Image ALT changes
		$("#sms-form-tile-image-alt").on('change paste', function() {
			'use strict';			
			processImage();
			displayTileOutput();
		});
	
	// Custom Colour Toggle
	$("#sms-form-custom-color-toggle-0").change(toggleCustomColorConfigs());
	
		// Custom Colour changes
		$("#sms-form-custom-color").keypress(function (e) {
			'use strict';				
			var key = e.which;
			if (key===13) {
				processCustomColor();
				displayTileOutput();
			}
		}).blur(processCustomColor());
	
	// Triangle changes
	$("input[name=sms-form-tile-triangle]").change(function() {
		'use strict';			
		processTriangles();
		displayTileOutput();
	});
	
	// TriColor changes
	$("input[name=sms-form-tile-tri-color]").change(function() {
		'use strict';			
		processTriColor();
		displayTileOutput();
	});	
	
	// Tile Color changes
	$("#sms-form-tile-color").change(function() {
		'use strict';			
		processColor();
		displayTileOutput();
	});
	
	// Text Color changes
	$("input[name=sms-form-tile-text-color]").change(function() {
		'use strict';			
		processTextColor();
		displayTileOutput();
	});
	
	// Text Size changes
	$("input[name=sms-form-tile-text-size]").change(function() {
		'use strict';			
		processTextSize();
		displayTileOutput();
	});
	
	
	// Go Button Toggle
	$("#sms-form-tile-gobtn-0").change(toggleGoBtnConfigs());	
	
		// Go Button Text changes
		$("#sms-form-tile-gobtn-text").change(function() {
			'use strict';				
			processGoBtn();
			displayTileOutput();
		});
	
	// Ribbon Toggle
	$("#sms-form-tile-ribbon-0").change(toggleRibbonConfigs());
	
		// Ribbon Text changes
		$("#sms-form-tile-ribbon-text").on('change keyup paste', function() {
			'use strict';				
			processRibbon();
			displayTileOutput();
		});
	
		// Ribbon Color changes
		$("#sms-form-tile-ribbon-color").change(function() {
			'use strict';				
			processRibbon();
			displayTileOutput();
		});	
	
		// Ribbon Location changes
		$("input[name=sms-form-tile-ribbon-location]").change(function() {
			'use strict';				
			processRibbon();
			displayTileOutput();
		});	
	
	// Title Case changes
	$("input[name=sms-form-fix-for-older-moodle]").change(function() {
		'use strict';			
		displayTileOutput();
	});	
	
	// Text Color changes
	$("input[name=sms-form-header-text-color]").change(function() {
		'use strict';			
		displayTileOutput();
	});


	// Modal Importing
	$('#myTileBuilderModal').on('shown.bs.modal', function () {
		'use strict';
    	$('#SMSImportTextarea').focus();
	});	
	
	$('#importTile').click(function() {
		'use strict';
		var inputTile = "";
		var tileCheck;
		var oldWrapper;
		
		inputTile = $('#myTileBuilderModal').find('#SMSImportTextarea').val();
		oldWrapper = $("#wrapper").html();
		
		$("#wrapper").html(inputTile);
		
		tileCheck = $("#wrapper div").hasClass("sms-tile");
		if (!tileCheck) {
			$("#wrapper").html(oldWrapper);
			
		}
			
		displayTileOutput();		
		$('#myTileBuilderModal').modal('hide');
	});
