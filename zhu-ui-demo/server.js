const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');

var cors = require('koa-cors');
const app = new Koa();
app.use(cors());
const router = new Router();
const upload = multer({
    dest: 'uploads/'
}); // note you can pass `multer` options here

// add a route for uploading multiple files
router.post(
    '/upload',
    upload.fields([{
        name: 'avatar',
        maxCount: 5
    }]),
    ctx => {
        console.log('ctx.request.files', ctx.request.files);
        console.log('ctx.files', ctx.files);
        console.log('ctx.request.body', ctx.request.body);
        console.log(ctx.request.files)
        let r = ctx.request.files.avatar.map(item => ({
                url: item.path,
                name: item.originalname
        }))
        ctx.body = r;
    }
);

(function() {
  dwn = function(a) {
      console.log(a)
  };
  //笛卡尔积
  var Cartesian = function(a, b) {
    var ret = [];
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        ret.push(ft(a[i], b[j]));
      }
    }
    return ret;
  }
  var ft = function(a, b) {
    if (! (a instanceof Array)) a = [a];
    var ret = Array.call(null, a);
    ret.push(b);
    return ret;
  }
  //多个一起做笛卡尔积
  multiCartesian = function(data) {
    var len = data.length;
    if (len == 0) return [];
    else if (len == 1) return data[0];
    else {
      var r = data[0];
      for (var i = 1; i < len; i++) {
        r = Cartesian(r, data[i]);
      }
      return r;
    }
  }
})();
var data = [['a', 'b', 'c'], [1, 2, 3, 4], ['A', 'B'], ['#', '@', '+'], ['Mary', 'Terry', 'KYO']];
var r = multiCartesian(data);
for (var i = 0; i < r.length; i++) {
  dwn("(" + r[i] + ")");
}