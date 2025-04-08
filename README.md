# 📝 Static Content CMS MVP
A simple full-stack JavaScript markdown-powered CMS that dynamically serves pages based on folder structure, built with Next.js, React, and TailwindCSS.

## 🚀 Overview
This app serves static content pages by combining:

- 📁 A folder-based content structure (/content)
 
- 📝 Markdown files (index.md) for page content
 
- 🧩 A single template.html with a {{content}} placeholder
 
- ⚛️ React + TailwindCSS frontend rendered with react-markdown
 
- ✅ You can add new content by simply creating folders and markdown files — no code required.
 
## 📦 Project Structure
```
/src
    /app
        /[...route].tsx      # Dynamic page renderer
    /__tests__
        ...
    /components
        ...
    /utils
        ...
    /content
        /route
            index.md
        /other
            /route
            index.md
    /template.html
```

## 📖 Usage Instructions

### 🧑‍💻 Local Development
```
npm install
npm run dev
```

Visit http://localhost:3000

### 🏗 Build for Production
```
npm run build
npm run start
```

## 🧪 Testing
Run all tests:
```
npm test
```

## 🧰 Tech Stack
- Next.js
 
- React
 
- TailwindCSS
 
- React-Markdown
 
- Remark Plugins
 
- Jest & React Testing Library

## 🛠 Add New Content
Simply create a folder and place an index.md inside:
i.e. `/content/new-page/index.md`

The new view will be available at http://localhost:3000/new-page


## 🎨 Styling
TailwindCSS used throughout.

Custom brand colors configured in tailwind.config.ts. 

## 🔧 Iterating & Evolving
Here are suggestions to evolve this MVP:

### 🛠 Admin Interface
Add a simple content management UI so non-devs can:

- Create / edit / delete markdown content (specially blogs)

- Upload files

- Save content as drafts

- Manage metadata (title, slug, publish date)

###💡 Custom Markdown Components
Such as `src/app/components/Heading.tsx`, create custom component to use along with `react-markdown` to enrich content.

### 📈 SEO Optimization
Improve search visibility by:

- Adding <title> and <meta> tags dynamically

- Including Open Graph tags for social sharing

Adding structured data (JSON-LD)

- Creating robots.txt and sitemap.xml (check `next-sitemap`)

- Optimizing accessibility (ARIA, contrast, alt tags)

- Configuring canonical URLs