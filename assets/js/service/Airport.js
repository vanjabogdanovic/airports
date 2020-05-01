import {Request} from './Request.js';

export class Airport extends Request {

    static resource = 'airports';

    getAll(){
        return this.getRequest(Airport.resource)
            .then ( response => {
                return Promise.resolve(response.data);
            })
            .catch( error => {
                return Promise.reject(error.response);
            });
    }
    create(formData) {
        return this.postRequest(Airport.resource, formData, true)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error);
            });
    }
    update(id, formData) {
        return this.updateRequest(Airport.resource  + '/' + id, formData, true)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error);
            });
    }
    delete(id) {
        return this.deleteRequest(Airport.resource + '/' + id)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error.response);
            });
    }
}