
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

    Route
    .resource('posts', 'PostController')
    .apiOnly()
    .middleware(new Map([
        [['store', 'update', 'destroy'], ['token']],
    ]))
    .validator(new Map([
        [['posts.store'], ['StorePost']],
        [['posts.update'], ['UpdatePost']],
    ]));

    Route.get('/posts/:postId/comments', 'CommentController.indexByPost');

    Route.post('/posts/:postId/comments', 'CommentController.storeByPost')
    .middleware(['token'])
    .validator('StoreCommentByPostId');

    Route.get('/posts/:postId/comments/:id', 'CommentController.show');
    Route.put('/posts/:postId/comments/:id', 'CommentController.update').middleware(['token']);
    Route.delete('/posts/:postId/comments/:id', 'CommentController.destroy').middleware(['token']);

    Route
    .resource('comments', 'CommentsController')
    .apiOnly()
    .validator(new Map([
        [['comments.store'], ['StoreComment']],
        [['comments.update'], ['UpdateComment']],
    ]));
}).prefix('/api');
