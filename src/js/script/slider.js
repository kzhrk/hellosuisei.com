/*! 
 * (c) 2014 kzhrk
 * HELLO-SUISEI original slider
 * hellosuisei.com
 */
/**
 *  Class Slider
 *  @class Slider
 *  @constructor
 */
var Slider  = function () {
  this.$left        = '';
  this.$right       = '';
  this.$box         = '';
  this.$slide       = '';
  this.$pager       = '';
  this.width        = 480;
  this.height       = 0;
  this.index        = 0;
  this.max          = 0;
  this.speed        = 0;
  this.classCurrent = '';
  this.animating    = false;
}
/**
 *  Slider initial method
 *  @method init
 */
Slider.prototype.init = function() {
  var that  = this;

  this.$left        = $('#js-left');
  this.$right       = $('#js-right');
  this.$box         = $('#js-slide');
  this.$slide       = this.$box.children();
  this.$pager       = $('#js-slide--pager').children();
  this.height       = this.$slide.height();
  this.max          = this.$slide.length;
  this.speed        = 500;
  this.classCurrent = 'js-current';

  this.$box.css({
    position: 'relative'
  });
  this.changePager(this.index);

  if (this.index === 0) this.$left.hide();
  if (this.index === (this.max - 1)) this.$right.hide();

  this.$left.on('click', function(event) {
    event.preventDefault();
    that.right(1);
  });
  this.$right.on('click', function(event) {
    event.preventDefault();
    that.left(1);
  });
  this.$pager.on('click', function(event) {
    event.preventDefault();
    var pageNum = that.$pager.index(this);
    that.onClickPager(pageNum);
  });
};
/**
 *  Slide left method
 *  @method left
 *  @param {int} num
 */
Slider.prototype.left = function(num) {
  var that  = this;

  if ( this.animating === true ) return;
  if ( this.index === (this.max - 1) ) return;

  this.animating  = true;
  this.$box.animate({
    left: '-=' + this.width * num
  },
  this.speed, function() {
    that.animating  = false;
    that.index += num;
    that.changePager(that.index);
    if (that.index === (that.max - 1)) that.$right.hide();
    if (that.index !== 0) that.$left.show();
  });
};
/**
 *  Slide right method
 *  @method right
 *  @param {int} num
 */
Slider.prototype.right = function(num) {
  var that  = this;

  if ( this.animating === true ) return;
  if ( this.index === 0 ) return;

  this.animating  = true;
  this.$box.animate({
    left: '+=' + this.width * num
  },
  this.speed, function() {
    that.animating  = false;
    that.index -= num;
    that.changePager(that.index);
    if (that.index === 0) that.$left.hide();
    if (that.index !== (that.max - 1)) that.$right.show();
  });
};
/**
 *  Slide changePager method
 *  @method changePager
 */
Slider.prototype.changePager = function(current) {
  this.$pager.removeClass(this.classCurrent)
    .eq(current).addClass(this.classCurrent);
};
/**
 *  Slide onClickPager method
 *  @method onClickPager
 *  @param {int} num
 */
Slider.prototype.onClickPager = function(num) {
  if (num > this.index) this.left(num - this.index);
  if (num < this.index) this.right(this.index - num);
};  

// set namespace
window.HS = window.HS || {};
HS.Slider = new Slider();
