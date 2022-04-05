import { createElement } from '../utils/utils.js';

export class Component extends HTMLElement {
  $container;

  connectedCallback() {
    this.initContainer();
    this.render();
    this.mounted();
  }

  initContainer() {
    this.$container = createElement(`<div id='${this.constructor.name}'></div>`);
    this.replaceWith(this.$container);
  }

  render() {
    const template = this.template();
    if (!template) return;

    this.removeAllChild();
    this.$container.append(createElement(template));

    this.initElement();
    this.initEvent();
  }

  mounted() {
    //
  }

  template() {
    return '';
  }

  initElement() {
    //
  }

  initEvent() {
    //
  }

  reset() {
    this.render();
    this.mounted();
  }

  show() {
    this.$container.classList.remove('hide');
  }

  hide() {
    this.$container.classList.add('hide');
  }

  removeAllChild() {
    const removeAllChild = (parent) => {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    removeAllChild(this.$container);
  }
}
