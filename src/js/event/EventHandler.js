import { EventEmitter } from '../utils/EventEmitter.js';
import { EVENT } from '../Constant.js';

class EventHandler extends EventEmitter {
  emitCreatedLottoList(lottoList) {
    this.emit(EVENT.CreatedLottoList, lottoList);
  }

  onCreatedLottoList(callback) {
    this.on(EVENT.CreatedLottoList, callback);
  }

  emitResultCheck(lottoNumber) {
    this.emit(EVENT.ResultCheck, lottoNumber);
  }

  onResultCheck(callback) {
    this.on(EVENT.ResultCheck, callback);
  }

  emitInputPurchasePrice(price) {
    this.emit(EVENT.InputPurchasePrice, price);
  }

  onInputPurchasePrice(callback) {
    this.on(EVENT.InputPurchasePrice, callback);
  }

  emitRestart() {
    this.emit(EVENT.Restart);
  }

  onRestart(callback) {
    this.on(EVENT.Restart, callback);
  }
}

export const eventHandler = new EventHandler();
