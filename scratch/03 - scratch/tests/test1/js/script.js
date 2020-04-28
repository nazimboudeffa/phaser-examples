var game = new Phaser.Game(800, 600, Phaser.AUTO, 'MyCanvas', { preload: preload, create: create });

function preload() {

    game.load.image('logo', '../phaser1.png');

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    var image = game.add.sprite(0, 0, 'logo');

    //enables all kind of input actions on this image (click, etc)
    image.inputEnabled=true;

    image.events.onInputDown.add(listener,this);

}

function listener () {
    alert('clicked');
}
