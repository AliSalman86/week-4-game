$(document).ready(function() {
    var playerChar, enemyChar, playerindex, enemyindex, selectSides;
    var gameEvent = {
        slotNo: [0, 1, 2, 3],
        charName: ['EARTH', 'WATER', 'AIR','FIRE' ],
        charImages: ['assets/images/earth.jpg', 'assets/images/water.jpg', 'assets/images/air.jpg', 'assets/images/fire.jpg'],
        charHealth: [120, 100, 150, 180],
        newHealth: [120, 100, 150, 180],
        attackPower: [8, 5, 10, 20],
        attackPowerInc: [8, 5, 10, 20],
        playerSelected: false,
        enemySelected: false,
        enemies: 3,

        gameInit: function() {
            $('#instructions').html('<p>SELECT YOUR POWER AND LET THE TOURNMENT BEGIN</p>');
            // create and append the playing cards to the characters pool
            $('#charsPool').empty(); // recreate the pool for players whenever play again pressed
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
            } // loop end
            selectSides();
        }, //End of function gameInit
        attacking: function() {
            this.newHealth[playerindex] = this.newHealth[playerindex] - this.attackPower[enemyindex];
            this.newHealth[enemyindex] = this.newHealth[enemyindex] - this.attackPower[playerindex];
            $('#instructions').html('<p>YOU ATTACKED '+ this.charName[enemyindex] + ' MASTER WITH ' + this.attackPower[playerindex] + ' DAMAGE POINTS <br> and ' + this.charName[enemyindex] + ' MASTER ATTACKED YOU WITH ' + this.attackPower[enemyindex] + ' DAMAGE POINTS</p>');
            this.attackPower[playerindex] = this.attackPower[playerindex] + this.attackPowerInc[playerindex];
            $('.' + playerindex).html('HP = '+ this.newHealth[playerindex]);
            $('.' + enemyindex).html('HP = '+ this.newHealth[enemyindex]);
            if (gameEvent.newHealth[playerindex] <= 0) {
                gameEvent.youLost();
            }
            if (gameEvent.newHealth[enemyindex] <= 0) {
                this.enemies--;
                gameEvent.youWon();
            }
        }, // End of attack function
        youLost: function() {
            $('#instructions').html('<p>YOU LOST THE TOURNMENT, PRESS PLAY AGAIN TO START AGAIN</p>');
            $('#playerGround').empty();
            this.playerSelected = false;
        }, // End of Losing function
        youWon: function() {
            if (this.enemies > 0) {
                $('#instructions').html('<p>YOU WON A BATTLE, CHOOSE ANOTHER OPPONENT</p>');
            }
            else if (this.enemies == 0) {
                $('#instructions').html('<p>YOU WON THE TOURNMENT, YOU ARE THE MASTER OF THE FOUR ELEMENTS</p>');
            }
        $('#enemyGround').empty();
        this.enemySelected = false;

        }, // End of Winning function
        reset: function() {
            $('#enemyGround').empty();
            $('#playerGround').empty();
            this.newHealth = [120, 100, 150, 180];
            this.attackPower = [8, 5, 10, 20];
            this.playerSelected = false;
            this.enemySelected = false;
            this.gameInit();
            this.enemies = 3;
        }
    }; // End of Object gameEvent
    gameEvent.gameInit();

    function selectSides() {

    $('.player').on('click', function() {
        if (gameEvent.playerSelected == false) {
            playerChar = $(this).html();
            $('#playerGround').addClass('btn player text-center active-player')
            $('#playerGround').html(playerChar);
            gameEvent.playerSelected = true;
            playerindex = $(this).attr('value');
            $(this).remove();
            selectaudio.play();
            $('#instructions').html('<p>YOU SELECTED THE ' + gameEvent.charName[playerindex] + '</p><br> NOW SELECT YOUR OPPONENT');
        }
        else if ((gameEvent.playerSelected == true) && (gameEvent.enemySelected == false)) {
            enemyChar = $(this).html();
            $('#enemyGround').addClass('btn player text-center active-enemy')
            $('#enemyGround').html(enemyChar);
            gameEvent.enemySelected = true;
            enemyindex = $(this).attr('value');
            $(this).remove();
            selectaudio.play();
            $('#instructions').html('<p>YOU SELECTED THE <span>' + gameEvent.charName[playerindex] + '</span></p><br> AND YOU WILL FIGHT THE ' + gameEvent.charName[enemyindex] + '<br> NOW ATTACK');
        }
    });
    }
    $('#attack').on('click', function() {
        if (gameEvent.playerSelected == false) {
            $('#instructions').html('<p>FIRST, SELECT YOUR POWER</p>');
        }
        if ((gameEvent.playerSelected == true) && (gameEvent.enemySelected == false)) {
            $('#instructions').html('<p>SELECT YOUR OPPONENT</p>');
        }
        else if ((gameEvent.playerSelected == true) && (gameEvent.enemySelected == true)) {
            gameEvent.attacking();
            attackaudio.play();
        }
    });
    $('#reset').on('click', function(){
        gameEvent.reset();
    });

    $('#mute').on('click', function(){
        bgaudio.pause();
    });
    // Background Audio
    var bgaudio = new Audio('assets/audios/bgaudio.mp3');
    var selectaudio = new Audio('assets/audios/select.mp3');
    var attackaudio = new Audio('assets/audios/attack.mp3');
    bgaudio.play();

}); //End of Window onload
