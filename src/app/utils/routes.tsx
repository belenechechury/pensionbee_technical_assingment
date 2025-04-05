import fs from 'fs';
import path from 'path';

export const getRoutes = () => {
  return fs.readdirSync(
      path.resolve(__dirname, '../content'),
      { withFileTypes: true }
    )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};
