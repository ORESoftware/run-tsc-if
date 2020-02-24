
:: TODOs


1. if skipLibCheck is on - then we shouldn't run tsc just because package.json has changed

2. potentially infinite loop - package.json changes so we run npm install, which alters package.json for the next one.
Solution is to use deep-equal to compare package.json files instead of using shasum at command line.