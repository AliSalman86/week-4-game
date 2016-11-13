$(document).ready(function() {
    var playerChar, enemyChar, playerindex, enemyindex;
    var gameEvent = {
        slotNo: [0, 1, 2, 3],
        charName: ['Earth', 'Water', 'Air','Fire' ],
        charImages: ['assets/images/earth.jpg', 'assets/images/water.jpg', 'assets/images/air.jpg', 'assets/images/fire.jpg'],
        charHealth: [150, 100, 150, 180],
        newHealth: [150, 100, 150, 180],
        attackPower: [5, 10, 15, 25],
        playerSelected: false,
        enemySelected: false,

        gameInit: function() {
            $('#instructions').html('<p>WHEN YOU READY, SELECT YOUR ELEMENT</p>');
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
                    $('#'+ this.slotNo[i]).prepend(this.charName[i] + '<br>');
                    $('#'+ this.slotNo[i]).append(img)
                    $('#'+ this.slotNo[i]).append('<br><p class=' + this.slotNo[i] + '>HP = '+ this.charHealth[i] + '</p>');
                    $('#'+ this.slotNo[i]).append('<br>AP = '+ this.attackPower[i] + '</p>');
            } // loop end
        }, //End of function gameInit
        attacking: function() {
            this.newHealth[playerindex] = this.newHealth[playerindex] - this.attackPower[enemyindex];
            this.newHealth[enemyindex] = this.newHealth[enemyindex] - this.attackPower[playerindex];
            $('.' + playerindex).html('HP = '+ this.newHealth[playerindex]);
            $('.' + enemyindex).html('HP = '+ this.newHealth[enemyindex]);
        }, // End of attack function
    }; // End of Object gameEvent
    gameEvent.gameInit();
    $('.player').on('click', function() {
        if (gameEvent.playerSelected == false) {
            playerChar = $(this).html();
            $('#playerGround').addClass('btn player text-center active-player')
            $('#playerGround').html(playerChar);
            gameEvent.playerSelected = true;
            playerindex = $(this).attr('value');
            $(this).remove();
        }
        else if ((gameEvent.playerSelected == true) && (gameEvent.enemySelected == false)) {
            enemyChar = $(this).html();
            $('#enemyGround').addClass('btn player text-center active-enemy')
            $('#enemyGround').html(enemyChar);
            gameEvent.enemySelected = true;
            enemyindex = $(this).attr('value');
            $(this).remove();
        }
    });
    $('#attack').on('click', function() {
        if (gameEvent.playerSelected == false) {
            $('#instructions').html('<p>FIRST, SELECT YOUR POWER</p>');
        }
        if ((gameEvent.playerSelected == true) && (gameEvent.enemySelected == false)) {
            $('#instructions').html('<p>SELECT YOUR OPPONENT</p>');
        }
        else {
            gameEvent.attacking();
        }
    });
}); //End of Window onload



// $('.col-md-3').on('click', function() {
    //     var test = $(this).html();
    //     console.log(test);
    //     $('.playerGround').append(test);
    // });