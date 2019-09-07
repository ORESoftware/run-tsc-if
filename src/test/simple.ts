import * as  rl from '../run-limit';


rl.mapLimit(2,[1, 2, 3], (v, cb) => {
  
  console.log(v);
  
  setTimeout(() => {
    cb(null, v * 2);
  }, 800);
  
  
}, (err, results) => {
  console.log({err, results});
});