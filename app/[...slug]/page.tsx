export default function FallbackPage({ params }) {
  return <div>Page "{params.slug.join('/')}" not found or coming soon.</div>;
}
