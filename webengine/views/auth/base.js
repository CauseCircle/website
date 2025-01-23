const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// TARGET THE BUTTONS
const googleBtn = document.getElementById("google-signin-btn");
const fbBtn = document.getElementById("continue-with-fb-btn");

googleBtn.addEventListener("click", continueWithGoogle);
fbBtn.addEventListener("click", continueWithFB);

// CONTINUE WITH GOOGLE function

provider.addScope('email');  // Make sure to include the email scope
provider.setCustomParameters({
  prompt: 'consent'  // Forces Google to show the consent screen again
});

async function continueWithGoogle() {
  auth
    .signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;
      console.log('User email --:', result);
      
      if (user.email) {
        console.log('Email:', user);
      } else {
        console.log('Email not available');
      }

      const db = firebase.firestore();

      db.collection("Users").doc(user.uid).set({
        name: user.displayName,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email || "No email available", // Handle null email case
        phone: user.phoneNumber, 
        profilePhoto: user.photoURL,
      });
    })
    .catch(error => {
      console.error("Error during sign-in:", error);
    });
}



async function continueWithFB() {
  auth
    .signInWithPopup(facebookProvider)
    .then(result => {
      const user = result.user;
      console.log('User Info:', user);
      
      if (user.email) {
        console.log('Email:', user.email);
      } else {
        console.log('Email not available');
      }

      const db = firebase.firestore();

      db.collection("Users").doc(user.uid).set({
        name: user.displayName,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email || "No email available", // Handle null email case
        phone: user.phoneNumber, 
        profilePhoto: user.photoURL,
      });
    })
    .catch(error => {
      console.error("Error during Facebook sign-in:", error);
    });
}

// Sign-Out Function
document.getElementById("google-signout-btn").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      document.getElementById("user-info").style.display = "none";
      document.getElementById("google-signin-btn").style.display = "inline-block";
      document.getElementById("google-signout-btn").style.display = "none";
    })
    .catch(error => {
      console.error("Error during sign-out:", error);
    });
});

// Function to fetch user data by UID
async function getUserData(uid) {
  const db = firebase.firestore();
  try {
    const userDoc = await db.collection("Users").doc(uid).get();
    if (userDoc.exists) {
      console.log("User Data:", userDoc.data());
      return userDoc.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Function to fetch all users
async function getAllUsers() {
  const db = firebase.firestore();
  try {
    const usersSnapshot = await db.collection("Users").get();
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    console.log("All Users:", usersList);
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Example usage after sign-in
googleBtn.addEventListener("click", async () => {
  await continueWithGoogle();
  const user = firebase.auth().currentUser;
  if (user) {
    const userData = await getUserData(user.uid);
    console.log("Fetched User Data:", userData);
  }
});

fbBtn.addEventListener("click", async () => {
  await continueWithFB();
  const user = firebase.auth().currentUser;
  if (user) {
    const userData = await getUserData(user.uid);
    console.log("Fetched User Data:", userData);
  }
});