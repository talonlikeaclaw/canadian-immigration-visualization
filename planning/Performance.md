# Performance of Canadian Linguistic journey

- [On AWS](http://16.52.46.206/index.html)
- [On Render](https://five20-project-safari-chiru-dunbar.onrender.com/)

## Introduction and Methodology

- This report looks at the performance of our web app on both AWS and Render. The goal is to see how the site performs before we start making real optimization changes in Phase 3. Web performance matters because it affects how fast users can interact with the page and how smooth the overall experience feels.

- For testing, we used Chrome’s Lighthouse reports and Catchpoint’s WebPageTest tool. Both were run on desktop (Chrome, Toronto location, Cable 5/1 Mbps, 28 ms RTT). We looked mainly at metrics like First Contentful Paint (FCP), Largest Contentful Paint (LCP), Total Blocking Time (TBT), and Speed Index. These tests help us compare results from the end of Phase 2 to now and see how much the site improved even before doing focused optimizations.

- [**Context before we start**](Backup.md#context)

- **tools we will use to test performance**
  - Browser lighthouse report
  - https://www.webpagetest.org
  - Chrome browser
  - https://ioapp.catchpoint.com/auth/WptAccount/Login
  - Device => desktop - Chrome
  - location => Toronto, Canada
  - connection => Cable(5/1 Mbps 28ms RTT)
  - Number of runs => (1-3)
  - Tests performed both ( site performance, lighthouse)

## Baseline Performance

**AWS**

<img src="assets/test1.png" alt="first test with catchpoint" width="800" />
<img src="assets/overall.png" alt="AWS overall numbers" width="800" />

**Render**

<img src="assets/renderOverall.png" alt="Render overall numbers" width="800" />

**The following links will bring you to another page where we have added complete details about our website tests**

- [Go to Opportunities](Backup.md#opportunities)

---

- [Go to Diagnostics](Backup.md#diagnostics)

---

- [Go to Accessibility](Backup.md#accessibility)

---

- [Go to Best practice](Backup.md#best-practices)

---

- [Go to SEO](Backup.md#seo)

---

- [Go to PWA](Backup.md#pwa)

---

### V1.0.1

#### Summary of Changes

##### Server-side Optimizations

- Link: [Server-side Optimization](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs)

###### Browser Cache-Control

- Lead: **Talon**

I added explicit browser cache controls to benefit from Vite rollup's hashed file names. I used an example provided in the lecture notes to set the hashed files to cache for a year, and I also added the `immutable` tag because the hashed files are `immutable` in nature. This means that the browser knows that it will never have to ping the server about those files ever again because the file name will change if the context changes. While caching doesn't improve performance the first time a user visits our web app, any subsequent visits will see nice performance bumps as the browser servers the documents from its cache.

- Implemented browser caching rules for `client/dist`:
  - `index.html` => `no-cache`
  - Hashed files => `max-age=31536000, immutable`
- Improved overall client-side and localhost load performance.

- Link: [Browser cache rules](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs?file=a419538ddb09d617809b78f68696e80833c4051b#a419538ddb09d617809b78f68696e80833c4051b_34_48)

###### Server Memory Cache

- Lead: **Talon**

I implemented caching directly to the Express server to reduce the amount of database requests over time. When the server is first started there will be no performance improvements. However, as users query our routes, the Express server will store those queries and their results in a `Map`. This greatly reduces the overall latency when fetching data. Our dataset is static, so we benefit greatly from caching on the server (as you can see from the below results).

- Added `immigrationCache` and `languageCache` directly into the routes.
- This change resulted in great optimization and gave the following change in results:

| City      | Avg Pre | Avg Post | Improvement |
| --------- | ------- | -------- | ----------- |
| Halifax   | 57.5ms  | 24.5ms   | 57%         |
| Montreal  | 57.5ms  | 36ms     | 36%         |
| Toronto   | 48ms    | 26.5ms   | 44%         |
| Calgary   | 49ms    | 19ms     | 61%         |
| Vancouver | 43.5ms  | 26ms     | 40%         |

**Average response latency gains: 47.6%!!!**

- Links:
  - [Immigration Cache](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs?file=aa17feaf687510ece026764aff66e967de9277c4#aa17feaf687510ece026764aff66e967de9277c4_5_5)
  - [Language Cache](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs?file=18969587d68ed0c6391d0b1a9f5bb28dcfe30e9b#18969587d68ed0c6391d0b1a9f5bb28dcfe30e9b_5_5)
  - [Before/after proof](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2897619430)

###### Express Compression

- Lead: **Talon**

I added the compression middleware to the Express application, greatly reducing the payload size of fetched content. I had no idea that browsers could decompress content so quickly. It was such a simple change, for such great performance improvement. I was able to confirm that compression was working properly, but checking the response headers and looking for the `Content-Encoding` header. You could also tell because the payloads themselves were smaller!

- Links:
  - [Code](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/blob/staging/server/app.mjs?ref_type=heads#L43)

#### switched from plotly to chart.js

- The biggest difference with this change was the size js file in dist/assets/index-SomeHash.js which went from 5095.92kb (1535.73 compressed) to 375.19 kb (123.83 compressed)
- Initially, I was working on the front-end trying to fix a layout issue. After sending a few hours trying to find the root cause and fixing it, Talon suggested that I try Chart.js.
- And that's what motived the switch from Plotly.js to Chart.js
- Only after I fixed my layout shift issue and build the project that I realized the size of the `dist/assets/index-SomeHash.js` went down significantly.
- This was one of the first optimization changes we did with out even realizing it.

- Lead: **Melania**
- [with plotly](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2893449310)
- [ with chart.js](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2893450729)
- [ code link](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/48/diffs?file=1304fc061eb9b3fb296bfd0cff93c11c512e321e#1304fc061eb9b3fb296bfd0cff93c11c512e321e_3_2)

- after these changes our overall numbers have changed [here](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2897859910) is before and after the changes were applied.

- Avoid chaining critical requests => 2 chains found
- Largest Contentful Paint element => 1,120 ms
- Avoids enormous network payloads => Total size was 1,329 KiB
  - http://16.52.46.206/assets/blue_waves-C6c1mKYc.png
    - before => 1072982
    - now => 1072992
  - http://16.52.46.206/assets/index-G9nAvfbF.js
    - before => 1538536
    - now => 123863
  - https://cdn.jsdelivr.net/npm/chart.js
    - before => 72565
    - now => 72220
  - http://16.52.46.206/assets/white-curve-DKXaIjeq.png
    - before => 57149
    - now => 57159
  - http://16.52.46.206/assets/map-e_IAmjJw.jpg
    - before => 30569
    - now => 30579
  - http://16.52.46.206/assets/index-CB-ig7zV.css
    - before => 2253
    - now => 2277
  - http://16.52.46.206/canada.svg
    - before => 1368
    - now => 1054
  - http://16.52.46.206/index.html
    - before => 741
    - now => 730

---

### V1.0.2

#### Summary of Changes

##### Optimizing

- The overall goal of these changes was to get as close to 100 on all the Google Lighthouse categories
- The good thing is that most of the improvements I had to do were just low hanging fruit like using alt attributes for images, compressing our images, etc.
- Preloading the images that show up in our hero section (above the fold) made the number for the Performance category go up.
- Unfortunately, the thing I could not fix per se, is that the images in the hero section (blue waves and white curve) do not maintain the same aspect ratio on both desktop and mobile views. This is done intentionally for stylistic reasons. Since I wanted the blue waves to cover the entire 'above the fold' view, the ratio could not be maintained on smaller screens. This aspect gets flagged by the lighthouse report (Best Practices)

- [Before any changes for frontend](FinalChangesReport.md#before)
- [Compressed blue wave image](FinalChangesReport.md#compressed_bluewave)
- [Added img alt ](FinalChangesReport.md#alt)
- [Add contrast to images ](FinalChangesReport.md#contrast)
- [Trim blue_wave img](FinalChangesReport.md#trim_blue_wave)
- [Preload blue wave img ](FinalChangesReport.md#preload)
- [Added meta tags ](FinalChangesReport.md#meta)

- Lead:**Melania**
- Links:
  - [corresponding issue ](dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar#83)
  - [corresponding MR](dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar!55)
  - [blue wave direct link](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/blob/32a511d266eaf7b63d74a067957b5ab86d5baa68/client/src/assets/images/blue_waves.png)
  - [alt](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/55/diffs?file=4cd6750f2ec85995373e84f1633b501d6cd65cf0#4cd6750f2ec85995373e84f1633b501d6cd65cf0_15_14)
  - [contrast](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/55/diffs?file=6464364828334fe066233459e0d6b74556c861b8#6464364828334fe066233459e0d6b74556c861b8_104_102)
  - [preload](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/55/diffs?file=0f416da26130c4b5a608cf3e939a70da2b426880#0f416da26130c4b5a608cf3e939a70da2b426880_8_16)
  - [meta](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/55/diffs?file=0f416da26130c4b5a608cf3e939a70da2b426880#0f416da26130c4b5a608cf3e939a70da2b426880_6_6)

##### Loading components dynamically (lazy + suspense)

- So, for the optimization part of our website I did use lazy to load the App children components and then I use the Suspense Wrapper to wrap where they are being called. this method was effective at making the initial loading of App faster however it created other issues such as layout shift when I used the lazy with Map component I removed it. then they interfered with the `react intersection observer` which after testing and discussing Talon removed them and kept only the one's for lazy loading the charts.
- Then, I tried memoizing the components. this was effective for all the renders happening after the first time because every time the child component renders the App renders as the parent component then the App makes other children to re render. this would prevent all the second renders of the children however it would increase the App initial rendering time significantly. as our goal was to make the FCP as fast as possible we did not kept this changes.
- I also tried to use the intersection observer on data explorer component as it is one of the largest component it made the UI weird because the Footer would be placed before the data explorer.

- [Before](FinalChangesReport.md#beforeLazy)
- [After](FinalChangesReport.md#afterLazy)

##### Memoizing App children

- [lighthouse](FinalChangesReport.md#lighthouse)
- [We decided to not keep this](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/60#note_2905256906)

- Lead: **Habib**
- Link:
  - [corresponding issue ](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2903035175)
  - [corresponding MR](dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar!60)
  - [Lazy load components](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/60/diffs?file=163e76491d088e6785415d7fa5e054ca65ba4fe8#163e76491d088e6785415d7fa5e054ca65ba4fe8_12_7)
  - [Wrap with Suspense](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/60/diffs?file=163e76491d088e6785415d7fa5e054ca65ba4fe8#163e76491d088e6785415d7fa5e054ca65ba4fe8_79_92)

## Conclusion

<!-- Summarize which changes had the greatest impact, note any surprising results and list 2-3 main
things you learned from this experience. -->
