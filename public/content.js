const script = document.createElement("script");
script.src = chrome.runtime.getURL("interceptor.js");
script.type = "text/javascript";
script.async = false; // Synchronous execution
script.defer = false; // Ensure it runs immediately

const head = document.head || document.documentElement;
if (head.firstChild) {
  head.insertBefore(script, head.firstChild);
} else {
  head.appendChild(script); // Fallback if <head> is empty
}
