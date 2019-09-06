
import rl from '../run-limit';


rl([1,2,3], 2, (v, cb) => {
  
  setTimeout(() => {
  
    console.log(v);
    cb(null, v*2);
    
  }, 800);
  
  
}, (err, results) => {
  
  console.log({err,results});

});