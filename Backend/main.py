from fastapi import FastAPI

app = FastAPI(title="Nova API", description="My live backend on Render", version="1.0")

# 1. A home route that shows a welcome message
@app.get("/")
def read_root():
    return {"message": "Hello from my live FastAPI backend!", "status": "online"}

# 2. An interactive route that takes a name and greets them
@app.get("/greet/{name}")
def greet_user(name: str):
    return {"greeting": f"Hello, {name}! Your backend is working perfectly."}