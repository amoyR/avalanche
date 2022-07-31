const Matter = require("matter-js");
const Utils = require("./lib/common.js")
var Colormap = require("./lib/colormap.js")

const Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Composite = Matter.Composite,
	Composites = Matter.Composites,
	Common = Matter.Common,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	Bodies = Matter.Bodies;

// create engine
const engine = Engine.create(),
	world = engine.world;

const canvas = document.getElementById("blackboard")

  const width = window.innerWidth
  const height = window.innerHeight

  // create renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: canvas,
    options: {
      width: width,
      height: height,
      //showAngleIndicator: true,
      wireframes: false,
      background: '#000000',
      //pixelRatio: 'auto',
      pixelRatio: 1,
      hasBounds: true
    }
  });


// create renderer
Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const stack = Composites.stack(200, 20, 20, 10, 0, 0, function(x, y) {
	return Bodies.circle(x, y, Common.random(1, 10), { friction: 0.00001, restitution: 0.5, density: 0.001 });
});

Composite.add(world, stack);

Composite.add(world, [
	Bodies.rectangle(200, 150, 500, 10, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
	Bodies.rectangle(500, 350, 500, 10, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
	Bodies.rectangle(340, 580, 500, 10, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: '#060a19' } }),

  //wall
  //Bodies.rectangle(0, height, width, 20, { isStatic: true,render: { fillStyle: '#060a19' } }),
  //Bodies.rectangle(340, 580, 500, 20, { isStatic: true,render: { fillStyle: '#060a19' } }),
  //Bodies.rectangle(340, 580, 500, 20, { isStatic: true,render: { fillStyle: '#060a19' } })

]);

// add mouse control
const mouse = Mouse.create(render.canvas),
	mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false
			}
		}
	});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, Composite.allBodies(world));

// wrapping using matter-wrap plugin
for (let i = 0; i < stack.bodies.length; i += 1) {
	stack.bodies[i].plugin.wrap = {
		min: { x: render.bounds.min.x, y: render.bounds.min.y },
		max: { x: render.bounds.max.x, y: render.bounds.max.y }
	};
}
