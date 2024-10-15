importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyATdV8MG2rxV1qNNsNVp1afb7sAn5BD_2U",
    authDomain: "suf-service.firebaseapp.com",
    projectId: "suf-service",
    storageBucket: "suf-service.appspot.com",
    messagingSenderId: "310898099435",
    appId: "1:310898099435:web:a1cac6357a793a0e82aaae",
    measurementId: "G-1KY06ZMQSH"
    databaseURL: "...",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});