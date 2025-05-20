export async function GET() {
	const baseUrl = 'https://jasperkooij.com'; // Change to your actual domain
	const builderApiKey = import.meta.env.VITE_PUBLIC_BUILDER_API_KEY;

	// Define a type for the expected page structure
	interface BuilderPage {
		data?: {
			url?: string;
		};
	}

	// Fetch published pages from Builder.io
	const response = await fetch(
		`https://cdn.builder.io/api/v2/content/page?apiKey=${builderApiKey}&limit=100`
	);

	if (!response.ok) {
		return new Response('Failed to fetch pages', { status: 500 });
	}

	const data: { results: BuilderPage[] } = await response.json();

	// Extract unique URLs, ensuring no duplicate homepages
	const urls = new Set<string>();
	urls.add(baseUrl); // Always include homepage

	data.results.forEach((page) => {
		if (page.data?.url) {
			const url = `${baseUrl}${page.data.url}`.replace(/\/$/, ''); // Remove trailing slash
			urls.add(url);
		}
	});

	// Generate XML
	const pagesXml = Array.from(urls)
		.map((url) => `<url><loc>${url}</loc></url>`)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesXml}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
