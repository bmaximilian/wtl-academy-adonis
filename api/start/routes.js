
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' };
});

Route.group(() => {
    Route.get('/users', 'UserController.index');
    Route.post('/users', 'UserController.store').validator('StoreUser');
    Route.get('/users/:id', 'UserController.show');
    Route.put('/users/:id', 'UserController.update').validator('UpdateUser');
    Route.delete('/users/:id', 'UserController.destroy');
}).prefix('/api');
