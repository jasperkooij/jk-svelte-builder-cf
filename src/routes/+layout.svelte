<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const interval = setInterval(() => {
			const zaraz = (window as any).zaraz;
			const zarazData = (window as any).zarazData;

			if (zaraz?.consent && zarazData?.location) {
				clearInterval(interval);

				const isEUCountry = zarazData.location.isEUCountry === '1';
				const consentCookie = getCookie('cf_consent');

				if (!consentCookie) {
					if (isEUCountry) {
						console.log('[Zaraz] EU detected. Showing consent modal.');
						zaraz.consent.modal = true;
					} else {
						console.log('[Zaraz] Not EU. Auto-consenting.');
						zaraz.consent.setAll(true);
						zaraz.consent.sendQueuedEvents();
					}
				}
			}
		}, 300);
	});

	function getCookie(name: string): string | undefined {
		const value = `; ${document.cookie}`;
		return value.split(`; ${name}=`)[1]?.split(';')[0];
	}

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
