# Erail

## Client Setup
You first need to install Node-Js in your system so that you can use npm
```
cd client
```

```
npm install
```

```
npm run dev
```

## Server setup

### Create a virtualenv
```
virtualenv env -p python3
```
### Activate it
```
source env/bin/activate
```
### Go to server directory

```
cd server
```
### Installing dependencies

```
pip install -r requirements.txt
```
### Database Setup

 The project uses oracle 11g database so make sure to give the credtinals of database in .env file,the file should be created under the server directory and it should look like this
```
DB_NAME=YOUR_DB_NAME
DB_USER=USERNAME
DB_PASSWORD=PASSWORD
DB_HOST=localhost
DB_PORT=1521
```

### Django commands

```
python manage.py makemigrations
```

```
python manage.py migrate
```

```
python manage.py createsuperuser
```

```
python manage.py runserver
```

### Go to admin panel to add data
```
http://localhost:8000/admin
```

