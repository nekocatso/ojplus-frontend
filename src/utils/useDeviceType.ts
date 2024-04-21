import { ref, onMounted, onUnmounted } from 'vue';

export function useDeviceType() {
  const deviceType = ref('desktop');

  function updateDeviceType() {
    const width = window.innerWidth;

    if (width <= 600) {
      deviceType.value = 'mobile';
    } else if (width <= 1024) {
      deviceType.value = 'tablet';
    } else {
      deviceType.value = 'desktop';
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateDeviceType);
    updateDeviceType();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType);
  });

  return { deviceType };
}