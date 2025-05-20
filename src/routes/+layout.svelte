<script lang="ts">
	import { onMount } from 'svelte';

	// Optional: You can extract this to a type declaration file for better reusability
	type Zaraz = {
		location?: {
			isEUCountry?: boolean;
		};
		consent: {
			modal?: boolean;
			APIReady?: boolean;
			setAll: (value: boolean) => void;
			sendQueuedEvents: () => void;
		};
	};

	declare global {
		interface Window {
			zaraz?: Zaraz;
		}
	}

	onMount(() => {
		const getCookie = (name: string): string | undefined => {
			const value = `; ${document.cookie}`;
			return value.split(`; ${name}=`)[1]?.split(';')[0];
		};

		const waitForZarazLocation = (retries = 10): void => {
			const consent_cookie = getCookie('cf_consent');
			if (consent_cookie) return;

			const zaraz = window.zaraz;
			if (!zaraz?.consent) return;

			if (zaraz.location && typeof zaraz.location.isEUCountry === 'boolean') {
				if (zaraz.location.isEUCountry) {
					console.log('[Zaraz] EU detected. Showing consent modal.');
					zaraz.consent.modal = true;
				} else {
					console.log('[Zaraz] Non-EU. Auto-consenting.');
					zaraz.consent.setAll(true);
					zaraz.consent.sendQueuedEvents();
				}
			} else if (retries > 0) {
				setTimeout(() => waitForZarazLocation(retries - 1), 200);
			} else {
				console.warn('[Zaraz] Location unavailable. Showing consent modal as fallback.');
				zaraz.consent.modal = true;
			}
		};

		if (window.zaraz?.consent?.APIReady) {
			waitForZarazLocation();
		} else {
			document.addEventListener('zarazConsentAPIReady', () => waitForZarazLocation());
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
