import { EventEmitter } from '../utils/EventEmitter.js';
import { EVENT } from '../Constant.js';

class EventHandler extends EventEmitter {
  emit_로또번호표생성(lottoList) {
    this.emit(EVENT.로또번호표생성, lottoList);
  }

  on_로또번호표생성(callback) {
    this.on(EVENT.로또번호표생성, callback);
  }

  emit_결과확인(lottoNumber) {
    this.emit(EVENT.결과확인, lottoNumber);
  }

  on_결과확인(callback) {
    this.on(EVENT.결과확인, callback);
  }

  emit_구매금액입력(price) {
    this.emit(EVENT.구매금액입력, price);
  }

  on_구매금액입력(callback) {
    this.on(EVENT.구매금액입력, callback);
  }

  emit_다시시작() {
    this.emit(EVENT.다시시작);
  }

  on_다시시작(callback) {
    this.on(EVENT.다시시작, callback);
  }
}

export const eventHandler = new EventHandler();
