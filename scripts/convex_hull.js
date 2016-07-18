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
	
