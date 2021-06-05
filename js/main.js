$(function () {
    $('.discography__inner').slice(0, 6).show();
    $('#load_more').on('click', function (e) {
        e.preventDefault();
        $('.discography__inner:hidden').slice(0, 6).slideDown();
        if ($('.discography__inner:hidden').length == 0) { $('#load_more').hide() };
    })
})

jQuery(document).ready(function ($) {

    // Отправляет данные из формы на сервер и получает ответ
    $('.contact__form').on('submit', function (event) {

        event.preventDefault();

        var form = $('.contact__form'),
            button = $('.contact__form-submit'),
            answer = $('#answer'),
            loader = $('#loader');

        $.ajax({
            url: '../php/handler.php',
            type: 'POST',
            data: form.serialize(),
            beforeSend: function () {
                answer.empty();
                button.attr('disabled', true).css('margin-bottom', '10px');
                loader.fadeIn();
            },
            success: function (result) {
                loader.fadeOut(300, function () {
                    answer.text(result);
                });
                form.find('.field').val('');
                button.attr('disabled', false);
            },
            error: function () {
                loader.fadeOut(300, function () {
                    answer.text('Приносим извинения, но в данный момент контактная форма не работает. Хорошего вам настроения!');
                });
                button.attr('disabled', false);
            }
        });

    });

});

$('.menu__links a').on('click', function () {
    $('.menu__links a.current').removeClass('current');
    $(this).addClass('current');
});

$('.menu__icon').on('click', function () {
    $('.menu__links').toggleClass('menu__links-on');
    $('.menu__links a').on('click', function () {
        $('.menu__links').removeClass('menu__links-on');
    });
});

function youTubes_makeDynamic() {
    var $ytIframes = $('iframe[src*="youtube.com"]');
    $ytIframes.each(function (i, e) {
        var $ytFrame = $(e);
        var ytKey; var tmp = $ytFrame.attr('src').split(/\//); tmp = tmp[tmp.length - 1]; tmp = tmp.split('?'); ytKey = tmp[0];
        var $ytLoader = $('<div class="ytLoader">');
        $ytLoader.append($('<img class="cover" src="https://i.ytimg.com/vi/' + ytKey + '/hqdefault.jpg">'));
        $ytLoader.data('$ytFrame', $ytFrame);
        $ytFrame.replaceWith($ytLoader);
        $ytLoader.click(function () {
            var $ytFrame = $ytLoader.data('$ytFrame');
            $ytFrame.attr('src', $ytFrame.attr('src') + '?autoplay=1');
            $ytLoader.replaceWith($ytFrame);
        });
    });
};
$(document).ready(function () { youTubes_makeDynamic() });
