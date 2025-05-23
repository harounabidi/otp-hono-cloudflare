export default function template(otp: string) {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Code</title>
      <!--[if mso]>
          <style type="text/css">
              .fallback-font {
                  font-family: Arial, sans-serif !important;
              }
              .fallback-font-mono {
                  font-family: Courier, monospace !important;
              }
          </style>
          <![endif]-->
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

        body,
        table,
        td,
        a {
          font-family: 'Inter', sans-serif;
        }
      </style>
    </head>
    <body class="fallback-font"
      style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 20px;">
        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 2px; overflow: hidden;">
              <tr>
                <td style="padding: 40px 20px; text-align: center; background-color: #262626;">
                  <h1 style="color: #ffffff; margin: 0; font-weight: 700; font-size: 24px;">Your OTP Code</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 20px;">
                  <p style="margin-bottom: 30px; text-align: center; font-size: 16px;">Please use the following One-Time
                    Password (OTP) to verify your account:</p>
                  <div style="text-align: center; margin-bottom: 30px;">
                    <span class="fallback-font-mono"
                      style="font-size: 36px; font-weight: 700; background-color: #f0f0f0; padding: 10px 20px; border-radius: 2px; letter-spacing: 5px;">
                      ${otp}
                    </span>
                  </div>
                  <p style="margin-bottom: 20px; text-align: center; font-size: 14px;">This code will expire in 2 minutes.
                  </p>
                  <p style="margin-bottom: 20px; text-align: center; font-size: 14px;">If you didn't request this code,
                    please ignore this email.</p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #666666;">
                  <p style="margin: 0;">This is an automated message, please do not reply.</p>
                  <p style="margin: 5px 0 0 0;">&copy; All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}
