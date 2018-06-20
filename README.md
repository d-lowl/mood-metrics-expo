# mood-metrics-expo

# Installation
1. Follow to application link: https://expo.io/@dlowl/mood-metrics-expo
2. Install expo client (link present at the web page above)
3. Open the link in the expo client.

Interaction should be straight forward from this point, but if you have any questions you can send me a message or ask me in person.

# Build from source
0. Download Expo XDE
1. Clone the repository
2. npm install or yarn install to install dependencies
3. Open project in Expo XDE

Now you can run the app in iOS or Android simulator (if installed) or publish it to Expo.

# Configuration
Expo does not support env variables configuration (as far as I am aware), hence the Graphcool backend URI is hardcoded in src/Store.js. Change it appropriately. 

The backend schema and deployment instructions can be found at <https://github.com/d-lowl/mood-metrics-graphcool>
