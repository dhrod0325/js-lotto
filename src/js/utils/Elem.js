export const Elem = () => {
  function hide(elem) {
    elem.classList.add('hide');
  }

  function show(elem) {
    elem.classList.remove('hide');
  }

  function create(template) {
    const $container = document.createElement('template');
    $container.innerHTML = template;

    return $container.content.firstElementChild;
  }

  function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  return {
    hide,
    show,
    create,
    removeAllChild,
  };
};

export const elem = Elem();
