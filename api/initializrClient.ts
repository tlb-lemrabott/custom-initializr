export async function fetchInitializrMetadata() {
    const res = await fetch("https://start.spring.io/metadata/client", {
      headers: {
        Accept: "application/vnd.initializr.v2.3+json",
      },
    });
    if (!res.ok) throw new Error("Failed to load metadata");
    return res.json();
  }
  