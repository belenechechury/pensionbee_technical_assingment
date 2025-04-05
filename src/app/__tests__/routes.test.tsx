import Page from '@/app/[route]/page';
import { render, screen, waitFor } from '@testing-library/react';
import path from 'path';
import type fsType from 'fs';

const actualFs: typeof fsType = require('fs');
const existingRoutes = actualFs.readdirSync(
    path.resolve(__dirname, '../../content'),
    { withFileTypes: true }
)
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

jest.mock('fs', () => {
  const actualFs: typeof fsType = jest.requireActual('fs');
  return {
    ...actualFs,
    existsSync: jest.fn(),
    readFileSync: (): string => '<div>{{content}}</div>',
};
});

import fs from 'fs';

jest.mock('remark', () => {
    return {
      remark: () => ({
        use: () => ({
          process: async () => ({
            toString: () : string => '<h1>Title</h1><div>Content</div>',
          }),
        }),
      }),
    };
  });  

describe('Page', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
  });

  existingRoutes.forEach((route: string) => {
    it(`should return 200 for existing route ${route}`, async () => {
      const params = { route };

      const PageComponent = await Page({ params });
      render(PageComponent);   

      expect(await screen.findByText('Title')).toBeInTheDocument();
      expect(await screen.findByText('Content')).toBeInTheDocument();
    });
  });

  // it('should return 404 for non-existing route', async () => {
  //   const params = { route: 'non-existing-route' };
  //   jest.spyOn(fs, 'existsSync').mockReturnValue(false);
  //
  //   const notFoundMock = jest.spyOn(require('next/navigation'), 'notFound').mockImplementation(() => {});
  //
  //   await waitFor(() => render(<Page params={params} />));
  //   expect(notFoundMock).toHaveBeenCalled();
  //   expect(await screen.findByText('Page Not Found')).toBeInTheDocument();
  // });
});
