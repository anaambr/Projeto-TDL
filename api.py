from fastapi import Depends, HTTPException, APIRouter
from sqlmodel import Session, select
from models import User, UserCreate, UserRead, Task, TaskCreate, TaskRead
from database import engine
from auth import hash_password, verify_password, create_access_token
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

users_db: list[User] = []
tasks_db: list[Task] = []

def get_next_user_id() -> int:
    return len(users_db) + 1

def get_next_task_id() -> int:
    return len(tasks_db) + 1

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, "SEU_SEGREDO_AQUI", algorithms=["HS256"])
        user_id = int(payload.get("sub"))

        with Session(engine) as session:
            user = session.get(User, user_id)
            if not user:
                raise HTTPException(401, "Token inválido")

            return user

    except JWTError:
        raise HTTPException(401, "Token inválido")

@router.post("/register", response_model=UserRead)
def register_user(user: UserCreate):
    new_user = User(name=user.name, email=user.email, password=user.password)
    users_db.append(new_user)
    return new_user


@router.post("/register")
def register(data: UserCreate):
    with Session(engine) as session:
        # Verifica se o email já existe
        existing = session.exec(select(User).where(User.email == data.email)).first()
        if existing:
            raise HTTPException(400, "Email já está cadastrado.")

        user = User(
            name=data.name,
            email=data.email,
            password=hash_password(data.password)
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"message": "Usuário criado", "user": user}

@router.post("/login")
def login(login_data: LoginData):
    with Session(engine) as session:
        user = session.exec(
            select(User).where(User.email == login_data.email)
        ).first()

        if not user:
            raise HTTPException(401, "Usuário não encontrado")

        if not verify_password(login_data.password, user.password):
            raise HTTPException(401, "Senha incorreta")

        token = create_access_token({"sub": str(user.id)})

        return {"access_token": token, "token_type": "bearer", "user_id": user.id}


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

@router.post("/tasks")
def create_task(task_data: TaskCreate, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        task = Task(
            title=task_data.title,
            description=task_data.description,
            user_id=current_user.id
        )
        session.add(task)
        session.commit()
        session.refresh(task)

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
