import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')


// For service worker for PWA
// if("serviceWorker" in navigator){
//     navigator.serviceWorker.register("sw.js").then(registration=> {
//       console.log("SW registered");
//       console.log(registration);
//     }).catch(error=> {
//       console.log("SW error");
//       console.log(error);
//     })
//     }
    
    