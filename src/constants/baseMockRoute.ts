import { MockedRoute } from "../context/CollectionContext.types";

export const baseMockRoute: MockedRoute = {
  status: 200,
  method: "GET",
  delay: 0,
  isMocking: true,
  url: "",
  label: "",
  response: "",
  responseHeaders: "",
  id: "",
};

export const baseCollection = {
  routes: [],
  id: "",
  label: "collection-",
};
