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
    - end of phase 2 =>  37.2 s
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

Lead: <!-- name of main contributor to this change -->
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
    - ![first test with catchpoint ](assets/test1.png)

## Baseline Performance

### Performance overall numbers
**AWS**
- ![ AWS overall nums ](assets/overall.png)
**Render**
- ![ Render overall nums](assets/renderOverall.png)

---

### Opportunities  
- opportunities is basically the testing websites suggestions to improve the website
- **AWS**
- ![opportunity0](assets/opps0.png) 
- ![opportunity1](assets/opps1.png)
- ![opportunity2](assets/opps2.png)
- ![opportunity3](assets/opps3.png)
- ![opportunity4](assets/opps4.png)

- **Render** 
- ![opportunity0](assets/renderOpps0.png)
- ![opportunity1](assets/renderOpps1.png)
- ![opportunity2](assets/renderOpps2.png)
---

### Diagnostics
**AWS**
- ![diagnostic0](assets/diag0.png)
- ![diagnostic1](assets/diag1.png)
- ![diagnostic2](assets/diag2.png)
- ![diagnostic3](assets/diag3.png)
- ![diagnostic4](assets/diag4.png)
- ![diagnostic5](assets/diag5.png)

**Render**
- ![diagnostics0](assets/renderDiag0.png)
- ![diagnostics1](assets/renderDiag1.png)
- ![diagnostics2](assets/renderDiag2.png)
- ![diagnostics3](assets/renderDiag3.png)

---

### Accessibility 
**AWS**
- ![accessibility0](assets/access0.png) 
- ![accessibility1](assets/access1.png)
- ![accessibility0](assets/access2.png)

**Render**
- ![accessibility0](assets/renderAccess0.png)
- ![accessibility1](assets/renderAccess1.png)
- ![accessibility2](assets/renderAccess2.png)

---

### Best practices 
**AWS**
- ![best practice](assets/best0.png)

**Render**
- ![best practice](assets/renderBest0.png)

---
### SEO => content best practice
**AWS**
- ![seo0](assets/seo0.png)

**Render**
- ![seo0](assets/renderSeo0.png)

---

### PWA 
**AWS**
- ![pwa](assets/pwa0.png)

**Render**
![pwa](assets/renderPwa0.png)
## Summary of Changes 

---

### <!-- Change n -->

Lead: <!-- name of main contributor to this change -->
Link: <!-- gitlab url to specific lines of code -->

## Conclusion

<!-- Summarize which changes had the greatest impact, note any surprising results and list 2-3 main 
things you learned from this experience. -->