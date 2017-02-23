$(document).ready(function() {
    //array of sentences for webpage
    var sentences = ['ten ate neite ate nee enet ite ate inet ent eate','Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tainnate eate tea anne inant nean', 'itant eate anot eat nato inate eatanot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    //array is separate sentences
    var sentenceIndex = 0;
    //sentence is separate letters
    var letterIndex = 0;

    //defines currentSentence as the first sentence of the array
    var currentSentence = sentences[0];
    //defines curretLetter as the first letter of the currentSentence
    var currentLetter = currentSentence[0];

    //append sentences to the webpage


    //hide upper case keyboard on page load
    $('#keyboard-upper-container').hide();

    //keydown event
    $(document).keydown(function() {
        //make upper case appear when pressing shift key
        var keyDown=event.which;
        if (keyDown === 16) {
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
        }
    })

    //keyup event
    $(document).keyup(function() {
        //make lower case appear when letting go of shift
        var keyUp = event.which;
        if (keyUp === 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }
    })











    

//final close tag
});