const express = require('express');
const router = express.Router();

// Post 모델 불러옴
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema.js');

// create
router.post('/create', (req, res) => {
	const temp = req.body;

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.cummunityNum = doc.communityNum;

			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.write = doc._id;

					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne(
							{ name: 'counter' },
							{ $inc: { communityNum: 1 } }
						).then(() => res.json({ success: true }));
					});
				});
		})
		.catch((err) => console.log(err));
});

// list
router.post('/read', (req, res) => {
	Post.find()
		.populate('writer')
		.exec()
		.then((doc) => {
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

// detail
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.num })
		.populate('writer')
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

// edit
router.post('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
	};

	Post.updateOne({ communityNum: req.body.num }, { $set: temp })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			res.json({ success: false });
		});
});

// delete
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.num })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

module.exports = router;
