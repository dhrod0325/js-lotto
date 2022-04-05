import { elem } from '../utils/Elem.js';

export class Component extends HTMLElement {
  $container;

  connectedCallback() {
    this.initContainer();
    this.render();
    this.mounted();
  }

  initContainer() {
    this.$container = elem.create(`<div id='${this.constructor.name}'></div>`);
    this.replaceWith(this.$container);
  }

  render() {
    const template = this.template();
    if (!template) return;

    elem.removeAllChild(this.$container);
    this.$container.append(elem.create(template));

    this.initElement();
    this.initEvent();
  }

  mounted() {
  }

  template() {
    return '';
  }

  initElement() {
  }

  initEvent() {
  }

  reset() {
    this.render();
    this.mounted();
  }

  show() {
    elem.show(this.$container);
  }

  hide() {
    elem.hide(this.$container);
  }

}
