:trollface:  
# Backend app for AIB

## How to run: 

To run kolodachanAPI you **MUST** install [PostgreSQL](https://www.postgresql.org/download/) first:  


Run this command to create tables in your database (change to your user/host/database):
```console
psql -U user -h localhost -d database -f kolodachan.sql
```

Create .env file inside *../server/* folder:
```python
DB_URL = 'postgres://user:password@127.0.0.1:5432/databaseName'

TOKEN_EXPIRE_DAYS = 14
``` 

Create virtual environment:
```console
python3 -m venv .venv
```

Activate virtual enviroment:
> [!NOTE]
> If you using windows :poop: figure out this step by yourself (or install GNU/Linux :trollface:).      
> you must add *../server/src/* to your *$PYTHONPATH* or imports won't work.    
```console
source activatevenv.sh
```



Install necessary packages:
```
pip install -r requirements.txt
```

Finally you can run api with command:
```
uvicorn api:app --app-dir src/kolodachan/ --host 127.0.0.1:8000
```

## How to use:
Go to <http://127.0.0.1:8000/docs> for documentation.  

Default login and password for superadmin account is ***admin:admin***.  
You can't change it now, i'll add this functionality later (na dnyah) :trollface:.  
