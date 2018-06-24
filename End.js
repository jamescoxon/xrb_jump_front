var End = function () {};

End.prototype = {

create: function () {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //status     = game.make.text(game.world.centerX, 380, 'Finished', {fill: 'white'});
    endText = game.add.text(game.world.centerX, game.world.centerY - 50, 'Finished!', { fontSize: '32px', fill: 'white' });
    finalscoreText = game.add.text(game.world.centerX, game.world.centerY, 'Final Score: ' + score, { fontSize: '32px', fill: 'white' });
    button = game.add.button(game.world.centerX - 95, 400, 'start_button', this.actionOnClick, this, 2, 1, 0);
//    var submit_url = 'http://stats.yapraiwallet.space/submit_score/' + socket.io.engine.id
//    button = game.add.button(game.world.centerX + 40, 400, 'submit_button', function() {  window.open(submit_url, "_blank");}, this);
    socket.emit('final', {final: score, address: xrb_address});
},

actionOnClick: function() {
   console.log('Button pressed');
   score = 0;
   game.state.start('Main');
}

}
