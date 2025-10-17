// You can add custom JavaScript here
// or create additional files.
//
// Learn more here: https://developer.zesty.io/docs/code-editor/javascript-files/

window.fbAsyncInit = function () {
  FB.init({
    appId: "948444587078464", // Replace with your App ID
    cookie: true, // Enable cookies to allow the server to access the session
    xfbml: true, // Parse social plugins on this webpage
    version: "v19.0", // Use this Graph API version
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// async function loginWithFacebook() {
//   FB.login(
//     function (response) {
//       if (response.status === "connected") {
//         // The user is logged in and has authenticated your app
//         const accessToken = response.authResponse.accessToken;
//         let userEmail = null;

//         // Use the token to fetch user information or other actions
//         FB.api("/me", { fields: "name,email" }, function (userInfo) {
//           console.log("User Info:", userInfo);
//           userEmail = userInfo.email;
//           // Optionally store user info in local storage or use it as needed
//           localStorage.setItem("fbUserInfo", JSON.stringify(userInfo));
//           loginZestyUser();
//         });
//       } else {
//         // The person is not logged into your app or we are unable to tell
//         console.log("User cancelled login or did not fully authorize.");
//       }
//     },
//     { scope: "public_profile,email" }
//   ); // Request permissions
// }

// const firebaseConfig = {
//   apiKey: "AIzaSyD9K6jTlFzWJEf164M7QfA1X7P7jgQ-z7Y",
//   authDomain: "cause-circle-429522.firebaseapp.com",
//   projectId: "cause-circle-429522",
//   storageBucket: "cause-circle-429522.appspot.com",
//   messagingSenderId: "150409629176",
//   appId: "1:150409629176:web:6004a4daa4e0094c29da0d",
//   databaseURL: `https://cause-circle-429522.firebaseio.com`,
// };

// firebase.initializeApp(firebaseConfig);