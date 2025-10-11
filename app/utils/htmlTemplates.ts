export const inviteEmailTemplate = (inviterName: string, homeName: string, inviteCode: string, acceptUrl: string) => `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Invitación a Mi Gasto</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <!-- Preheader (texto visible en la vista previa del email) -->
    <div style="display:none;max-height:0;overflow:hidden;visibility:hidden;mso-hide:all;">
      ${inviterName} te ha invitado a unirte al hogar "${homeName}" en Mi Gasto. Usa el código de invitación o pulsa el botón para aceptar.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f4f6;padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,0.06);">
            <!-- Header -->
            <tr>
              <td style="padding:20px 24px;background:linear-gradient(90deg,#ffffff,#ffffff);">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="vertical-align:middle">
                      <!-- Placeholder logo -->
                      <div style="display:inline-block;width:44px;height:44px;border-radius:10px;background:#eef2ff;display:flex;align-items:center;justify-content:center;">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="4" fill="#4f46e5"></rect>
                          <path d="M7 12h10M7 16h6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <span style="font-weight:600;color:#0f172a;margin-left:12px;font-size:18px;vertical-align:middle;">Mi Gasto</span>
                    </td>
                    <td align="right" style="color:#6b7280;font-size:13px;">Invitación</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 24px 8px 24px;color:#0f172a;">
                <h1 style="margin:0 0 12px 0;font-size:20px;line-height:1.2;font-weight:700;color:#0f172a;">
                  ${inviterName} te invitó a unirte a "${homeName}"
                </h1>
                <p style="margin:0 0 18px 0;color:#374151;font-size:15px;line-height:1.45;">
                  Hola — <strong>${inviterName}</strong> creó el hogar <strong>“${homeName}”</strong> en <em>Mi Gasto</em> y te invitó a compartir y dividir gastos con el resto de los miembros.
                </p>

                <!-- Código -->
                <div style="margin:0 0 18px 0;">
                  <div style="display:inline-block;padding:14px 18px;border-radius:10px;background:#f8fafc;border:1px dashed #e6e9f2;">
                    <div style="font-size:13px;color:#6b7280;margin-bottom:6px">Código de invitación</div>
                    <div style="font-family: 'Courier New', Courier, monospace;font-weight:700;font-size:20px;color:#111827;">
                      ${inviteCode}
                    </div>
                  </div>
                </div>

                <!-- Botón CTA -->
                <div style="margin:18px 0;">
                  <a href="${acceptUrl}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 20px;border-radius:10px;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:600;box-shadow:0 6px 14px rgba(79,70,229,0.18);">
                    Unirme al hogar
                  </a>
                </div>

                <p style="margin:12px 0 0 0;color:#6b7280;font-size:13px;line-height:1.4;">
                  Si el botón no funciona, copia y pega este enlace en tu navegador:
                  <br />
                  <a href="${acceptUrl}" style="color:#374151;word-break:break-all;text-decoration:underline;">${acceptUrl}</a>
                </p>

                <hr style="border:none;border-top:1px solid #eef2ff;margin:22px 0;" />
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                  ¿No reconoces esta invitación? Ignora este correo y el código dejará de ser válido. <br/>
                  Este código expira en 7 días.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 24px 24px 24px;background:#fbfbff;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="font-size:13px;color:#6b7280;">
                      <strong>Mi Gasto</strong><br />
                      Una forma simple de gestionar y dividir gastos en el hogar.
                    </td>
                    <td align="right" style="font-size:13px;color:#6b7280;">
                      <div>¿Necesitás ayuda?</div>
                      <div style="margin-top:6px;"><a href="mailto:soporte@migasto.app" style="color:#4f46e5;text-decoration:none;">soporte@migasto.app</a></div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Small legal -->
            <tr>
              <td style="padding:12px 20px 20px 20px;text-align:center;font-size:12px;color:#9ca3af;">
                © Mi Gasto. Todos los derechos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;