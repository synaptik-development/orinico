class Contact {
  constructor(firstName, lastName, address, cp, city, email) {
    (this.firstName = firstName), (this.lastName = lastName), (this.address = address), (this.cp = cp), (this.city = city), (this.email = email);
  }
}

// class Contact {
//     /**
//      * Class Contact - Cette classe permet d'instancier un objet Contact
//      *
//      * @param {string} firstName - la valeur de l'attribut firstName
//      * @param {string} lastName - la valeur de l'attribut lastName
//      * @param {string} address - la valeur de l'attribut address
//      * @param {number} cp - la valeur de l'attribut cp
//      * @param {string} city  - la valeur de l'attribut city
//      * @param {string} email  - la valeur de l'attribut email
//      */
//     constructor(firstName, lastName, address, cp, city, email) {
//       (this._firstName = firstName),
//         (this._lastName = lastName),
//         (this._address = address),
//         (this._cp = cp),
//         (this._city = city),
//         (this._email = email);
//     }

//     set firstName(firstName) {
//       this._firstName = firstName;
//     }
//     get firstName() {
//       return this._firstName;
//     }

//     set lastName(lastName) {
//       this._lastName = lastName;
//     }
//     get lastName() {
//       return this._lastName;
//     }

//     set address(address) {
//       this._address = address;
//     }
//     get address() {
//       return this._address;
//     }

//     set cp(cp) {
//       this._cp = cp;
//     }
//     get cp() {
//       return this._cp;
//     }

//     set city(city) {
//       this._city = city;
//     }
//     get city() {
//       return this._city;
//     }

//     set email(email) {
//       this._email = email;
//     }
//     get email() {
//       return this._email;
//     }
//   }
