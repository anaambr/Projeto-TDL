from datetime import datetime, date
from typing import Optional, List

from fastapi import APIRouter, HTTPException, Depends, Body
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from sqlmodel import Session, select

from database import get_session
from models import User, Task
from auth import create_access_token, verify_token

router = APIRouter()
bearer = HTTPBearer()


# ----------------- SCHEMAS Pydantic -----------------

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "normal"  # normal / alta / urgente
    due_date: Optional[date] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[date] = None
    status: Optional[str] = None


# ----------------- AUTENTICAÇÃO -----------------

def get_current_user(credentials=Depends(bearer)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
    return payload["user_id"]


# ----------------- REGISTER / LOGIN -----------------


@router.post("/register")
def register_user(
    data: RegisterRequest,
    session: Session = Depends(get_session),
):
    exists = session.exec(select(User).where(User.email == data.email)).first()
    if exists:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    user = User(name=data.name, email=data.email, password=data.password)
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "Usuário registrado com sucesso", "user": user}


@router.post("/login")
def login(
    data: LoginRequest,
    session: Session = Depends(get_session),
):
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


# ----------------- TAREFAS -----------------


@router.post("/tasks")
def create_task(
    data: TaskCreate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user),
):
    task = Task(
        title=data.title,
        description=data.description,
        priority=data.priority,
        due_date=data.due_date,
        user_id=user_id,
    )
    session.add(task)
    session.commit()
    session.refresh(task)

    return {"message": "Tarefa criada com sucesso", "task": task}


@router.get("/tasks")
def list_tasks(
    search: str = "",
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user),
):
    query = select(Task).where(Task.user_id == user_id)

    if search.strip():
        query = query.where(Task.title.contains(search.strip()))

    tasks: List[Task] = session.exec(query).all()

    # ordenar: urgente > alta > normal
    priority_order = {"urgente": 0, "alta": 1, "normal": 2}
    tasks.sort(key=lambda t: priority_order.get(t.priority, 3))

    today = datetime.utcnow().date()
    result = []

    for t in tasks:
        item = t.dict()
        if t.due_date:
            try:
                item["days_left"] = (t.due_date - today).days
            except Exception:
                item["days_left"] = None
        else:
            item["days_left"] = None
        result.append(item)

    return result


@router.get("/tasks/{task_id}")
def get_task(
    task_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user),
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Acesso negado")

    today = datetime.utcnow().date()
    item = task.dict()
    if task.due_date:
        try:
            item["days_left"] = (task.due_date - today).days
        except Exception:
            item["days_left"] = None
    else:
        item["days_left"] = None

    return item


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    data: TaskUpdate = Body(...),
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user),
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
    if data.priority is not None:
        task.priority = data.priority
    if data.due_date is not None:
        task.due_date = data.due_date
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
    user_id: int = Depends(get_current_user),
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Você não pode excluir esta tarefa")

    session.delete(task)
    session.commit()

    return {"message": "Tarefa deletada com sucesso"}
