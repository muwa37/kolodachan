:trollface:
Backend app for AIB

# How to run: 

To run kolodachan backend api you *MUST* install postgresql first!   
https://www.postgresql.org/download/

1. Run this command to create tables in your database (change to your user/host/database) 
```console
psql -U user -h localhost -d database -f kolodachan.sql
```

2. Create .env file inside ../server/ folder:
```python
DB_URL = 'postgres://user:password@127.0.0.1:5432/databaseName'

TOKEN_EXPIRE_DAYS = 14
``` 

3. Create virtual environment:
```console
python3 -m venv .venv
```

4. Activate virtual enviroment:
```console
./activatevenv.sh
```
If you using windows figure out this step by yourself (or install linux :trollface:) 
you should add ../server/src/ to your $PYTHONPATH or imports wont work

5. Install nessesary packages:
```
pip install -r requirements.txt
```

6. Finally you can run api with command:
```
uvicorn api:app --app-dir src/kolodachan/ --host 127.0.0.1:8000
```

7. ???

8. PROFIT
