export class Store {
  state;
  subscribers = [];

  constructor(state) {
    this.state = state;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish(context) {
    this.subscribers.forEach(subscriber => {
      if (context && subscriber === context) return;
      subscriber.onChangeState && subscriber.onChangeState(this.state);
    });
  }

  getState() {
    return this.state;
  }

  setState(newState, context) {
    this.state = { ...this.state, ...newState };
    this.publish(context);
  }
}

export const store = new Store();
