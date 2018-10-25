/**
 * Created on 25.10.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const ExceptionResponse = require('./ExceptionResponse');

class NotFoundExceptionResponse extends ExceptionResponse {
    constructor(message = 'forbidden') {
        super(message, 403);
    }
}

module.exports = NotFoundExceptionResponse;
