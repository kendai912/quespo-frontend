<template>
  <div class="tabItemWrap">
    <div class="tabItem">
      <v-icon size="24" class="customVIcon"><slot name="authIcon" /></v-icon>
    </div>
    <div class="tabName"><slot name="authName" /></div>
  </div>
</template>

