// Import
// Airport class
import {Airport} from '../service/Airport.js';
let airport = new Airport();
// Alert class
import {Alert} from './Alert.js';
let alert = new Alert();
// Validate class
import {Validate} from "./Validate.js";
let validate = new Validate();

// CREATE NEW AIRPORT ////////////////////////////////////////////

// Form for creating new airport
let formSubmitAirport = document.getElementById('form-airport');
formSubmitAirport.addEventListener('submit', e => {
    e.preventDefault();

    // Get input value
    let inputName = document.getElementById('name').value;
    let inputCity = document.getElementById('city').value;
    let inputOACI = document.getElementById('oaci').value;
    // let inputImg = document.getElementByName('image').value;

    validate.airport(
        document.getElementById('city'),
        document.getElementById('oaci'),
        document.getElementById('name')
    );

    // formData input
    let formData = new FormData();
    formData.append('name', inputName);
    formData.append('city', inputCity);
    formData.append('oaci', inputOACI);
    // formData.append('url', );

    // Post request
    airport.create(formData)
        .then( data => {
            // alert.tataSuccess(data.data.message);
            alert.sweetAlertSuccess(data.data.message);
            formSubmitAirport.reset();
        })
        .catch( error => {
            alert.sweetAlertError(error);
        });
});

// GET ALL AIRPORTS ////////////////////////////////////////////////

// Get request
airport.getAll()
    .then (resp => {

    // Get main div
    let div = document.getElementById('main');

    // Returned airports data
    let airports = resp.data;
    
    for(let i = 0; i < airports.length; i++) {

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

        // Airport name
        let h4 = document.createElement('h4');
        h4.classList.add('card-title', 'text-center', 'display-4');
        h4.textContent = airports[i].name;
        divCardBody.append(h4);
        
        // Airport city
        let city = document.createElement('p');
        city.classList.add('card-text', 'text-center');
        city.textContent = 'City: ' + airports[i].city;
        divCardBody.append(city);

        // Airport oaci
        let oaci = document.createElement('p');
        oaci.classList.add('card-text', 'text-center');
        oaci.textContent = 'OACI: ' + airports[i].oaci;
        divCardBody.append(oaci);

        // Airport image
        let img = document.createElement('img');
        img.classList.add('card-img-bottom');
        if(airports[i].url) {
            img.setAttribute('src', airports[i].url);
        } else {
            img.setAttribute('src', 'assets/imgs/default-airport.jpg');
        }
        img.style.width = '100%';
        img.style.marginBottom = '10px';
        divCardBody.append(img);

        // Airport btn update
        let btnUpdate = document.createElement('button');
        btnUpdate.textContent = 'Update';
        btnUpdate.style.width = '48%';
        btnUpdate.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        divCardBody.append(btnUpdate);

        // Airport btn delete
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
            let updateCity = document.getElementById('city-update');
            // let updateImage = document.getElementById('image-update');
            let updateOaci = document.getElementById('oaci-update');

            // Set input value
            updateName.value = airports[i].name;
            updateCity.value = airports[i].city;
            // updateImage.value = airports[i].url;
            updateOaci.value = airports[i].oaci;

            //UPDATE AIRPORT /////////////////////////////////////////////

            // Get the <form> element form modal
            let updateForm = document.getElementById('form-update-airport');

            // Update form event listener
            updateForm.addEventListener('submit', e => {
                e.preventDefault();

                // Get input value from form (update)
                let name = updateName.value;
                let city = updateCity.value;
                let oaci = updateOaci.value;
                // let img = updateImage.value;

                // formData input
                let formData = new FormData();
                formData.append('name', name);
                formData.append('city', city);
                formData.append('oaci', oaci);
                //formData.append('url', img);

                // Update request
                airport.update(airports[i].id, formData)
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
                    airport.delete(airports[i].id)
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