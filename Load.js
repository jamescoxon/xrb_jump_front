var Load = function () {};

Load.prototype = {

create: function () {

    var edgeX = game.world.centerX - 390
    var edgeY = game.world.centerY - 200

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    loadText = game.add.text(edgeX, edgeY, 'Waiting for XRB', { fontSize: '32px', fill: 'white' });
    loadText2 = game.add.text(edgeX, edgeY + 40, 'To start the game, send 1XRB to: ', { fontSize: '32px', fill: 'white' });
    loadText3 = game.add.text(edgeX, edgeY + 80, 'xrb_17ar3aukcbijhkqumtp8ro1si51jmsq5zctzwmjs379afcw7fpbme8s49qg3', { font: "20px Arial", fill: 'white' });

    rules0Text = game.add.text(edgeX, edgeY + 180, 'Rules', { fontSize: '32px', fill: 'white' });
    game.add.sprite(edgeX, edgeY + 220, 'star');
    welcome4Text = game.add.text(edgeX + 40, edgeY + 220, '= 1 (random)', { fontSize: '32px', fill: 'white' });
    game.add.sprite(edgeX, edgeY + 260, 'baddie');
    welcome5Text = game.add.text(edgeX + 40, edgeY + 260, '= actual RaiBlocks transaction value', { fontSize: '32px', fill: 'white' });

    rules1Text = game.add.text(edgeX, edgeY + 300, 'Every 12hrs prizes for top scorer, top total score and', { fontSize: '32px', fill: 'white' });
    rules2Text = game.add.text(edgeX, edgeY + 340, 'a random player', { fontSize: '32px', fill: 'white' });

    welcome6Text = game.add.text(edgeX, edgeY + 380, 'Copy the address from below (Ctrl + c)', { fontSize: '32px', fill: 'white' });
    welcome7Text = game.add.text(edgeX, edgeY + 420, 'Remember your wallet needs to be in sync', { fontSize: '32px', fill: 'white' });
    welcome8Text = game.add.text(edgeX, edgeY + 460, 'or use YapRai or RaiWalletBot', { fontSize: '32px', fill: 'white' });

    var textArea = document.createElement("textarea");
    textArea.value = 'xrb_17ar3aukcbijhkqumtp8ro1si51jmsq5zctzwmjs379afcw7fpbme8s49qg3';
    document.body.appendChild(textArea);
    textArea.select();
    var successful = document.execCommand('copy');
    console.log(successful)

    socket.on('message', function(data){
      console.log(data);
      var block = JSON.parse(data);
      if (block.send == xrb_address && block.dest == 'xrb_17ar3aukcbijhkqumtp8ro1si51jmsq5zctzwmjs379afcw7fpbme8s49qg3' && parseFloat(block.amount) >= 1.0 ){
         game.state.start('Main');
        }
   });

}
}
