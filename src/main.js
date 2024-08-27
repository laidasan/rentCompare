import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'


const app = createApp(App)
const firebaseApp = initializeApp(firebaseConfig)
const firebaseMessaging = getMessaging(firebaseApp)

const getFirebaseMessagingToken = function() {
  return getToken(firebaseMessaging, { vapidKey })
  .then(function (currentToken) {
    let token = ''

    if (currentToken) {
      token = currentToken
      console.log('currentToken', currentToken)
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.')
      // ...
    }

    return token
  })
  .catch(function (error) {
    console.error('An error occurred while retrieving token. ', error)

    throw error
  })
}



app.use(createPinia())
app.use(router)

app.mount('#app')

const requestPermission = function () {
  return Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        console.log('Service Worker Notification body text')
        // registration.showNotification('Service Worker Notification', {
        //   body: 'Service Worker Notification body text'
        // })
      } else {
        console.error('Notification permission denied')
      }
    })
}

window.addEventListener('load', () => {
  requestPermission()
    .then(getFirebaseMessagingToken)
    .catch(console.error)
})

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/src/serviceWorker/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope)

//         if ('Notification' in window) {
//           Notification.requestPermission()
//             .then((permission) => {
//               if (permission === 'granted') {
//                 registration.showNotification('Service Worker Notification', {
//                   body: 'Service Worker Notification body text'
//                 })
//               } else {
//                 console.error('Notification permission denied')
//               }
//             })
//             .catch(console.error)
//         }
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error)
//       })
//   })
// }
