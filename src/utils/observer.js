export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObservers(observer) {
    this._observers.push(observer);
  }

  deleteObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}