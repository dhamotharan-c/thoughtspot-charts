# thoughtspot-custom-chart
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
