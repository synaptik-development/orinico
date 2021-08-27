//EcmaScript 6 : POO Class
//Class de l'objetArticle
class Article {
  /**
   * Class Article - Cette classe permet d'instancier un objet Article
   *
   * @param {string} name - la valeur de l'attribut name
   * @param {string} id - la valeur de l'attribut id
   * @param {string} lenses - la valeur de l'attribut lenses
   * @param {string} image - la valeur de l'attribut image
   * @param {number} price  - la valeur de l'attribut price
   * @param {number} quantity  - la valeur de l'attribut quantity
   */
  constructor(name, id, lenses, image, price, quantity) {
    (this._name = name), (this._id = id), (this._lenses = lenses), (this._image = image), (this._price = price), (this._quantity = quantity);
  }

  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set id(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }

  set lenses(lenses) {
    this._lenses = lenses;
  }
  get lenses() {
    return this._lenses;
  }

  set image(image) {
    this._image = image;
  }
  get image() {
    return this._image;
  }

  set price(price) {
    this._price = price;
  }
  get price() {
    return this._price;
  }

  set quantity(quantity) {
    this._quantity = quantity;
  }
  get quantity() {
    return this._quantity;
  }
}
