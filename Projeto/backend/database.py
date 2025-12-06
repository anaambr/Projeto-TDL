from sqlmodel import SQLModel, Session, create_engine

# Caminho do arquivo do banco SQLite
DATABASE_URL = "sqlite:///database.db"

# echo=False para não poluir o terminal
engine = create_engine(DATABASE_URL, echo=False)


def create_db():
    """
    Cria todas as tabelas definidas em models.py.
    É chamado no main.py na inicialização da API.
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """
    Fornece uma sessão de banco de dados por requisição.
    """
    with Session(engine) as session:
        yield session
