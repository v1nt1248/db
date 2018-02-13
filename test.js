const app = require('express')();

app.use((req, res, next) => {
  console.log(`\n\nALWAYS`);
  next();
});
app.get('/a', (req, res) => {
  console.log(`/a: the route is completed`);
  res.send('a');
});
app.get('/a', (req, res) => {
  console.log(`/a: never called`);
});
app.get('/b', (req, res, next) => {
  console.log(`/b: the route don't coplete`);
  next();
});
app.use((req, res, next) => {
  console.log('REARLY');
  next();
});
app.get('/b', (req, res, next) => {
  console.log(`/b (part 2): the error is generated`);
  throw new Error (`b isn't completed`);
});
app.use('/b', (err, req, res, next) => {
  console.log(`/b The error has detected and has transmitted next`);
  next(err);
});
app.get('/c', (err, req) => {
  console.log(`/c: the error is generated`);
  throw new Error(`c isn't completed`);
});
app.use('/c', (err, req, res, next) => {
  console.log(`/c: the error is detected but hasn't transmitted next`);
  next();
});
app.use((err, req, res, next) => {
  console.log(`An unhandled error is detected: ${err.message}`);
  res.send(`500 - Internal Server Error`);
});
app.use((req, res) => {
  console.log(`A route isn't handled`);
  res.send(`404 - Not Found`);
});

app.listen(3000, () => {
  console.log(`Listening at port 3000!`);
});
