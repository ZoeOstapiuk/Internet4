var listItemTemplateBefore = '<li class="list-group-item" style="display: none"><span class="glyphicon glyphicon-edit"></span>';
var listItemTemplateAfter = '<span class="glyphicon glyphicon-remove pull-right"></span></li>';

$(document).ready(function() {
    updateClickListeners();
    $("#add-btn").click(function() {
        var name = $("#star-name").val();
        if (name) {
            appendStar(name);
        }
    });
    $("#toggle-btn").click(function() {
        $("#container *").slideToggle("slow");

        $("#toggle-btn").toggleClass("btn-danger");
        $("#toggle-btn").toggleClass("btn-success");

        $("#toggle-btn span").toggleClass("glyphicon-remove");
        $("#toggle-btn span").toggleClass("glyphicon-resize-full");
    });
    $("#get-server-stars-json").click(function() {
        $.getJSON('star-info.json', { }, function(json) {
            $("#star-list").html('');
            for (var i = 0; i < json.stars.length; i++) {
                appendStar(json.stars[i].name + " " + json.stars[i].constellation + " " + json.stars[i].stage);
            }
        });
    });
    $("#get-server-stars-xml").click(function() {
        $.get("star-info.xml", {}, function(xml) {
             $("#star-list").html('');
             $(xml).find('star').each(function() {
                 appendStar($(this).find("name").text() + " " +
                    $(this).find("constellation").text() + " " + 
                    $(this).find("stage").text());
             });
        });
    });
});

function updateClickListeners() {
    $("#star-list .glyphicon-remove").click(function() {
        $(this).parent().hide('slow', function() {
            $(this).remove();
            $("#star-list").showNumberOfChildren();
        });
    });
}

jQuery.fn.showNumberOfChildren = function() {
    $("#stat").html("The element has " + this.children().length + " children.");
}

function appendStar(name) {
    var newItem = $(listItemTemplateBefore + name + listItemTemplateAfter).hide();
    $("#star-list").append(newItem);
    newItem.slideDown();
    updateClickListeners();
    $("#star-list").showNumberOfChildren();
}
