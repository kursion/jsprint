# JSPrint
This module can be use to create printable report (instead of Word, OpenOffice, Latex, ...)
directly with HTML, CSS, JS.

# Recommendations
> We recommend you to print documents using Google Chrome (you can even save it to PDF).
> With Firefox you should play with the scale in the print preview mode (sometime you can
> let the "Shrink to fit" option, else choose 100%, 90%, 80%... and check if the page is
> correct), then print. On windows you can install CutePDF Writer to export document from
> firefox to PDF (but Chrome is better).

# Printing
In the dialog box (of Chrome), make sure to choose those settings:

1. Paper size: "A4"
2. Disable "Headers and footers"
3. Margins: "Default"
4. Check in the preview window that everythings is alright
5. Print ;)

# Install
> You will need to have jQuery in order to make JSPrint works.

1. Download jsprint.css and jsprint.js to your directory
2. Create your .html file
3. Import the default JSPrint CSS style: jsprint.css between 'head' tags (`<head>...</head>`),
4. Import the vendor file at the end of your html document, eg: after `</body>`
5. Include JSprint library after jQuery and load it.
```html
<!-- Between <head> tags -->
<link rel="stylesheet" type="text/css" href="jsprint.css" />
```

```html
<!-- After </body> tag -->
<script type="text/javascript" src="vendor.js"></script>
```

```html
<!-- After vendor importation -->
<script type="text/javascript" src="jsprint.js"></script>
```

```html
<!-- After jsprint.js -->
<script>
  require("jsprint/app");
</script>
```

# Functionalities
- Auto refresh the content
- Printable with all browsers
- CSS, JavaScript (+jQuery) only
- Easy to learn, use and adapt
- Header can be customize
- Auto-generating of the summary (from H1 to H4)
- Auto-generating pages number
- Auto-generating bibliography with reference number for links
- Adding legend to images
- Auto-generating bibliography with title and reference for image


# Classname glossary
| Classname       | Description              |
| --------------- | ------------------------ |
| jsprint-def-header  | Definition of the header |
| jsprint-summary     | Summary container        |
| jsprint-page        | Creates a new page       |
| jsprint-title       | Title of the section that is included in the summary |
| jsprint-bibligraphy | Bibliography container |
| jsprint-imageography | Bibliography container |


# Settings
| Option     | Default       | Description              |
| -----------|-------------- | ------------------------ |
| title-nbr  | true          | Show the number aside the title and according to the summary |
| page-nbr   | true          | Show or hide page number |
| page-outof | true          | Show outof page number |
| page-outof-symbole  | "/"  | Symbole to show for outof page number |
| auto-refresh | false       | Auto refresh (beta) HTML page |
| auto-interval | 2000       | Auto refresh interval |


# Attribut glossary
| TAG             | Attribut | Description   |
| --------------- | ---------|-------------- |
| img             | title    | Create a nice legend for a specific image |
| img             | ref      | Reference of the image |
| a               | ref      | Reference of the link |


# Create a new page
You will need to add a container with the classname **jsprint-page**, eg:
```html
<!-- This is a normal page -->
<div class="jsprint-page">
  <h1 class="jsprint-title">Introduction</h1>
  <p>Check the source code of this example in order to learn how to use this module</p>
</div>
```

# Create a "summary"
In order to have a proper summary of your report, you just need to add the class name **jsprint-title** to the
title of a new section, eg:
```html
<h1 class="jsprint-title">Introduction</h1>
<h2 class="jsprint-title">Subsection</h2>
<h3 class="jsprint-title">Subsubsection</h3>
<h4 class="jsprint-title">Subsubsubsection</h4>
```

then you will need to add the container where the summary should start and add the proper class
to your page **jsprint-page-summary**. Here is a little example of how the structure should look like:
```html
<div class="jsprint-page jsprint-page-summary">
  <div class="jsprint-summary"></div>
</div>
```

# Adding a header
Create a container with the classname **jsprint-def-header**. This will define the header of the page.
This one will be added to every single pages of your report, so you need to define the content
of it only once. The content of the header can be valid HTML or normal text, eg:
```html
<div class="jsprint-def-header">
  <p>This is my header - <i>on every pages</i></p>
</div>
```

# Adding bibliography
Create a container with the classname **jsprint-bibliography**. This will define the container
that will contains the the bibliography. All the links that you define with '<a>' tags will
appear as: link, text of the link and a reference number.
```html
<a href='http://mylink.com'>This is a link</a>
```

then you will need to add the container where you want to show the biblography
```html
<div class="jsprint-bibliography"></div>
```

# Adding a legend to an image
In order to add a legend after the image, just use the **title** attribut from the image tag, eg:
```html
<img src='...' title='This is my legend'>
```

# Adding imageography
```html
<img src='...' title='This is my legend' ref='Author/Reference'>
```

then you will need to add the container where you want to show the imageography
```html
<div class="jsprint-imageography"></div>
```


# Style customization
Just edit the ***theme.css*** as you wish. It is not recommended to update
***jsprint.css*** if you don't understand everything in that file.

# FAQ
## I don't want my title to appear in the summary
When creating your title tag (H1, H2, H3, ...) don't add the class **jsprint-title**
to it. This will avoid the title to be added into the summary.

# Contributions
Yves Lange (author)

# Comments
```text
Wanted to say thanks. You've done groundbreaking work on JsPrint. 
Its a simple and elegant solution to reporting problem in PHP apps.
We've been thinking about a solution for months and finally someone
comes up with an excellent answer.
So we'll be waiting for the next update.

Thanks again.
Peace be with you, Mohsin .R
@WaysAll
p.s. What is on the roadmap?
```
I'm waiting for some feedbacks and I'll continue to improve this lib that I'm using everyday.
I already converted this lib into CoffeeScript so now... it's less verbose and I'll improve the
H1,2,3,4 with the summarize functionnality. I also have the project to make it a bit more
compatible with the other browser.
