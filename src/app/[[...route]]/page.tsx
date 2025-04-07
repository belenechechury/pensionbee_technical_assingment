import React from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateMetadataHelper } from '@/app/utils/generateMetadataHelper';
import Heading from '@/app/components/Heading';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params;
  return generateMetadataHelper(resolvedParams.route);
}

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const routePath = resolvedParams.route;

  const mdFilePath = path.join(process.cwd(), `src/content/${routePath.join('/')}`, `index.md`);

  if (!fs.existsSync(mdFilePath)) {
    return notFound();
  }

  const fileContents = fs.readFileSync(mdFilePath, 'utf8');

  const renderers = {
    h1: (props: any) => <Heading level={1} {...props} />,
    h2: (props: any) => <Heading level={2} {...props} />,
    h3: (props: any) => <Heading level={3} {...props} />,
  };

  return (
    <div>
      <ReactMarkdown components={renderers}>
        {fileContents}
      </ReactMarkdown>
    </div>
  );
}
