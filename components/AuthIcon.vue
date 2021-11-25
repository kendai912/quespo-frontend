<template>
  <div class="tab-item-wrap">
    <div class="tab-item">
      <v-icon size="24" class="custom-vicon"><slot name="authIcon" /></v-icon>
    </div>
    <div class="tab-name"><slot name="authName" /></div>
  </div>
</template>

