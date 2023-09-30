import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path'; // Import the 'path' module

const app = express();
const port = process.env.PORT || 3000;

// Configure Express to serve static files from the 'assets' directory
const assets = [
  '/dist/public/stylesheets',
  '/node_modules/govuk-frontend/govuk/assets',
  '/node_modules/govuk-frontend',
]
assets.forEach(dir => {
  app.use('/assets', express.static(path.join(process.cwd(), dir)))
})

// Configure Nunjucks
nunjucks.configure([
  'src/views',
  'node_modules/govuk-frontend',
], {
  autoescape: true,
  express: app,
});

app.get('/', (req, res) => {
  // Render the 'index.njk' template
  res.render('index.njk');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});