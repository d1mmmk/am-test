(function() {
  var placeholder, subsearch;

  subsearch = "subsearch";

  placeholder = "placeholder";

  (function($) {
    $.fn["placeholder"] = function() {
      $(this).each(function() {
        var self, target;
        self = [];
        target = $(this);
        if (target.data(placeholder)) {
          return;
        }
        target.data(placeholder, true);
        self.ph = target.attr("placeholder");
        if (!self.ph) {
          return;
        }
        target.attr("placeholder", "").wrapAll(self.wrapper = $('<span>').css({
          "position": "relative"
        })).before(self.placeholder = $("<span>").css({
          "position": "absolute",
          "top": 0,
          "left": "9px"
        }).addClass('placeholder').text(self.ph).on('click', function() {
          return target.trigger('focus');
        })).on("focus", function() {
          $(this).addClass('focused');
          return self.placeholder.addClass('focused');
        }).on("keydown keyup blur", function() {
          if ($(this).val()) {
            self.placeholder.hide();
          } else {
            self.placeholder.show();
          }
          return self.placeholder.removeClass('focused');
        }).on("blur", function() {
          return $(this).removeClass('focused');
        });
        if (target.val()) {
          return self.placeholder.hide();
        }
      });
      return $(this);
    };
    return $.fn[subsearch] = function(param) {
      var remove, rendersubclass, select, subclass;
      param = $.extend({
        cats_container: ".search__category",
        cat_container: ".search__category_category",
        cat_title: ".search__category_category__title",
        cat_controls: ".search__category_category__controls",
        cat_items: ".search__category_category__item",
        cat_items_name: ".search__category_category__name",
        cat_all_select: ".glyphicon-ok",
        cat_all_remove: ".glyphicon-remove",
        form: ".search__form form",
        cats_input: ".search__form__input-hidden",
        subclass_container: ".search__subclass",
        subclass: {
          cls: "subclass",
          close: "subclass__close"
        }
      }, param);
      subclass = function(obj, callback) {
        close;
        var close, res;
        res = $('<span></span>', {
          "class": param.subclass.cls
        }).text(obj.text()).append(close = $("<span></span>", {
          "class": "glyphicon glyphicon-remove " + param.subclass.close
        }));
        close.on("click", function() {
          remove(obj);
          return callback();
        });
        return res;
      };
      rendersubclass = function(target, obj, input, callback) {
        var val;
        target.empty();
        val = [];
        obj.each(function() {
          val.push($(this).find(param.cat_items_name).text());
          return target.append(subclass($(this), callback));
        });
        return input.val(val.join(','));
      };
      select = function(objs) {
        return objs.each(function() {
          return $(this).addClass("active");
        });
      };
      remove = function(objs) {
        return objs.each(function() {
          return $(this).removeClass("active");
        });
      };
      $(this).each(function() {
        var cat, cat_input, cats, form, render, subclass_container;
        form = $(this).find(param.form);
        cat_input = form.find(param.cats_input);
        cat = $(this).find(param.cat_container);
        cats = $(this).find(param.cats_container);
        subclass_container = $(this).find(param.subclass_container);
        render = function() {
          cat.removeClass("hasActive");
          return rendersubclass(subclass_container, cats.find(param.cat_items).filter(function() {
            if ($(this).hasClass("active")) {
              $(this).closest(param.cat_container).addClass('hasActive');
              return $(this);
            }
          }), cat_input, render);
        };
        return cat.each(function() {
          var cat_all_remove, cat_all_select, cat_controls, cat_items, cat_title, cats_items, self;
          self = $(this);
          cat_controls = self.find(param.cat_controls);
          cat_all_select = cat_controls.find(param.cat_all_select);
          cat_all_remove = cat_controls.find(param.cat_all_remove);
          cat_title = self.find(param.cat_title);
          cat_items = self.find(param.cat_items);
          cats_items = cats.find(param.cat_items);
          cat_title.on("click", function(event) {
            event.preventDefault();
            if (cat_controls.has(event.target).length) {
              return;
            }
            return self.toggleClass("open");
          });
          cat_controls.on("click", function(event) {
            return event.preventDefault();
          });
          cat_controls.on("click", function(event) {
            return event.preventDefault();
          });
          cat_all_select.on("click", function(event) {
            select(cat_items);
            return render();
          });
          cat_all_remove.on("click", function(event) {
            remove(cat_items);
            return render();
          });
          return cat_items.each(function() {
            return $(this).on("click", function() {
              if ($(this).hasClass("active")) {
                remove($(this));
              } else {
                select($(this));
              }
              return render();
            });
          });
        });
      });
      return $(this);
    };
  })(jQuery);

  jQuery(document).ready(function() {
    $(".search")[subsearch]();
    return $("input")[placeholder]();
  });

}).call(this);
