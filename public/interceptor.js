window.addEventListener("message", (event) => {
  if (event.source !== window) return; // Ignore messages not from the page itself

  if (event.data.type === "MOCKAZZO_EXTENSION_DATA") {
    const data = event.data.payload;
    runMockazzoInterceptor(data.mockazzoStorage, data.isMockazzoOn);
  }
});

function runMockazzoInterceptor(serializedValue, isMockazzoOn) {
  if (!serializedValue || !isMockazzoOn) {
    console.log("No serialized value found, returning");
    return null;
  }

  const parsedStorage = JSON.parse(serializedValue);
  const isParsedMockazzoOn = JSON.parse(isMockazzoOn);

  if (!isParsedMockazzoOn) return null;

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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(
            `Intercepted fetch request to: ${url}`,
            foundMockedRoute.response
          );
          if (foundMockedRoute.status < 400) {
            resolve(
              new Response(foundMockedRoute.response, {
                status: foundMockedRoute.status,
                headers: { "Content-Type": "application/json" },
              })
            );
          } else {
            reject(
              new Response(foundMockedRoute.response, {
                status: foundMockedRoute.status,
                headers: { "Content-Type": "application/json" },
              })
            );
          }
        }, foundMockedRoute.delay);
      });
    }

    return originalFetch(input, init);
  };

  const rawOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (_, url) {
    this._interceptedUrl = url;
    rawOpen.apply(this, arguments);
  };

  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.send = function (body) {
    const foundMockedRoute = mockingRoutes.find(
      (route) => route.url === this._interceptedUrl
    );

    function mockResponse(mock) {
      const headers = mock.responseHeaders;

      Object.defineProperties(this, {
        responseText: { value: JSON.parse(mock.response) },
        response: { value: JSON.parse(mock.response) },
        readyState: { value: 4 },
        status: { value: mock.status },
        statusText: { value: mock.statusText },
        responseType: { value: "json" },
        getResponseHeader: {
          value: (headerName = "") => {
            const header = headers.find(
              (h) => h.name.toLowerCase() === headerName.toLowerCase()
            );
            return header ? header.value : null;
          },
        },
        getAllResponseHeaders: {
          value: () =>
            headers
              .filter((h) => h.active)
              .map((h) => `${h.name}: ${h.value}`)
              .join("\n"),
        },
      });

      ["load", "readystatechange", "loadend"].forEach((event) =>
        this.dispatchEvent(new Event(event))
      );
    }

    if (foundMockedRoute) {
      setTimeout(() => {
        mockResponse.call(this, {
          response: foundMockedRoute.response,
          status: Number(foundMockedRoute.status),
          statusText: "OK",
          responseHeaders: [],
        });
        console.log(
          `Intercepted XML Request to: ${foundMockedRoute.url}`,
          foundMockedRoute.response
        );
      }, foundMockedRoute.delay);
    } else {
      originalSend.call(this, body);
    }
  };

  console.log("Request interceptor script injected successfully.");
}
