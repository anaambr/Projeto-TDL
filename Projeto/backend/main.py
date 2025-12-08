from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import router
from database import create_db

app = FastAPI(title="Gerenciamento de Tarefas - TDL")

# permitir o frontend (Vite)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db()


app.include_router(router)


@app.get("/")
async def root():
    return {"message": "API do TDL rodando"}
