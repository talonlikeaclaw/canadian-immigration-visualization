# Performance of

- [On AWS](http://16.52.46.206/index.html)
- [On Render](https://five20-project-safari-chiru-dunbar.onrender.com/)

## Introduction and Methodology

- This report looks at the performance of our web app on both AWS and Render. The goal is to see how the site performs before we start making real optimization changes in Phase 3. Web performance matters because it affects how fast users can interact with the page and how smooth the overall experience feels.

- For testing, we used Chrome’s Lighthouse reports and Catchpoint’s WebPageTest tool. Both were run on desktop (Chrome, Toronto location, Cable 5/1 Mbps, 28 ms RTT). We looked mainly at metrics like First Contentful Paint (FCP), Largest Contentful Paint (LCP), Total Blocking Time (TBT), and Speed Index. These tests help us compare results from the end of Phase 2 to now and see how much the site improved even before doing focused optimizations.

## Baseline Performance

<!-- Summarize initial results for each tool that you used. Did the tools
detect all the performance issues you see as a user? -->

- this part is just at the end of phase 2 and the start of third ! and we noticed that the lighthouse performance numbers have jumped from 40-50% to 76%s, even though the goal was not improving performance. Melania and Talon were working on some bugs/chnages that they were thinking from phase 2 and that ended up improving the overall performance as well. so I will just do a comparaison of the changes before we start to work on actual optimizations and improving of our website. note when I say "now" it means when we start phase 3 and not the final results now!

## Summary of Changes

<!-- Briefly describe each change and the impact it had on performance (be specific). If there
was no performance improvement, explain why that might be the case -->

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

### <!-- Change 1 -->

Lead: Talon, Melania
Link: <!-- gitlab url to specific lines of code -->

### Tests

<!-- Briefly state how you gathered data about app performance, and in what environment
(which browsers, what browser versions, what kind of device, OS,
width and height of viewport as reported in the console with `window.screen`) -->

- Here we started to test our website
- tools we will use to test performance

  - Browser lighthouse report
  - https://www.webpagetest.org/

- Chrome browser
- https://ioapp.catchpoint.com/auth/WptAccount/Login
  - Device => desktop - Chrome
  - location => Toronto, Canada
  - connection => Cable(5/1 Mbps 28ms RTT)
  - Number of runs => (1-3)
  - Tests performed both ( site performance, lighthouse)
  - <img src="assets/test1.png" alt="first test with catchoint" width="800" />

## Baseline Performance

### Performance overall numbers

**AWS**

<img src="assets/overall.png" alt="AWS overall numbers" width="800" />

**Render**

<img src="assets/renderOverall.png" alt="Render overall numbers" width="800" />

---

### Opportunities

- opportunities is basically the testing websites suggestions to improve the website

- **AWS**

<img src="assets/opps0.png" alt="Opportunity 0" width="800" />
<img src="assets/opps1.png" alt="Opportunity 1" width="800" />
<img src="assets/opps2.png" alt="Opportunity 2" width="800" />
<img src="assets/opps3.png" alt="Opportunity 3" width="800" />
<img src="assets/opps4.png" alt="Opportunity 4" width="800" />

- **Render**

<img src="assets/renderOpps0.png" alt="Opportunity 0" width="800" />
<img src="assets/renderOpps1.png" alt="Opportunity 0" width="800" /> 
<img src="assets/renderOpps2.png" alt="Opportunity 0" width="800" />

---

### Diagnostics

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

### Accessibility

**AWS**

<img src="assets/access0.png" alt="accessibility 0" width="800" />
<img src="assets/access1.png" alt="accessibility 1" width="800" />
<img src="assets/access2.png" alt="accessibility 2" width="800" />

**Render**

<img src="assets/renderAccess0.png" alt="accessibility 0" width="800" />
<img src="assets/renderAccess1.png" alt="accessibility 1" width="800" />
<img src="assets/renderAccess2.png" alt="accessibility 2" width="800" />

</div>

---

### Best practices

**AWS**

<img src="assets/best0.png" alt="best practice" width="800" />

**Render**

<img src="assets/renderBest0.png" alt="best practice" width="800" />

---

### SEO => content best practice

**AWS**

<img src="assets/seo0.png" alt="Seo 0" width="800" />

**Render**

<img src="assets/renderSeo0.png" alt="Seo 0" width="800" />

---

### PWA

**AWS**

<img src="assets/pwa0.png" alt="pwa 0" width="800" />

**Render**

<img src="assets/renderPwa0.png" alt="pwa 0" width="800" />

---

### V1.0.1

## Summary of Changes
    - Caching Enhancements
        - Added immigrationCache and languageCache directly into their routers.
        - Implemented browser caching rules for client/dist:
        - index.html => `no-cache`
        - Hashed files => `max-age=31536000`, `immutable`
    - Improved overall client-side and localhost load performance.
    - Server Optimization
        - Installed and configured compression middleware to reduce payload size and speed up responses.
        - Testing & Code Quality
        - Added clarifying comments for TDD stubs.
        - Fixed tests that were incorrectly triggering the cache.
    - Renamed Swagger route from /api-docs to /docs.
    - Removed unused files from the public directory.

- This change resulted in great optimization and gave the following change in results
    - ## AWS Latency Improvement Summary

| City       | Avg Pre | Avg Post | Improvement |
|------------|---------|----------|-------------|
| Halifax    | 57.5ms  | 24.5ms   | 57%         |
| Montreal   | 57.5ms  | 36ms     | 36%         |
| Toronto    | 48ms    | 26.5ms   | 44%         |
| Calgary    | 49ms    | 19ms     | 61%         |
| Vancouver  | 43.5ms  | 26ms     | 40%         |

**Average response latency gains: 47.6%!!!**

- Lead: Talon
- Link: [serverside optimization](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs)


### V1.0.1

## Summary of Changes
- switched from plotly to chart.js

- biggest differnce with this change was the size js file in dist/assets/index-SomeHash.js which went from 5095.92kb (1535.73 compressed) to 375.19 kb (123.83 compressed)


- Lead: Melania 
- Link: [ plotly to chart.js](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/48/diffs) 


## Conclusion

<!-- Summarize which changes had the greatest impact, note any surprising results and list 2-3 main
things you learned from this experience. -->
