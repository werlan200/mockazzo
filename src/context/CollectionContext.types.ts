export interface Collection {
  routes: MockedRoute[];
  id: string;
  label: string;
}

export interface MockedRoute {
  url: string;
  label: string;
  isMocking: boolean;
  delay: number;
  status: number;
  method: "GET" | "POST" | "PUT" | "DELETE";
  response: string;
  responseHeaders: any;
  id: string;
}
