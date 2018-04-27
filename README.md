## Erail

# Client Setup
<p>You first need to install Node-Js in your system so that you can use npm</p>
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

<p>Create a virtualenv</p>
```
virtualenv env -p python3
```
<p>Activate it</p>
```
source env/bin/activate
```
<p>Go to server directory</p>

```
cd server
```
<p>Install dependencies</p>

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

