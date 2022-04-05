import { EventEmitter } from '../utils/EventEmitter.js';
import { EVENT } from '../Constant.js';

class EventHandler extends EventEmitter {
  emitRestart() {
    this.emit(EVENT.Restart);
  }

  onRestart(callback) {
    this.on(EVENT.Restart, callback);
  }
}

export const eventHandler = new EventHandler();
