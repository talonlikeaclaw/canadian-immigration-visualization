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

#### Caching Enhancements

- Added immigrationCache and languageCache directly into their routers.
- Implemented browser caching rules for client/dist:
- index.html => no-cache
- Hashed files => max-age=31536000, immutable
- Improved overall client-side and localhost load performance.

#### Server Optimization

- Installed and configured compression middleware to reduce payload size and speed up responses.

- This change resulted in great optimization and gave the following change in results

- Lead: Talon
- Link:

  - [server-side optimization](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs)
  - [immigration cache](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs?file=aa17feaf687510ece026764aff66e967de9277c4#aa17feaf687510ece026764aff66e967de9277c4_5_5)
  - [Language cache](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs?file=18969587d68ed0c6391d0b1a9f5bb28dcfe30e9b#18969587d68ed0c6391d0b1a9f5bb28dcfe30e9b_5_5)
  - [Browser cache rules](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/merge_requests/52/diffs?file=a419538ddb09d617809b78f68696e80833c4051b#a419538ddb09d617809b78f68696e80833c4051b_34_48)
  - [before/after proof](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2897619430)
  - [AWS latency improvement proof ](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/65#note_2897637516)

| City      | Avg Pre | Avg Post | Improvement |
| --------- | ------- | -------- | ----------- |
| Halifax   | 57.5ms  | 24.5ms   | 57%         |
| Montreal  | 57.5ms  | 36ms     | 36%         |
| Toronto   | 48ms    | 26.5ms   | 44%         |
| Calgary   | 49ms    | 19ms     | 61%         |
| Vancouver | 43.5ms  | 26ms     | 40%         |

**Average response latency gains: 47.6%!!!**

#### switched from plotly to chart.js

- biggest difference with this change was the size js file in dist/assets/index-SomeHash.js which went from 5095.92kb (1535.73 compressed) to 375.19 kb (123.83 compressed)

- Lead: Melania
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

##### Optimizing Frontend 

- [Before any changes for frontend](FinalChangesReport.md#before) 
- [Compressed blue wave image](FinalChangesReport.md#compressed_bluewave)
- [Added img alt ](FinalChangesReport.md#alt)
- [Add contrast to images ](FinalChangesReport.md#contrast)
- [trim blue_wave img](FinalChangesReport.md#trim_blue_wave)
- [Added img alt ](FinalChangesReport.md#alt)
- [Added img alt ](FinalChangesReport.md#alt)



- Lead: Melania 
- Link: 
  - [blue wave direct link](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/blob/32a511d266eaf7b63d74a067957b5ab86d5baa68/client/src/assets/images/blue_waves.png)



##### Loading components dynamically 

- Lead:
- Link: 


## Conclusion

<!-- Summarize which changes had the greatest impact, note any surprising results and list 2-3 main
things you learned from this experience. -->
