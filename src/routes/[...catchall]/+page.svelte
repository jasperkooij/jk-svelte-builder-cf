<script>
	import { isPreviewing, Content } from '@builder.io/sdk-svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';

	const apiKey = import.meta.env.VITE_PUBLIC_BUILDER_API_KEY;
	const model = 'page';

	// this data comes from the function in `+page.server.js`, which runs on the server only
	export let data;

	// show unpublished content when in preview mode.
	const canShowContent = data.content || isPreviewing();
</script>

<svelte:head>
	<title>{data.content.data.title} | Jasper Kooij</title>
	<meta name="description" content={data.content.data.description} />
</svelte:head>

<main>
	<!-- TO DO: Add your Public API Key in <Content/>-->
	{#if canShowContent}
		<Content {model} content={data.content} {apiKey} />
	{:else}
		Content Not Found
	{/if}
	<section class="bg-white py-12">
		<div class="container mx-auto px-4">
			<ContactForm />
		</div>
	</section>
</main>
