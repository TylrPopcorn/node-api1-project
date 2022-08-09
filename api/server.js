// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model")

const server = express();
server.use(express.json())

server.put('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                const updatedUser = await User.update(req.params.id, req.body)
                res.status(200).json(updatedUser)
            }
        }

    } catch (err) {
        res.status(500).json({
            message: "error updating user",
            err: err.message,
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const UserMaybe = await User.findById(req.params.id)
        //console.log(userMaybe)
        if (!UserMaybe) {
            res.status(404).json({
                message: "The user with the speccified ID does not exist"
            })
        } else {
            const deleteU = await User.remove(UserMaybe.id)
            res.status(200).json(deleteU)
        }
    } catch (err) {
        res.status(505).json({
            message: 'error creating user',
            err: err.message,
        })
    }
})

server.post("/api/users", (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    } else {
        User.insert(user)
            .then(val => {
                // console.log(val)
                res.status(201).json(val)
            })
            .catch(err => {
                res.status(500).json({
                    message: "error creating user",
                    err: err.message,
                })
            })
    }
})

server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
                stack: err.stack,
            })
        })
})

server.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
            })
        })
})

server.use("*", (req, res) => {
    res.status(404).json({
        message: "Not found."
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
