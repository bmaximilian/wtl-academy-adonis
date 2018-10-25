
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
    /**
     * The comments of the post
     *
     * @method comments
     *
     * @return {Object} : Returns one or more comments
     */
    comments() {
        return this.hasMany('App/Models/Comment');
    }

    /**
     * Belongs to one creator
     *
     * @method creator
     *
     * @return {Object} : Returns te user that created the post
     */
    creator() {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Post;
