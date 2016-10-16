
To run the app:

"npm install -g npm" (optional)

"npm install"  
"node app.js"


To regenerate all build files you need gulp-cli available in your command line and then run:
 "gulp" in order to run all targets: lint, test, test-client, jsdocs, start node
 Or ie. "gulp test" independently.
 

Test/Coverage report:
Test/Client Coverage report:
Documentation:
Working Demo: https://wtrforecast.herokuapp.com/


In total took around 5.5 hours mainly because of project setup issues.
Intentionally did not pick an existing full stack framework like MEANJS (which i am really familiar with)
 because it would not allow me to demonstrate es6 and project setup skills. 
Intentionally favored es6 fetch against $http angular service.

If i had more time: 
Could have done better SOC(app,service,controller) for client web project setup.
Could have added type assist on city input text and work on fancy styles and animations.
If user types invalid city it  should be replaced by London wich is the default city the service returns either way.
