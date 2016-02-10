app.get('/getPoints/:clubcard', function (req, res, next) {
  getPoints.findById(req.params.clubcard, function(err, getPoints){
    if(err) res.send(err);
    res.json(getPoints);
  });
});