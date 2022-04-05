class Dispatcher {
  callbacks = {};
  lastId = 1;
  isPending = {};
  isDispatching = {};
  pendingPayload;

  register(callback) {
    const id = `ID_${this.lastId++}`;
    this.callbacks[id] = callback;
    return id;
  }

  unRegister(id) {
    delete this.callbacks[id];
  }

  dispatch(payload) {
    this.startDispatching(payload);

    Object.values(this.callbacks).forEach(callback => {
      callback(payload);
    });
  }

  waitFor(ids) {
    for (let ii = 0; ii < ids.length; ii++) {
      const id = ids[ii];

      if (this.isPending[id]) {
        continue;
      }

      this.invokeCallback(id);
    }
  }

  startDispatching(payload) {
    for (const id in this.callbacks) {
      this.isPending[id] = false;
    }

    this.pendingPayload = payload;
    this.isDispatching = true;
  }

  invokeCallback(id) {
    this.isPending[id] = true;
    this.callbacks[id](this.pendingPayload);
  }
}

const myStore = { name: null };
const yourStore = { age: null };
const myDispatcher = new Dispatcher();

myDispatcher.register(payload => {
  if (payload.actionType === 'testAction2') {
    yourStore.age = payload.age;
    console.log(yourStore.age, '2');
  }
});

myDispatcher.register(payload => {
  if (payload.actionType === 'testAction') {
    myStore.name = payload.name;
    console.log(myStore.name, '1');
  }
});

myDispatcher.dispatch({
  actionType: 'testAction',
  myStoreName: 'helloWorld',
});

myDispatcher.dispatch({
  actionType: 'testAction2',
  age: 'helloWorld',
});
