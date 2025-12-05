from fastapi import FastAPI
from api import router
from database import create_db

app = FastAPI(title="Gerenciamento de Tarefas - ToDoList")

# Criar tabelas no banco antes de iniciar
create_db()

app.include_router(router)


@app.get("/")
async def root():
    return {"message": "Bem-vindo ao Sistema de Gerenciamento de Tarefas!"}
