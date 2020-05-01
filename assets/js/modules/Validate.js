export class Validate  {

    emptyInput(field) {
        let error = '';
        if(!field.value) {
            error = 'The ' + field.name + ' field is required.';
        }
        return error;

    }

    // AIRPORT ////////////////////////////////////////////////////

    airportCity(field) {
        let pattern = /[a-zA-Z]/;
        let error = '';
        if(!pattern.test(field.value)) {
            error = 'The ' + field.name + ' must contain only letters. ';
        }
        return error;
    }
    airportOaci(field) {
        let pattern1 = /[A-Z]/;
        let pattern2 = /^(\w{1,4})$/;
        let error = '';
        if(!pattern1.test(field.value)) {
            error += 'The ' + field.name + ' must contain only uppercase letters. ';
        }
        if(!pattern2.test(field.value)) {
            error += 'The ' + field.name + ' length must not be longer then 4 characters. ';
        }
        return error;
    }
    airportImg() {

    }
    airport(city, oaci, name) {
        if(
            this.emptyInput(city) ||
            this.emptyInput(name)||
            this.emptyInput(oaci))
        {
            console.log(
                this.emptyInput(city),
                this.emptyInput(name),
                this.emptyInput(oaci)
            );
            return false;
        } else if(
            this.airportCity(city) ||
            this.airportOaci(oaci)) {
            console.log(
                this.airportCity(city),
                this.airportOaci(oaci)
            );
            return false;
        } else {
            return true;
        }
    }

    // PLANE ///////////////////////////////////////////////////////////

    planeName() {

    }
    planeModel() {

    }
    planeImg() {

    }
    planeYear() {

    }
}