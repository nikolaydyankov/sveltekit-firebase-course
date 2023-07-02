<script lang="ts">
  import { auth, user, userData } from '$lib/firebase'

  import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)

    const idToken = await credential.user.getIdToken()

    const res = await fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })
  }

  async function signOutSSR() {
    const res = await fetch('/api/sign-in', { method: 'DELETE' })
    await signOut(auth)
  }
</script>

{#if $user}
  <h2>Logged in as <a href="/{$userData?.username}">{$user.email}</a></h2>
  <button class="btn btn-primary" on:click={signOutSSR}>Sign out</button>
{:else}
  <h2>Login</h2>
  <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
