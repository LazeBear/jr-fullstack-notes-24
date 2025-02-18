const app = require('../../src/app');
const { createTestUser } = require('../helper');
const request = require('supertest');
const Post = require('../../src/models/post.model');
const Hashtag = require('../../src/models/hashtag.model');

describe('Post resource', () => {
  let testUser;
  let authToken;
  beforeEach(async () => {
    const { user, token } = await createTestUser();
    testUser = user;
    authToken = token;
  });

  describe('POST /v1/posts', () => {
    it('should create a new post when authenticated', async () => {
      const postData = {
        title: 'Test title',
        content: 'Test content',
      };

      const res = await request(app)
        .post('/v1/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(postData);

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(postData.title);
      expect(res.body.data.content).toBe(postData.content);
      expect(res.body.data.user).toBe(testUser._id.toString());

      const savedPost = await Post.findById(res.body.data._id);
      expect(savedPost.title).toBe(postData.title);
      expect(savedPost.content).toBe(postData.content);
      expect(savedPost.user.toString()).toBe(testUser._id.toString());
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app)
        .post('/v1/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ content: 'content' });

      expect(res.status).toBe(400);
    });

    it('should create a new post with valide hashtags', async () => {
      const hashtags = ['test', 'test2'];
      const invalidHashtags = ['!tag', '@tag'];
      const postData = {
        title: 'Test title',
        content:
          'Test content' +
          hashtags.map((h) => '#' + h).join(' ') +
          invalidHashtags.map((h) => '#' + h).join(' '),
      };

      const res = await request(app)
        .post('/v1/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(postData);

      expect(res.status).toBe(201);
      expect(res.body.data.hashtags.length).toBe(hashtags.length);

      const hashtagDocs = await Hashtag.find({
        name: { $in: [...hashtags, ...invalidHashtags] },
      });

      expect(hashtagDocs.map((h) => h.name).sort()).toEqual(hashtags.sort());
    });
  });
});
