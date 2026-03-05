
// 얼럿
function customAlert(title = "", message, type) {
  return new Promise((resolve) => {
    $(".alert-popup").remove();

    const $popup = $(`
      <section class="alert-popup" role="alertdialog" style="display: block;">
        <div class="dim"></div>
        <div class="popup" role="document" tabindex="-1" aria-modal="true" aria-labelledby="alert-title" aria-describedby="alert-desc">
          ${title ? `<div class="pop-header">
            <h2 class="alert-title">${title}</h2>
            <button type="button" class="btn-close" aria-label="닫기"></button>
          </div>
          ` : ''}
          <div class="pop-body">
            
            <div class="alert-txt">
              <p id="alert-desc">${message}</p>
            </div>
          </div>
          <div class="pop-footer">
            <div class="btn-wrap">
              ${
                type === "confirm"
                ? `<button type="button" class="btn-alert btn-white btn-cancel">취소</button>
                   <button type="button" class="btn-alert btn-primary btn-yes">확인</button>`
                : `<button type="button" class="btn-alert btn-primary btn-yes">확인</button>`
              }
            </div>
          </div>
        </div>
      </section>
    `); 

    $("body").append($popup);
    $popup.find(".popup").focus();

    $popup.on("click", ".btn-close, .btn-cancel", function () {
      $popup.remove();
      resolve(false);
    });

    $popup.on("click", ".btn-yes", function () {
      $popup.remove();
      resolve(true);
    });
  });
}



function gnbMenu(){
  $('.gnb-wrap .gnb-menu li').each(function(){
      if($(this).find('ul').length > 0){
          $(this).addClass('has-menu');
      }
  })
  // 토글 버튼으로 메뉴 열기/닫기
  $('.gnb-wrap .btn-toggle').on('click', function(){
      if($('.gnb-wrap').hasClass('on')){
        $('.gnb-wrap').removeClass('on');
        $('.gnb-wrap .gnb-menu > ul li').removeClass('on');
        $('.gnb-wrap .gnb-menu > ul ul').hide();
        $(this).find('.sr-only').text('열기');
      } else {
        $('.gnb-wrap').addClass('on');
        $(this).find('.sr-only').text('닫기');
      }
  });

  $('.gnb-wrap .gnb-menu').on('click', function(){
      if(!$('.gnb-wrap').hasClass('on')){
        $('.gnb-wrap').addClass('on');
      }
  });
  $('.gnb-wrap .close').on('click', function(){
      $('.gnb-wrap').removeClass('on');
  });  

  $('.gnb-wrap .gnb-menu li > a').on('click', function(){
    if(!$('.gnb-wrap').hasClass('on')){
      $('.gnb-wrap').addClass('on');
      return;
    }
    let $menu = $(this).next('ul');

    if($(this).parent().hasClass('has-menu')){
      if($menu.is(':hidden')){
        $(this).parent().siblings().removeClass('on');
        $(this).parent().siblings().children('ul').slideUp();
        $(this).parent().addClass('on');
        $menu.slideDown();
      }else{
        $(this).parent().removeClass('on');
        $menu.slideUp();
      }
    }
    else{
      $('.gnb-wrap .gnb-menu > ul > li').removeClass('on');
      $(this).parent().addClass('on');
      $('.gnb-wrap .gnb-menu > ul > li > ul').slideUp();
    }
  });
}

function gnbHover(){
  const $wrap = $('.gnb-wrap');
  const $hover = $('.gnb-menu-hover');
  if($hover.length === 0) return;

  function showFor($li){
    const text = $li.find('> a .txt').text();
    $hover.find('dt').text(text);
    const $sub = $li.children('ul').clone(true);
    $sub.find('ul').show();
    $sub.show();
    $hover.find('dd').empty().append($sub);
    $hover.fadeIn();
  }

  $wrap.on('mouseenter', '.gnb-menu > ul > li', function(){
    const $li = $(this);
    console.log('hover item', $li.index(), $li.find('> a .txt').text());
    showFor($li);
  });

  function maybeHide(){
    setTimeout(function(){
      const overMenu = $wrap.find('.gnb-menu > ul > li:hover').length > 0;
      const overHover = $hover.is(':hover');
      console.log('maybeHide overMenu', overMenu, 'overHover', overHover);
      if(!overMenu && !overHover){
        $hover.fadeOut();
      }
    }, 100);
  }

  $wrap.on('mouseleave', '.gnb-menu > ul > li', maybeHide);
  $hover.on('mouseleave', maybeHide);
}



