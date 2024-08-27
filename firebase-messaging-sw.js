/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts('/src/serviceWorker/firebase/define.js')


const firebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = firebase.getMessaging(firebaseApp)

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([() => Promise.resolve()]))
})

firebase.onBackgroundMessage(messaging, (payload) => {
  console.log('Received background message ', payload)

  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.'
    // icon: '/firebase-logo.png',
    // badge: '',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// self.addEventListener('push', (event) => {
//   console.log(event)
//   console.log('firebase app', app)

//   const title = 'Push Notification'
//   const options = {
//     body: 'Default body text'
//     //   icon: '/images/icon.png',
//     //   badge: '/images/badge.png'
//   }

//   event.waitUntil(self.registration.showNotification(title, options))
// })
