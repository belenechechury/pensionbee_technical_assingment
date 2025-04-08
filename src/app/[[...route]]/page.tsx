import React from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  let fileContents = fs.readFileSync(mdFilePath, 'utf8');

  fileContents = fileContents.replace(
    /(?<!\])(?<!\))\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})\b/g,
    '[$1](mailto:$1)'
  );

  const renderers = {
    h1: (props: any) => <Heading level={1} {...props} />,
    h2: (props: any) => <Heading level={2} {...props} />,
    h3: (props: any) => <Heading level={3} {...props} />,
    a: ({ href, children }: any) => {
      const isEmail = href?.startsWith('mailto:');
      return (
        <a
          href={href}
          className={`text-[#f9c000] underline hover:text-[#ad8500] ${isEmail ? 'font-medium' : ''}`}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        components={renderers}
        remarkPlugins={[remarkGfm]}
      >
        {fileContents}
      </ReactMarkdown>
    </div>
  );
}
