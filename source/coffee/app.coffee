subsearch = "subsearch"
placeholder = "placeholder"
disableSelection = "disableSelection"
(($)->
    $.fn["disableSelection"] = ->
        console.log($(this))
        $(this).each ->
             $(this)
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);

    $.fn["placeholder"] = ->
        $(this).each ->
            self = []
            target = $(this)

            if target.data placeholder then return
            target.data placeholder, true

            self.ph = target.attr "placeholder"
            if !self.ph then return
            target
                .attr("placeholder","")
                .wrapAll(
                    self.wrapper = $('<span>').css {
                                        "position": "relative"
                                    }
                    ).before(
                        self.placeholder = $("<span>").css({
                            "position": "absolute",
                            "top": 0,
                            "left": "9px"
                        })
                        .addClass('placeholder')
                        .text(self.ph)
                        .on 'click', ->
                            target.trigger 'focus'
                    )
                .on("focus", ->
                    $(this).addClass 'focused'
                    self.placeholder.addClass 'focused'
                )
                .on("keydown keyup blur", ->
                    if $(this).val()
                        self.placeholder.hide()
                    else
                        self.placeholder.show()
                    self.placeholder.removeClass 'focused'
                )
                .on("blur", ->
                    $(this).removeClass 'focused'
                )

            if target.val()
                self.placeholder.hide()

        $(this);
    $.fn[subsearch] = (param) ->
        param = $.extend {
            cats_container: ".search__category"
            cat_container: ".search__category_category"
            cat_title: ".search__category_category__title"
            cat_controls: ".search__category_category__controls"
            cat_items: ".search__category_category__item"
            cat_items_name: ".search__category_category__name"
            cat_all_select: ".glyphicon-ok"
            cat_all_remove: ".glyphicon-remove"
            form: ".search__form form"
            cats_input: ".search__form__input-hidden"
            subclass_container: ".search__subclass"
            subclass: {
                cls: "subclass"
                close: "subclass__close"
            }
            },param
        subclass = (obj,callback)->
            close;
            res = $('<span></span>',{
                "class": param.subclass.cls
                })
                .text(obj.text())
                .append(
                    close = $("<span></span>",{
                        "class": "glyphicon glyphicon-remove "+param.subclass.close
                        })
                    )
            close.on "click", ->
                remove obj
                callback()
            res
        rendersubclass = (target, obj, input, callback) ->
            target.empty()
            val = []
            obj.each ->
                val.push($(this).find(param.cat_items_name).text())
                target.append subclass($(this), callback)

            input.val(val.join(','))
        select = (objs) ->
            objs.each ->
                $(this).addClass "active"
        remove = (objs) ->
            objs.each ->
                $(this).removeClass "active"

        $(this).each ->
            form = $(this).find param.form
            cat_input = form.find param.cats_input
            cat = $(this).find param.cat_container
            cats = $(this).find param.cats_container
            subclass_container = $(this).find param.subclass_container
            render = ->
                cat.removeClass("hasActive")
                rendersubclass subclass_container,
                    cats.find(param.cat_items).filter(->
                        if $(this).hasClass("active")
                            $(this).closest(param.cat_container).addClass('hasActive')
                            $(this)
                    )
                    ,cat_input, render
            cat.each ->
                self = $(this)
                cat_controls = self.find(param.cat_controls)
                cat_all_select = cat_controls.find(param.cat_all_select)
                cat_all_remove = cat_controls.find(param.cat_all_remove)

                cat_title = self.find(param.cat_title)
                cat_items = self.find(param.cat_items)
                cats_items = cats.find(param.cat_items)
                    
                cat_title.on "click", (event) ->
                    event.preventDefault();
                    if cat_controls.has(event.target).length then return
                    self.toggleClass("open");
                cat_controls.on "click", (event) ->
                    event.preventDefault();
                cat_controls.on "click", (event) ->
                    event.preventDefault();
                cat_all_select.on "click", (event) ->
                    select cat_items
                    render()
                cat_all_remove.on "click", (event) ->
                    remove cat_items
                    render()
                cat_items.each ->
                    $(this).on "click", ->
                        if $(this).hasClass "active"
                            remove $(this)
                        else
                            select $(this)
                        render()

        $(this)

)(jQuery)

jQuery(document).ready ->
    $(".search__category")[disableSelection]()
    $(".search")[subsearch]()
    $("input")[placeholder]()
