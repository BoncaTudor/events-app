FROM python:3.11-slim

RUN apt-get update && apt-get install -y libpq-dev netcat-openbsd

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY event-be/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY event-be/ /app/

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
