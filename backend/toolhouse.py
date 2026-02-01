# toolhouse_client.py
import httpx

AGENT_URL = "https://agents.toolhouse.ai/b1148637-d011-4c7f-9b47-5a318ff6c915"

class ToolhouseError(Exception):
    pass

async def start_conversation(message: str) -> dict:
    payload = {"message": message}

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(AGENT_URL, json=payload)

    if resp.status_code != 200:
        raise ToolhouseError(f"{resp.status_code} - {resp.text}")

    run_id = resp.headers.get("X-Toolhouse-Run-ID")
    return {
        "run_id": run_id,
        "text": resp.text,
        "headers": dict(resp.headers),
    }

async def continue_conversation(run_id: str, message: str) -> dict:
    url = f"{AGENT_URL}/{run_id}"
    payload = {"message": message}
    headers = {"X-Toolhouse-Run-ID": run_id}

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.put(url, json=payload, headers=headers)

    if resp.status_code != 200:
        raise ToolhouseError(f"{resp.status_code} - {resp.text}")

    return {
        "run_id": run_id,
        "text": resp.text,
        "headers": dict(resp.headers),
    }

