$(function() {	
	//search
	$('.search').click(function(){
		$(this).addClass('on');
	})

	//change lnguage
	$('.lnguage-cur').click(function(){
		$('.language-list').slideToggle();
	})
	$('.language-list li').click(function(){
		var _this=$(this),
			img=_this.html();
		a_s_r(_this,'cur');
		$('.lnguage-cur').html(img);
		$('.language-list').slideUp();
	})

	//login
	$('.agree-terms-btn a').click(function(){
        $('.agree-terms-box').slideToggle();
    })
	$('.user-change-pass').click(function(){
        $('.change-email-box').hide();
        $('.change-pass-box').slideToggle(function(){
		   modalCenter($('.user-center'));
		 });
    })
    $('.user-change-email').click(function(){    	
        $('.change-pass-box').hide();
        $('.change-email-box').slideToggle(function(){
		   modalCenter($('.user-center'));
		 });
    })
    $('.user-center .modal-close').click(function(){
    	$('.change-pass-box,.change-email-box').hide();
    })

	//back-to-top
	var sT = $(window).scrollTop(),
		$bT = $("#back-to-top");
	if (sT != "0"){
		$bT.fadeIn("slow");
	}
	$(window).scroll(function() {
		var sT = $(window).scrollTop();
		if (sT == "0"){
			$bT.fadeOut("slow");
		}else{
			$bT.fadeIn("slow");
		}
	});
	$bT.click(function() {
		$("html, body").animate({scrollTop: 0},"slow");
	});

	//弹出层
	$('[data-toggle="modal"]').click(function() {
		$('.modal:visible').hide();
		var $target = $($(this).data('target'));
		$target.show();
		$('body').append('<div class="modal-backdrop"></div>');
		modalCenter($target);
	})
	$('.modal-close').click(function() {
		$(this).parents('.modal').css({'top': -300}).slideUp();
		
		$('.modal-backdrop').fadeOut().remove();
	})

	$(window).resize(function() {
		//弹出框上下居中
		modalCenter($('.modal'));
	}); 
})

function a_s_r(o,c){
	o.addClass(c).siblings().removeClass(c);
}
//placeholder support ie
function isPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}
if (!isPlaceholder()) {
    $(function () {
        $("input[placeholder]").each(function () {
            var _this = $(this);
            var tips = _this.attr("placeholder");
            var w = _this.outerWidth();
            var h = _this.outerHeight();
            var p = $("<p class='placeholder' style='width: " + w + "px;line-height:" + h + "px;'></p>").text(tips);
            p.click(function () {
                _this.focus();
            });
            _this.after(p);
            _this.focus(function () {
                p.hide();
            });
            _this.blur(function () {
                if ($(this).val() == '') {
                    p.show();
                }
            });
            if (_this.val() != "") {
                p.hide();
            }
        })
    });
};
//弹出框居中
function modalCenter(o) {
	var mH = o.height(),
		allH = $(document).height(),
	//document.body.scrollHeight,//网页正文全文高
	wH = $(window).height(); //document.body.clientHeight;//网页可见区域高
	h = (wH - mH) / 2;
	h < 0 ? h = 0 : h = h;
	o.css({'top': h});
}