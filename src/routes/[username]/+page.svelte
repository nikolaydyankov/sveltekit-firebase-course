<script lang="ts">
  import type { PageData } from './$types'
  import UserLink from '$lib/components/UserLink.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8 flex flex-col gap-8">
  <h1 class="text-7xl text-purple-500">@{data.username}</h1>

  <img src={data.photoURL ?? '/user.png'} alt="photoURL" width="256" class="mx-auto" />

  <a href="/{data.username}/bio" class="text-xl my-8">{data.bio ?? 'no bio yet...'}</a>
  <div class="flex justify-center">
    <ul class="list-none min-w-[300px]">
      {#each data.links as item}
        <UserLink {...item} />
      {/each}
    </ul>
  </div>
</main>
