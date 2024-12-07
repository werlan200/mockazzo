(async () => {
  try {
    const isMockazzoOn = await chrome.storage.local.get("isMockazzoOn");
    const mockazzoStorage = await chrome.storage.local.get("mockazzoStorage");

    if (isMockazzoOn && mockazzoStorage) {
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("interceptor.js");
      script.type = "text/javascript";
      script.async = false;
      script.defer = false;

      document.head.appendChild(script);

      script.onload = () => {
        window.postMessage(
          {
            type: "MOCKAZZO_EXTENSION_DATA",
            payload: { ...isMockazzoOn, ...mockazzoStorage },
          },
          "*"
        );
      };
    }
  } catch (error) {
    console.error("Couldn't set Mockazzo Interceptor", error);
  }
})();
