exports.register = function(req, res) {
    var body = req.body;
    
    var user_name = body.user_name;
    var user_id = body.user_id;
    var user_pw = body.user_pw;

    console.log(user_name + " " + user_id + " " + user_pw);
}

exports.login = function(req, res) {
    var body = req.body;
    var user_id = body.user_id;
    var user_pw = body.user_pw;

    console.log(user_id + " " + user_pw);
}