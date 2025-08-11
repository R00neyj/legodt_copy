console.clear();

let viewportH = $(window).height();

// header Fixing
function headerFixed() {
  let mainPosition = $("main").offset().top;
  let scrollPosition = $(window).scrollTop();
  if (scrollPosition > mainPosition) {
    $("header > .main-header").addClass("fixed");
    //  console.log("headerFixed active");
  } else {
    $("header > .main-header").removeClass("fixed");
    //  console.log("headerFixed deactive");
  }
}
// -----------------

// mobile nav fixing
function mobileNav__init() {
  let lastScrollPosition = 0;
  const mobileNav = $(".mobile-nav");
  const mobileNavHeight = mobileNav.height();

  $(":root").css("--mobile-nav-height", `-${mobileNavHeight}px`);

  function mobileNav__show() {
    const vw = $(window).width();
    if (vw > 768) {
      return;
    }
    const currentScrollPosition = $(window).scrollTop();
    if (lastScrollPosition <= currentScrollPosition) {
      mobileNav.addClass("off");
    } else {
      mobileNav.removeClass("off");
    }
    lastScrollPosition = currentScrollPosition;
    //  console.log("작동");
  }
  $(window).scroll(() => mobileNav__show());
}
// -----------------

// quickBtn__init
function quickBtn__init() {
  let scrollPosition = $(window).scrollTop();
  if (scrollPosition > 100) {
    $(".quick-btn-wrap").addClass("active");
  } else {
    $(".quick-btn-wrap").removeClass("active");
  }
}
// -----------------

