import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import { generateMetadataHelper } from '@/common/utils/generateMetadataHelper';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return generateMetadataHelper("/")
}

export default async function Page({ params }: any) {
    console.log(params.route);

    const routePath = Array.isArray(params.route) ? params.route.join('/') : 'about-page';
    const mdFilePath = path.join(process.cwd(), 'content', `${routePath}/index.md`);

    if (!fs.existsSync(mdFilePath)) {
        return notFound();
    }

    const fileContents = fs.readFileSync(mdFilePath, 'utf8');
    const processedContent = await remark().use(html).process(fileContents);
    const contentHtml = processedContent.toString();

    const templatePath = path.join(process.cwd(), 'app/template.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');

    const finalHtml = templateHtml.replace('{{content}}', contentHtml);

    return (
        <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
    );
}
