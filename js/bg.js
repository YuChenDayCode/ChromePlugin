$(function () {
    document.oncontextmenu=function(){return false;}
    var url = "/img/" + Math.ceil(Math.random() * 15) + ".jpg";
    $('body').css('background', 'url(' + url + ') no-repeat fixed center');

    $("#searchinput").keydown(function (event) {
        event = document.all ? window.event : event;
        if ((event.keyCode || event.which) == 13) {
            var selectior = $('#sel_sou').val();
            location.href = selectior + $("#searchinput").val();
        }
    });

    $('#sel_sou').change(function () {
        if ($("#searchinput").val() != "") {
            location.href = $('#sel_sou').val() + $("#searchinput").val();
        }
    });
})