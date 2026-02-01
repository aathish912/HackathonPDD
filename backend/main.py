# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from toolhouse import start_conversation, continue_conversation, ToolhouseError

origins = ["http://localhost:3000"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskRequest(BaseModel):
    email: str
    task: str

class ContinueRequest(BaseModel):
    run_id: str
    message: str

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/task/submit")
async def submit_task(data: TaskRequest):
    """
    Submit a task - the Toolhouse agent will find relevant LinkedIn contacts
    and send emails on behalf of the user.
    """
    try:
        # Build the prompt for the Toolhouse agent
        prompt = f"""
User email: {data.email}

Task: {data.task}

Please help the user by:
1. Finding relevant people on LinkedIn who could help with this task
2. Drafting and sending professional outreach emails to those contacts
3. Report back who was contacted and what was sent
"""
        result = await start_conversation(prompt)
        return {
            "status": "success",
            "run_id": result.get("run_id"),
            "response": result.get("text"),
        }
    except ToolhouseError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.post("/task/continue")
async def continue_task(data: ContinueRequest):
    """
    Continue an existing conversation with the Toolhouse agent.
    """
    try:
        result = await continue_conversation(data.run_id, data.message)
        return {
            "status": "success",
            "run_id": result.get("run_id"),
            "response": result.get("text"),
        }
    except ToolhouseError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app",reload=True)

