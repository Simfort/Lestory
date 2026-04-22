export default async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker instaled");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.log("Service Worker unactive");
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
