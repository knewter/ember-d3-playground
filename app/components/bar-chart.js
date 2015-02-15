import Ember from 'ember';
/* global d3 */
// No import for d3 - it's a global

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: 'width height'.w(),

  draw: function(){
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = this.get('width') - margin.left - margin.right;
    var height = this.get('height') - margin.top - margin.bottom;
    var data = this.get('data');
    var svg = d3.select(this.get('element'));

    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient('bottom');
    var yAxis = d3.svg.axis().scale(y).orient('left');

    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    svg = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
        /********* add class name on bar **********/
        .attr('class', function(d) { return d.letter; });
        /********* add class name on bar **********/

  }.on('didInsertElement'),

  redraw: function(){
    var svg = d3.select(this.get('element'));
    svg.selectAll('*').remove();
    this.draw();
  }.observes('data.@each.frequency')
});
