from typing import Optional, List
from datetime import date
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str

    tasks: List["Task"] = Relationship(back_populates="user")


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    title: str
    description: Optional[str] = None

    status: str = "pendente"
    priority: str = "normal"

    due_date: Optional[date] = None

    user_id: int = Field(foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="tasks")
