const express = require("express");

const router = express.Router();

const Posts = require("./userDb.js");

router.post("/", (req, res) => {
  const postData = req.body;
  Posts.insert(postData)
    .then(user => {
      res.status(201).json({ messsage: `${user.name} has been created` })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.get("/", validateUser, (req, res) => {
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/posts", validatePost, (req, res) => {
  Posts.getUserPosts(req.params.id)
    .then(comment => {
      if (!comment) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Posts.update(id, changes)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!changes.title || !changes.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});


//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params.id;
  Posts.getById(id)
  .then(user => {
    if (!user) {
      res.status(400).json({ message: "missing user data" })
    } else {
      res.status(200).json(req.user)
      next();
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500)
  })
}

function validateUser(req, res, next) {
  const body = req.body;

  if (!body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const data = req.body;

  if (!data) {
    res.status(400).json({ message: "missing post data" })
  } else if (!data.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }
}

module.exports = router;
