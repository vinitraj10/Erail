## Erail

# Client Setup
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

# Server setup

Create a virtualenv
```
virtualenv env -p python3
```
Activate it
```
source env/bin/activate
```
Go to server directory

```
cd server
```
Install dependencies

```
pip install -r requirements.txt
```

<p>Django commands</p>

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

<p>Go to admin panel to add data</p>
```
http://localhost:8000/admin
```

