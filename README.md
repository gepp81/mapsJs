
MongDB script

db.points.find({location:{$near :       [ long,lat ] ,  $maxDistance: 0.1/111.12}})
db.points.createIndex({location:"2d"})
