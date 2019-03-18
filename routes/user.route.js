const userService = require('../services/user.service');


module.exports = (app) => {

    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
            .catch(err => res.end(err));
    });

    app.post('/login', (req, res) => {
        const credentials = req.body;
        userService.login(credentials)
            .then((user) => {
                if (!user) return res.status(401).end();
                req.session.user = user;
                res.json(user)
            })
            .catch(err => res.end(err));
    });

    app.post('/signup', (req, res) => {
        const newUser = req.body;
        console.log(newUser);
        userService.signup(newUser)
            .then(user => {
                req.session.user = user;
                res.json(user);
            })
            .catch(err => res.status(409).end());
    });

    app.post('/logout', (req, res) => {
        req.session.user = null;
        res.end();
    });

}