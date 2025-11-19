### Context

- this part is just at the end of phase 2 and the start of third ! and we noticed that the lighthouse performance numbers have jumped from 40-50% to 76%s, even though the goal was not improving performance. Melania and Talon were working on some bugs/chnages that they were thinking from phase 2 and that ended up improving the overall performance as well. so I will just do a comparaison of the changes before we start to work on actual optimizations and improving of our website. note when I say "now" it means when we start phase 3 and not the final results now!

## Summary of Changes

- First contentful paint
  - end of phase 2 => 37.2 s
  - now => 1.5 s
- Largest contentful paint
  - end of phase 2 => 73.4 s
  - now => 2.6 s
- Total blocking time
  - end of phase 2 => 5080 ms
  - now => 160 ms
- Speed index
  - end of phase 2 => 37.2 s
  - now => 1.5 s

---

### End of phase 2 diagnostics:

- Minimize main-thread work 10.0 s
- Reduce JavaScript execution time 6.2 s
- Minify JavaScript Est savings of 6,456 KiB
- Reduce unused JavaScript Est savings of 9,569 KiB
- Avoid serving legacy JavaScript to modern browsers Est savings of 31 KiB
- Page prevented back/forward cache restoration 1 failure reason
- Reduce unused CSS Est savings of 13 KiB
- Avoid enormous network payloads Total size was 14,083 KiB
- Avoid long main-thread tasks 13 long tasks found
  User Timing marks and measures 10 user timings

---

### insights:

- Forced reflow
- LCP request discovery
- Network dependency tree
- Use efficient cache lifetimes Est savings of 7 KiB
- Improve image delivery Est savings of 25 KiB
- LCP breakdown
- 3rd parties

### Diagnostics now !

- Serve images in next-gen formats Est savings of 1,073 KiB
- Largest Contentful Paint element 2,630 ms
- Reduce unused JavaScript Est savings of 1,132 KiB
- Use HTTP/2 7 requests not served via HTTP/2
- Properly size images Est savings of 474 KiB
- Preload Largest Contentful Paint image Est savings of 120 ms
- Image elements do not have explicit width and height
- Serve static assets with an efficient cache policy 1 resource found
- Avoid serving legacy JavaScript to modern browsers Est savings of 9 KiB
- Reduce unused CSS Est savings of 13 KiB
- Avoid enormous network payloads Total size was 2,711 KiB
- Avoid long main-thread tasks 2 long tasks found
- Avoid chaining critical requests 2 chains found
- Minimize third-party usage Third-party code blocked the main thread for 0 ms

Lead: Talon, Melania
Link:


### V1.0.0

### Opportunities

**AWS**
- the numbers are in bytes
- Reduce unused JavaScript => Estimated savings 0.1s
    - Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity.
	    - https://cdn.jsdelivr.net/npm/chart.js	size => 1,537,877 potential saving => 1,095,297
        - http://16.52.46.206/assets/index-G9nAvfbF.js	size => 71,812 potential saving => 64,080 
- Serve images in next-gen formats => Estimated savings 1.2s
    - Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption.
        - http://16.52.46.206/assets/blue_waves-C6c1mKYc.png size => 1,072,650 potential saving => 1,052,209
        - http://16.52.46.206/assets/white-curve-DKXaIjeq.png	size => 56,821 potential saving => 46,273
- Use HTTPS/2
    - HTTP/2 offers many benefits over HTTP/1.1, including binary headers and multiplexing.
- Avoid multiple page redirects => Estimated savings 0.1s
    - Redirects introduce additional delays before the page can be loaded. 
        - time spent in ms
        - http://16.52.46.206/index.html => 5
        - https://16.52.46.206/index.html => 115
        - http://16.52.46.206/index.html =>	0
- Properly size images => Estimated savings 0.1s
    - Serve images that are appropriately-sized to save cellular data and improve load time.
        - http://16.52.46.206/assets/white-curve-DKXaIjeq.png	56,821	47,446
        - http://16.52.46.206/assets/blue_waves-C6c1mKYc.png	1,072,650	43,129
- Eliminate render-blocking resources => Estimated savings 0s
    - Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.
        - http://16.52.46.206/assets/index-CB-ig7zV.css	size => 2253	potential saving => 207
