from datetime import datetime, timedelta
from jose import jwt, JWTError, ExpiredSignatureError

# Use uma chave REAL e grande!
SECRET_KEY = "a9023j98q2j098d0asjd90asj0d9aj0d9aj0d9aj0das0d9aj0dasd"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hora


def create_access_token(data: dict):
    """
    Cria um token JWT contendo os dados recebidos.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_token(token: str):
    """
    Valida o token JWT. Retorna payload se válido, None se inválido.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        print("Token expirado")
        return None
    except JWTError:
        print("Token inválido")
        return None
