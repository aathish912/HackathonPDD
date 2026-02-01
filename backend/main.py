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

<<<<<<< HEAD
class StartBody(BaseModel):
    message: str

class ContinueBody(BaseModel):
    run_id: str
=======
class ChatMessage(BaseModel):
>>>>>>> 9b5416c (backend fixed)
    message: str

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/chat/start")
<<<<<<< HEAD
async def chat_start(body: StartBody):
    try:
        result = await start_conversation(body.message)
        return result
    except ToolhouseError as e:
        raise HTTPException(status_code=502, detail=str(e))

@app.post("/chat/continue")
async def chat_continue(body: ContinueBody):
    try:
        result = await continue_conversation(body.run_id, body.message)
        return result
    except ToolhouseError as e:
        raise HTTPException(status_code=502, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
=======
async def chat_start(data: ChatMessage):
    return {
        "status": "success",
        "received_message": data.message,
        "response": f"Echo: {data.message}"
    }

if __name__ == "__main__":
    uvicorn.run("main:app",reload=True)
>>>>>>> 9b5416c (backend fixed)

