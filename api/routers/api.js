var request = require('request').defaults({ encoding: null });

//Dependencies - Express 4.x and the MySQL Connection
module.exports = (express, connection) => {
	var router      = express.Router();

	// Router Middleware
	router.use((req, res, next) => {
	    // log each request to the console
	    console.log("You have hit the /api", req.method, req.url);

	    // Remove powered by header
	    //res.set('X-Powered-By', ''); // OLD WAY
	    //res.removeHeader("X-Powered-By"); // OLD WAY 2
	    // See bottom of script for better way

	    // CORS 
	    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	    // we can use this later to validate some stuff

	    // continue doing what we were doing and go to the route
	    next();
	});

	// API ROOT - Display Available Routes
	router.get('/', (req, res) => {
/*		//TODO: THIS NO LONGER WORKS BECAUSE WE MOVE THE ROUTES INTO A SEPARATE FILE, UNLESS I PASS IN APP AS WELL
	    //Generate a List of Routes on the APP
	    //http://stackoverflow.com/a/28199817
	    var route, routes = [];
	    app._router.stack.forEach((middleware) => {
	        if(middleware.route){ // routes registered directly on the app
	            routes.push(middleware.route);
	        } else if(middleware.name === 'router'){ // router middleware 
	            middleware.handle.stack.forEach((handler) => {
	                route = handler.route;
	                route && routes.push(route);
	            });
	        }
	    });
	    console.log(routes)
*/
	    res.jsonp({
	        name: 'Panorama API', 
	        version: '1.0',
//	        routes: routes // TODO: format this better, after above is fixed
	    });

	});

	// Simple MySQL Test
	router.get('/test', (req, res) => {
	    var test;
	    
	    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
	        if (err) throw err;

	        test = rows[0].solution;

	        res.jsonp({
	            'test': test
	        });
	    }); 
	});

	// http://www.restapitutorial.com/lessons/httpmethods.html
	// POST - Create
	// GET - Read
	// PUT - Update/Replace - AKA you pass all the data to the update
	// PATCH - Update/Modify - AKA you just pass the changes to the update
	// DELETE - Delete

	// COLLECTION ROUTES
	router.route('/stores')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
	        console.log(req.body)
	        var query = connection.query('INSERT INTO stores SET ?', [data], (err, result) => {
	            if(err){
	                console.error(err);
	                res.sendStatus(404);
	            }else{
					let response = {};
					response.storeId = result.insertId;
					res.jsonp(response);
	                res.end();
	            }
	        });
	        console.log(query.sql);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM stores', (err, rows, fields) => {
	            if (err) console.error(err);

	            res.jsonp(rows);
	        });
	        console.log(query.sql);
	    })

	    //We do NOT do these to the collection
	    .put((req, res) => {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch((req, res) => {
	        res.sendStatus(404);
	    })
	    .delete((req, res) => {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
	    });
	//end route

	router.route('/stores/search/:query')

	.get((req, res) => {
		var query = connection.query("SELECT * FROM stores WHERE storeName LIKE '%"+ req.params.query +"%'",[req.params.query], (err, rows, fields) => {
			if (err) console.error(err);

			res.jsonp(rows);
		});
		console.log(query.sql);
	});

	// SPECIFIC ITEM ROUTES
	router.route('/stores/:id')

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM stores WHERE storeId=?', [req.params.id], (err, rows, fields) => {
	            if (err) {
	                //INVALID
	                console.error(err);
	                res.sendStatus(404);
	            }else{
					var productQuery = connection.query('SELECT p.productId, p.storeId, p.perUnitPrice, p.guessedName, p.correctedName, p.categoryId, c.categoryName as category, q.quantityType  FROM products p LEFT JOIN categories c ON c.categoryId = p.categoryId LEFT JOIN quantityTypes q on q.quantityTypeId = p.quantityTypeId WHERE p.storeId=?', [req.params.id], (err, productRows, fields) => {
						if(rows.length){
							let response = {store: rows[0], products: productRows}
							res.jsonp(response);
						}else{
							//ID NOT FOUND
							res.sendStatus(404);
						}
					});
	            }
	        });
	        console.log(query.sql);
	    })

	    .put((req, res) => {
	        var data = req.body;
	        var query = connection.query('UPDATE stores SET ? WHERE storeId=?', [data, req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(400);
	            }else{
	                res.status(200).jsonp({changedRows:result.changedRows, affectedRows:result.affectedRows}).end();
	            }
	        })
	        console.log(query.sql)
	    })

	    .patch((req, res) => {
	        // Need to decide how much this should differ from .put
	        //in theory (hmm) this should require all the fields to be present to do the update?
	    })

	    .delete((req, res) => {
	        //LIMIT is somewhat redundant, but I use it for extra sanity, and so if I bungle something I only can break one row.
	        var query = connection.query('DELETE FROM panos WHERE id=? LIMIT 1', [req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({affectedRows:result.affectedRows}).end();
	            }
	        });
	        console.log(query.sql)
	    });
	//end route

	// Bill Images
	router.route('/receipts')

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM storeReciepts WHERE isProcessed=0', (err, rows, fields) => {
	            if (err) {
	                //INVALID
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                if(rows.length){
	                    res.jsonp(rows);
	                }else{
	                    //ID NOT FOUND
	                    res.sendStatus(404);
	                }
	            }
	        });
	        console.log(query.sql);
	    })
	//end route

	router.route('/products')

	.get((req, res) => {
		var query = connection.query('SELECT p.productId, p.storeId, p.perUnitPrice, p.guessedName, p.correctedName, p.categoryId, c.categoryName as category, q.quantityType  FROM products p LEFT JOIN categories c ON c.categoryId = p.categoryId LEFT JOIN quantityTypes q on q.quantityTypeId = p.quantityTypeId', (err, rows, fields) => {
			if (err) {
				//INVALID
				console.error(err);
				res.sendStatus(404);
			}else{
				if(rows.length){
					res.jsonp(rows);
				}else{
					//ID NOT FOUND
					res.sendStatus(404);
				}
			}
		});
		console.log(query.sql);
	})

	//we can use .route to then hook on multiple verbs
	.post((req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		console.log(req.body)
		var query = connection.query('INSERT INTO products SET ?', [data], (err, result) => {
			if(err){
				console.error(err);
				res.sendStatus(404);
			}else{
				res.status(201);
				res.location('/api/products/' + result.insertId);
				res.end();
			}
		});
		console.log(query.sql);
	})

	router.route('/products/search/:query')

	.get((req, res) => {
		var query = connection.query("SELECT s.storeName, s.storeAddress, p.productId, p.storeId, p.perUnitPrice, p.guessedName, p.correctedName, p.categoryId, c.categoryName as category, q.quantityType  FROM products p \
		LEFT JOIN categories c ON c.categoryId = p.categoryId \
		LEFT JOIN quantityTypes q on q.quantityTypeId = p.quantityTypeId \
		LEFT JOIN stores s on s.storeId = p.storeId \
		WHERE p.correctedName like '%"+req.params.query + "%' ", (err, rows, fields) => {
			if (err) {
				//INVALID
				console.error(err);
				res.sendStatus(404);
			}else{
				if(rows.length){
					res.jsonp(rows);
				}else{
					//ID NOT FOUND
					res.jsonp([]);
				}
			}
		});
		console.log(query.sql);
	})


	router.route('/categories')

	.get((req, res) => {
		var query = connection.query('SELECT * FROM categories', (err, rows, fields) => {
			if (err) {
				//INVALID
				console.error(err);
				res.sendStatus(400);
			}else{
				if(rows.length){
					res.jsonp(rows);
				}else{
					//ID NOT FOUND
					res.sendStatus(400);
				}
			}
		});
		console.log(query.sql);
	})

	//we can use .route to then hook on multiple verbs
	.post((req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		console.log(req.body)
		var query = connection.query('INSERT INTO categories SET ?', [data], (err, result) => {
			if(err){
				console.error(err);
				res.sendStatus(404);
			}else{
				res.status(201);
				res.location('/api/categories/' + result.insertId);
				res.end();
			}
		});
		console.log(query.sql);
	})

	router.route('/quantityTypes')

	.get((req, res) => {
		var query = connection.query('SELECT * FROM quantityTypes', (err, rows, fields) => {
			if (err) {
				//INVALID
				console.error(err);
				res.sendStatus(400);
			}else{
				if(rows.length){
					res.jsonp(rows);
				}else{
					//ID NOT FOUND
					res.sendStatus(400);
				}
			}
		});
		console.log(query.sql);
	})

	router.route('/analyze')

	//we can use .route to then hook on multiple verbs
	.post((req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		console.log(req.body)
		request.get(req.body.image, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				data = new Buffer(body).toString('base64');
				var jsonDataObj = {
					"requests": [
						{
						"image": {
							"content": data
						},
						"features": [
							{
							"type": "TEXT_DETECTION"
							}
						]
						}
					]
				};
				request.post({
					url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDGiDeZBBB77ekcUMY5VxhB8VXdTTdltko',
					body: jsonDataObj,
					json: true
				}, function(error, response, body){
					res.jsonp(body);
					res.end();
				});
			}
		});

	})


	router.route('/analyze2')

	//we can use .route to then hook on multiple verbs
	.post((req, res) => {
		var data = req.body; // maybe more carefully assemble this data
		var jsonDataObj = {
			"image": data.image
		};
		console.log(jsonDataObj);
		request.post({
			url: 'http://34.93.117.224',
			body: jsonDataObj,
			json: true
		}, function(error, response, body){
			console.log(body);
			request.get(body.image, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					data = new Buffer(body).toString('base64');
					var jsonDataObj = {
						"requests": [
							{
							"image": {
								"content": data
							},
							"features": [
								{
								"type": "TEXT_DETECTION"
								}
							]
							}
						]
					};
					request.post({
						url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDGiDeZBBB77ekcUMY5VxhB8VXdTTdltko',
						body: jsonDataObj,
						json: true
					}, function(error, response, body){
						res.jsonp(body);
						res.end(); 
					});
				}
			});
		});
	});
//end route

	return router;
};