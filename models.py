from typing import Optional
from sqlmodel import SQLModel, Field

# ----------------------
# Modelos do Banco
# ----------------------
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    status: str = "pendente"
    user_id: int = Field(foreign_key="user.id")

# ----------------------
# Schemas Pydantic
# ----------------------
class UserCreate(SQLModel):
    name: str
    email: str
    password: str

class UserRead(SQLModel):
    id: int
    name: str
    email: str

class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class TaskCreate(SQLModel):
    title: str
    description: Optional[str] = None
    user_id: int

class TaskRead(SQLModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    user_id: int

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
