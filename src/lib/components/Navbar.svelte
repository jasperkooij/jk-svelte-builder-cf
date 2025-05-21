<script>
	import { onMount } from 'svelte';
	let isDark = false;
	let isOpen = false;

	onMount(() => {
		const theme = localStorage.getItem('theme') ?? 'light';
		isDark = theme === 'dark';
		document.documentElement.setAttribute('data-theme', theme);

		// Handle Escape key to close menu
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	});

	function toggleTheme() {
		isDark = !isDark;
		const theme = isDark ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	function closeMenu() {
		isOpen = false;
	}

	function handleEscape(event) {
		if (event.key === 'Escape') closeMenu();
	}
</script>

<!-- NAV -->
<nav class="navbar bg-base-100 z-50 shadow-md" aria-label="Main navigation">
	<div class="flex-1">
		<a href="/" class="flex items-center gap-2">
			<img
				src="/logo.svg"
				alt="Jasper Kooij logo"
				class="h-8 w-8"
				loading="eager"
				fetchpriority="high"
			/>
			<span class="text-lg font-bold">Jasper Kooij</span>
		</a>
	</div>

	<!-- DESKTOP NAV -->
	<div class="hidden items-center gap-4 lg:flex">
		<a href="/" class="btn btn-ghost">Home</a>
		<a href="/about" class="btn btn-ghost">About</a>
		<a href="/contact" class="btn btn-ghost">Contact</a>

		<!-- THEME TOGGLE -->
		<label
			class="flex cursor-pointer items-center gap-2"
			for="theme-toggle-desktop"
			aria-label="Toggle light and dark theme"
		>
			<svg width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="5" />
				<path
					d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
				/>
			</svg>
			<input
				id="theme-toggle-desktop"
				type="checkbox"
				class="toggle theme-controller bg-none"
				on:change={toggleTheme}
				bind:checked={isDark}
				data-toggle-theme="light,dark"
				role="switch"
				aria-checked={isDark}
			/>
			<svg width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>
		</label>
	</div>

	<!-- MOBILE HAMBURGER -->
	<div class="lg:hidden">
		<button
			class="btn btn-ghost btn-circle"
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}
			aria-controls="mobile-menu"
			on:click={() => (isOpen = !isOpen)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
				/>
			</svg>
		</button>
	</div>
</nav>

<!-- MOBILE MENU -->
{#if isOpen}
	<div
		id="mobile-menu"
		role="dialog"
		aria-modal="true"
		aria-label="Mobile navigation menu"
		class="bg-base-100 fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 p-6 text-xl"
	>
		<!-- Close button -->
		<button
			class="btn btn-sm btn-circle absolute top-4 right-4"
			on:click={closeMenu}
			aria-label="Close mobile menu"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				viewBox="0 0 24 24"
				stroke="currentColor"
				fill="none"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>

		<a href="/" class="btn btn-ghost text-2xl" on:click={closeMenu}>Home</a>
		<a href="/about" class="btn btn-ghost text-2xl" on:click={closeMenu}>About</a>
		<a href="/contact" class="btn btn-ghost text-2xl" on:click={closeMenu}>Contact</a>

		<!-- THEME TOGGLE -->
		<label
			class="flex cursor-pointer items-center gap-2"
			for="theme-toggle-desktop"
			aria-label="Toggle light and dark theme"
		>
			<svg width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="5" />
				<path
					d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
				/>
			</svg>
			<input
				id="theme-toggle-desktop"
				type="checkbox"
				class="toggle theme-controller bg-none"
				on:change={toggleTheme}
				bind:checked={isDark}
				data-toggle-theme="light,dark"
				role="switch"
				aria-checked={isDark}
			/>
			<svg width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>
		</label>
	</div>
{/if}
