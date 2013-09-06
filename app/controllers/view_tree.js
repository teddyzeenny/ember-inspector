var ViewTreeController = Ember.ObjectController.extend({
  pinnedNode: null,
  inspectingViews: false,

  actions: {
    previewLayer: function(node) {
      if (node !== this.get('pinnedNode')) {
        this.get('port').send('view:previewLayer', { objectId: node.value.objectId });
      }
    },

    hidePreview: function(node) {
      this.get('port').send('view:hidePreview', { objectId: node.value.objectId });
    },

    toggleViewInspection: function() {
      this.get('port').send('view:inspectViews', { inspect: !this.get('inspectingViews') });
    }
  }
});

export default ViewTreeController;
