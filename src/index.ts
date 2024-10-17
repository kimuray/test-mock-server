import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();
app.use(prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/callback", (c) => {
  return c.text("callback!!!");
});

app.post("/webhook", async (c) => {
  const req = await c.req.json();

  console.log(req);

  return c.json({ callback_url: "http://localhost:3000/callback" });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
