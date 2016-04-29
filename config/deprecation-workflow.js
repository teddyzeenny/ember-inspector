/**
 * Deprecation Workflow config.
 *
 * Throw on deprecations that we already fixed.
 * https://github.com/mixonic/ember-cli-deprecation-workflow
 */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [{
    handler: 'throw',
    matchMessage: /same function as getter and setter/
  }
]};
