import { initApp } from "./app";

const { app } = initApp();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App runnning on port ${port}`);
});
