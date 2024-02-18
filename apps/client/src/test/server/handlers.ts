import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json([{ name: "Yoshi 1" }, { name: "Yoshi 2" }], {
      status: 200
    });
  })
];
