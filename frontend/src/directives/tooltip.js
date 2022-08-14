const tooltipDirective = (app) => {
  app.directive("tooltip", {
    mounted(el, binding) {
      init(el, binding);
    },
    updated(el, binding) {
      init(el, binding);
    },
  });
};

function init(el, binding) {
  let position = binding.arg || "top";
  let tooltipText = binding.value;
  if (binding.value) {
    el.setAttribute("position", position);
    el.setAttribute("tooltip", tooltipText);
  } else {
    el.setAttribute("position", undefined);
    el.setAttribute("tooltip", undefined);
  }
}

export default tooltipDirective;
