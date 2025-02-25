const Post = require('./Post');

class PostController {
  async getAllPosts(req, res) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching posts' });
    }
  }

  async createPost(req, res) {
    try {
      const { title, content, author } = req.body;
      const post = await Post.create({ title, content, author });
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
    }
  }

  async getPostById(req, res) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      } else {
        res.json(post);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching post' });
    }
  }
}

module.exports = PostController;