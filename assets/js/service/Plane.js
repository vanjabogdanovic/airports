import {Request} from './Request.js';

export class Plane extends Request {
    
    static resource = 'planes';

    getAll() {
        return this.getRequest(Plane.resource)
        .then (response => {
            return Promise.resolve(response.data);
        })
        .catch( error => {
            return Promise.reject(error.response);
        });
    }
    create(formData) {
        return this.postRequest(Plane.resource, formData, true)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error);
            });
    }
    update(id, formData) {
        return this.updateRequest(Plane.resource  + '/' + id, formData)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error);
            });
    }
    delete(id) {
        return this.deleteRequest(Plane.resource + '/' + id)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error.response);
            });
    }
}