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
      console.log('doc updated/created successfully');
    });
  });
}

module.exports.save = save;

/*
var query = {'username':req.user.username};
req.newData.username = req.user.username;
MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});








Create:
Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});




Overwriting:

Tank.findById(id, function (err, tank) {
  if (err) return handleError(err);
  // Now `otherTank` is a copy of `tank`
  otherTank.set(tank);
});









*/