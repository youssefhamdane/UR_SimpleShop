# ur-simpleshop

UR Simple Shop is a simple shop created with laravel and angular.

# Features!
  - Login and Signup 
  - Display list of nearby shops
  - Like and dislike shop
  - display preferred shops
  - remove shop from preferred shops

### Installation

requires [Node.js](https://nodejs.org/), [PHP 7.2](https://www.php.net/releases/7_2_0.php),[Composer](https://getcomposer.org/).

Install the dependencies.

```sh
$ composer create-project youssefhamdane/ur_simpleshop
```
Set database information `/.env`
```
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=user_name
DB_PASSWORD=password
```
Run laravel migrations and seeds
```sh
$ php artisan migrate
$ php artisan db:seed
```
Serv project
```sh
$ php artisan serv
```

### Frontend
Frontend based on angular project `angular/` to debug angular project
Run commands :
```sh
$ cd angular
$ npm install
$ npm start
```
api url by default is `http://SERVER URL/api` that work with laravel fine
but you can customize it in `angular/src/app/globals.ts`
```
'use strict';
export const GlobalVariable = Object({
    /**
     * API URL
     * @param string
     */
    BASE_API_URL: 'here api url',
    /**
     *  USER TOKEN
     * @param string
     */
    API_TOKEN:''
});
```
To deploy angular project run command :
```sh
$ ng build --prod --base-href http://127.0.0.1:8000/ --deploy-url http://127.0.0.1:8000/app/
```
### Backend
Backend based on laravel framework he is already in route directory of project you can check controllers and models.. in `app/`

### How it work
To combine laravel and angular and keep files separated i have created laravel view `resource/home.blade.php` that include html index of angular dist `public/app`, and as well change angular output of build to `public/app/`

License
----

MIT

