define([
    'base/js/namespace',
    'jquery',
    'require',
    'base/js/events',
    'base/js/utils',
], function(Jupyter, $, require, events, configmod, utils) {
    "use strict";

    var load_extension = function() {

        //THis is a function that takes the word you to be searched and the html element in which it will search inside for the given keywork
        //it returns the word inside a span so that it gets highlited in the html page
        function span_word(word, html) {
            // var re = new RegExp(regex, 'g');
            var re = new RegExp(word, 'g');

            // wrap any matching part in <span>...</span>
            return html.replace(re, "<span class='wrapped_text' style='color:red;border: 1px solid #c3c3c3;'>$&</span>");
        }


        // get the selected text after your double click ;)
        function getSelectionText() {
                 var  text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                if(text.length >20){return false;}
                return text;
        }

        document.onmouseup  = function() {
                document.getElementById('search').value= getSelectionText();
                if(document.getElementById('search').value && document.getElementById('search').value != ''){
                          var elem = document.body;
                            elem.innerHTML = span_word(document.getElementById('search').value, elem.innerHTML);
                 }else{
                        $("span.wrapped_text").replaceWith(function () {
                            return $(this).text();
                        });
                }

        };



        var celltoolbar = IPython.toolbar.element;

        var search_group = $('<div id="search_group" style="display:none"/>').addClass("btn-group");
            var input = $('<input id="search" >')
                .addClass("inpt")
                .attr("Title","Search for text");
            search_group.append(input);

        celltoolbar.append(search_group);
        IPython.keyboard_manager.register_events($('#search'));


    };



    var extension = {

        load_jupyter_extension : load_extension,
        load_ipython_extension : load_extension
    };
    return extension;
});