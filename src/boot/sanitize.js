import sanitizeHtml from 'sanitize-html';
import { unescape } from 'validator';

const clean = (dirty) => sanitizeHtml(dirty, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
});

const sanitize = (content) => clean(unescape(content));

export default ({ Vue }) => {
  Vue.prototype.$sanitize = sanitize;
};

export { sanitize };
