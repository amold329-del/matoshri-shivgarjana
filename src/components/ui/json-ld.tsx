/**
 * Renders a schema.org block. Accepts one object or an array (an array emits
 * one <script> per item, which is what Google expects for multiple Events).
 *
 * Note: `type="application/ld+json"` is a data block, not an executable script,
 * so CSP `script-src` does not apply to it.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