// quick-btn toTop
function scrollToTop() {
  $(".quick-btn-toTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });
}
// -----------------

// SideBar toggle
function sideBarToggle() {
  function sideBarOpen() {
    $("header > .side-bar").addClass("active");
    $("header > .side-bar-bg").addClass("active");
  }
  function sideBarClose() {
    $("header > .side-bar").removeClass("active");
    $("header > .side-bar-bg").removeClass("active");
  }

  $(".mh__left > .hamberger")
    .add($(".mobile-nav__side-bar-btn"))
    .click(function () {
      sideBarOpen();
      console.log("sidebar-open");
    });

  $(".side-bar-head > .close-btn").click(function () {
    sideBarClose();
    console.log("sidebar-close");
  });

  $(".side-bar-bg").click(function () {
    sideBarClose();
    console.log("sidebar-close");
  });
}
// -----------------

// sidebar 2nd menu
function sideBarDropDown() {
  $(".second-menu > ul").hide();

  $(".menu-1 .drop-down").click(function () {
    $(".menu-1 .second-menu > ul").slideUp(300);
    $(".menu-1 .drop-down").not(this).removeClass("active");
    let hasclass = $(this).hasClass("active");
    if (!hasclass) {
      menuUp($(this));
      console.log("dropdown");
    } else {
      menuDown($(this));
      console.log("dropdown-up");
    }
  });
  $(".menu-2 .drop-down").click(function () {
    let hasclass = $(this).hasClass("active");
    if (!hasclass) {
      menuUp($(this));
      console.log("dropdown2");
    } else {
      menuDown($(this));
      console.log("dropdown2-up");
    }
  });
  function menuUp(i) {
    i.closest(".second-menu").find(" > ul").slideDown(300);
    i.addClass("active");
  }
  function menuDown(i) {
    i.closest(".second-menu").find(" > ul").slideUp(300);
    i.removeClass("active");
  }
}
// -----------------

// cart counter
let cartIndex = 0;
function setCartCouter() {
  $(".mh__right > .cart").css("--cart-index", `'${cartIndex}'`);
  $(".add-cart > span").click(counter);
  $(".add-to-cart-btn__wrap").click(counter);
  function counter() {
    cartIndex++;
    if (cartIndex == 100) {
      cartIndex = 0;
    }
    $(".mh__right > .cart").css("--cart-index", `'${cartIndex}'`);

    console.log(`cart count : ${cartIndex}`);
  }
}
// -----------------
// like-btn
function sec4__like_btn() {
  $(".like-btn").click(function () {
    $(this).toggleClass("active");
  });
}

// -----------------

// slide up by observe animation // observer must be use Vanilla JS !!
function slideUpObserver__init() {
  const target = document.querySelectorAll(
    `
      .sec-3 .loading-page,
      .sec-2, .sec-4__head, 
      .sec-4__body, 
      .sec-4__ranking-2, 
      .sec-6 > .sec-6-wrap .swiper-wrapper, 
      .sec-6 > .sec-6-wrap > .swiper-head, 
      .sec-8 > .sec-8-wrap > .sec-head, 
      .sec-8 > .sec-8-wrap > .sec-body, 
      .sec-9 > .sec-9-wrap > .sec-head,
      .sec-10 > .sec-10-wrap > .sec-head,
      .sec-10 > .sec-10-wrap > .sec-body,
      .sec-11 > .sec-11-wrap > .sec-head,
      .sec-11 > .sec-11-wrap > .sec-body `
  );

  const observerInit = function (entries, observer) {
    entries.forEach((entry) => {
      let isInersectiong = entry.isIntersecting;
      if (isInersectiong) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerInit, {
    root: null,
    threshold: 0,
  });

  target.forEach((el, index) => {
    observer.observe(el);
  });
}
// -----------------

// sec-1 slide
function sec1__slide() {
  let slideCount = $(".sec-1 .content").length;
  let $contents = $(".sec-1 .content");
  let $wrapper = $(".content-wrap");
  let currentIndex = 0;
  let cursorX;
  let isDragging = false;
  let deltaX = 0;

  function slideOpacity() {
    $contents.each(function (i) {
      if (i === currentIndex) {
        $(this).css("opacity", 1);
        $(this).css("pointer-events", "auto");
        $wrapper.find(".pagination > span").eq(i).addClass("active");
        $(this).find(" > .right").addClass("animate");
      } else {
        $(this).css("opacity", 0);
        $(this).css("pointer-events", "none");
        $wrapper.find(".pagination > span").eq(i).removeClass("active");
        $(this).find(" > .right").removeClass("animate");
      }
    });
  }

  function showSlide(index) {
    if (index >= slideCount) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slideCount - 1;
    } else {
      currentIndex = index;
    }
    slideOpacity();
    console.log("currentIndex : " + currentIndex);
  }

  showSlide(currentIndex);

  $wrapper.on("pointerdown", function (e) {
    isDragging = true;
    cursorX = e.clientX;
    $contents.addClass("dragging");
    e.preventDefault();
    stopAutoSlide();
  });

  $wrapper.on("pointermove", function (e) {
    if (!isDragging) return;
    deltaX = e.clientX - cursorX;

    // 슬라이더 투명도
    const slideWidth = $contents.eq(0).outerWidth();
    const opacityFactor = Math.abs(deltaX) / slideWidth;
    let currentSlideOpacity = 1 - opacityFactor;
    if (currentSlideOpacity < 0) currentSlideOpacity = 0;

    let nextPrevSlideOpacity = opacityFactor;
    if (nextPrevSlideOpacity > 1) nextPrevSlideOpacity = 1;

    $contents.eq(currentIndex).css("opacity", currentSlideOpacity);

    if (deltaX < 0) {
      let nextIndex = (currentIndex + 1) % slideCount;
      $contents.eq(nextIndex).css("opacity", nextPrevSlideOpacity);

      $contents.not($contents.eq(currentIndex)).not($contents.eq(nextIndex)).css("opacity", 0);
    } else if (deltaX > 0) {
      let prevIndex = (currentIndex - 1 + slideCount) % slideCount;
      $contents.eq(prevIndex).css("opacity", nextPrevSlideOpacity);

      $contents.not($contents.eq(currentIndex)).not($contents.eq(prevIndex)).css("opacity", 0);
    } else {
      $contents.eq(currentIndex).css("opacity", 1);
      $contents.not($contents.eq(currentIndex)).css("opacity", 0);
    }
  });

  $wrapper.on("pointerup", function () {
    isDragging = false;
    $contents.removeClass("dragging");

    const threshold = $contents.eq(0).outerWidth() / 5;

    if (deltaX < -threshold) {
      showSlide(currentIndex + 1);
    } else if (deltaX > threshold) {
      showSlide(currentIndex - 1);
    } else {
      showSlide(currentIndex);
    }
    deltaX = 0;
    startAutoSlide();
  });

  $wrapper.on("pointerleave", function () {
    if (isDragging) {
      isDragging = false;
      $contents.removeClass("dragging");
      showSlide(currentIndex);
    }
    deltaX = 0;
  });

  let slideInterval;
  function startAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(function () {
      showSlide(currentIndex + 1);
    }, 5000);
  }
  startAutoSlide();

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  $contents.find(".shop-now-btn > a").mouseenter(function () {
    stopAutoSlide();
  });
  $contents.find(".shop-now-btn > a").mouseleave(function () {
    startAutoSlide();
  });
  $wrapper.find(".pagination > span").click(function () {
    currentIndex = $(this).index();
    showSlide(currentIndex);
  });
  $(window).resize(function () {
    stopAutoSlide();
  });
}
// -----------------
// section 1 btn hover
function sec1_BtnHover__init() {
  const circle = $(".sec-1 .shop-now-btn > .hover-circle");
  const shopBtn = $(".sec-1 > .content-wrap > .content > .right > .shop-now-btn");

  shopBtn.each(function (index, element) {
    el = $(element);
    function mouseTracking(event) {
      let currentX = event.offsetX;
      let currentY = event.offsetY;
      circle.eq(index).css({ top: currentY, left: currentX });
    }

    el.on("pointerenter", function (e) {
      mouseTracking(e);
      circle.eq(index).addClass("active");
    });
    // el.on("pointermove", function (e) {
    //    mouseTracking(e);
    // });
    el.on("pointerleave", function (e) {
      mouseTracking(e);
      circle.eq(index).removeClass("active");
    });
  });
}
// -----------------

// section 3 start btn
function sec3__start_btn() {
  $(".pre-start-wrap > button").click(function () {
    // $(this).parent().slideUp(300);
    $(this).parent().addClass("off");
    $(".sec-3__body > .header").addClass("active");
    $(".sec-3__body > .main").addClass("active");
    $(".sec-3 > .sec-3-wrap > .sec-3__body > .pre-start > .img-box").addClass("active");
    sec3TextSplit();
  });
}

// -----------------

// section 3 change tumbler !
function sec3_tumblerChange() {
  const sec3Lis = $(".sec-3 .sec-3__body .tumbler-menu > li");
  const sec3Bg = $(".sec-3 .sec-3__body .main-bg");
  const sec3Body = $(".sec-3 .sec-3__body");
  const sec3BgText = sec3Bg.find(".bg-text");
  const sec3BgImg = $(".sec-3 .sec-3__body > .main > .main-wrap > .img-box > img");

  let sec3ImgsArr = [];
  sec3Lis.each(function (index, el) {
    let imgSrc = $(el).find(" .img-box > img ").attr("src");
    sec3ImgsArr.push(imgSrc);
  });

  let sec3BgTextArr = ["Standard", "Multi", "Handy", "Ceramic", "Straw"];
  //console.log(sec3BgText);

  let transitionTimer;
  sec3Lis.click(function () {
    lisIndex = $(this).index();
    sec3Body.attr("img-data-index", lisIndex + 1);
    sec3BgText.text(sec3BgTextArr[lisIndex]);
    sec3BgImg.addClass("slideUp");
    sec3BgImg.attr("data-img-index", lisIndex);
    sec3TextSplit();
    sec3_CartModal__init();

    transitionTimer = setTimeout(() => {
      clearTimeout(transitionTimer);
      sec3BgImg.attr("src", sec3ImgsArr[lisIndex]);
      sec3BgImg.removeClass("slideUp");
    }, 500);
  });
}
// -----------------

// section 3 text split
function sec3TextSplit() {
  const sec3Bg = $(".sec-3 .sec-3__body .main-bg");
  const sec3BgText = sec3Bg.find(".bg-text");
  let texts = sec3BgText.text();
  texts.split("");
  sec3BgText.text("");

  for (let i = 0; i < texts.length; i++) {
    sec3BgText.append(`<span>${texts[i]}</span>`);
    let splited = sec3BgText.find(" > span ");
    splited.eq(i).css("animation", `slide-up-2 0.5s 1 ${(i + 1) * 0.1}s forwards`);
  }
}
// -----------------

// section 3 cart modal
function sec3_CartModal__init() {
  const modalBtn = $(".sec-3 .svg-box.modal-1-btn");
  const modalSh = $(".sec-3 .add-cart-modal");
  const centerImg = $(".sec-3 .main-wrap > .img-box > img");
  const itemImg = $(".sec-3 .add-cart-modal .item-box > .img-box > img");
  const modalCloseBtn = $(".sec-3 .add-cart-modal .modal-close");
  const modalText = $(".add-cart-modal .modal-box-2 > .item-box > .text-box");

  const tumblerSpecArr = [
    { name: "루프 텀블러 스탠다드 400ml (블루)", price: "30,000" },
    { name: "루프 텀블러 멀티 400ml (핑크)", price: "32,000" },
    { name: "루프 텀블러 핸디 700ml (민트블루)", price: "35,000" },
    { name: "세라믹 텀블러 540ml (그린)", price: "32,000" },
    { name: "스트로우 텀블러 700ml (코랄)", price: "25,000" },
  ];

  function changeItemSpec() {
    let centerImgIndex = centerImg.attr("data-img-index");

    modalText.find(" > .item-name").text(tumblerSpecArr[centerImgIndex].name);
    modalText.find(" > .item-price").text(`₩ ${tumblerSpecArr[centerImgIndex].price}`);
    modalSh.find(" .modal-box-3 > .item-price").text(`₩ ${tumblerSpecArr[centerImgIndex].price}`);
    setTimeout(() => {
      let centerImgSrc = centerImg.attr("src");
      itemImg.attr("src", centerImgSrc);
    }, 501);
  }
  changeItemSpec();

  modalBtn.click(function () {
    modalSh.addClass("active");
    changeItemSpec();
  });
  modalCloseBtn.click(() => modalSh.removeClass("active"));
}
// -----------------
// section 3 aside 2nd menu
function sec3_asideSecondMenu() {
  const tumblerMenu = $(".sec-3 .tumbler-detail-menu");
  const asideLi = $(".sec-3 .tumbler-detail-menu > li");
  const asideLiUl = asideLi.find(" > ul");
  const mainWrap = $(".sec-3 .main-wrap");
  const closeBtn = tumblerMenu.find(" .close-btn");

  tumblerMenu.click(function () {
    return false;
  });
  closeBtn.click(function (e) {
    e.stopPropagation();
    asideLiUl.removeClass("active");
  });
  mainWrap.click(function () {
    asideLiUl.removeClass("active");
  });
  asideLi.click(function () {
    asideLiUl.removeClass("active");
    $(this).find(" > ul").addClass("active");
  });
}
// -----------------
// section 3 sticker modal
function sec3_StickerModal_init() {
  const stickerModal = $(".sec-3 .sticker-modal ");
  const stickerModalWrap = stickerModal.find(" > .sticker-modal-wrap ");
  const stickerBtn = $(" .sec-3 .tumbler-detail__sticker ");
  const closeBtn = $(" .sec-3 .sticker-modal .close-btn ");

  function modalOpen() {
    stickerModal.addClass("active");
  }
  function modalClose() {
    stickerModal.removeClass("active");
  }
  stickerBtn.click(function () {
    modalOpen();
  });
  closeBtn.click(function (e) {
    modalClose();
  });
}
sec3_StickerModal_init();
// -----------------

// section 4 swiper
function sec_4_swiper() {
  new Swiper(".sec-4-swiper", {
    slidesPerView: 3,
    speed: 600,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: "18",
      },
      768: {
        slidesPerView: 3,
        spaceBetween: "24",
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: "40",
      },
    },
  });
}
// -----------------

