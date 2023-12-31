/* ----------------------------------------------------
 * Accordion
 * ----------------------------------------------------
 * Author: Frenify
 * Author URL: http://themeforest.net/user/frenify
 */
! function(c) {
    c.fn.fn_cs_accordion = function(a) {
        if (this.length > 1) return this.each(function() {
            c(this).fn_cs_accordion(a)
        }), this;
        var e = c.extend({
            animation: !0,
            showIcon: !0,
            closeAble: !1,
            closeOther: !0,
            slideSpeed: 150,
            activeIndex: !1
        }, a);
        c(this).data("close-able") && (e.closeAble = c(this).data("close-able")), c(this).data("animation") && (e.animation = c(this).data("animation")), c(this).data("show-icon") && (e.showIcon = c(this).data("show-icon")), c(this).data("close-other") && (e.closeOther = c(this).data("close-other")), c(this).data("slide-speed") && (e.slideSpeed = c(this).data("slide-speed")), c(this).data("active-index") && (e.activeIndex = c(this).data("active-index"));
        var i = this,
            n = function() {
                i.createStructure(), i.clickHead()
            };
        return this.createStructure = function() {
            i.addClass("fn_cs_accordion"), e.showIcon && i.addClass("acc_with_icon"), i.find(".accordion_in").length < 1 && i.children().addClass("accordion_in"), i.find(".accordion_in").each(function(a, e) {
                var i = c(e).children();
                c(i[0]).addClass("acc_head"), c(i[1]).addClass("acc_content")
            }), e.showIcon && i.find(".acc_head").prepend('<div class="acc_icon_expand"></div>'), i.find(".accordion_in .acc_content").not(".acc_active .acc_content").hide(), e.activeIndex === parseInt(e.activeIndex) && (0 === e.activeIndex ? (i.find(".accordion_in").addClass("acc_active").show(), i.find(".accordion_in .acc_content").addClass("acc_active").show()) : (i.find(".accordion_in").eq(e.activeIndex - 1).addClass("acc_active").show(), i.find(".accordion_in .acc_content").eq(e.activeIndex - 1).addClass("acc_active").show()))
        }, this.clickHead = function() {
            i.on("click", ".acc_head", function() {
                var a = c(this).parent();
                0 == a.hasClass("acc_active") && e.closeOther && (i.find(".acc_content").slideUp(e.slideSpeed), i.find(".accordion_in").removeClass("acc_active")), a.hasClass("acc_active") ? !1 !== e.closeAble && (a.children(".acc_content").slideUp(e.slideSpeed), a.removeClass("acc_active")) : (c(this).next(".acc_content").slideDown(e.slideSpeed), a.addClass("acc_active"))
            })
        }, n(), this
    }
}(jQuery);