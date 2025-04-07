import fs from 'fs';
import path from 'path';

export const getRoutes = () => {
  return fs.readdirSync(
      path.resolve(process.cwd(), process.env.CONTENT_PATH || 'src/content'),
      { withFileTypes: true }
    )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};
