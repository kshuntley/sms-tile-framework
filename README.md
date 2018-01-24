# SMS Tile CSS Framework

This CSS (Cascading Stylesheet) framework allows the user to create "tiles" and other artefacts on Moodle that are consistent with the design set by the SMS R2 training team. This look is achieved by applying CSS classes to elements.

While you can write the HTML by hand, we recommend using the Tile Builder to create the HTML and CSS to build your tiles. The Tile Builder (tilebuilder.v2.html) does not display well in Microsoft Edge (to be debugged), so it's recommended you download the entire folder to your desktop. 

The file custom.css contains CSS from the Marcus Clark theme.

The file sms-style.css (and sms-style.min.css) should be added to the target Moodle. It is generated from the LESS files in the less folder. Changes to variables (such as colours, etc) should be made to the respective LESS file.

## How do I use the Tile Builder? (Or this framework?)

All the styles are accomplished by just adding CSS classes to HTML elements. That said, knowing which class to add where is tricky. That's why I built the *Tile Builder*. The Tile Builder will automatically write the HTML for you.

1. Build your tile.
1. Create a label in Moodle.
2. In the label editor, click on the "kitchen sink" button to show the next level of buttons.
3. Click on the HTML button.
4. Copy the code from the tile builder and paste into the label.
5. Save, rinse, repeat.

### This still isn't working!

Are you trying it on the live Staff Moodle? This framework requires the addition of the CSS to the theme (be it Clean, Essential or Marcus Clark or any other Moodle theme). It works in my Dev Moodle because I have added the CSS to my Moodle.

Take a look at http://http://54.66.160.31 to see it in action.

How we get this into STAFF Moodle? Well, I hope to win you all over with charm and cookies. *Please come to WG43 for your cookie.*

### Doesn't adding more CSS mean the Moodle will be slower because it will have to download another CSS file?

The CSS is pretty small when minimised. The CSS will be cached. The CSS means we won't have to use large JPGs or PNGs with text in them. The CSS will actually reduce page sizes. Significantly. I can work it out for you, but I haven't yet. But trust me, the overall page size is much smaller.

### The CSS has references to SMS through out it?

Don't sweat it. I'm rewritting the Tile Builder in my spare time to accommodate for a variable set prefix. And the LESS already takes it into account.

### What's this SVG thing?

Something I was working on; another design where we had a circle with the steps of the process as small circles (or "bubbles") around it. I was trying to do this all with SVG. It's... well, it's undone. But it's still pretty awesome. You can define how many bubbles you want, the radii of circle and the bubbles, if the circles are rings, and the whole thing builds it for you.

It required much relearning of grade school trigonometry that was completely covered with cowebs in my head. 

## Did I just put my work online for the whole world to see?

Ugh.

Forgive me, I need to tidy up the files. I'm pretty happy with the less but the html/js is just ugly right now. Forgive me, I haven't had much time to polish it all.

## Contact me

Kenneth Scott Huntley /
WG43 Marcus Clark, Ultimo TAFE, Sydney /
kenneth.huntley3@tafensw.edu.au /
[@kshuntley] 

[@kshuntley]: http://www.twitter.com/kshuntley
