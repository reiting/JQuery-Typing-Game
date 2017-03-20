$(document).ready(function () {
    //array of sentences for webpage
    var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tainnate eate tea anne inant nean', 'itant eate anot eat nato inate eatanot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    //array is separate sentences
    var sentenceIndex = 0;
    //defines currentSentence as the first sentence of the array
    var currentSentence = sentences[sentenceIndex];
      //sentence is separate letters
    var letterIndex = 0;
    //defines curretLetter as the first letter of the currentSentence
    var currentLetter = currentSentence[letterIndex];
    //variables for glyphicons
    var errors = 0;
    //variables for timestamp
    var start;
    var finish;

    //append sentences to the webpage
    $('#sentence').append(sentences[sentenceIndex]);

    //append first letter to middle of page
    var currentLetterDiv = $('#target-letter');
    currentLetterDiv.append(currentLetter);

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
        var currentSentence = sentences[sentenceIndex];
        var currentLetter = currentSentence[letterIndex];
        //start timestamp
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
        letterIndex++;
        //sets nextLetter to the separate letters
        var nextLetter = currentSentence[letterIndex];
        //puts nextLetter on the page
        currentLetterDiv.text(nextLetter);


        //add glyphicons for right and wrong
        //if separate letters are less than the current sentence on the page 
        if (letterIndex < currentSentence.length - 1) {
            // var keyPressed = event.which;
            if (event.which === currentLetter.charCodeAt()) {
                $("#feedback").append('<span class="glyphicon glyphicon-ok"></span>');
            } else {
                $("#feedback").append('<span class="glyphicon glyphicon-remove"></span>');
                errors++;
            }
        }

        //end of each string in array: change sentence, letter, move block back, and clear feedback
        //if current letter = the length of the current sentence
        if (letterIndex == currentSentence.length) {
            //remove old sentence
            $("#sentence").empty();
            sentenceIndex++;
            currentSentence = sentences[sentenceIndex];
            //append new sentence
            $("#sentence").append(sentences[sentenceIndex]);
            letterIndex = 0;
            if(sentenceIndex < sentences.length - 1) {
                var nextLetter = currentSentence[letterIndex];
            }
            //puts nextLetter on the page
            currentLetterDiv.text(nextLetter);
            //makes yellow block move back to beginning of sentence
            $('#yellow-block').css({ left: 17 });
            //clears feedback div at end of array
            $('#feedback').empty();
        }


        //timeStamp
        //if you've reached the end of the last sentence in the array
        if (sentenceIndex > sentences.length - 1) {
            //stop timing
            finish = event.timeStamp;

            //wpm
            var time = (finish - start);
            //do some math
            time /= 60000;
            var speed = Math.round((54 / time) - (errors * 2));
            $('#target-letter').text('You typed ' + speed + ' words per minute');

            //use boolean to confirm if they want to play again or not
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

