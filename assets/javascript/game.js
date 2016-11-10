$(document).ready(function() {
    var playerChar, enemyChar;
    var gameEvent = {
        slotNo: [0, 1, 2, 3],
        charName: ['Earth', 'Water', 'Air','Fire' ],
        charImages: ['assets/images/earth.jpg', 'assets/images/water.jpg', 'assets/images/air.jpg', 'assets/images/fire.jpg'],
        charHealth: [150, 100, 150, 180],
        attackPower: [5, 10, 15, 25],
        playerSelected: false,
        enemySelected: false,

        gameInit: function() {
            $('#instructions').html('WHEN YOU READY, SELECT YOUR ELEMENT');
            for (var i = 0; i < this.slotNo.length; i++) {
                var playCard = $('<div>');
                    playCard.attr({
                        id: this.slotNo[i],
                        value: this.slotNo[i],
                    });
                    playCard.addClass('btn player text-center')
                var img = $('<img>');
                    img.attr({ src: this.charImages[i] });
                    img.addClass('element');
                    $('#charsPool').append(playCard);
                    $('#'+ this.slotNo[i]).prepend('<p>'+this.charName[i]+'</p>');
                    $('#'+ this.slotNo[i]).append(img)
                    $('#'+ this.slotNo[i]).append('<br>HP = '+ this.charHealth[i]);
                    $('#'+ this.slotNo[i]).append('<br>AP = '+ this.attackPower[i]);
            } // loop end
        } //End of function gameInit
        // function
    }; // End of Object gameEvent
    gameEvent.gameInit();
    $('.player').on('click', function() {
        if (gameEvent.playerSelected == false) {
            playerChar = $(this).html();
            $('#playerGround').addClass('btn player text-center active-player')
            $('#playerGround').html(playerChar);
            gameEvent.playerSelected = true;
            $(this).remove();
        }
        else if ((gameEvent.playerSelected == true) && (gameEvent.enemySelected == false)) {
            enemyChar = $(this).html();
            $('#enemyGround').addClass('btn player text-center active-enemy')
            $('#enemyGround').html(enemyChar);
            gameEvent.enemySelected = true;
            $(this).remove();
        }
    });
}); //End of Window onload



// $('.col-md-3').on('click', function() {
    //     var test = $(this).html();
    //     console.log(test);
    //     $('.playerGround').append(test);
    // });