FROM python:3.9-slim

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

COPY init_backend.sh /init_backend.sh
RUN chmod +x /init_backend.sh

ENTRYPOINT ["/init_backend.sh"]
