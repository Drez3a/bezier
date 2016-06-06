var bezierConvex = (function() {

	var w = window.outerWidth,
		h = window.outerHeight,
		t = 1,
		delta = .01,
		padding = 10,
		bezier = {},
		points = [],
		line = d3.svg.line().x(x).y(y),
		n = points.length-1,
		orders = d3.range(n+1, n + 2);
		
	var vis;

	var createFrame = function() {
		vis = d3.select("body").selectAll("svg")
			.data(orders)
			.enter().append("svg:svg")
			.attr("width", w + 2 * padding)
			.attr("height", h + 2 * padding)
			.append("svg:g")
			.attr("transform", "translate(" + padding + "," + padding + ")");
	};

	var subscribeClick = function() {
		d3.select("body").selectAll("svg").on('click', function(d,i){
			var clickPoint = d3.mouse(this);

			var newPoint = {
				x: Math.round(clickPoint[0]),
				y: Math.round(clickPoint[1])
			};

			points.push(newPoint);

			bezier = {};
			n = points.length-1;
			orders = d3.range(n+1, n + 2);
			d3.select("body").selectAll("svg").remove();

			main();

		});
	};

	var main = function () {
		createFrame();
		if (points.length >= 3) {
			update();
		}

		vis.selectAll("circle.control")
			.data(function(d) { return points.slice(0, d) })
			.enter().append("svg:circle")
			.attr("class", "control")
			.attr("r", 8)
			.attr("cx", x)
			.attr("cy", y)
			.call(d3.behavior.drag()
				.on("dragstart", function(d) {
					this.__origin__ = [d.x, d.y];
				})
				.on("drag", function(d) {
					d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
					d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
					bezier = {};
					update();
					vis.selectAll("circle.control")
						.attr("cx", x)
						.attr("cy", y);
				})
				.on("dragend", function() {
					delete this.__origin__;
				}));

		subscribeClick();

	};

	function update() {
		//Update
		var interpolation = vis.selectAll("g")
			.data(function(d) { return getLevels(d, t); });
		interpolation.enter().append("svg:g")
			.style("fill", colour)
			.style("stroke", colour);

		var circle = interpolation.selectAll("circle")
			.data(Object);
		circle.enter().append("svg:circle")
			.attr("r", 8);
		circle
			.attr("cx", x)
			.attr("cy", y);

		var path = interpolation.selectAll("path")
			.data(function(level) { return [level]; });
		path.enter().append("svg:path")
			.attr("class", "line")
			.attr("d", line);
		path.attr("d", line);

		var curve = vis.selectAll("path.curve")
			.data(getCurve);
		curve.enter().append("svg:path")
			.attr("class", "curve");
		curve.attr("d", line);
	}


	// Casteljau algorithm
	// Calculates the interpolation points in a level based on previous(Level) interpolated points ,
	// Receives a set of control points (of the previous levels) and t E [0,1]
	// Returns n-1 interpolated controls points
	// r[{x: x1, y: y1}, {x: x2, y: y2}, ...]

	function interpolate(points, _t) {
		if (arguments.length < 2) _t = t;
		var r = [];
		for (var i=0; i<points.length-1; i++) {
			var di = points[i], di_1 = points[i+1];
			r.push({
				x: di.x * (1 - _t) + di_1.x * _t,
				y: di.y * (1 - _t) + di_1.y * _t
			});
		}
		return r;
	}

	// Casteljau algorithm
	// Receives a set of control points and t E [0,1]
	// Returns d levels of interpolated controls points
	function getLevels(d, t_) {
		if (arguments.length < 2) t_ = t;
		var x = [points.slice(0, d)];
		for (var i=1; i<d; i++) {
			x.push(interpolate(x[x.length-1], t_));
		}
		return x;
	}

	function getCurve(d) {

		var curve = bezier[d];
		if (!curve) {
			curve = bezier[d] = [];
			//Draw the curve with the latest control points x[n][0]
			// for t varying
			for (var t_=0; t_<=1; t_+=delta) {
				var x = getLevels(d, t_);
				curve.push(x[x.length-1][0]);
			}
		}
		return [curve.slice(0, t / delta + 1)];
	}

	function x(d) { return d.x-10; }
	function y(d) { return d.y-10; }
	function colour(d, i) {
		return d.length > 1 ? ["#ccc", "yellow", "blue", "green"][i%4] : "red";
	}

	var static = function(event) { event.preventDefault(); }
	document.body.addEventListener('touchmove', static, false);	

	var convexHull = function() {
		var	ind = 0,
			position = [],
			ext = [],
			hull = [];
		

				
		if (points.length < 3) return;
		
		for (var i=1; i<points.length; i++){
			if(ancor.x > points[i].x) {
			ind = i;
			ancor = points[i];			
			}
		}
		console.log(ancor);
		
		for (var i=0; i<points.length; i++){
			position[i] = {				
				angle: calculateAngle(ancor, points[i]),				
				point: points[i]
		}		
	}
	
	
	
	
	
	// guardando a posição do ponto mais extremo para fechar o poligono
	ext = position[ind];	
	
	// Retirar o ponto mais extremo de position
	position.splice(ind, 1); 
		
	position.sort(function(prev, next) {
		return prev.angle - next.angle; 
	});
	
	// porque os resultados dos ângulos estão dando ao contrario do que deveria ser
	position.reverse();
	
	console.log("positioaaaaaaa");
	console.log(position);
	
	// ponto mais extremo para fechar o poligono
	position.push(ext); 	
		
	// inicializando hull com os dois primeiros elementos: j = 1
	// a cada iteração são analisados dois pontos na pilha com 
	hull.push(ancor); 	
	hull.push(position[0].point); 
	
	var prev = hull[0],	
		topo = hull[1],
		next,
		giroEsq,
		x1, x2, x3, y1, y2, y3,
		j = 1; 
				
	for (var i=1; i<position.length; i++) {
				
		next = position[i].point; 
						
		x1 = prev.x;
		x2 = topo.x;
		x3 = next.x;
		y1 = prev.y;
		y2 = topo.y;
		y3 = next.y;
							
		prodVetorial(x1, x2, x3, y1, y2, y3);
		
		// topo é quem esta sendo testado 
		if(giroEsq) {			
			prev = topo;	
		} else {			
			hull.pop(); // retira topo da pilha		
		}
		
		topo = next;
		hull.push(next);			
	}
	console.log("hull final:");
	console.log(hull);

	function calculateAngle (pointA, pointB){
		xA = pointA.x;
		xB = pointB.x;	
		yA = pointA.y;
		yB = pointB.y;
		
		var x, y, angle;
		
		x = xA - xB;
		y = yA - yB;
		
		angle = Math.atan2(x, y);
		
	//	console.log("angle");
	//	console.log(angle);
		
		return angle;
	}
	
	// calcula o produto vetorial para determinar se o o giro foi a esquerda ou direita
	function prodVetorial( x1, x2, x3, y1, y2, y3) {
		giroEsq = false;
		var prod;
			prod = (x2-x1)*(y3-y1)-(y2-y1)*(x3-x1);

			if (prod > 0){
				giroEsq = true;
			}
		}
	};

	return {
		load: main,
		points: points,
		convexHull: convexHull
	}
})();
