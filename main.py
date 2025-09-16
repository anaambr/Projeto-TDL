from fastapi import FastAPI
from api import router

app = FastAPI(title="Gerenciamento de Tarefas - ToDoList")

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Bem-vindo ao Sistema de Gerenciamento de Tarefas!"}