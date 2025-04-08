import fs from 'fs';
import path from 'path';

export const getRoutes = (dirPath: string = process.env.CONTENT_PATH || 'src/content'): string[] => {
  const entries = fs.readdirSync(path.resolve(process.cwd(), dirPath), { withFileTypes: true });

  return entries.reduce<string[]>((directories, dirent) => {
    const fullPath = path.resolve(process.cwd(), dirPath, dirent.name);

    if (dirent.isDirectory()) {
      // Recursively check subdirectories
      directories = directories.concat(getRoutes(fullPath));
    } else if (dirent.isFile() && dirent.name.endsWith('.md')) {
      // If it's a markdown file, add the parent directory
      const parentDir = path.dirname(fullPath).split((process.env.CONTENT_PATH || 'src/content') + '/')[1];
      if (!directories.includes(parentDir)) {
        directories.push(parentDir);
      }
    }

    return directories;
  }, []);
};

