# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn



origins = ["http://localhost:3000"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/chat/start")
async def chat_start(data: ChatMessage):
    return {
        "status": "success",
        "received_message": data.message,
        "response": f"Echo: {data.message}"
    }

if __name__ == "__main__":
    uvicorn.run("main:app",reload=True)

