import React from 'react';
import Page from '@/app/[[...route]]/page';
import { render, screen } from '@testing-library/react';

// Mock ReactMarkdown component as it’s used in the Page component
jest.mock('react-markdown', () => (props: any) => <div>{props.children}</div>); // Simple mock for testing

jest.mock('remark-gfm', () => {
  return () => ({
    // This mock function ensures that it can be "used" by remark
    // but doesn't add any additional processing to the markdown.
    // It essentially acts as a no-op for testing.
  });
});

// Mock the fs module with explicit types for mock functions
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
import { getRoutes } from '../utils/routes';

// Define existingRoutes after mocking fs
const existingRoutes = getRoutes().map((r) => r.split('/'))

// Mock remark processing (markdown to HTML conversion)
jest.mock('remark', () => {
  return {
    remark: () => ({
      use: () => ({
        process: async () => {
          return {
            toString: (): string => '<div>Content</div>',
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

  existingRoutes.forEach((route: string[]) => {
    it(`should return 200 for existing route ${route}`, async () => {
      const params = { route };

      // Mock the fs.readFileSync to return content based on the route
      const mockFileContent = `Content for route ${route.join('/')}`;
      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockFileContent);

      const PageComponent = await Page({ params });
      render(PageComponent);

      // Verify that the expected content is in the document
      expect(await screen.findByText(`Content for route ${route.join('/')}`)).toBeInTheDocument();
    });
  });

  it('should return 404 for non-existing route', async () => {
    const params = { route: ['non-existing-route'] };
    jest.spyOn(fs, 'existsSync').mockReturnValue(false); // Mock that the route doesn't exist

    // Mock the notFound function
    const notFoundMock = jest.spyOn(require('next/navigation'), 'notFound').mockImplementation(() => {});

    const PageComponent = await Page({ params });
    render(PageComponent);

    // Verify that notFound was called
    expect(notFoundMock).toHaveBeenCalled();
  });
});
