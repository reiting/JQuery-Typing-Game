$(document).ready(function () {
    //array of sentences for webpage
    var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tainnate eate tea anne inant nean', 'itant eate anot eat nato inate eatanot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    //array is separate sentences
    var sentenceIndex = 0;
    //sentence is separate letters
    var letterIndex = 0;
    //defines currentSentence as the first sentence of the array
    var currentSentence = sentences[0];
    //defines curretLetter as the first letter of the currentSentence
    var currentLetter = currentSentence[0];
    //variables for correct and incorrect
    var correct = 0;
    var incorrect = 0;

    var start;
    var finish;
    var errors = 0;

    //append first letter to middle of page
    var currentLetterDiv = $('#target-letter');
    currentLetterDiv.append(currentLetter);


    //append sentences to the webpage
    $('#sentence').append(sentences[sentenceIndex]);

    //hide upper case keyboard on page load
    $('#keyboard-upper-container').hide();

    //keydown event
    $(document).keydown(function () {
        //make upper case appear when pressing shift key
        var keyDown = event.which;
        if (keyDown === 16) {
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
        }

    })

    //keyup event
    $(document).keyup(function () {
        //make lower case appear when letting go of shift
        var keyUp = event.which;
        if (keyUp === 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }

    })

    //keypress events
    $(document).keypress(function (event) {

        if (start == undefined) {
            start = event.timeStamp;
        }

        //saved the event of keypress on specific ID to a variable
        var keyPress = $("#" + event.which);

        //highlight keys
        keyPress.css('background-color', 'yellow');
        //unhighlight keys using keyup function
        $(document).keyup(function () {
            keyPress.css('background-color', '#f5f5f5');
        });

        //move yellow box to hightlight current letter to type
        $('#yellow-block').css('left', '+=17.5px');


        //change letter in middle of page to next letter
        //locates each separate sentence in array
        var currentSentence = sentences[sentenceIndex];
        //locates separate letters in the separate sentences
        var currentLetter = currentSentence[letterIndex];
        //goes to next letter
        letterIndex++;
        //sets nextLetter to the separate letters
        var nextLetter = currentSentence[letterIndex];
        //puts nextLetter on the page
        currentLetterDiv.text(nextLetter);


        //add glyphicons for right and wrong
        //if separate letters are less than the current sentence on the page minus 1
        if (letterIndex < currentSentence.length - 1) {
            var keyPressed = event.which;
            if (keyPressed === currentLetter.charCodeAt()) {
                $("#feedback").append('<span class="glyphicon glyphicon-ok"></span>');
                console.log('right');
                correct++;
            } else {
                $("#feedback").append('<span class="glyphicon glyphicon-remove"></span>');
                console.log('wrong');
                incorrect++;
            }
        }


        //timeStamp
        if (sentenceIndex > sentences.length - 1) {
            finish = event.timeStamp;

            //wpm
            var time = (finish - start);
            time /= 60000;
            var speed = Math.round((54 / time) - (errors * 2));
            $('#target-letter').text('You typed ' + speed + ' words per minute');

            setTimeout(function () {
                var r = confirm('Do you want to try again?');
                if (r == true) {
                    window.location.reload();
                } else {
                    return;
                };
            }, 4000);
        };
        //keypress end tag
    })











    //final close tag
});