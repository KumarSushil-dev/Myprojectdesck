
  var a = 0;
  $(window).scroll(function() {
  
    var oTop = $('#counter').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $('.counter-value').each(function() {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
            countNum: countTo
          },
  
          {
  
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }
  
          });
      });
      a = 1;
    }
  
  });
  



  $('.our_verticlowl').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    autoplay:true,
    nav:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1.6,
            nav:false
        },
        600:{
            items:1.6,
            nav:false
        },
        1000:{
            items:1.6,
            nav:false,
            loop:true
        }
    }
})




$(document).ready(function(){
  $("#motivationVideoModal").on("hidden.bs.modal",function(){
    $("#youtubeVidMdl").attr("src","https://www.youtube.com/embed/aDIrnR9y-j8");
  })
})

function changeVideo(vId){
  var iframe=document.getElementById("youtubeVidMdl");
  iframe.src="https://www.youtube.com/embed/aDIrnR9y-j8"+vId;

  $("#motivationVideoModal").modal("show");
}



wow = new WOW(
  {
    animateClass: 'animated',
    offset:       100,
    callback:     function(box) {
      console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
    }
  }
);
wow.init();
document.getElementById('moar').onclick = function() {
  var section = document.createElement('section');
  section.className = 'section--purple wow fadeInDown';
  this.parentNode.insertBefore(section, this);
};
