# Mobbi Website

This is a full website to showcase the project Mobbi and its products, based on NextJS and Django Rest Framework.

Mobbi is an entrepreneur student project from La FEE (Filière Étudiant Entreprendre), INSA Lyon, Lyon, France. 

The projects embed TinaCMS for content editing, content is stored on a Django (+DjangoRestFramework) backend.

## Installation

```
cd backend && pip install -r ./requirements.txt
cd ../frontend && yarn install
```
## Initialisation

### Before first start

create an admin account
```
cd backend 
python3 manage.py createsuperuser
```
apply the migrations to your db
```
python3 manage.py makemigrations 
python3 manage.py migrate
```
define a secret key to use for Django 
```
export SECRET_KEY=<your_secret_key>
```

### Development mode

start the project in development mode 
```
cd backend 
python 3 manage.py runserver
cd ../frontend
yarn dev
```

### Deploy to production :


I suggest to use docker and docker-compose to manage frontend and backend. 

#### backend : 

Before going to production, please follow Django guide to production :
https://docs.djangoproject.com/fr/3.2/howto/deployment/

#### frontend : 

Build project for production (inside your production environment):
```
cd frontend
yarn build
```

### Run in procution :

Run backend depends on the method you chosed in the django deployment guide

Running frontend inside a NodeJS environment
```
cd frontend
yarn start
```

### Use :
create editor accounts in django admin :
<your_backend_url>/admin

log in frontend to edit the website content :
<your_frontend_url>/auth





