import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.A([
      Ember.Object.create({'letter':'A', 'frequency':1492 }),
      Ember.Object.create({ 'letter':'B', 'frequency':8167 }),
      Ember.Object.create({ 'letter':'C', 'frequency':2780 }),
      Ember.Object.create({ 'letter':'D', 'frequency':4253 }),
      Ember.Object.create({ 'letter':'E', 'frequency':12702 })
    ]);
  }
});
