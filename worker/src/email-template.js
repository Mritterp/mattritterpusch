// Renders the order-confirmation email HTML. Structure/styling matches the
// approved design (table-based layout + inline styles, required for email
// client compatibility) -- only the product row and download link vary
// per purchase. License text and everything else is fixed copy shared by
// every product.
export function renderEmail(product) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0; background:#EAEAEA;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EAEAEA; padding: 48px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF; max-width:600px; width:100%; border:1px solid #DADADA;">

        <tr>
          <td style="padding: 40px 48px 24px 48px; border-bottom: 1px solid #DADADA;">
            <span style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 800; color: #111111;">Matt<span style="border-bottom: 2px solid #1E6FFF;">Ritterpusch</span></span>
            <div style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #6B6B6B; margin-top: 6px;">TYO Sound</div>
          </td>
        </tr>

        <tr>
          <td style="padding: 40px 48px 8px 48px;">
            <div style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #1E6FFF; margin-bottom: 16px;">Order confirmed</div>
            <div style="font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 22px; line-height: 1.4; color: #111111; margin: 0 0 32px 0;">Thank you for your purchase. The download is available at the link below.</div>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #DADADA; border-bottom: 1px solid #DADADA;">
              <tr>
                <td style="padding: 20px 0 8px 0; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; color: #111111;">${escapeHtml(product.name)}</td>
                <td style="padding: 20px 0 8px 0; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; color: #111111; text-align: right;">${escapeHtml(product.price)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 0 0 20px 0; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 13px; color: #6B6B6B;">${escapeHtml(product.meta)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 32px 48px; text-align: center;">
            <a href="${product.url}" style="display: inline-block; background: #1E6FFF; color: #FFFFFF; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; padding: 16px 40px;">Download files</a>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 48px 40px 48px;">
            <div style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #111111; margin-bottom: 12px;">License</div>
            <div style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111111; margin: 0;">
              <p style="margin: 0 0 16px 0;">You have the right to use, synchronize, perform, stretch, slice, and generally abuse any sound from this library as you see fit.</p>
              <p style="margin: 0 0 16px 0;">You cannot use any of these sounds in the creation of your own sound effect library.</p>
              <p style="margin: 0;">Happy creating!</p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 24px 48px; border-top: 1px solid #DADADA;">
            <p style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; color: #6B6B6B; margin: 0;">Washington, DC · 240.608.8286 · <a href="mailto:mritterp@gmail.com" style="color:#1E6FFF; text-decoration:none;">mritterp@gmail.com</a></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
`.trim();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
