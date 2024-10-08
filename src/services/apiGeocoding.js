export async function getAddress({ latitude, longitude }) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    if (!res.ok) throw new Error("Failed getting address");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching address (Geocoding): ", error);
    throw error;
  }
}
