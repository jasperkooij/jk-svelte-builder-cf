<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		function handleZarazConsent() {
			const zaraz = (window as any).zaraz;
			const zarazData = (window as any).zarazData;

			if (!zaraz || !zarazData || !zarazData.location) {
				console.warn('[Zaraz] Location unavailable. Showing modal as fallback.');
				zaraz.consent.modal = true;
				return;
			}

			const isEU = zarazData.location.isEUCountry === '1';
			if (isEU) {
				console.log('[Zaraz] EU country detected. Showing modal.');
				zaraz.consent.modal = true;
			} else {
				console.log('[Zaraz] Non-EU visitor. Auto-consenting.');
				zaraz.consent.setAll(true);
				zaraz.consent.sendQueuedEvents();
			}
		}

		if ((window as any).zaraz?.consent?.APIReady) {
			handleZarazConsent();
		} else {
			document.addEventListener('zarazConsentAPIReady', handleZarazConsent);
		}
	});


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
