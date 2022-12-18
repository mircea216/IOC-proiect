/* 
	FICHIER APPELE PAR /_includes/_header.php 
	
	!!! A rajouter dans la page de contenu qui est censée lancer la chasse !!!
	<script>chasseMM.enableChasse();</script>
*/
function MMunch() {
  var p = this;
  this.pageDediee =
    "/c_2228/coloring-pages/holidays-coloring-pages/halloween-coloring-pages/jack-o-lantern-pumpkins-coloring-pages/flying-bat-pumpkins"; //dedicated page - user will be redirected after clicking the first item
  this.urlMM =
    "/c_27949/drawing-for-kids/drawing-tutorials-step-by-step/nickelodeon/how-to-draw-fire-nation-chibi-toph"; //URL where the user wil be redirected after completing the hunt
  this.dirChasse = "/op/chasse/";
  this.objectif = 5;
  this.found = 0;
  this.hasStarted = false;
  this.hasFinised = false;
  this.effect = "easeInOutElastic"; //"swing";
  this.aborted = false;

  // VERIF DES EXCEPTIONS
  this.loopTest = 0;
  this.siDestroy = setInterval(function () {
    p.checkDestroyer();
  }, 500);

  // ON NE DECLANCHE LA CHASSE QUE SI ON EST PASSE SUR LA PAGE DEDIEE (24/9/12) > demande de Ben
  this.test = function () {
    $.post(
      p.dirChasse + "ajax.php",
      { action: "test" },
      function success(data) {
        if (data == "started") {
          p.init();
        }
      }
    );
  };

  this.enableChasse = function () {
    $.post(
      p.dirChasse + "ajax.php",
      { action: "start" },
      function success(data) {
        p.init();
      }
    );
  };

  this.init = function () {
    // SUR PETIS ECRANS ON NE FAIT RIEN : TROP RELOU
    if (interface.cssWidth == "w320" || interface.cssWidth == "w480") {
      return false;
    }

    this.checkDestroyer();
    if ($("#global").length > 0 && this.aborted == false) {
      $.post(
        p.dirChasse + "ajax.php",
        { action: "load", max: this.objectif },
        function success(data) {
          //alert(data);
          if (data == "finished") {
            p.hasFinished = true;
          } else {
            p.found = data;
            p.hasFinished = false;
            if (p.found > 0) {
              p.hasStarted = true;
            }
          }

          if (p.hasFinished == false) {
            $("head").append(
              '<link rel="stylesheet" href="' +
                p.dirChasse +
                "chasse.css?rnd=" +
                Math.random() +
                '" type="text/css" />'
            );

            $("#mmBarre").remove();
            $("#global").prepend(
              '<div id="mmBarre"><div class="counter"></div><a class="aide" href="' +
                p.pageDediee +
                '"></a></div>'
            );
            $("#mmBarre").hide();
            p.setScore();
          }
          if (p.hasStarted == true) {
            p.start();
          }

          p.showMonster();
        }
      );
    }
  };
  this.reset = function () {
    $.post(
      p.dirChasse + "ajax.php",
      { action: "reset" },
      function success(data) {
        p.init();
      }
    );
  };

  this.start = function () {
    $("#mmBarre").slideDown(1000);
  };

  this.setScore = function () {
    $("#mmBarre .counter").text(this.found);
    if (this.found >= this.objectif) {
      this.gameOver();
    }
  };

  this.gameOver = function () {
    if (this.hasFinised == false) {
      document.location.href = this.urlMM;
      this.hasFinised = true;
    }
  };

  this.getPossibleCoords = function () {
    var sw = document.body.offsetWidth - $("#mmMonster").width();
    var sh = window.innerHeight;
    if (!sh) sh = document.documentElement.clientHeight;
    sh -= $("#mmMonster").height();

    var retour = {};
    retour.top = Math.round(Math.random() * sh);
    retour.left = Math.round(Math.random() * sw);

    return retour;
  };

  this.showMonster = function () {
    $("#mmMonster").remove();
    if (this.hasFinised == false) {
      $("body").append('<a id="mmMonster" class="visu' + p.found + '"></a>');

      var possible = this.getPossibleCoords();
      $("#mmMonster").css({
        top: possible["top"] + "px",
        left: possible["left"] + "px",
      });

      // CLICK
      $("#mmMonster").click(function () {
        $(this).unbind("click").stop();
        clearInterval(p.si);
        if (p.found == 0) {
          p.start();
        }

        var off = $("#mmBarre .counter").offset();
        $(this)
          .stop()
          .animate(
            { top: off["top"], left: off["left"] },
            600,
            p.effect,
            function () {
              $.post(
                p.dirChasse + "ajax.php",
                { action: "new" },
                function success(data) {
                  if (data == "ok") {
                    p.found++;
                    p.setScore();

                    // Cas du démarrage inconditionnel > on renvoit sur la page de présentation du jeu
                    if (
                      document.location.href.indexOf(p.pageDediee) == -1 &&
                      p.found == 1
                    ) {
                      document.location.href = p.pageDediee;
                    }
                  }
                }
              );
              $(this).hide(1000, p.effect, function () {
                var cURL = window.top.document.location.href;
                if (cURL.indexOf(p.pageDediee) == -1) {
                  if (p.found == 1) {
                    document.location.href = p.pageDediee;
                  }
                }
              });
            }
          );
      });
    }

    var possible2 = p.getPossibleCoords();
    $("#mmMonster").animate(
      { top: possible2["top"] + "px", left: possible2["left"] + "px" },
      5000,
      p.effect
    );

    p.si = setInterval(function () {
      var possible = p.getPossibleCoords();
      p.checkDestroyer();
      $("#mmMonster").animate(
        { top: possible["top"] + "px", left: possible["left"] + "px" },
        5000,
        p.effect
      );
    }, 5000);
  };

  this.checkDestroyer = function () {
    if (this.aborted == false) {
      this.loopTest++;
      if (this.loopTest > 1000) {
        clearInterval(this.siDestroy);
      }
      if ($("#mmDestroy").length > 0) {
        this.destroy();
      }
    } else {
      clearInterval(this.siDestroy);
    }
  };

  this.destroy = function () {
    this.aborted = true;
    $("#mmMonster, #mmBarre").stop().remove();
    clearInterval(this.si);
    clearInterval(this.siDestroy);
  };
}
//$(function(){
var chasseMM = new MMunch();

// DEMARAGE LIMITE
chasseMM.test();

// DEMARAGE INCONDITIONNEL
//	chasseMM.init();

//alert(document.location.href);

//});
//chasseMM.reset();
