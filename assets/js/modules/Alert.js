export class Alert {

    // ERRORS //////////////////////////////////////

    tataError(errorText) {
        tata.error('Error:', errorText, {
            position: 'tm',
            duration: 5000
        });
    }

    sweetAlertError(error){
        if(error.status == 422) {
            let text = '';
            for (let errors in error.data.errors) {
                text += error.data.errors[errors];
            }
            Swal.fire({
                icon: 'error',
                title: 'Error:',
                text: text,
                showConfirmButton: false,
                timer: 3000
            });
            text = '';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error:',
                text: error.data.message,
                showConfirmButton: false,
                timer: 3000
            });
        }

    }

    // SUCCESS //////////////////////////////////////

    tataSuccess(successText) {
        tata.success('Success:', successText, {
            position: 'tm',
            duration: 5000,
        });
    }
    sweetAlertSuccess(message) {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    // DELETE ////////////////////////////////////////

    deleteCheck() {

    }
}