- Avoid serving legacy JavaScript to modern browsers
    - polyfills and transforms enables legacy browser to use new javaScript features. However , many arent necessary for modern browsers. for your bundled javascript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of the code shipped to modern browsers, while retaining for legacy browsers.
- Reduce unused CSS
    - Reduce unused rules from styleshees and defer CSS not used for above the fold content to decrease bytes consumed by network activity.
- Preload Largest Contentful Paint image
    - If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP.
        - http://16.52.46.206/assets/white-curve-DKXaIjeq.png	=> 0

**Render**

- Preload Largest Contentful Paint image  potential saving in ms => 210
    - if the LCP element is dynamically added to the page, you should preload the image in order to improve LCP
        - assets.white-curve.png
- Initial server response time was short => Root document took 95 ms
- Reduce unused CSS => Estimated savings 0.1s
    - .maplibregl-map{font:12....}  size => 13,107  potential saving in bytes => 13,107
- Reduce unused JavaScript
    - reduce unused javascript and defer loading scripts until they are required to decrease bytesconsumed by network.
    - assets/index-someHash.js => 1,471,009 potential saving bytes => 1,047,672
    - npm/chart.js => 71,767  potential saving in bytes => 64,039 
- Avoid serving legacy JavaScript to modern browsers
- Properly size images => Potential savings of 88 KiB
    - serve images that are appropriately-sized to save cellular data and improve load time
        - assets/white-curve.png size=> 56,821 => potential savingg in bytes => 47,446
        - assets/blue-waves.png size => 1,072,650 potential saving in bytes => 43,129
- Serve images in next-gen formats
    - image formats like Webp and AVIF often provide better compression than PNG or JPEG, which means faster download and less data consumption.
        - assets/bluewave-someHash.png size => 1,072,650 potential saving in bytes => 1,052,209 
        - assets/white-curve-someHash.png size => 56,821 potential saving in bytes => 46,273

### Diagnostics

**AWS**

- Avoid chaining critical requests => 2 chains found
    - The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.
        - http://16.52.46.206/index.html => 0.0kb
        - https://16.52.46.206/index.html => 0.0kb
        - http://16.52.46.206/index.html => 0.7kb
        - http://16.52.46.206/assets/index-CB-ig7zV.css => 2.2kb
        - http://16.52.46.206/assets/index-G9nAvfbF.js => 1502.5kb
 - Avoids enormous network payloads => Total size was 2,711 KiB
    - largest network payload cost users real money and are highly corelated with long load times. 
        - http://16.52.46.206/assets/blue_waves-C6c1mKYc.png => 1,072,982
        - http://16.52.46.206/assets/index-G9nAvfbF.js => 1,538,536
        - https://cdn.jsdelivr.net/npm/chart.js => 72565
        - http://16.52.46.206/assets/white-curve-DKXaIjeq.png => 57149
        - http://16.52.46.206/assets/map-e_IAmjJw.jpg => 30569
        - http://16.52.46.206/assets/index-CB-ig7zV.css => 2253
        - http://16.52.46.206/canada.svg => 1368
        - http://16.52.46.206/index.html => 741
- Avoid long main-thread tasks => 1 long task found
    - lists the longest tasks on the main thread. useful for identifying worst contributors to input delay
        - assets/indexSomeHash.js start time => 1768 duration in ms => 370
        - assets/indexSomeHash.js start time => 2140 duration in ms => 153
        - unattributable          start time => 1689 duration in ms => 70
- Minimize third-party usage
    - Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading.
	    - Main-Thread Blocking Time in ms => 72565
            - https://cdn.jsdelivr.net/npm/chart.js

- JavaScript execution time => 0.1 s
    - Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. 
    - cpu time - script evaluation - script parse
    - http://16.52.46.206/assets/index-G9nAvfbF.js	240	117	1
    - Unattributable	101	1	0
    - http://16.52.46.206/index.html	54	1	0
    
- Minimizes main-thread work => 0.4 s
    - Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. 
        - Category - Time Spent (in ms)
            - Script Evaluation	=> 464 
            - other => 291
            - Style & Layout => 85
            - Rendering	=> 16
            - Script Parsing & Compilation => 14 
            - Parse HTML & CSS => 1
