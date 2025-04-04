import metadata from "@/routesMetadata.json";
import { Metadata } from "next";
import { MetadataMap } from "@/common/types";

export async function generateMetadataHelper(
  path: string
): Promise<Metadata> {
  const meta = metadata as MetadataMap;
  const pageTitle = `Acme | ${meta[path].title}`

  return {
    title: pageTitle,
    openGraph: {
      title: pageTitle,
      type: "website",
    },
    twitter: {
      title: pageTitle,
      card: "summary_large_image"
    }
  };
}
