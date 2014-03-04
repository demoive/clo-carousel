function Carousel3D (el) {
  this.element = el;

  this.rotation = 0;
  this.theta = 0;

  this.isHorizontal = true;

  this.videos = [];
}

/**
Carousel3D.prototype.addFigure = function (srcPath) {
  var newFigure = document.createElement('figure'),
    newVideo = document.createElement('video');

  newVideo.src = srcPath;
  newVideo.volume = 0;
  newVideo.loop = true;
  newVideo.height = 150;

  newFigure.appendChild(newVideo);

  this.videos.push(newVideo);
  this.element.appendChild(newFigure);
}
/**/

Carousel3D.prototype.getPanelCount = function() {
  return this.element.children.length;
}

Carousel3D.prototype.playAll = function() {
  for (var i = 0; i < this.videos.length; ++i) {
    this.videos[i].play();
  };
}

Carousel3D.prototype.pauseAll = function() {
  for (var i = 0; i < this.videos.length; ++i) {
    this.videos[i].pause();
  };
}

Carousel3D.prototype.modify = function() {
  var panel, angle, i;

  this.panelSize = this.element[this.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
  this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
  this.theta = 360 / this.getPanelCount();

  // do some trig to figure out how big the carousel is in 3D space
  this.radius = Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.getPanelCount()));

  for (i = 0; i < this.getPanelCount(); i++) {
    panel = this.element.children[i];
    angle = this.theta * i;
    //panel.style.opacity = 1;
    //panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
    // rotate panel, then push it out in 3D space
    panel.style.webkitTransform = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
  }

  // adjust rotation so panels are always flat
  this.rotation = Math.round(this.rotation / this.theta) * this.theta;

  this.transform();
};

Carousel3D.prototype.transform = function() {
  // push the carousel back in 3D space, and rotate it
  this.element.style.webkitTransform = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
};



var init = function() {
  //var
  carousel = new Carousel3D(document.getElementById('carousel')),
    advanceTimer = null,
    //panelCountInput = document.getElementById('panel-count'),
    //rotStart = document.getElementById('rot-start'),
    //rotStop = document.getElementById('rot-stop'),
    buttonPlayAll = document.getElementById('play-all'),
    buttonPauseAll = document.getElementById('pause-all'),
    navButtonPrev = document.getElementById('nav-prev'),
    navButtonNext = document.getElementById('nav-next'),
    axisButton = document.getElementById('toggle-axis'),
    backfaceVisibility = document.getElementById('toggle-backface-visibility');

  function navClick(event) {
    var increment = parseInt(event.target.getAttribute('data-increment'));

    carousel.rotation += carousel.theta * increment * -1;
    carousel.transform();
  }

  // populate on startup
  var carouselItems = document.querySelectorAll('.panel');

  for (var i = 0; i < carouselItems.length; ++i) {
    if (carouselItems[i].children[0].tagName === 'VIDEO') {
      var curVid = carouselItems[i].children[0];
      curVid.volume = 0;
      curVid.loop = true;

      // rotated
      if (curVid.className.match(/\brot-90\b/)) {
        //curVid.videoHeight;
      }

      curVid.addEventListener('mouseover', function () { /*this.play();*/ this.volume = 1 }, false);
      curVid.addEventListener('mouseout',  function () { /*this.pause();*/ this.volume = 0 }, false);

      carousel.videos.push(curVid);
    }
  }
  //carousel.panelCount = parseInt(panelCountInput.value, 10);
  carousel.modify();

  /**
  panelCountInput.addEventListener('change', function(){
    carousel.panelCount = event.target.value;
    carousel.modify();
  }, false);
  /**/

  /**
  rotStart.addEventListener('click', function () {
    pulse();
    advance();
  }, false);

  rotStop.addEventListener('click', function () {
    clearTimeout(advanceTimer);
  }, false);
  /**/

  /**
  buttonPlayAll.addEventListener('click', function () { carousel.playAll(); }, false);
  buttonPauseAll.addEventListener('click', function () { carousel.pauseAll(); }, false);
  /**/

  navButtonPrev.addEventListener('click', navClick, false);
  navButtonNext.addEventListener('click', navClick, false);

  axisButton.addEventListener('click', function(){
    carousel.isHorizontal = !carousel.isHorizontal;
    carousel.modify();
  }, false);

  backfaceVisibility.addEventListener('click', function(){
    $(carousel.element).toggleClass('panels-backface-invisible');
  }, false);

  document.getElementById('grayscale').addEventListener('change', function() {
    [].forEach.call(document.querySelectorAll('.panel'), 
      function (el){
        $(el).toggleClass('grayscale');
      }
    );
  }, false);

  setTimeout(function(){
    $(document.body).addClass('ready');
  }, 0);
};

(function advance () {
    //carousel.rotation += carousel.theta;
    //carousel.transform();
    $('#nav-next').click();
    console.log('advanced');

  setTimeout(advance, 9950);
}());

(function pulse() {
  //console.log(carousel.rotation);

  //var panels = document.querySelectorAll('.panel');
  degInterval = 360 / document.querySelectorAll('.panel').length;
  rotFactor = Math.ceil(Math.abs(carousel.rotation / 360));

  // for each panel containing a video
  [].forEach.call(document.querySelectorAll('.panel'), 
    function (el, i) {
      if (el.children[0].tagName === 'VIDEO') {
        posRot = Math.abs(carousel.rotation);
        rot = carousel.rotation;

        //console.log(rot, rotFactor);
//debugger;
        // if its respective degree (the range it occupies out of the entire circle),
        // is within a range of +/- 2 additional degree intervals (ie panels)
        // make sure it is playing, else, pause it
        if ( 
               (i * degInterval * -1) <= ((rot / rotFactor) - (2 * degInterval)) ||
               (i * degInterval * -1) >= ((rot / rotFactor) + (3 * degInterval))
            ) {
          el.children[0].pause();
          //console.log('yep:', i, el);
        } else {
          if (rot) {
            el.children[0].play();
            console.log('nop:', i, el);
          }
        }
      }
    }
  );

  setTimeout(pulse, 10000);
}());

window.addEventListener('DOMContentLoaded', init, false);