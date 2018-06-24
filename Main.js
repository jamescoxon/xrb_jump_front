var Main = function () {};

Main.prototype = {

create: function () {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add Timer
    timer = game.time.create(false);
    timer.loop(300000, this.updateCounter, this);
//    timer.loop(9000, this.updateCounter, this);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    raiblock_stars = game.add.group();
    raiblock_stars.enableBody = true;

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 65, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  The score
    timeText = game.add.text(500, 16, 'time_left: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    timer.start();

   socket.on('message', function(data){
     console.log(data);
     var block = JSON.parse(data);
        //  Create a star inside of the 'stars' group
	var star = raiblock_stars.create(Math.floor(Math.random() * 780) + 1 , 0, 'baddie');
        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	star.lifespan = 10000 //disappear after 10 seconds
	if (block.amount == "-") {
		star.value = 0
	}
	else {
		star.value = parseInt(block.amount)
	}
	//https://gist.github.com/tarasn/c21d4e5a92bb85c670ad
	var text = game.add.text(0, -17, star.value, {font: "16px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
	star.addChild(text);

   });

},

update: function () {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(raiblock_stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

    game.physics.arcade.overlap(player, raiblock_stars, this.collectRai, null, this);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

   if (score > 10 && stars.countLiving() < 5) {
         //  Create a star inside of the 'stars' group
        var star = stars.create(Math.floor(Math.random() * 780) + 1 , 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

   }

   timeText.text = 'Time Left: ' + timer.duration.toFixed(0);
},

updateCounter: function() {

    game.state.start('End');

},

collectRai: function (player, raiblock) {
    raiblock.kill();
    score += raiblock.value;
    scoreText.text = 'Score: ' + score;
    socket.emit('score', {score: score, address: xrb_address});
},

collectStar: function (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score;

}
}
