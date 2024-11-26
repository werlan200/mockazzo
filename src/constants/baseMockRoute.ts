import { MockedRoute, Collection } from "../context/CollectionContext.types";

export const baseMockRoute: MockedRoute = {
  status: 200,
  method: "GET",
  delay: 0,
  isMocking: false,
  url: "",
  label: "",
  response: '{"a":"b"}',
  // response: "",
  responseHeaders: "",
  id: "",
};

export const baseCollection: Collection = {
  routes: [],
  id: "",
  label: "collection-",
};

export const createCollection = (): Collection => {
  return {
    ...baseCollection,
    routes: [],
  };
};
