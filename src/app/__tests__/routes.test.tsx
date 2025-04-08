import Page from '@/app/[[...route]]/page';
import { render, screen } from '@testing-library/react';
import path from 'path';

// Mock the fs module first with explicit types for mock functions
jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs'); // Get the actual fs module

  return {
    ...actualFs, // Preserve the original fs methods
    existsSync: jest.fn(),
    readFileSync: jest.fn().mockReturnValue('<div>{{content}}</div>'), // Mocked readFileSync
  };
});

// Import fs after mocking
import fs from 'fs';

// Define existingRoutes after mocking fs
const existingRoutes = fs.readdirSync(
  path.resolve(__dirname, '../../content'),
  { withFileTypes: true }
)
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Mock remark processing
jest.mock('remark', () => {
  return {
    remark: () => ({
      use: () => ({
        process: async () => {
          return {
            // Explicitly annotate the return type of toString as 'string'
            toString: (): string => '<h1>Title</h1><div>Content</div>', // Now it has a type annotation
          };
        },
      }),
    }),
  };
});

// Mock next/navigation notFound method
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Page', () => {
  beforeAll(() => {
    // Ensure the existsSync mock is used
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
  });

  existingRoutes.forEach((route: string) => {
    it(`should return 200 for existing route ${route}`, async () => {
      const params = { route };

      const PageComponent = await Page({ params });
      render(PageComponent);

      // Verify that the expected content is in the document
      expect(await screen.findByText('Title')).toBeInTheDocument();
      expect(await screen.findByText('Content')).toBeInTheDocument();
    });
  });

  it('should return 404 for non-existing route', async () => {
    const params = { route: 'non-existing-route' };
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    // Mock the notFound function
    const notFoundMock = jest.spyOn(require('next/navigation'), 'notFound').mockImplementation(() => {});

    const PageComponent = await Page({ params });
    render(PageComponent);

    // Verify that notFound was called
    expect(notFoundMock).toHaveBeenCalled();
  });
});
