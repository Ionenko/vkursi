console.log('init app');

window.onload = function(){

};


$(document).ready(function(){

    var  reportImages = $('.report__images .slider');
    var  reportSlider = $('.report__slider .slider');

    if(reportImages.length){
        reportImages.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            useTransform: false,
            arrows: false,
            rows: 0,
            autoplay: false,
            dots: false,
            draggable: true,
            infinite: true,
            touchThreshold: 100,
            adaptiveHeight: true,
            fade: true,
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            asNavFor: reportSlider ? reportSlider : null
        });
    }

    if(reportSlider.length){

        reportSlider.on('init', function(event, slick){
            setActiveNavItem(slick.$dots)
        });

        reportSlider.on('afterChange', function(event, slick){
            setActiveNavItem(slick.$dots)
        });

        reportSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            useTransform: false,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev "><span class="icon-chevron-left"></span></button>',
            nextArrow: '<button type="button" class="slick-next"><span class="icon-chevron-right"></span></button>',
            rows: 0,
            autoplay: false,
            dots: true,
            draggable: true,
            infinite: true,
            adaptiveHeight: true,
            touchThreshold: 100,
            appendDots: $('.report__nav__items'),
            asNavFor: reportImages ? reportImages : null,
            customPaging : function(slider, i) {
                var name = $(slider.$slides[i]).data('name');
                return '<span>' + name + '</span>';
            },
        });

        function setActiveNavItem(items){
            var dots = items;
            var activeDot = dots.find('.slick-active span');
            var position = activeDot.position();
            var width = activeDot.width();

            $(".report__nav__slider").css({
                "left": + position.left,
                "width": width
            });
        }

    }

    var controller = new ScrollMagic.Controller();

    var laptop = $('.main__laptop');
    var mainTimeline = gsap.timeline();

    mainTimeline
        .fromTo($('.main__content .list li'),{
            opacity: 0,
            x: "20px"
        },{
            duration: .3,
            x: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .to(laptop, {
            scale: 1,
            rotateX: 0,
            perspective: 0,
            force3D: true,
            duration: 1.2
        }, -.2);

    new ScrollMagic.Scene({
        triggerElement: laptop[0],
        duration: 0,
        triggerHook: 0.8
    })
        .setTween(mainTimeline)
        .addTo(controller)

    var mainInfo = $('.main__info__content');
    var mainInfoTimeline = gsap.timeline();

    mainInfoTimeline
        .fromTo(mainInfo.find('.list li'),{
            opacity: 0,
            x: "20px"
        },{
            duration: 1,
            x: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .fromTo(mainInfo.find('.main__action'),{
            opacity: 0,
            scale: 0
        },{
            duration: .6,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
        })
        .fromTo(mainInfo.find('.main__action').next(),{
            opacity: 0,
            scale: 0
        },{
            duration: .6,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
        });

    new ScrollMagic.Scene({
        triggerElement: mainInfo[0],
        duration: 0,
        triggerHook: 0.6
    })
        .setTween(mainInfoTimeline)
        .addTo(controller)

    var fieldAction = gsap.timeline();

    var columns = $('.columns__item');

    $.each(columns, function(i, column){
        fieldAction.fromTo(column, {
            y:'20%',
            opacity: 0
        }, {
            duration: .8,
            y: '0%',
            opacity: 1,
            ease: "power2.out",
            onComplete: showList,
            onCompleteParams: [column, i]
        }, i * 0.2);

        function showList(column, i){
            gsap.to($(column).find('.list li'), {
                duration: .3,
                x: '0%',
                opacity: 1,
                ease: "power2.out",
                stagger: .2
            });
        }
    });

    new ScrollMagic.Scene({
        triggerElement: '#section_fields',
        duration: 0,
        triggerHook: 0.3
    })
        .setTween(fieldAction)
        .addTo(controller)

    var reportAction = gsap.timeline();

    reportAction
        .fromTo($('.report__item'),{
            opacity: 0,
            y: "10%"
        },{
            duration: 1,
            y: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .fromTo($('.report__list__item'),{
            opacity: 0,
            x: "10%"
        },{
            duration: 1,
            x: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .fromTo($('.report__sliders'),{
            opacity: 0,
            y: "10%"
        },{
            duration: 1,
            y: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })


    new ScrollMagic.Scene({
        triggerElement: '#section_report',
        duration: 0,
        triggerHook: 0.3
    })
        .setTween(reportAction)
        .addTo(controller)

    var reportInfo = $('.report__info');
    var reportInfotAction = gsap.timeline();

    reportInfotAction
        .fromTo(reportInfo.find('.title'),{
            opacity: 0,
            scale: 0
        },{
            duration: 1,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
        })
        .fromTo(reportInfo.find('.section__item'),{
            opacity: 0,
            y: "15%"
        },{
            duration: 1,
            y: "0%",
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .fromTo(reportInfo.find('.description'),{
            opacity: 0,
            scale: 0
        },{
            duration: 1,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
        })
        .fromTo(reportInfo.find('.actions'),{
            opacity: 0,
        },{
            duration: 1,
            opacity: 1,
            ease: "power2.out",
        })

    new ScrollMagic.Scene({
        triggerElement: reportInfo[0],
        duration: 0,
        triggerHook: 0.3
    })
        .setTween(reportInfotAction)
        .addTo(controller)

    var apiAction = gsap.timeline();
    var apiSection = $('#section_api');

    apiAction
        .fromTo(apiSection.find('.center .list li'),{
            opacity: 0,
            x: "20px"
        },{
            duration: .3,
            x: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .fromTo(apiSection.find('.section__data .list li'),{
            opacity: 0,
            x: "20px"
        },{
            duration: .3,
            x: '0%',
            opacity: 1,
            ease: "power2.out",
            stagger: .2
        })
        .fromTo($('.section__img_page'), {
            x:'100%'
        }, {
            duration: 1.2,
            x: '0%',
            ease: "power2.out",
            delay: -0.3
        })
        .fromTo($('.section__img_form'), {
            x:'100%'
        }, {
            duration: 1.2,
            x: '0%',
            ease: "power2.out",
            delay: -0.6
        })

    new ScrollMagic.Scene({
        triggerElement: apiSection[0],
        duration: 0,
        triggerHook: 0.3
    })
        .setTween(apiAction)
        .addTo(controller)

    var sectionsColumsAction = gsap.timeline()

    var sectionColumns = $('.section__column');

    $.each(sectionColumns, function(i, column){
        sectionsColumsAction.fromTo(column, {
            y:'20%',
            opacity: 0
        }, {
            duration: .8,
            y: '0%',
            opacity: 1,
            ease: "power2.out",
            onComplete: showItem,
            onCompleteParams: [column, i]
        }, i * 0.2);

        function showItem(column, i){
            gsap.to($(column).find('.list li'), {
                duration: .3,
                x: '0%',
                opacity: 1,
                ease: "power2.out",
                stagger: .2
            });
        }
    });

    new ScrollMagic.Scene({
        triggerElement: sectionColumns[0],
        duration: 0,
        triggerHook: 0.3
    })
        .setTween(sectionsColumsAction)
        .addTo(controller)

    var performanceAction = gsap.timeline()

    var performanceItems = $('.performance__item');

    $.each(performanceItems, function(i, item){
        performanceAction.fromTo(item, {
            y:'20%',
            opacity: 0
        }, {
            duration: .8,
            y: '0%',
            opacity: 1,
            ease: "power2.out",
            onComplete: showEements,
            onCompleteParams: [item, i]
        }, i * 0.2);

        function showEements(item, i){
            var countEl = $(item).find('.count');
            countEl.countTo({
                from: 0,
                to: countEl.data('to'),
                speed: 600,
                refreshInterval: 50,
                formatter: function (value, options) {
                    return value.toFixed();
                },
            });
        }
    });

    new ScrollMagic.Scene({
        triggerElement: '#section_performance',
        duration: 0,
        triggerHook: 0.6
    })
        .setTween(performanceAction)
        .addTo(controller)

    var friendsAction = gsap.timeline()

    performanceAction
        .fromTo($('.friends__item'), {
            scale: 0,
            opacity: 0
        }, {
            duration: .3,
            scale: 1,
            opacity: 1,
            stagger: .1,
            ease: "power2.out",
        })
        .fromTo($('.section__callback'), {
            y: "20%",
            opacity: 0
        }, {
            duration: .6,
            y: "0%",
            opacity: 1,
            ease: "power2.out",
        });

    new ScrollMagic.Scene({
        triggerElement: '#section_friends',
        duration: 0,
        triggerHook: 0
    })
        .setTween(friendsAction)
        .addTo(controller)
});