from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
  return { "My first Api is up and running till the next time i try running it and it crushes ..bla bla black sheep...hurray,,i did it men..my backend is hosted alreay,....waaaaaaaaauuuuuuu!!!!😂😂😜"}
