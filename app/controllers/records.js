import Ember from "ember";
import escapeRegExp from "ember-inspector/utils/escape-reg-exp";
const { Controller, computed, observer, inject: { controller } } = Ember;
const { none, readOnly } = computed;

export default Controller.extend({
  application: controller(),

  queryParams: ['filterValue', 'search'],

  columns: readOnly('modelType.columns'),

  search: '',

  filters: computed(function() { return []; }),

  filterValue: null,

  noFilterValue: none('filterValue'),

  actions: {
    setFilter: function(val) {
      val = val || null;
      this.set('filterValue', val);
    }
  },

  modelChanged: observer('model', function() {
    this.set('search', '');
  }),

  recordToString(record) {
    let search = '';
    let searchKeywords = Ember.get(record, 'searchKeywords');
    if (searchKeywords) {
      search = Ember.get(record, 'searchKeywords').join(' ');
    }
    return search.toLowerCase();
  },

  filtered: computed('search', 'model.@each.columnValues', 'model.@each.filterValues', 'filterValue', function() {
    console.log('invalid');
    let search = this.get('search'), filter = this.get('filterValue');
    let a = this.get('model').filter(item => {
      // check filters
      if (filter && !Ember.get(item, 'filterValues.' + filter)) {
        return false;
      }

      // check search
      if (!Ember.isEmpty(search)) {
        let searchString = this.recordToString(item);
        return !!searchString.match(new RegExp('.*' + escapeRegExp(search.toLowerCase()) + '.*'));
      }
      return true;
    });
    return a;
  })
});
