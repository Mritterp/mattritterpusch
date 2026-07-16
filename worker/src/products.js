// Maps each Stripe Price ID to the product's order-confirmation-email data
// and R2 download URL. Find each Price ID in the Stripe Dashboard: Product
// catalog -> click the product -> the price row shows an ID like
// "price_1AbCdEfGhIjKlMnO".
export const PRODUCTS = {
  "price_1TtBt5DoTZ627d54KT0AyP01": {
    name: "Porsche 912",
    price: "$25.00",
    meta: "WAV · 24-bit/96kHz · 320 files · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/porsche-912.zip",
  },
  "price_1TtBu2DoTZ627d54xbNRKKPk": {
    name: "Workbench",
    price: "$5.00",
    meta: "WAV · 24-bit/96kHz · 400+ samples · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/workbench.zip",
  },
  "price_1TtBupDoTZ627d54clBmVXiP": {
    name: "Ambiences",
    price: "$5.00",
    meta: "WAV · 24-bit/96kHz · 210 files · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/ambiences.zip",
  },
  "price_1TtBvYDoTZ627d54PVvHIroo": {
    name: "Creatures and People",
    price: "$2.00",
    meta: "WAV · 24-bit/96kHz · 200+ sounds · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/creatures-and-people.zip",
  },
  "price_1TtBwrDoTZ627d540wULF4T6": {
    name: "Household",
    price: "$2.00",
    meta: "WAV · 24-bit/96kHz · 370 FX · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/household.zip",
  },
  "price_1TtBy3DoTZ627d54hOJMdO4Q": {
    name: "Synthesis and Sound Design",
    price: "$1.00",
    // TODO: no exact file count on record for this one -- fill in if you
    // have it, otherwise this line reads fine without a count.
    meta: "WAV · 24-bit/96kHz · Washington, DC & Baltimore, MD",
    url: "https://pub-77ddc065632d441db8d4e6cc7989e204.r2.dev/synthesis-and-sound-design.zip",
  },
};
