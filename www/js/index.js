import AppBar from './components/AppBarComponent/AppBarComponent.js'
import Loader from './components/LoaderComponent/LoaderComponent.js'

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    const { createApp } = Vue

    window.mzv = createApp(Loader).mount('#app')

}
