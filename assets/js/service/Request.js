const API_URL = 'http://airports.test/api/';
export class Request {

    // getRequest(url) {
    //     return axios.get('http://airports.test/api/' + url, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': this._bearer,
    //             'Accept': 'application/json',
    //         } 
    //     })
    //     .then (response => {
    //         return Promise.resolve(response);
    //     })
    //     .catch( error => {
    //         return Promise.reject(error.response);
    //     });
    // }
    
    // Get request
    getRequest(url) {
        return axios.get(API_URL + url)
            .then (response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error.response);
            });
    }

    // Post request
    postRequest(url, formData, multipart = false) {
        let headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };
        return axios.post(API_URL + url, formData, multipart ? headers : null)
            .then (response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error.response);
            });
    }

    // Update request
    updateRequest(url, formData, multipart = false) {
        let headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };
        return axios.post(API_URL + url, formData, multipart ? headers : null)
            .then ( response => {
                return Promise.resolve(response);
            })
            .catch( error => {
                return Promise.reject(error.response);
            });
    }
    // Delete request
    deleteRequest(url) {
        return axios.delete(API_URL + url)
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                return Promise.reject(error.response);
            });
    }
}