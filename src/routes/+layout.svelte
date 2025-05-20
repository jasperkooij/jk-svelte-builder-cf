<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<Navbar />
<div class="flex min-h-screen items-center justify-center px-4 py-10">
	<div class="bg-base-100 text-base-content w-full max-w-6xl rounded-xl shadow-lg sm:p-10 md:p-6">
		{@render children()}
	</div>
</div>
<Footer />
