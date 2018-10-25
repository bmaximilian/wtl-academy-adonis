
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Comment extends Model {
    /**
     * Belongs to one creator
     *
     * @method creator
     *
     * @return {Object} : Returns te user that created the comment
     */
    creator() {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Comment;
