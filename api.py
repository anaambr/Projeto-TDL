from fastapi import APIRouter, HTTPException
from models import User, Task

router = APIRouter()

users_db: list[User] = []
tasks_db: list[Task] = []

def get_next_user_id() -> int:
    return len(users_db) + 1

def get_next_task_id() -> int:
    return len(tasks_db) + 1

# Criar usuário
@router.post("/register")
def register_user(name: str, email: str, password: str):
    user = User(id=get_next_user_id(), name=name, email=email, password=password)
    users_db.append(user)
    return {"message": f"Usuário {user.name} registrado com sucesso", "user": user}

# Listar usuários
@router.get("/users")
def list_users():
    return users_db

# Atualizar usuário
@router.put("/users/{user_id}")
def update_user(user_id: int, name: str = None, email: str = None, password: str = None):
    for user in users_db:
        if user.id == user_id:
            if name:
                user.name = name
            if email:
                user.email = email
            if password:
                user.password = password
            return {"message": f"Usuário {user_id} atualizado", "user": user}
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

# Deletar usuário
@router.delete("/users/{user_id}")
def delete_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            users_db.remove(user)
            return {"message": f"Usuário {user_id} deletado"}
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

# Criar tarefa
@router.post("/tasks")
def create_task(user_id: int, title: str, description: str = ""):
    task = Task(id=get_next_task_id(), title=title, description=description, user_id=user_id)
    tasks_db.append(task)
    return {"message": "Tarefa criada", "task": task}

# Listar tarefas do usuário
@router.get("/tasks")
def list_tasks(user_id: int):
    return [t for t in tasks_db if t.user_id == user_id]

# Atualizar tarefa
@router.put("/tasks/{task_id}")
def update_task(task_id: int, title: str = None, description: str = None, status: str = None):
    for task in tasks_db:
        if task.id == task_id:
            if title:
                task.title = title
            if description:
                task.description = description
            if status:
                task.status = status
            return {"message": f"Tarefa {task_id} atualizada", "task": task}
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

# Deletar tarefa
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for task in tasks_db:
        if task.id == task_id:
            tasks_db.remove(task)
            return {"message": f"Tarefa {task_id} deletada"}
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")
