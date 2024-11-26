(function () {
  const serializedValue = localStorage.getItem("mockazzoStorage");
  if (!serializedValue) {
    console.log("No serialized value found in localStorage, returning");
    return null;
  }
  const parsedStorage = JSON.parse(serializedValue);

  const mockingRoutes = parsedStorage
    .map((collection) => collection.routes)
    .flat()
    .filter((route) => route.isMocking);

  // Intercept fetch API
  const originalFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    const foundMockedRoute = mockingRoutes.find((route) => route.url === url);
    if (foundMockedRoute) {
      console.log(`Intercepted fetch request to: ${url}`);
      return new Response(foundMockedRoute.response, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Original fetch request initiated.");
    return originalFetch(input, init);
  };

  // Intercept XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (
    method,
    url,
    async,
    user,
    password
  ) {
    this._interceptedUrl = url; // Store the URL for later use
    originalOpen.call(this, method, url, async, user, password);
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    const foundMockedRoute = mockingRoutes.find(
      (route) => route.url === this._interceptedUrl
    );
    if (foundMockedRoute) {
      console.log(`Intercepted XMLHttpRequest to: ${this._interceptedUrl}`);

      this.onreadystatechange = () => {
        if (this.readyState === 4) {
          // Simulate a response
          this.responseText = foundMockedRoute.response;
          this.status = 200;
          this.readyState = 4; // Done
          this.onreadystatechange = null; // Clear listener
        }
      };
    } else {
      originalSend.call(this, body);
    }
  };

  console.log("Request interceptor script injected successfully.");
})();
