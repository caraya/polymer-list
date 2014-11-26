var showNoSWMessage = showMessage.bind(null,
    "Service Worker is not available. Demo won't work.");
    console.log("Service Worker Not Available");
var showPushSuccess = showMessage.bind(null,
    "Push registration succeeded. We'll keep you posted.");
    console.log("Push Registration Successful");
var showPushError = showMessage.bind(null,
    "Push registration failed. Sorry :(");
    console.log("Push Registration Failed");
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("../lib/flight-info-sw.js").catch(
    showNoSWMessage
  );
} else {
  setTimeout(showNoSWMessage, 1000);
}
