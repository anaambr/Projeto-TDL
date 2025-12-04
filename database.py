from sqlmodel import SQLModel, create_engine, Session

# Para SQLite (arquivo local)
DATABASE_URL = "sqlite:///./database.db"

engine = create_engine(DATABASE_URL, echo=True)

# Função para criar tabelas
def create_db_and_tables():
    from models import User, Task
    SQLModel.metadata.create_all(engine)