- Avoids an excessive DOM size => 275 elements
     - a large DOM will increase memory usage, cause longer style calculation and produce costly layout reflows.
- Image elements do not have explicit width and height
    - Set an explicit width and height on image elements to reduce layout shifts and improve CLS.
        - http://16.52.46.206/assets/map-e_IAmjJw.jpg
- Serve static assets with an efficient cache policy 1 resource found
    - A long cache lifetime can speed up repeat visits to your page. 
        - https://cdn.jsdelivr.net/npm/chart.js	cache ttl => 604,800,000 transfer size => 72220

**Render**
- Largest Contentful Paint element => 2700 ms
- Avoid chaining critical requests => 2 chains found
- Avoids enormous network payloads => Total size was 2,645 KiB
- Avoid long main-thread tasks => 3 long task found
- Minimize third-party usage => Third-party code blocked the main thread for 0 ms
    - chart.js transfer size => 72221 blocking time => 0
- JavaScript execution time => 0.4 s
- Minimizes main-thread work => 0.8 s
- Avoids an excessive DOM size => 275 elements
- Image elements do not have explicit width and height
    - set an explicit width and height on image element to reduce layout shifts and improve CLS
- Serve static assets with an efficient cache policy => 1 resource found

### Accessibility

**AWS**

- Background and foreground colors do not have a sufficient contrast ratio.
    - Low-contrast text is difficult or impossible for many users to read. 
    - Failing Elements
        - form > fieldset > section.input-row > button
        - Fix any of the following:
            - Element has insufficient color contrast of 3.67 (foreground color: #ffffff, background color: #3b82f6, font size: 13.2pt (17.6px), font weight: normal). Expected contrast ratio of 4.5:1
        - div.chart-grid > article.chart-container > div.city-info > h4
        - Fix any of the following:
            - Element has insufficient color contrast of 4.18 (foreground color: #1e6ffb, background color: #f8f8f8, font size: 12.6pt (16.8px), font weight: bold). Expected contrast ratio of 4.5:1
    - relatedNode
        - section.chart-section > div.chart-grid > article.chart-container > div.city-info
        - div#root > section.scroll-content > footer.footer > a
        - Fix any of the following:
            - Element has insufficient color contrast of 3.85 (foreground color: #646cff, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1
    - relatedNode
        - body > div#root > section.scroll-content > footer.footer
        - div#root > section.scroll-content > footer.footer > a
        - Fix any of the following:
            - Element has insufficient color contrast of 3.85 (foreground color: #646cff, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1
    - relatedNode
        - body > div#root > section.scroll-content > footer.footer
        - div#root > section.scroll-content > footer.footer > a
        - Fix any of the following:
            - Element has insufficient color contrast of 3.85 (foreground color: #646cff, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1
    - relatedNode
    - body > div#root > section.scroll-content > footer.footer
    - div#root > section.scroll-content > footer.footer > em.footer-disclaimer
    - Fix any of the following:
        - Element has insufficient color contrast of 2.68 (foreground color: #999999, background color: #f8f8f8, font size: 10.2pt (13.6px), font weight: normal). Expected contrast ratio of 4.5:1
    - relatedNode
    - body > div#root > section.scroll-content > footer.footer
- Image elements do not have [alt] attributes
    - Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. 
    - Failing Elements
        - section.scroll-content > section.map-wrapper > section.country-map > imgFix any of the following:
        - Element does not have an alt attribute
        - aria-label attribute does not exist or is empty
        - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
        - Element has no title attribute
        - Element's default semantics were not overridden with role="none" or role="presentation"

**Additional Items to Check Manually**

- Interactive controls are keyboard focusable
  - Custom interactive controls are keyboard focusable and display a focus indicator.
- Interactive elements indicate their purpose and state
  - Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements.
- The page has a logical tab order
  - Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen.
- Visual order on the page follows DOM order
  - DOM order matches the visual order, improving navigation for assistive technology.
- User focus is not accidentally trapped in a region
  - A user can tab into and out of any control or region without accidentally trapping their focus.
- The user's focus is directed to new content added to the page
  - If new content, such as a dialog, is added to the page, the user's focus is directed to it.
- HTML5 landmark elements are used to improve navigation
  - Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology.
- Offscreen content is hidden from assistive technology
  - Offscreen content is hidden with display: none or aria-hidden=true.
- Custom controls have associated labels
  - Custom interactive controls have associated labels, provided by aria-label or aria-labelledby.
- Custom controls have ARIA roles
  - Custom interactive controls have appropriate ARIA roles.

**Render**

- Background and foreground colors do not have a sufficient contrast ratio.
  - low-contrast text is difficult or impossible for many users to read.
- Image elements do not have [alt] attributes
    - infomative elements should aim for short, descriptive alternate text. decoratice elements can be ignored with an empty alt attribute. 

**Additional Items to Check Manually**

- Interactive controls are keyboard focusable
  - Custom interactive controls are keyboard focusable and display a focus indicator.
- Interactive elements indicate their purpose and state
  - Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements.
- The page has a logical tab order
  - Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen.
- Visual order on the page follows DOM order
  - DOM order matches the visual order, improving navigation for assistive technology.
- User focus is not accidentally trapped in a region
  - A user can tab into and out of any control or region without accidentally trapping their focus.
- The user's focus is directed to new content added to the page
  - If new content, such as a dialog, is added to the page, the user's focus is directed to it.
- HTML5 landmark elements are used to improve navigation
  - Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology.
- Offscreen content is hidden from assistive technology
  - Offscreen content is hidden with display: none or aria-hidden=true.
- Custom controls have associated labels
  - Custom interactive controls have associated labels, provided by aria-label or aria-labelledby.
- Custom controls have ARIA roles
  - Custom interactive controls have appropriate ARIA roles.

### Best practices

**AWS**

- trust and safety
- Ensure CSP is effective against XSS attacks
  - A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks.
  - Severity => High
  - No CSP found in enforcement mode

- User Experience
- Displays images with incorrect aspect ratio
  - Image display dimensions should match natural aspect ratio.
  - http://16.52.46.206/assets/white-curve-DKXaIjeq.png 1366 x 136 (10.04) 2940 x 383 (7.68)
  - http://16.52.46.206/assets/blue_waves-C6c1mKYc.png 1366 x 681 (2.01) 1262 x 768 (1.64)

- General 
- Missing source maps for large first-party javascript

**Render**

- Ensure CSP is effective against XSS attacks

  - A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks.
  - Severity => High
    - No CSP found in enforcement mode

- User Experience
- Displays images with incorrect aspect ratio
  - Image display dimensions should match natural aspect ratio.
  - https://five20-project-safari-chiru-dunbar.onrender.com/assets/white-curve-DKXaIjeq.png 1366 x 136 (10.04) 2940 x 383 (7.68)
  - https://five20-project-safari-chiru-dunbar.onrender.com/assets/blue_waves-C6c1mKYc.png 1366 x 681 (2.01) 1262 x 768 (1.64)

- General 
- Missing source maps for large first-party java script
    - source maps translate minified code to the original source code. this helps developers debug in production. in addition, lighthouse is able to provide furthure insights. consider deploying source maps to take advantage of these benefits.
    
### SEO

**AWS**

- Document does not have a meta description
  - Meta descriptions may be included in search results to concisely summarize page content.
- Image elements do not have [alt] attributes
  - Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute.
  - Failing Elements
    - section.scroll-content > section.map-wrapper > section.country-map > imgFix any of the following:
    - Element does not have an alt attribute
    - aria-label attribute does not exist or is empty
    - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
    - Element has no title attribute
    - Element's default semantics were not overridden with role="none" or role="presentation"

**Additional Items to Check Manually**

- Structured data is valid
  - Run the Structured Data Testing Tool and the Structured Data Linter to validate structured data.

**Render**

- Document does not have a meta description
  - Meta descriptions may be included in search results to concisely summarize page content.
- Image elements do not have [alt] attributes
  - Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute.
  - Failing Elements
    - section.scroll-content > section.map-wrapper > section.country-map > imgFix any of the following:
    - Element does not have an alt attribute
    - aria-label attribute does not exist or is empty
    - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
    - Element has no title attribute
    - Element's default semantics were not overridden with role="none" or role="presentation"

**Additional Items to Check Manually**

- Structured data is valid
  - Run the Structured Data Testing Tool and the Structured Data Linter to validate structured data.

### PWA

**AWS**

- Web app manifest or service worker do not meet the installability requirements => 2 reasons
  - Service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. With proper service worker and manifest implementations, browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement.
  - Failure reason
    - Page is not served from a secure origin
    - Page has no manifest <link> URL
- Is not configured for a custom splash screen
  - A themed splash screen ensures a high-quality experience when users launch your app from their homescreens.
  - Failures => No manifest was fetched
- Does not set a theme color for the address bar.
  - The browser address bar can be themed to match your site.
  - Failures:
    - No manifest was fetched
    - No `<meta name="theme-color">` tag found
- Content is sized correctly for the viewport
  - If the width of your app's content doesn't match the width of the viewport, your app might not be optimized for mobile screens.
- Manifest doesn't have a maskable icon
  - A maskable icon ensures that the image fills the entire shape without being letterboxed when installing the app on a device.

**Additional Items to Check Manually**

- Site works cross-browse
  - To reach the most number of users, sites should work across every major browser.
- Page transitions don't feel like they block on the network
  - Transitions should feel snappy as you tap around, even on a slow network. This experience is key to a user's perception of performance.
- Each page has a URL
  - Ensure individual pages are deep linkable via URL and that URLs are unique for the purpose of shareability on social media.

**Render**

- Web app manifest or service worker do not meet the installability requirements
  - Service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. With proper service worker and manifest implementations, browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement.
  - Failure reason => Page has no manifest <link> URL
- Is not configured for a custom splash screen
  - A themed splash screen ensures a high-quality experience when users launch your app from their homescreens.
  - Failure => No manifest was fetched
- Does not set a theme color for the address bar
  - The browser address bar can be themed to match your site.
  - Failures =>
    - No manifest was fetched
    - No `<meta name="theme-color">` tag found
- Content is sized correctly for the viewport
  - If the width of your app's content doesn't match the width of the viewport, your app might not be optimized for mobile screens.
- A <meta name="viewport"> not only optimizes your app for mobile screen sizes, but also prevents a 300 millisecond delay to user input.
- Manifest doesn't have a maskable icon
  - A maskable icon ensures that the image fills the entire shape without being letterboxed when installing the app on a device.
- Site works cross-browser
  - To reach the most number of users, sites should work across every major browser.
- Page transitions don't feel like they block on the network
  - Transitions should feel snappy as you tap around, even on a slow network. This experience is key to a user's perception of performance.
- Each page has a URL
  - Ensure individual pages are deep linkable via URL and that URLs are unique for the purpose of shareability on social media.


### screenshot dump

- Opportunity

<img src="assets/renderOpps0.png" alt="Opportunity 0" width="800" />
<img src="assets/renderOpps1.png" alt="Opportunity 0" width="800" /> 
<img src="assets/renderOpps2.png" alt="Opportunity 0" width="800" />

- Diagnostics
**AWS**

<img src="assets/diag0.png" alt="diagnostic 0" width="800" />
<img src="assets/diag1.png" alt="diagnostic 1" width="800" />
<img src="assets/diag2.png" alt="diagnostic 2" width="800" />
<img src="assets/diag3.png" alt="diagnostic 3" width="800" />
<img src="assets/diag4.png" alt="diagnostic 4" width="800" />
<img src="assets/diag5.png" alt="diagnostic 5" width="800" />

**Render**

<img src="assets/renderDiag0.png" alt="diagnostic 0" width="800" />
<img src="assets/renderDiag1.png" alt="diagnostic 1" width="800" />
<img src="assets/renderDiag2.png" alt="diagnostic 2" width="800" />
<img src="assets/renderDiag3.png" alt="diagnostic 3" width="800" />

---

- Accessibility

**AWS**

<img src="assets/access0.png" alt="accessibility 0" width="800" />
<img src="assets/access1.png" alt="accessibility 1" width="800" />
<img src="assets/access2.png" alt="accessibility 2" width="800" />

**Render**

<img src="assets/renderAccess0.png" alt="accessibility 0" width="800" />
<img src="assets/renderAccess1.png" alt="accessibility 1" width="800" />
<img src="assets/renderAccess2.png" alt="accessibility 2" width="800" />
