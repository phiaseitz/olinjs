var Topic = require('./../models/topicModel');

var routes = {};

var getQuery = function(status){
	queryJson = {}
	if (status === 'Active') {
		queryJson.completed = false;
	} else if (status === 'Completed') {
		queryJson.completed = true;
	}

	return queryJson;
}

routes.getTopicTitles = function(req, res, next) {
    Topic.find({}, 'id title', function(err, topics) {
        console.log(topics);
        if (err)
            res.send(err);

        res.json(topics); // return all todos in JSON format
    });
}

routes.createTopic = function(req, res, next) {

    // create a todo, information comes from AJAX request from Angular
    Topic.create({
        title : req.body.topic.title,
        content : req.body.topic.content
    }, function(err, topic) {
        if (err)
            res.send(err);

        res.json(topic)
    });

}

routes.getTopic = function (req, res, next){
    console.log(req.query)
    Topic.findById(req.query._id, function(err, topic){
        if (err)
            res.send(err);

        res.send(topic);
    })
}

// routes.toggleTodoCompleted = function(req, res, next) {
//     Todo.find({
//         _id : req.body.todo._id
//     }, function(err, todo) {
//     	todo = todo[0];
//         if (err)
//             res.send(err);
//         todo.completed = !todo.completed;
//         todo.save(function (err, updatedTodo) {
//         	if (err)
//                 res.send(err)
//             var queryJson = getQuery(req.body.status)
// 	        Todo.find(queryJson, function(err, todos) {
// 	            if (err)
// 	                res.send(err)
// 	            res.json(todos);
// 	        });
//         })
//     });

// }

// routes.saveTodo = function (req, res, next) {
// 	console.log(req.body);
// 	Todo.find({
//         _id : req.body._id
//     }, function(err, todo) {
//     	console.log(todo);
//     	todo = todo[0];
//         if (err)
//             res.send(err);
//         console.log(todo);
//         todo.title = req.body.title;
//         todo.save(function (err, updatedTodo) {
//         	res.send(todo);
//         })
//     });
// }

// routes.removeTodo = function(req, res, next){
// 	Todo.remove({
//             _id : req.body.todo._id
//         }, function(err, todo) {
//             if (err)
//                 res.send(err);

//             var queryJson = {};
	
// 			if (req.body.status === 'Active') {
// 				console.log('Active');
// 				queryJson.completed = false;
// 			} else if (req.body.status === 'Completed') {
// 				console.log('Completed');
// 				queryJson.completed = true;
// 			}

//             // get and return all the todos after you remove one
//             Todo.find(queryJson, function(err, todos) {
//                 if (err)
//                     res.send(err)
//                 res.json(todos);
//             });
//         });
// }

routes.home = function(req, res, next) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
}

module.exports = routes;