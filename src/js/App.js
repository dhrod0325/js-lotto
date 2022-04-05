import { store } from './store/Store.js';

class App {
  components = [];

  addComponent(component) {
    this.components.push(component);
  }

  restart() {
    this.components.forEach(component => component.restart());
    store.clear();
  }
}

export const app = new App();
