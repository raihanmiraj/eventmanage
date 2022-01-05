"use strict";

let sw = null;
const tokenString = document.getElementById("token");

const config = {
  apiKey: "AIzaSyBiIS3bSmE_ELNVQiDTOOPCAdR1XZk4Yxc",
  authDomain: "mecstudent-26f67.firebaseapp.com",
  projectId: "mecstudent-26f67",
  storageBucket: "mecstudent-26f67.appspot.com",
  messagingSenderId: "729385708703",
  appId: "1:729385708703:web:3464b072d7b56d68d746aa",
  measurementId: "${config.measurementId}"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(swRegistered => {
    console.log("[ServiceWorker**] - Registered");
    sw = swRegistered;
    // displayNotification();
    document.querySelector("#share").addEventListener("click", onShare);
  });
}

messaging
  .requestPermission()
  .then(() => {
    return messaging.getToken();
  })
  .then(token => {
    tokenString.innerHTML = "Token Is : " + token;
    subscribeTokenToTopic(token, "allUsers");
  })
  .catch(err => {
    console.log("Unable to get permission to notify", err);
  });

messaging.onMessage(payload => {
  console.log("Message received. ", payload);
  const { title, ...options } = payload.notification;
});

function toggleMenu() {
  const navbar = document.getElementById("navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }
}

function notification() {
  const options = {
    body: "Keep Using Event Manager",
    icon: "/icons/icon.png"
  };

  new Notification("Hi there!!", options);
}

function displayNotification() {
  if (window.Notification && Notification.permission === "granted") {
    notification();
  } else if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(status => {
      if (status === "granted") {
        notification();
      } else {
        alert("You denied or dismissed permissions to notifications.");
      }
    });
  } else {
    alert(
      "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
    );
  }
}

function subscribeTokenToTopic(token, topic) {
  console.log(token);
  fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
    method: "POST",
    headers: new Headers({
      Authorization:
        "key=AAAAqdLGrJ8:APA91bENDji0OkGUIrM0VyMxhcNi_QdzqoS2bCPX1sWJiBjFtMAyEUa6iSb96xuhGeNWhWKgxCoczSdlW4S0PHjD9ybEWvhDP_wvBHOfgX89esOJwTD-q-0e31TagXRa4bKKb7OrXG4K"
    })
  })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw "Error subscribing to  the following topic: " +
        response.status +
        " - " +
        response.text();
      } else {
        console.log('Successfully subscribed to "' + topic + '"');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function onShare() {
  const title = document.title;
  const url = document.querySelector("link[rel=canonical]")
    ? document.querySelector("link[rel=canonical]").href
    : document.location.href;
  const text = "Learn how to use the share api";

  if (navigator.share) {
    navigator
      .share({
        title,
        url,
        text
      })
      .then(() => {
        alert(`Thanks for Sharing!`);
      })
      .catch(err => {
        alert(`Couldn't share ${err}`);
      });
  } else {
    alert(`Not supported !!`);
  }
}
