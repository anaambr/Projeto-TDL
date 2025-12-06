from typing import Optional
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer
from sqlmodel import Session, select
from pydantic import BaseModel

from database import get_session
from models import User, Task
from auth import create_access_token, verify_token

router = APIRouter()
bearer = HTTPBearer()


# ============================
# MODELOS Pydantic (corpo JSON)
# ============================

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


# ============================
# Função para pegar usuário logado
# ============================

def get_current_user(credentials=Depends(bearer)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
    return payload["user_id"]


# ============================
# ROTAS DE AUTENTICAÇÃO
# ============================

@router.post("/register")
def register(data: RegisterRequest, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    user = User(name=data.name, email=data.email, password=data.password)
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "Usuário criado", "user": user}


@router.post("/login")
def login(data: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(
            User.email == data.email,
            User.password == data.password
        )
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    token = create_access_token({"user_id": user.id})

    return {"message": "Login realizado", "token": token, "user": user}


# ============================
# ROTAS DE TAREFAS
# ============================

@router.post("/tasks")
def create_task(
    data: TaskCreate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = Task(
        title=data.title,
        description=data.description,
        user_id=user_id
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return {"message": "Tarefa criada", "task": task}


@router.get("/tasks")
def get_tasks(
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    return tasks


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    data: TaskUpdate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Você não pode editar esta tarefa")

    if data.title is not None:
        task.title = data.title

    if data.description is not None:
        task.description = data.description

    if data.status is not None:
        task.status = data.status

    session.add(task)
    session.commit()
    session.refresh(task)

    return {"message": "Tarefa atualizada", "task": task}


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Você não pode excluir esta tarefa")

    session.delete(task)
    session.commit()

    return {"message": "Tarefa deletada"}
