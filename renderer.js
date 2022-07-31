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
	Bodies = Matter.Bodies,
  World = Matter.World;

// create engine
const engine = Engine.create(),
	world = engine.world;

const canvas = document.getElementById("blackboard")

  const w = window.innerWidth
  const h = window.innerHeight

  // create renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: canvas,
    options: {
      width: w,
      height: h,
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
//function creatingParticles () {
//}

document.body.addEventListener("keydown", function(e) {
	console.log(`key: ${e.key}`);

	switch(true) {
		case e.key == '1':
			creatingBall(1, 10)
			break
		case e.key == '2':
			creatingBall(10, 20)
			break
		case e.key == '3':
			creatingBall(20, 30)
			break
		case e.key == '4':
			creatingBall(30, 40)
			break

		default:
			break
	}
})  

function creatingBall (minSize, maxSize) {
	const ball_stack = Composites.stack(0.2 * w, 0, 1, 1, 0, 0, function(x, y) {
		return Bodies.circle(x, y, Common.random(minSize, maxSize), { friction: 0.00001, restitution: 1, density: 0.001 });
	});
	Composite.add(world, ball_stack);
}

//addEventListener('mousemove', (event) => {
//    mouse.x = event.clientX
//    mouse.y = event.clientY
//	const whiteHoll = Bodies.circle(mouse.x, mouse.y, 10, {
//		render: {
//			fillStyle: '#ffffff'
//		}
//	})
//	Composite.add(world, whiteHoll);
//console.log(`mouse.y: ${mouse.y}`)
//console.log(`whiteHoll.position.y: ${whiteHoll.position.y}`)
//	if(whiteHoll.position.y < mouse.y) {
//		Matter.Composite.remove(world, whiteHoll)
//	}
//});
//
//var mouseDown = false;
//addEventListener('mousedown', function() {
//    mouseDown = true;
//    addBall();
//});
//addEventListener('mouseup', function() {
//    mouseDown = false;
//});
//
//function addBall() {
//	const stack = Composites.stack(mouse.x, mouse.y, 1, 1, 0, 0, function(x, y) {
//		return Bodies.circle(x, y, Common.random(1, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
//	});
//	Composite.add(world, stack);
//	if(mouseDown) {
//        setTimeout(function() {
//            addBall();
//        }, 1);
//    }
//}

//let mouse = Matter.Mouse.create(render.canvas);
//let mouseConstraint = Matter.MouseConstraint.create(engine, {
//  mouse: mouse,
//  constraint: {
//    render: {visible: true}
//  }
//});
//render.mouse = mouse;

//const whiteHoll = Bodies.circle(mouse.x, mouse.y, 10, {
//	render: {
//		fillStyle: '#ffffff'
//	}
//
//})

//Composite.add(world, whiteHoll);
const small_stack = Composites.stack(0.3 * w, 0.7 * h, 3, 5, 0, 0, function(x, y) {
	return Bodies.rectangle(x, y, 10, 10, {
	frictionStatic: 0.1
	});
});

const low_middle_stack = Composites.stack(0.4 * w, 0.6 * h, 3, 10, 0, 0, function(x, y) {
	return Bodies.rectangle(x, y, 10, 10);
});

const middle_stack = Composites.stack(0.5 * w, 0.6 * h, 3, 15, 0, 0, function(x, y) {
	return Bodies.rectangle(x, y, 10, 10);
});

const height_middle_stack = Composites.stack(0.6 * w, 0.6 * h, 3, 20, 0, 0, function(x, y) {
	return Bodies.rectangle(x, y, 10, 10);
});

const big_stack = Composites.stack(0.7 * w, 0.6 * h, 3, 25, 0, 0, function(x, y) {
	return Bodies.rectangle(x, y, 10, 10);
});

const height_big_stack = Composites.stack(0.8 * w, 0.5 * h, 3, 30, 0, 0, function(x, y) {
	return Bodies.rectangle(x, y, 10, 10);
});
//const pyramid = Composites.pyramid(0.02 * w, 0.75 * h, 7, 6, 0, 0, function(x, y) {
//  return Bodies.rectangle(x, y, 0.01 * w, 0.01 * w);
//})
//
//const ground_hight = Matter.Bodies.rectangle(0.1 * w, 0.5 * h, 0.2 * w, 5, { 
//	isStatic: true, 
//	render: {
//		fillStyle: '#ffffff' 
//	}
//}); 
//
//const ground_low = Matter.Bodies.rectangle(0.1 * w, 0.85 * h, 0.2 * w, 5, { 
//	isStatic: true, 
//	render: {
//		fillStyle: '#ffffff' 
//	}
//}); 

//const ball_stack = Matter.Composites.stack(0.05 * w, 0.36 * h, 4, 4, 0, 0, function(x, y) { 
//	return Matter.Bodies.polygon(x, y, 8, 0.009 * w, {
//		restitution: 0.1,//反発係数
//	});
//});

Composite.add(world, [
	small_stack,
	low_middle_stack,
	middle_stack,
	height_middle_stack,
	big_stack,
	height_big_stack
])

Composite.add(world, [
  Bodies.rectangle(0.05 * w, 0.1 * h, 1 * w, 5, { isStatic: true, friction: 0, angle: Math.PI * 0.03, render: { fillStyle: '#ffffff' } }),
  Bodies.rectangle(0.95 * w, 0.4 * h, 1.5 * w, 5, { isStatic: true, friction: 0, angle: -Math.PI * 0.04, render: { fillStyle: '#ffffff' } }),
  Bodies.rectangle(0.05 * w, 0.7 * h, 0.4 * w, 5, { isStatic: true, friction: 0, angle: Math.PI * 0.04, render: { fillStyle: '#ffffff' } }),

	//Bodies.circle(0.4 * w, 0.45 * h, 40, { friction: 0, isStatic: true,restitution: 1, density: 0.001, render: {fillStyle: '#ffffff'} }),
	//Bodies.circle(0.35 * w, 0.50 * h, 40, { friction: 0, isStatic: true,restitution: 1, density: 0.001, render: {fillStyle: '#ffffff'} }),
	//Bodies.circle(0.30 * w, 0.55 * h, 40, { friction: 0, isStatic: true,restitution: 1, density: 0.001, render: {fillStyle: '#ffffff'} }),

  //Bodies.rectangle(0.7 * w, 0.6 * h, 0.2 * w, 5, { isStatic: true, friction: 0, angle: Math.PI * 0.04, render: { fillStyle: '#ffffff' } }),
  //Bodies.rectangle(0.9 * w, 0.75 * h, 0.2 * w, 5, { isStatic: true, friction: 0, angle: -Math.PI * 0.04, render: { fillStyle: '#ffffff' } }),
  //Bodies.rectangle(0.75 * w, 0.9 * h, 0.3 * w, 5, { isStatic: true, friction: 0, angle: Math.PI * 0.05, render: { fillStyle: '#ffffff' } }),

  //wall
  Bodies.rectangle(w / 2, h, w, 10, { isStatic: true, render: { fillStyle: '#060a19' } }),
  Bodies.rectangle(5, h / 2 , 10, h, { isStatic: true, render: { fillStyle: '#060a19' } }),
  Bodies.rectangle(w - 5, h / 2, 10, h, { isStatic: true, render: { fillStyle: '#060a19' } }),
  //wall
  //Bodies.rectangle(0, height, width, 20, { isStatic: true,render: { fillStyle: '#060a19' } }),
  //Bodies.rectangle(340, 580, 500, 20, { isStatic: true,render: { fillStyle: '#060a19' } }),
  //Bodies.rectangle(340, 580, 500, 20, { isStatic: true,render: { fillStyle: '#060a19' } })

]);

// add mouse control


//const mouse = Mouse.create(render.canvas),
//	mouseConstraint = MouseConstraint.create(engine, {
//		mouse: mouse,
//		constraint: {
//			stiffness: 0.2,
//			render: {
//				visible: false
//			}
//		}
//  });
//
//Composite.add(world, mouseConstraint);
//
//// keep the mouse in sync with rendering
//render.mouse = mouse;

// fit the render viewport to the scene
//Render.lookAt(render, Composite.allBodies(world));

// wrapping using matter-wrap plugin
//for (let i = 0; i < stack.bodies.length; i += 1) {
//	stack.bodies[i].plugin.wrap = {
//		min: { x: render.bounds.min.x, y: render.bounds.min.y },
//		max: { x: render.bounds.max.x, y: render.bounds.max.y }
//	};
//}

window.addEventListener('resize', () => { 
  //Matter.Render.setPixelRatio(render, pixelRatio)
  const w = window.innerWidth
  const h = window.innerHeight

  render.bounds.max.x = w
  render.bounds.max.y = h

  render.options.width = w
  render.options.height = h

  render.canvas.width = w
  render.canvas.height = h

  //walls.update(w, h)

  //render.canvas.setAttribute('width', w)
  //render.canvas.setAttribute('height', h)

  //Render.lookAt(render, {
  //  min: { x: 0, y: 0 },
  //  max: { x: w, y: h }
  //});

});


