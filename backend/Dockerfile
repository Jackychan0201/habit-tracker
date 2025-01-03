FROM python:3.9-slim

RUN apt-get update && apt-get install -y netcat-openbsd dos2unix

WORKDIR /app

COPY . .

RUN dos2unix /app/init_backend.sh

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

RUN chmod +x /app/init_backend.sh

ENTRYPOINT ["/app/init_backend.sh"]
