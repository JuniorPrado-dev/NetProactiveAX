FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH="/"

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY pyproject.toml .
COPY uv.lock .


RUN uv sync --frozen --no-cache
RUN uv export --no-dev --no-hashes -o requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN rm pyproject.toml uv.lock requirements.txt

ENV PATH="/root/.local/bin:$PATH"

COPY alembic.ini .
COPY alembic ./alembic

COPY main.py .

COPY app ./app

EXPOSE 5000

CMD ["python", "main.py"]
