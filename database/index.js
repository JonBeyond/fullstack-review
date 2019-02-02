const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gitrepos');

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

let save = (newRepos) => {
  newRepos.forEach((repo) => {
    Repo.update({'id': repo.id}, repo, {upsert: true}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

let retrieve = (callback) => {
  return new Promise((resolve,reject) => {
    Repo.find((err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

let purge= () => {
  //delete all items in the database?
}

module.exports.save = save;
module.exports.retrieve = retrieve;