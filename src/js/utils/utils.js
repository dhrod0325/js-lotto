export function createElement(template) {
  const $container = document.createElement('template');
  $container.innerHTML = template;

  return $container.content.firstElementChild;
}
