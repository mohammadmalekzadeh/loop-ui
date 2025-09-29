type ServiceWorkerRegistrationWithUpdate = ServiceWorkerRegistration & {
  installing?: ServiceWorker;
};

export function register(): void {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("../public/service-worker.js")
        .then((registration: ServiceWorkerRegistration) => {
          console.log("Service Worker registered with scope:", registration.scope);
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  console.log("New content is available; please refresh.");
                }
              };
            }
          };
        })
        .catch((error: unknown) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}

export function unregister(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error: unknown) => console.error(error));
  }
}