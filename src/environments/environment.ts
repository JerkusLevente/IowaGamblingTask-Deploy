// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from 'firebase/compat/app'; // Import the Firebase namespace
 // Import your Firebase configuration


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAdLkp1_SvO42FXDa8yiAzB1gxnVyA7WV0",
    authDomain: "iowa-gambling-task-2459b.firebaseapp.com",
    projectId: "iowa-gambling-task-2459b",
    storageBucket: "iowa-gambling-task-2459b.appspot.com",
    messagingSenderId: "155219537798",
    appId: "1:155219537798:web:5559d9f667740bd60ac607",
    measurementId: "G-G2CJSK0425"
  },
};

firebase.initializeApp(environment.firebaseConfig);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
