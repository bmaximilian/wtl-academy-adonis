/**
 * Created on 25.10.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

class ExceptionResponse {
    /**
     * Constructor of the exception response
     *
     * @param message
     * @param status
     */
    constructor(message = '', status = 200) {
        this.message = message;
        this.status = status;
    }

    /**
     * Sends the HTTP exception
     *
     * @param response
     * @return {*|void}
     */
    send(response) {
        return response.status(this.status).send(this.toJSON());
    }

    /**
     * Converts the exception to json
     *
     * @return {{message: string, status: number}}
     */
    toJSON() {
        return {
            message: this.message,
            status: this.status,
        };
    }
}

module.exports = ExceptionResponse;
