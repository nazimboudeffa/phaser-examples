var app = new PIXI.Stage(0x000000, false);

var renderer = new PIXI.CanvasRenderer(600, 480);
renderer.render(app);

document.body.appendChild( renderer.view );
