import { useEffect } from "react";

const SITE_URL = "https://laust.ca";
const DEFAULT_IMAGE = `${SITE_URL}/work/port1.png`;

/**
 * Updates the SEO tags that already exist in index.html rather than rendering
 * new ones.
 *
 * React 19 hoists <meta> rendered from components into <head>, but it does not
 * deduplicate them — rendering <meta name="description"> from a page on top of
 * the static tag in index.html would leave two competing descriptions in the
 * document. Mutating the existing tags keeps exactly one of each, while the
 * static markup stays intact for crawlers that never execute the bundle.
 */
function setMeta(selector, content) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute("content", content);
}

export function useSeo({ title, description, path = "/", image = DEFAULT_IMAGE }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }, [title, description, path, image]);
}

export default useSeo;
