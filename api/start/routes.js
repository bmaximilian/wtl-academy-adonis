
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
    Route.get('/users', 'UserController.index').middleware(['token']);
    Route.post('/users', 'UserController.store').validator('StoreUser');
    Route.get('/users/:id', 'UserController.show').middleware(['token']);
    Route.put('/users/:id', 'UserController.update').middleware(['token']).validator('UpdateUser');
    Route.delete('/users/:id', 'UserController.destroy').middleware(['token']);

    Route
    .resource('posts', 'PostController')
    .apiOnly()
    .middleware(['token'])
    .validator(new Map([
        [['posts.store'], ['StorePost']],
        [['posts.update'], ['UpdatePost']],
    ]));

    Route
    .resource('comments', 'CommentsController')
    .apiOnly()
    .validator(new Map([
        [['comments.store'], ['StoreComment']],
        [['comments.update'], ['UpdateComment']],
    ]));
}).prefix('/api');
