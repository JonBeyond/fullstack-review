const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gitrepos');

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    index: true, //makes scanning quicker
    unique: true //prevents duplicate copies of a repo.
  },
  full_name: String,
  url: String,
  owner_name: String,
  owner_url: String,
  size: Number,
  createdAt: Date,
  updatedAt: Date,
  description: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;