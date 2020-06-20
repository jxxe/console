$(document).ready(function(){
    console.log('You should know...');
    console.error('Something went wrong...');
    console.warn('Look out for this...');
    console.log('Look out for this asdfhj asdf asdf asdfsdf...');
});

$('#testing').submit(function(e){
    e.preventDefault();
    var random = Math.random();
    if(random < 0.33 && random > 0) {
        console.log( $('#console').val() );
    } else if(random < 0.66) {
        console.warn( $('#console').val() );
    } else {
        console.error( $('#console').val() );
    }
    $('#console').val('');
})

/* var int = 0;
function recursion() {
    if(int < 1000) {
        var random = Math.random();
        if(random < 0.33 && random > 0) {
            console.log( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet tortor sit amet consectetur efficitur.' );
        } else if(random < 0.66) {
            console.warn( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet tortor sit amet consectetur efficitur.' );
        } else {
            console.error( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet tortor sit amet consectetur efficitur.' );
        }
        int++;
        setTimeout(function(){
            recursion();
        }, Math.random() * Math.random() * 1000);
    }
}
recursion(); // generates 1000 console messages */

$(document).ready(function(){
    $('#clear').click(function(){
        console.clear();
    })
})







$(document).ready(function(){
    var transitionTime;
    $(document).on('mouseenter', '.console-message', function(){
        transitionTime = $(this).children('.console-text').text().length / 25;
        $(this).children('.console-text').css('transition', 'all ' + transitionTime + 's linear');
        if( $(this).children('.console-text').width() > $(this).width() ) {
            $(this).children('.console-text').css('text-indent', ($(this).children('.console-text').width() - $(this).width()) * -1);
        }
    });
    $(document).on('mouseleave', '.console-message', function(){
        transitionTime = transitionTime / 5;
        $(this).children('.console-text').css('transition', 'all ' + transitionTime + 's linear');
        if( $(this).children('.console-text').width() > $(this).width() ) {
            $(this).children('.console-text').css('text-indent', '0');
        }
    });
});

function countMessages() {
    $('.console-warnings-count').text( $('.console-message.warn').length );
    $('.console-errors-count').text( $('.console-message.error').length );
    $('.console-logs-count').text( $('.console-message.log').length );
    if( $('.console-message').length == 0 ) {
        $('.console-buttons').css('visibility', 'hidden');
        $('.console-buttons').css('opacity', '0');
    } else {
        $('.console-buttons').css('visibility', 'visible');
        $('.console-buttons').css('opacity', '1');
    }
}

var native = window;
var originalConsole = native.console;
var lastMessage;
var lastMessageCounter = 1;
var lastMessageType;

function displayMessage(type, message) {
    if(message) {
        if(lastMessage === message && lastMessageType === type) {
            lastMessageCounter++;
            $('.console-message:first-child').addClass('console-has-duplicates');
            $('.console-message:first-child').attr('data-duplicates', lastMessageCounter);
        } else {
            $( '<div style="margin-bottom:-62px;opacity:0;" class="console-message clearable ' + type + '"><span class="console-text">' + message + '</span><div class="console-controls"><i class="material-icons-outlined console-search" title="Search with Google">search</i><i class="material-icons-outlined console-preserve" title="Do not clear this message">bookmark_border</i></div></div>' ).prependTo('.console-messages').animate({
                'opacity': '1',
                'margin-bottom': '0'
            }, 200, function(){
                $(this).attr('style', '');
            });
            lastMessageCounter = 1;
        }
        lastMessage = message;
        lastMessageType = type;
    }
    if(type == 'error') {
        originalConsole.error(message);
    } else if(type == 'warn') {
        originalConsole.warn(message);
    } else {
        originalConsole.log(message);
    }
    countMessages();
}

// message hover options
$(document).ready(function(){
    $(document).on('click', '.console-search', function(){
        window.open('http://www.google.com/search?q=' + $(this).parent().parent().children('.console-text').text(), '_blank');
    });
    $(document).on('click', '.console-preserve', function(){
        $(this).parent().parent().toggleClass('clearable');
        if( $(this).parent().parent().hasClass('clearable') ){
            $(this).text('bookmark_outline');
        } else {
            $(this).text('bookmark');
        }
    });
})

// filter messages
$(document).ready(function(){
    $('.console-clear').click(function(){
        console.clear();
    });
    $('.console-button[data-type]').click(function(){
        $('.console-messages-wrapper').toggleClass( 'show-' + $(this).data('type') );
    })
})

native.console = {
    log: function(message){
        displayMessage('log', message);
    },
    error: function(message){
        displayMessage('error', message);
    },
    warn: function(message){
        displayMessage('warn', message);
    },
    clear: function(){
        $('.console-message.clearable').fadeOut('fast', function(){
            $(this).remove();
            countMessages();
        });
        originalConsole.clear();
    },
    /* All the console methods that this extension doesn't support */
    assert: function(){ originalConsole.assert(); },
    // clear
    count: function(message){ originalConsole.count(message); },
    countReset: function(message){ originalConsole.countReset(message); },
    debug: function(message){ originalConsole.debug(message); },
    dir: function(message){ originalConsole.dir(message); },
    dirxml: function(message){ originalConsole.dirxml(message); },
    exception: function(message){ console.error(message); },
    // error
    dirxml: function(message){ originalConsole.dirxml(message); },
    group: function(message){ originalConsole.group(message); },
    groupCollapsed: function(message){ originalConsole.groupCollapsed(message); },
    groupEnd: function(message){ originalConsole.groupEnd(message); },
    info: function(message){ originalConsole.info(message); },
    // log
    profile: function(message){ originalConsole.profile(message); },
    profileEnd: function(message){ originalConsole.profileEnd(message); },
    table: function(message){ originalConsole.table(message); },
    time: function(message){ originalConsole.time(message); },
    timeEnd: function(message){ originalConsole.timeEnd(message); },
    timeLog: function(message){ originalConsole.timeLog(message); },
    timeStamp: function(message){ originalConsole.timeStamp(message); },
    trace: function(message){ originalConsole.trace(message); },
    // warn
}
