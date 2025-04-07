import metadata from "@/routesMetadata.json";
import { Metadata } from "next";
import { MetadataMap } from "@/common/types";

export async function generateMetadataHelper(
  path?: string
): Promise<Metadata> {
  let title
  if (path) {
    const pageMetadata = (metadata as MetadataMap)[path];
    title = 'Acme' + (pageMetadata && pageMetadata.title ? ' | ' + pageMetadata.title : '')
  } else {
    title = 'Acme'
  }

  return {
    title,
    openGraph: {
      title,
      type: "website",
    },
    twitter: {
      title,
      card: "summary_large_image"
    }
  };
}
