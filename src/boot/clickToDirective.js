const excludedElements = ['BUTTON', 'A', 'INPUT'];

export default ({ Vue }) => {
  Vue.directive('click-to', {
    bind: (el, binding, vnode) => {
      // Add mouse cursor-pointer class.
      el.classList.add('cursor-pointer');
      // Add the tabindex so it is accessible by keyboard.
      el.tabIndex = 0;

      const handler = (event) => {
        // Check text selection
        const isTextHighlighting = window.getSelection().toString().trim() !== '';

        if (isTextHighlighting) {
          return;
        }

        // Check that the clicked element is not one of the excluded
        // elements and is not child of one of the excluded elements.
        let element = event.target;
        while (element !== null && element !== el) {
          if (excludedElements.includes(element.tagName.toUpperCase())) {
            return;
          }
          element = element.parentElement;
        }
        // Go to the given route.
        vnode.context?.$router.push(binding.value);
      };
      // Execute on click.
      el.addEventListener('click', handler);
      // Execute on enter keydown.
      el.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          handler(event);
        }
      });
    },
  });
};