// section 5 swiper
function sec_5__swiper() {
  new Swiper(".sec-5-swiper", {
    loop: true,
    grabCursor: true,
    speed: 900,
    navigation: {
      nextEl: ".sec-5 .arrow-box > .button-next",
      prevEl: ".sec-5 .arrow-box > .button-prev",
    },
  });
}
// -----------------

// section 6 swiper
// inner swiper
function sec_6__swiper() {
  new Swiper(".sec-6__sunshade", {
    spaceBetween: 40,
    slidesPerView: 4,
    nested: true,
    grabCursor: true,
    navigation: {
      nextEl: ".sec-6 .arrow-box-1 > .button-next",
      prevEl: ".sec-6 .arrow-box-1 > .button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.8,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
  new Swiper(".sec-6__tumbler", {
    spaceBetween: 40,
    slidesPerView: 4,
    nested: true,
    grabCursor: true,
    navigation: {
      nextEl: ".sec-6 .arrow-box-2 > .button-next",
      prevEl: ".sec-6 .arrow-box-2 > .button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.8,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
  new Swiper(".sec-6__packLight", {
    spaceBetween: 40,
    slidesPerView: 4,
    nested: true,
    grabCursor: true,
    navigation: {
      nextEl: ".sec-6 .arrow-box-3 > .button-next",
      prevEl: ".sec-6 .arrow-box-3 > .button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.8,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
  new Swiper(".sec-6__addOns", {
    spaceBetween: 40,
    slidesPerView: 4,
    nested: true,
    grabCursor: true,
    navigation: {
      nextEl: ".sec-6 .arrow-box-4 > .button-next",
      prevEl: ".sec-6 .arrow-box-4 > .button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.8,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });

  // outer swiper
  const bullet = ["Sunshade", "Tumbler", "Pack Light", "Add-Ons"];
  new Swiper(".sec-6-outer-swiper", {
    spaceBetween: 40,
    speed: 700,
    nested: true,
    grabCursor: true,
    centeredSlides: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    pagination: {
      el: ".sec-6-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class=${className}><span>${bullet[index]}</span></div>`;
      },
    },
    on: {
      afterInit: function (_swiper) {
        arrowBox__init(_swiper);
      },
      slideChange: function (_swiper) {
        arrowBox__init(_swiper);
      },
    },
  });
  function arrowBox__init(_swiper) {
    const active_slides_index = _swiper.activeIndex;
    const arrowBox = $(".sec-6 .arrow-box");

    arrowBox.removeClass("active");
    arrowBox.eq(active_slides_index).addClass("active");
  }
}
// -----------------

// section 7 swiper
function sec_7__swiper() {
  new Swiper(".sec-7-swiper", {
    spaceBetween: 40,
    loop: true,
    speed: 900,
    slidesPerView: 1.001,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
// -----------------

// section 8 swiper
function sec_8__swiper() {
  new Swiper(".sec-8-swiper", {
    spaceBetween: 40,
    speed: 600,
    slidesPerView: 3,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 3,
      },
    },
  });
}
// -----------------

// section 8 marker
function sec_8_marker__init() {
  const slide = $(".sec-8 .swiper-slide");
  let slideLength = slide.length;

  function sec_8_slide_marker(n) {
    const slide_N = slide.eq(n - 1);
    const marker_N = slide_N.find(".slide-top .marker");
    const bottomList_N = slide_N.find(".slide-bottom > ul > li");
    marker_N.each(function (index, target) {
      $(target).click(function () {
        marker_N.removeClass("active");
        $(target).addClass("active");
        bottomList_N.removeClass("active");
        bottomList_N.eq(index).addClass("active");
      });
    });
  }
  for (let i = 0; i < slideLength; i++) {
    sec_8_slide_marker(i);
  }
}
// -----------------

// section 9 swiper
function sec_9__swiper() {
  new Swiper(".sec-9-swiper", {
    spaceBetween: 30,
    speed: 900,
    slidesPerView: 3,
    slidesPerGroup: 1,
    loop: true,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.05,
        navigator: false,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 3,
        pagination: false,
        spaceBetween: 30,
      },
    },
  });
}
// -----------------

// section 9 background change
function sec_9_colored__init() {
  const sec_9_bodyH = $(".sec-9 .sec-body");
  const sec_9_head = $(".sec-9 > .sec-9-wrap > .sec-head");

  let targetPosition = sec_9_bodyH.offset().top;
  let scrollPosition = $(window).scrollTop();
  let currentScrollPosition = scrollPosition + viewportH / 2;
  if (currentScrollPosition > targetPosition) {
    $("main").addClass("colored");
    sec_9_head.addClass("colored");
  } else {
    $("main").removeClass("colored");
    sec_9_head.removeClass("colored");
  }
}
// -----------------

// section 10 text split
function sec_10_textSplit__init() {
  const textBox = $(".sec-10 .sec-body .text-box");
  const headText = $(".sec-10 .sec-body .text-box > h3");
  const bodyText = $(".sec-10 .sec-body .text-box > p");

  let isSplited = textBox.attr("data-split");

  function TextSplit() {
    if (isSplited) {
      return;
    }
    function splitChar(el) {
      let TextSplit = $(el).text().split(" ");
      $(el).text("");
      //console.log(TextSplit);
      TextSplit.forEach(function (char) {
        $(el).append(`<span>${char}</span>&nbsp`);
      });
    }

    headText.each((index, el) => splitChar(el));
    bodyText.each((index, el) => splitChar(el));
    textBox.attr("data-split", "true");
  }
  TextSplit();
}

// section 10 text split animation
function sec_10_TextAnimation__init() {
  const sec_10_body = $(".sec-10 > .sec-10-wrap > .sec-body");
  const spans = $(".sec-10 .sec-body .text-box span");

  let isAnimated = spans.hasClass("animated");
  let sec10_ScrollPosition = $(window).scrollTop() + viewportH;
  let sec_10_bodyH = sec_10_body.offset().top;

  if (sec_10_bodyH >= sec10_ScrollPosition) {
    spans.removeClass("animated");
    return;
  } else if (isAnimated) {
    return;
  } else {
    sec_10_TextAnimation();
  }
}

function sec_10_TextAnimation() {
  const HSpan = $(".sec-10 .sec-body .text-box > h3 > span");
  const BSpan = $(".sec-10 .sec-body .text-box > p > span");

  function animationStart(index, el) {
    setTimeout(function () {
      $(el).addClass("animated");
    }, 300 * (index + 1));
  }

  HSpan.each((index, el) => animationStart(index, el));
  BSpan.each((index, el) => animationStart(index, el));
}

// footer aside pause
function asidePause__init() {
  const quickBtnWrap = $(".quick-btn-wrap");
  let footerH = $("footer").offset().top;
  let FscrollPosition = $(window).scrollTop();
  let bottomPosition = FscrollPosition + viewportH;

  if (footerH - 50 <= bottomPosition) {
    quickBtnWrap.css("--top-height", ` ${footerH - viewportH - 50}px`);
    quickBtnWrap.addClass("pause");
  } else {
    quickBtnWrap.css("--top-height", `0px`);
    quickBtnWrap.removeClass("pause");
  }
}
// -----------------

// footer parallex
function footerScroll() {
  const footerBox_1 = $("footer .fT-box-1");
  const footer = $("footer");
  let footerPosition = footer.offset().top;
  let footerBox_1_position = footerBox_1.offset().top;
  let footerPaddingTop = footerBox_1_position - footerPosition;

  let footerBox_1Height = footerBox_1.height() * 0.8; // 0.6 for set to list menu height
  let FCScrollPosition = $(window).scrollTop() + viewportH;

  let deltaH = footerPosition - FCScrollPosition;
  let newNum = deltaH + footerBox_1Height;
  //   console.log(`deltaH : ${-deltaH} / footerBox_1Height : ${footerBox_1Height} `);

  if (deltaH >= 0) {
    footerBox_1.css(`transform`, `translateY(0)`);
  } else if (deltaH <= 0) {
    footerBox_1.css(`transform`, `translateY(-${newNum}px)`);
  } else {
    footerBox_1.css(`transform`, `translateY(${-footerBox_1Height - footerPaddingTop}px)`);
  }
}
// -----------------

// footer menu hover
function footerLiHover() {
  const Lis = $("footer > .fT-wrap > .fT-box-1 > ul > li ");
  const LisDefault = $("footer > .fT-wrap > .fT-box-1 > ul > .default");

  Lis.mouseenter(function () {
    Lis.removeClass("hover");
    $(this).addClass("hover");
  });
  Lis.mouseleave(function () {
    Lis.removeClass("hover");
    LisDefault.addClass("hover");
  });
}
// -----------------

// footer marquee
function marqueeReset() {
  const root = $(":root");
  const currentWidth = $("footer .marquee > .svg-box").width();
  root.css("--marquee-width", `calc(${-currentWidth}px - 5rem)`);
}
// -----------------

// function load list
$(document).ready(function () {
  functionLoadList();
});
function functionLoadList() {
  scrollToTop();
  mobileNav__init();
  setCartCouter();
  slideUpObserver__init();
  quickBtn__init();
  headerFixed();
  sideBarToggle();
  sideBarDropDown();
  sec1__slide();
  sec1_BtnHover__init();
  sec3__start_btn();
  sec3_tumblerChange();
  sec3_CartModal__init();
  sec3_asideSecondMenu();
  sec4__like_btn();
  sec_5__swiper();
  sec_4_swiper();
  sec_6__swiper();
  sec_7__swiper();
  sec_8__swiper();
  sec_8_marker__init();
  sec_9__swiper();
  sec_10_textSplit__init();
  footerLiHover();
  marqueeReset();

  //  noRepeatEventList();
  // --------
  $(window).scroll(function () {
    scrollEventList();
  });
}
// -----------------

// scroll event list
function scrollEventList() {
  headerFixed();
  quickBtn__init();
  sec_9_colored__init();
  sec_10_TextAnimation__init();
  asidePause__init();
  footerScroll();
}

// -----------------

// resize
let resizeTimer;
$(window).resize(function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    viewportH = $(window).height();
    marqueeReset();
  }, 300);
});
// -----------------

// ----------------- 쓰레기통 -----------------

// slide up by scroll animation // no use anymore
// function SlideUp__init(targetElements) {
//    const SlideUp__handler = function () {
//       let targetPosition = targetElements.offset().top;
//       let scrollPosition = $(window).scrollTop();
//       let currentScrollPosition = scrollPosition + viewportH;
//       if (currentScrollPosition > targetPosition) {
//          targetElements.addClass("active");
//          $(window).off("scroll", SlideUp__handler);
//       }
//    };
//    return SlideUp__handler;
// }

// -----------------

// function sec_10_textAnimation__init() {
//    const textBox = $(".sec-10 .sec-body .text-box");
//    const headText = $(".sec-10 .sec-body .text-box > h3");
//    const bodyText = $(".sec-10 .sec-body .text-box > p");
//    const sec_10_body = $(".sec-10 > .sec-10-wrap > .sec-body");

//    let HSpan;
//    let BSpan;
//    let headTextSplit;
//    let bodyTextSplit;
//    let sec10_ScrollPosition;
//    let isAnimated = false;
//    let isSplited = textBox.attr("data-split");

//    function TextSplit() {
//       if (isSplited) {
//          HSpan = headText.find(">span");
//          BSpan = bodyText.find(">span");
//          return;
//       }
//       headText.each(function (index, el) {
//          headTextSplit = $(el).text().split(" ");
//          let HTSplitLenght = headTextSplit.length - 1;
//          $(el).text("");

//          for (let i = 0; i <= HTSplitLenght; i++) {
//             $(el).append(`<span>${headTextSplit[i]}</span>&nbsp`);
//          }
//       });
//       bodyText.each(function (index, el) {
//          bodyTextSplit = $(el).text().split(" ");
//          let BTSplitLength = bodyTextSplit.length - 1;
//          $(el).text("");

//          for (let i = 0; i <= BTSplitLength; i++) {
//             $(el).append(`<span>${bodyTextSplit[i]}</span>&nbsp`);
//          }
//       });

//       textBox.attr("data-split", "true");
//       HSpan = headText.find(">span");
//       BSpan = bodyText.find(">span");

//       resetStyle();
//    }
//    TextSplit();

//    function resetStyle() {
//       const style = {
//          opacity: "0",
//          display: "inline-block",
//          animation: "",
//       };
//       HSpan.css(style);
//       BSpan.css(style);
//    }

//    function TextAnimation__init() {
//       sec10_ScrollPosition = $(window).scrollTop() + viewportH;
//       let sec_10_bodyH = sec_10_body.offset().top;

//       if (sec_10_bodyH >= sec10_ScrollPosition) {
//          resetStyle();
//          isAnimated = false;
//          return;
//       } else if (isAnimated) {
//          return;
//       } else {
//          TextAnimation();
//       }
//    }

//    function TextAnimation() {
//       HSpan.each(function (index, el) {
//          setTimeout(function () {
//             $(el).css("animation", "slide-up 1s 1 forwards");
//          }, 300 * (index + 1));
//       });
//       BSpan.each(function (index, el) {
//          setTimeout(function () {
//             $(el).css("animation", "slide-up 1s 1 forwards");
//          }, 300 * (index + 1));
//       });
//       isAnimated = true;
//    }

//    $(window).scroll(function () {
//       TextAnimation__init();
//    });
// }
// -----------------

// no repeat event list
// function noRepeatEventList() {
//    return;
//    const sec_2H = $(".sec-2");
//    const sec_4_headH = $(".sec-4__head");
//    const sec_4_bodyH = $(".sec-4__body");
//    const sec_4_ranking2H = $(".sec-4__ranking-2");
//    const sec_6_BodyH = $(".sec-6 > .sec-6-wrap .swiper-wrapper");
//    const sec_6_HeadH = $(".sec-6 > .sec-6-wrap > .swiper-head");
//    const sec_8_HeadH = $(".sec-8 > .sec-8-wrap > .sec-head");
//    const sec_8_BodyH = $(".sec-8 > .sec-8-wrap > .sec-body");
//    const sec_9_HeadH = $(".sec-9 > .sec-9-wrap > .sec-head");
//    const sec_10_HeadH = $(".sec-10 > .sec-10-wrap > .sec-head");
//    const sec_10_bodyH = $(".sec-10 > .sec-10-wrap > .sec-body");
//    const sec_11_HeadH = $(".sec-11 > .sec-11-wrap > .sec-head");
//    const sec_11_bodyH = $(".sec-11 > .sec-11-wrap > .sec-body");

//    $(window).scroll(SlideUp__init(sec_2H));
//    $(window).scroll(SlideUp__init(sec_4_headH));
//    $(window).scroll(SlideUp__init(sec_4_bodyH));
//    $(window).scroll(SlideUp__init(sec_4_ranking2H));
//    $(window).scroll(SlideUp__init(sec_6_BodyH));
//    $(window).scroll(SlideUp__init(sec_6_HeadH));
//    $(window).scroll(SlideUp__init(sec_8_HeadH));
//    $(window).scroll(SlideUp__init(sec_8_BodyH));
//    $(window).scroll(SlideUp__init(sec_9_HeadH));
//    $(window).scroll(SlideUp__init(sec_10_HeadH));
//    $(window).scroll(SlideUp__init(sec_10_bodyH));
//    $(window).scroll(SlideUp__init(sec_11_HeadH));
//    $(window).scroll(SlideUp__init(sec_11_bodyH));
// }
