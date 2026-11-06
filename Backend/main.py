from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
  return { "My first Api is up and running till the next time i try running it and it crushes"}
