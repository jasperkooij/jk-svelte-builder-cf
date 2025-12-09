<script>
	// State variables
	let name = '';
	let email = '';
	let phone = '';
	let message = '';
	let verificationAnswer = '';
	let errorMessage = '';
	let successMessage = '';

	// Regex for validating USA phone numbers
	const phoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

	// Function to handle form submission
	async function handleSubmit(event) {
		event.preventDefault(); // Prevent default form submission

		// Validate the verification answer
		if (verificationAnswer.trim() !== '8') {
			errorMessage = 'Incorrect answer. Please try again.';
			successMessage = '';
			return;
		}

		// Validate the phone number
		if (phone && !phoneRegex.test(phone)) {
			errorMessage = 'Please enter a valid USA phone number.';
			successMessage = '';
			return;
		}

		// Clear any previous error messages
		errorMessage = '';

		// Send data to Formspree
		const response = await fetch('https://formspree.io/f/myyvpapn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, phone, message })
		});

		if (response.ok) {
			// Reset the form and show a success message
			name = '';
			email = '';
			phone = '';
			message = '';
			verificationAnswer = '';
			successMessage = 'Message sent successfully!';
		} else {
			errorMessage = 'There was an error submitting the form. Please try again.';
		}
	}
</script>

<!-- Form -->
<form on:submit={handleSubmit} class="bg-base-200 mx-auto max-w-md rounded-lg p-6 shadow-md" id="contact">
	<h2 class="mb-4 text-center font-bold">Get in touch</h2>

	<!-- Name Field -->
	<div class="form-control">
		<label class="label" for="name">
			<span class="label-text">Name:</span>
		</label>
		<input
			type="text"
			id="name"
			name="name"
			bind:value={name}
			required
			placeholder="Enter your name"
			class="input input-bordered w-full"
		/>
	</div>

	<!-- Email Field -->
	<div class="form-control mt-4">
		<label class="label" for="email">
			<span class="label-text">Email:</span>
		</label>
		<input
			type="email"
			id="email"
			name="email"
			bind:value={email}
			required
			placeholder="Enter your email"
			class="input input-bordered w-full"
		/>
	</div>

	<!-- Phone Number Field -->
	<div class="form-control mt-4">
		<label class="label" for="phone">
			<span class="label-text">Phone Number:</span>
		</label>
		<input
			type="tel"
			id="phone"
			name="phone"
			bind:value={phone}
			placeholder="Enter your phone number (e.g., +1 123-456-7890)"
			class="input input-bordered w-full"
		/>
	</div>

	<!-- Message Field -->
	<div class="form-control mt-4">
		<label class="label" for="message">
			<span class="label-text">Message:</span>
		</label>
		<textarea
			id="message"
			name="message"
			bind:value={message}
			required
			placeholder="Enter your message"
			class="textarea textarea-bordered w-full"
		></textarea>
	</div>

	<!-- Verification Question -->
	<div class="form-control mt-4">
		<label class="label" for="verification">
			<span class="label-text">How much is four times 2?</span>
		</label>
		<input
			type="text"
			id="verification"
			name="verification"
			bind:value={verificationAnswer}
			required
			placeholder="Enter your answer"
			class="input input-bordered w-full"
		/>
	</div>

	<!-- Error Message -->
	{#if errorMessage}
		<p class="text-error mt-4 text-center">{errorMessage}</p>
	{/if}

	<!-- Success Message -->
	{#if successMessage}
		<p class="text-success mt-4 text-center">{successMessage}</p>
	{/if}

	<!-- Submit Button -->
	<button type="submit" class="btn btn-primary mt-6 w-full"> Send Message </button>
</form>
