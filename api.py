from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer
from sqlmodel import Session, select

from database import get_session
from models import User, Task
from auth import create_access_token, verify_token

router = APIRouter()
bearer = HTTPBearer()


# Middleware para pegar o usuário do token
def get_current_user(credentials=Depends(bearer)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
    return payload["user_id"]


@router.post("/register")
def register_user(name: str, email: str, password: str, session: Session = Depends(get_session)):
    exists = session.exec(select(User).where(User.email == email)).first()
    if exists:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    user = User(name=name, email=email, password=password)
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "Usuário registrado com sucesso", "user": user}


@router.post("/login")
def login(email: str, password: str, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.email == email, User.password == password)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    token = create_access_token({"user_id": user.id})

    return {"message": "Login realizado", "token": token, "user": user}

@router.post("/tasks")
def create_task(
    title: str,
    description: str = "",
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = Task(title=title, description=description, user_id=user_id)
    session.add(task)
    session.commit()
    session.refresh(task)

    return {"message": "Tarefa criada", "task": task}


@router.get("/tasks")
def list_my_tasks(
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    return tasks


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    title: str = None,
    description: str = None,
    status: str = None,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):

    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Você não pode editar esta tarefa")

    if title:
        task.title = title
    if description:
        task.description = description
    if status:
        task.status = status

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
