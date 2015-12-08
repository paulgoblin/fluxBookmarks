var express = require('express');
var router = express.Router();

var links = [];

router.post('/api/links/fav/:id', function(req, res, next) {
  var ip = req.ip;
  var link = links.find( link => link.id == req.params.id);
  if (link === undefined) {
    console.log("no link found");
    res.json({ links: links });
    return;
  };
  if (!link.favs) link.favs = [];
  var hasFavIndex = link.favs.indexOf(ip);
  (hasFavIndex === -1) ?  link.favs.push(ip) : link.favs.splice(hasFavIndex,1);
  res.json({ links: links });
});
router.post('/api/links/delete/:id', function(req, res, next) {
  var newLinks = links.filter( link => link.id != req.params.id)
  console.log('links in route', newLinks);
  res.json({ links: newLinks });
});

router.get('/api/links', function(req, res, next) {
  console.log("sending your ip", req.ip);
   res.json({ links: links, yourIp: req.ip });
});

router.post('/api/links', function(req, res, next) {
   var newLink = req.body;
   newLink.id = Date.now();
   links.push(newLink);
   res.json(newLink);
});

module.exports = router;
