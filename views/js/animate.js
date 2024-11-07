    var slider = function(slider, items, itemOnClassName, options) {
        this.$slider = $(slider);
        this.$items = $(items);
        this.itemOnClassName = itemOnClassName;
        this.itemCount = this.$items.length;
        this.timer = null;
        this.currentIndex = 0;
        this.defaults = {
            interval: 3000,
            navItems: null,
            navItemOnClassName: "",
            navType: "mouseover",
            isAuto: true,
            stoppable: true,
            stopInType: "mouseover",
            stopOutType: "mouseout"
        };
        this.options = $.extend(this.defaults, options || {});
        this.$navItems = this.options.navItems ? $(this.options.navItems) : null;
    };
    slider.nav = function(event) {
        var slider = event.data.slider;
        var index = slider.$navItems.index(this);
        slider.switchTo(index);
    };
    slider.prototype = {
        switchTo: function(index) {
            var ts = this;
            ts.currentIndex = index >= ts.itemCount ? 0 : index;
            ts.$items.removeClass(ts.itemOnClassName).eq(ts.currentIndex).addClass(ts.itemOnClassName);
            if (ts.$navItems) {
                ts.$navItems.removeClass(ts.options.navItemOnClassName).eq(ts.currentIndex).addClass(ts.options.navItemOnClassName);
            }
        },
        enableAuto: function() {
            var ts = this;
            ts.timer = setInterval(function() {
                ts.switchTo(ts.currentIndex + 1);
            }, this.options.interval);
        },
        disableAuto: function() {
            var ts = this;
            clearInterval(ts.timer);
        },
        enableNav: function() {
            var ts = this;
            ts.$navItems.on(this.options.navType, {
                slider: ts
            }, slider.nav);
        },
        disableNav: function() {
            var ts = this;
            ts.$navItems.off(this.options.navType, slider.nav);
        },
        enableStoppable: function() {
            var ts = this;
            ts.$slider.on(ts.options.stopInType, function(event) {
                event.preventDefault();
                ts.disableAuto();
            }).on(ts.options.stopOutType, function(event) {
                event.preventDefault();
                ts.enableAuto();
            });
        },
        enable: function() {
            var ts = this;
            if (ts.options.isAuto) {
                ts.enableAuto();
                if (ts.options.stoppable) {
                    ts.enableStoppable();
                }
            }
            if (ts.$navItems) {
                ts.enableNav();
            }
        }
    };
    $(document).ready(function() {
        (function() {
            var $cooperator = $(".cooperator"),
                cooperatorOn = "cooperator--on";
            $(".cooperator__title").click(function(event) {
                $cooperator.toggleClass(cooperatorOn);
            });
            $(document.body).click(function(event) {
                if (!$(event.target).hasClass("cooperator__title-mask")) {
                    $cooperator.removeClass(cooperatorOn);
                }
            });
        })();
        (function() {
            if ($(".slider").length) {
                var sli = new slider(".slider", ".slider .slider__item", "slider__item--on", {
                    navItems: ".slider .slider__nav-item",
                    navItemOnClassName: "slider__nav-item--on"
                }).enable();
            }
        })();
        (function() {
            var tabs = ["tab", "tab-box"];
            for (var i = 0; i < tabs.length; i++) {
                (function(tab) {
                    var tabItem = tab + "__item",
                        tabItemOn = tab + "__item--on",
                        tabContentItem = tab + "__content-item",
                        tabContentItemOn = tab + "__content-item--on";
                    $("." + tabItem).mouseover(function(event) {
                        var $ts = $(this),
                            $tab = $ts.parents("." + tab),
                            $tabItems = $tab.find("." + tabItem),
                            $tabContentItems = $tab.find("." + tabContentItem),
                            index = $tabItems.index($ts);
                        $tabItems.removeClass(tabItemOn).eq(index).addClass(tabItemOn);
                        $tabContentItems.removeClass(tabContentItemOn).eq(index).addClass(tabContentItemOn);
                    });
                })(tabs[i]);
            }
        })();
    });
