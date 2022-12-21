/**
 * Main navigation for mobile devices.
 * Allows toggling the navigation using the burger button.
 */
function BurgerMenu() {
  var b = this;
  b.menu = $("#main-navigation");
  b.burger = $("#burger");
  b.mask = $("#mask");
  b.body = $("body");
  b.start = function () {
    if (b.menu.length > 0 && b.burger.length > 0 && b.mask.length > 0) {
      b.burger.on("click", function () {
        b.on();
      });
      b.mask.on("click", function () {
        b.off();
      });
    }
  };
  b.on = function () {
    b.body.css({
      overflow: "hidden",
    });
    b.mask.attr("attr-active", true);
    b.menu.attr("attr-active", true);
  };
  b.off = function () {
    b.body.css({
      overflow: "inherit",
    });
    b.mask.attr("attr-active", false);
    b.menu.attr("attr-active", false);
  };
}
