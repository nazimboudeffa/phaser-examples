var app = new PIXI.Stage(0x0000ff, false);
var sprite = new PIXI.Sprite.fromImage('../phaser1.png');

app.addChild(sprite);

var renderer = new PIXI.CanvasRenderer(600, 480);
document.body.appendChild( renderer.view );

renderer.render(app);