// loading
function loading(){
  const loadingHtml = `<div class="loading-bar">
		<div class="three-bounce">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>`

  const $loading = $(loadingHtml);  
  $('body').append($loading);  
  $('body, html').css('overflow', 'hidden');
}


  // DATE
  // function datepicker(){
  //   if($(".datepicker").length <= 0) return;
  //   $(".datepicker").datepicker({
  //     showOn: 'focus', 
  //     changeYear:true,
  //     changeMonth:true,
  //     showMonthAfterYear:true,
  //     monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  //     monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  //     dayNames:['일','월','화','수','목','금','토'],
  //     dayNamesShort:['일','월','화','수','목','금','토'],
  //     dayNamesMin:['일','월','화','수','목','금','토'],
  //     minDate: '',
  //     maxDate: '',
  //     // yearSuffix: '년',
  //     onClose: function( selectedDate ) {
  //       //add on event 
  //     }	,
  //     beforeShow: function(input, inst) {
        
  //       if($(input).data('min')) $(input).datepicker('option', 'minDate', $(input).data('min'));
  //       if($(input).data('max')) $(input).datepicker('option', 'maxDate', $(input).data('max'));
  
  //       setTimeout(function(){
  //         if($('.ui-datepicker-year option').text().indexOf('년') == -1) $('.ui-datepicker-year option').append('년')
  //       }, 10)
  //       },
  //       onChangeMonthYear: function(input, inst) {
  //       setTimeout(function(){
  //         if($('.ui-datepicker-year option').text().indexOf('년') == -1) $('.ui-datepicker-year option').append('년')
  //       }, 10)
  //       },
  //   });
  // }

  function fileAdd(){
    let $wrap;
    $('.input-upload [data-id=file-upload]').on('click', function(){
      $wrap = $(this).parents('.input-upload');
      $wrap.find('input[type=file]').click();
    });	
    $('.input-upload input[type=file]').on('change', function(){
      let v = $(this).val();
      $wrap.find('input[type=text]').val(v.split('fakepath\\')[1]);
      if(v) $wrap.find('.btn-del').show();
    });
  }


  function inputDel(){
    if($('.inp-del').length <= 0) return;
    function f($self){
      let $input = $self.find('input');
      let $del = $('<a href="javascript:void(0);" style="display:none;" class="btn-del"></a>');
      $self.append($del);

      if($input.val()) $del.show();
      $input.on('keyup', function(){
        if($input.val().length > 0) $del.show()
        else $del.hide()
      });
      $del.on('click', function(){
        $input.val('');
        $del.hide();
      });
    }
    $('.inp-del').each(function(){
      f($(this));
    })
  }

  function tabEvt(){
    let tabs = [];
    $('[data-tab-id]').on('click', function(e){
      e.stopPropagation();
      let tabid = $(this).data('tab-id');

      tabs = [];
      tabs.push(tabid);

      $(this).parents('li').addClass('on');
      $(this).parents('li').siblings().find('[data-tab-id]').each(function(){
        $(this).parents('li').removeClass('on');
        tabs.push($(this).data('tab-id'));
      });

      tabs.forEach(function(v){
        $('#'+v).hide();
      });
      $('#'+tabid).show();

      if($(this).parents('.tab-condition').length > 0){
        let $selectd = $(this).parents('.tab-condition').find('.selected');
        $selectd.find('button').text($(this).text())
      }
    })

  }



// 팝업
let lastFocusedElement = null;

function popClose(popup){
  let $popup = $(popup);
  $popup.fadeOut();
  $('body, html').css('overflow', '');
  $('body').removeClass('pop-open');
  
  // 팝업을 닫을 때 원래 포커스 위치로 복귀
  if(lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function popOpen(popup, callback){
  let $popup = $(popup);
  scrollPosition = $(window).scrollTop();
  
  // 팝업을 연 버튼 저장
  lastFocusedElement = document.activeElement;

  $popup.removeAttr('style');
  $popup.fadeIn();
  $('body, html').css('overflow', 'hidden');
  $('body').addClass('pop-open');
  
  // 팝업이 열린 후 첫 번째 포커스 가능한 요소로 포커스 이동
  setTimeout(() => {
    const focusableElements = $popup.find(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).filter(':visible');
    if(focusableElements.length > 0) {
      focusableElements.first().focus();
    }
  }, 100);
  
  $popup.find('.btn-close').on('click', function(){
    popClose(popup);
  });

  // 포커스 트랩 설정
  setupFocusTrap($popup);

  if(callback) callback();
}

function setupFocusTrap($popup) {
  // 팝업 내부의 포커스 가능한 모든 요소 찾기
  const focusableElements = $popup.find(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ).filter(':visible');
  
  if(focusableElements.length === 0) return;
  
  const firstElement = focusableElements.first()[0];
  const lastElement = focusableElements.last()[0];
  
  // 기존 이벤트 제거 (중복 방지)
  $popup.off('keydown.focustrap');
  
  // 탭 키 이벤트 처리
  $popup.on('keydown.focustrap', function(e) {
    // Tab 키가 아니면 무시
    if(e.key !== 'Tab') return;
    
    // Shift + Tab (역방향)
    if(e.shiftKey) {
      if(document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } 
    // Tab (정방향)
    else {
      if(document.activeElement === lastElement) {
        e.preventDefault();
        // 마지막 요소에서 Tab을 누르면 팝업 닫기
        popClose('#' + $popup.attr('id'));
      }
    }
  });
  
  // ESC 키로 팝업 닫기
  $popup.off('keydown.escape');
  $popup.on('keydown.escape', function(e) {
    if(e.key === 'Escape') {
      popClose('#' + $popup.attr('id'));
    }
  });
}


// ready
$(function(){
  gnbMenu();
  gnbHover();
  // datepicker();
  fileAdd();
  inputDel();
  tabEvt();
});