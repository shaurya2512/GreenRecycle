// app/[...slug]/page.tsx
import { type Metadata } from "next";

interface FallbackPageProps {
  params: {
    slug: string[];
  };
}

export default function FallbackPage({ params }: FallbackPageProps) {
  return (
    <div>
      Page "{params.slug.join("/")}" not found or coming soon.
    </div>
  );
}

// Optional: prevent search engines from indexing fallback pages
export const metadata: Metadata = {
  robots: "noindex",
};
