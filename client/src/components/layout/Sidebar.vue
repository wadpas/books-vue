<template>
  <aside class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]">
    <div class="flex items-center justify-between h-16 gap-2 px-2 border-b lg:px-4 shrink-0">
      <Button
        variant="outline"
        size="icon"
        class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="relative flex flex-col justify-between h-full gap-2">
      <div>
        <SidebarLinks :links="links" />
      </div>
      <div class="py-3 text-center border-y bg-muted/60">
        <SidebarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
  import SidebarLinks from './SidebarLinks.vue'
  import { Button } from '@/components/ui/button'

  const links = [
    {
      title: 'Dashboard',
      icon: 'lucide:house',
      to: '/',
    },
    {
      title: 'Books',
      icon: 'lucide:book',
      to: '/books',
    },
    {
      title: 'Comments',
      icon: 'lucide:message-circle',
      to: '/comments',
    },
  ]

  const accountLinks = [
    {
      title: 'Profile',
      icon: 'lucide:user',
      to: '/profile',
    },
    {
      title: 'Settings',
      icon: 'lucide:settings',
      to: '/settings',
    },
    {
      title: 'Sign out',
      icon: 'lucide:log-out',
      to: '/signout',
    },
  ]
</script>
