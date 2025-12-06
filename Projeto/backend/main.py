from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import router
from database import create_db

app = FastAPI(title="Gerenciamento de Tarefas - ToDoList")

# cria tabelas do banco
create_db()

# CORS para permitir o React acessar o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # em produção, coloque o domínio do front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {"message": "API funcionando!"}
