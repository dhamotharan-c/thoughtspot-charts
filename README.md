# Thoughtspot Custom Chart - BYOC

Custom chart generation for ThoughtSpot. 

For new custom chart project setup:

    npm create vite
      Your project name
      Framework: Vannila  
      JS Variant: TS
    npm i --save highcharts lodash @thoughtspot/ts-chart-sdk
    npm run dev 
    Note: If any lodash issue raises add "npm i --save-dev @types/lodash", so devdependency will solve the issue.

Version & Requirements:

    Thoughtspot SDK - ^0.0.2-alpha.10
    Highcharts - ^11.4.7

Highchart Usablity:

    ES modules will differs for each charts 

Findings:

    Gauge Chart - 0.0.2-alpha.10
    Vercel url - https://thoughtspot-custom-gaugechart-d98coewcl-dhams-projects.vercel.app
    Dump code from TS SDK example.
    Issues facing - Edit charts > Configure & Settings tabs updates, any edits (eg: changing colors, values, plots) will reflect on chart refresh state only.
    Dynamically it taking the values after apply, but it needs a refresh on chart to reflect those changes visually. 
