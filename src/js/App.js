import { store } from './store/Store.js';

class App {
  components = [];

  addComponent(component) {
    this.components.push(component);
  }

  restart() {
    store.clear();
    this.components.forEach(component => component.restart());
  }
}

export const app = new App();
