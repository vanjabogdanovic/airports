// Import
// Plane class
import {Plane} from '../service/Plane.js';
let plane = new Plane();
// Alert class
import {Alert} from './Alert.js';
let alert = new Alert();

// CREATE NEW PLANE ////////////////////////////////////////////

// Form for creating new airport
let formSubmitPlane = document.getElementById('form-airport');
formSubmitPlane.addEventListener('submit', e => {
    e.preventDefault();

    // Get input value
    let inputName = document.getElementById('name').value;
    let inputModel = document.getElementById('model').value;
    let inputYear = document.getElementById('year').value;
    // let inputImg = document.getElementByName('image').value;

    // formData input
    let formData = new FormData();
    formData.append('name', inputName);
    formData.append('model', inputModel);
    formData.append('year', inputYear);
    // formData.append('url', );

    // Post request
    plane.create(formData)
        .then( data => {
            // alert.tataSuccess(data.data.message);
            alert.sweetAlertSuccess(data.data.message);
            formSubmitPlane.reset();
        })
        .catch( error => {
            alert.sweetAlertError(error);
        });
});

// GET ALL PLANES ////////////////////////////////////////////////

// Get request
plane.getAll()
.then (resp => {

    // Get main div
    let div = document.getElementById('main');

    // Returned airports data
    let planes = resp.data;
    
    for(let i = 0; i < planes.length; i++) {

        let col4 = document.createElement('div', 'float-left');
        col4.classList.add('col-4', 'mt-4');
        div.append(col4);

        let divCard = document.createElement('div');
        divCard.classList.add('card');
        // divCard.style.width = '400px';
        col4.append(divCard);

        let divCardBody = document.createElement('div');
        divCard.classList.add('card-body');
        divCard.append(divCardBody);

        // Plane name
        let h4 = document.createElement('h4');
        h4.classList.add('card-title', 'text-center', 'display-4');
        h4.textContent = planes[i].name;
        divCardBody.append(h4);
        
        // Plane city
        let model = document.createElement('p');
        model.classList.add('card-text', 'text-center');
        model.textContent = 'Model: ' + planes[i].model;
        divCardBody.append(model);

        // Plane year
        let year = document.createElement('p');
        year.classList.add('card-text', 'text-center');
        year.textContent = 'Year: ' + planes[i].year;
        divCardBody.append(year);

        // Plane image
        let img = document.createElement('img');
        img.classList.add('card-img-bottom');
        if(planes[i].url) {
            img.setAttribute('src', planes[i].url);
        } else {
            img.setAttribute('src', 'assets/imgs/default-plane.png');
        }
        img.style.width = '100%';
        img.style.marginBottom = '10px';
        divCardBody.append(img);

        // Plane btn update
        let btnUpdate = document.createElement('button');
        btnUpdate.textContent = 'Update';
        btnUpdate.style.width = '48%';
        btnUpdate.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        divCardBody.append(btnUpdate);

        // Plane btn delete
        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.style.width = '48%';
        btnDelete.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'float-right');
        divCardBody.append(btnDelete);

        //UPDATE MODAL /////////////////////////////////////////////

        // Get the modal
        let modal = document.getElementById("myModal");

        // When the user clicks on the button, open the modal
        btnUpdate.addEventListener('click', () => {
            modal.classList.remove('d-none');
            modal.classList.add('d-block');

            // Get update inputs from modal
            let updateName = document.getElementById('name-update');
            let updateModel = document.getElementById('model-update');
            // let updateImage = document.getElementById('image-update');
            let updateYear = document.getElementById('year-update');

            // Set input value
            updateName.value = planes[i].name;
            updateModel.value = planes[i].model;
            // updateImage.value = airports[i].url;
            updateYear.value = planes[i].year;

            //UPDATE PLANE /////////////////////////////////////////////////////

            // Get the <form> element form modal
            let updateForm = document.getElementById('form-update-airport');

            // Update form event listener
            updateForm.addEventListener('submit', e => {
                e.preventDefault();

                // Get input value from form (update)
                let name = updateName.value;
                let model = updateModel.value;
                let year = updateYear.value;
                // let img = updateImage.value;

                // formData input
                let formData = new FormData();
                formData.append('name', name);
                formData.append('model', model);
                formData.append('year', year);
                //formData.append('url', img);

                // Update request
                plane.update(planes[i].id, formData)
                    .then( data => {
                        alert.sweetAlertSuccess(data.data.message);
                    })
                    .catch( error => {
                        alert.sweetAlertError(error);
                    });
            });
        });

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.addEventListener('click', () => {
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        });

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', e => {
            if (e.target == modal) {
                modal.classList.remove('d-block');
                modal.classList.add('d-none');            }
        });

        //DELETE AIRPORT ////////////////////////////////////////////////

        // Delete button event listener
        btnDelete.addEventListener('click', () => {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#532688',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    // Delete request
                    plane.delete(planes[i].id)
                        .then( data => {
                            // Remove div from deleted airport
                            if(data.status == 200) {
                                div.removeChild(col4);
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                );
                            }
                        });
                }
            });
        });
    }
});