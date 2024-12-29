# Project: Habit Tracker

## Overview
Habit Tracker jest full-stack web aplikacja zrobioną do śledzenia nawyków. Backend zrobiony za pomocą Flask i SQLAlchemy, z bazą danych PostgreSQL, frontend jest zbudowany za pomocą React. Docker jest używany do konteneryzacji aplikcaji w całości. W projekcie możemy tworzyć, edytować lub usuwać nawyki. Nawyk składa się z trzech pól: nazwa(name), opis(description), częstotliwość(frequency). Częstotliwość(frequency) wybiera się za pomocą rozwijanej listy w części frontendowej aplikacji(jedna z trzech opcji — Daily, Weekly, Monthly), pola nazwa(name) i opis(description) są polami tekstowymi do wprowadzania danych. 
Project jest podzielony na trzy kontenery: backend, frontend i baza danych. Samą aplikację użytkownik można zobaczyć i przetestować pod adresem localhost:3000, natomiast backend z wyświetloną bazą danych można zobaczyć pod adresem localhost:5000/habits.

---

## Features
- Tworzenie nawyka.
- Edytowanie nawyka.
- Usunięcie nawyka.

---

## Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Python
- Git

---

## Installation
1. **Zklonować git repozytorium**
   ```bash
   git clone https://github.com/Jackychan0201/habit-tracker.git
   cd <folder-z-repozytorium>
   ```

2. **Zbudować i uruchomić kontenery Docker'a**
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

---
