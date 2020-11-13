// https://github.com/GamesDoneQuick/agdq18-layouts/blob/3d346e6b4201f0cca41ca28cb7a1de7e4885e52f/extension/util/nodecg-api-context.js

let context;
module.exports = {
  get() {
    return context;
  },
  set(ctx) {
    context = ctx;
  },
};
