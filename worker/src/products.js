// Maps each Stripe Price ID to the product's order-confirmation-email data
// and R2 download URL. Find each Price ID in the Stripe Dashboard: Product
// catalog -> click the product -> the price row shows an ID like
// "price_1AbCdEfGhIjKlMnO".
export const PRODUCTS = {
  "price_REPLACE_PORSCHE_912": {
    name: "Porsche 912",
    price: "$25.00",
    meta: "WAV · 24-bit/96kHz · 320 files · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/porsche-912.zip",
  },
  "price_REPLACE_WORKBENCH": {
    name: "Workbench",
    price: "$5.00",
    meta: "WAV · 24-bit/96kHz · 400+ samples · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/workbench.zip",
  },
  "price_REPLACE_AMBIENCES": {
    name: "Ambiences",
    price: "$5.00",
    meta: "WAV · 24-bit/96kHz · 210 files · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/ambiences.zip",
  },
  "price_REPLACE_CREATURES_AND_PEOPLE": {
    name: "Creatures and People",
    price: "$2.00",
    meta: "WAV · 24-bit/96kHz · 200+ sounds · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/creatures-and-people.zip",
  },
  "price_REPLACE_HOUSEHOLD": {
    name: "Household",
    price: "$2.00",
    meta: "WAV · 24-bit/96kHz · 370 FX · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/household.zip",
  },
  "price_REPLACE_SYNTHESIS_AND_SOUND_DESIGN": {
    name: "Synthesis and Sound Design",
    price: "$1.00",
    // TODO: no exact file count on record for this one -- fill in if you
    // have it, otherwise this line reads fine without a count.
    meta: "WAV · 24-bit/96kHz · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/synthesis-and-sound-design.zip",
  },
};
