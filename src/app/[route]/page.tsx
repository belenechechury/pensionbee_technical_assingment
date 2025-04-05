import React from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { generateMetadataHelper } from '@/app/utils/generateMetadataHelper';
import { Metadata } from 'next';
import { Heading } from 'rsuite';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params;
  return generateMetadataHelper(resolvedParams.route);
}

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const routePath = resolvedParams.route;

  const mdFilePath = path.join(process.cwd(), `src/content/${routePath}`, `index.md`);

  if (!fs.existsSync(mdFilePath)) {
    return notFound();
  }

  const fileContents = fs.readFileSync(mdFilePath, 'utf8');

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: Heading,
          a: CustomLink,
        }}
      >
        {fileContents}
      </ReactMarkdown>
    </div>
  );
}
