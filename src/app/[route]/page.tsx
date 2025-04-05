import React from 'react';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import { generateMetadataHelper } from '@/common/utils/generateMetadataHelper';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { route: string } }): Promise<Metadata> {
    const resolvedParams = await params 

    return generateMetadataHelper(resolvedParams.route);
}

export default async function Page({ params }: { params: {route: string} }) {
    const resolvedParams = await params 

    const routePath = resolvedParams.route;

    const mdFilePath = path.join(process.cwd(), `src/content/${routePath}`, `index.md`);

    if (!fs.existsSync(mdFilePath)) {
        return notFound();
    }

    const fileContents = fs.readFileSync(mdFilePath, 'utf8');
    const processedContent = await remark().use(html).process(fileContents);
    const contentHtml = processedContent.toString();

    const templatePath = path.join(process.cwd(), 'src/template.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');

    const finalHtml = templateHtml.replace('{{content}}', contentHtml);

    return (
        <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
    );
}
