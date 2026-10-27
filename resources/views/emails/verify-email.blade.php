<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Email - LawGates</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 40px 16px;">
        <tr>
            <td align="center">
                <!-- Main Card Container -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(10, 28, 62, 0.05), 0 8px 10px -6px rgba(10, 28, 62, 0.04);">

                    <!-- Top Accent Line (Navy pr-900) -->
                    <tr>
                        <td height="4" style="background-color: #0a1c3e;"></td>
                    </tr>

                    <!-- Header with Branding -->
                    <tr>
                        <td style="padding: 36px 32px 24px 32px; text-align: center;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <!-- Brand Header / Logo for light background -->
                                        <img src="{{ $message->embed(public_path('images/logo_black.png')) }}" width="150" alt="LawGates Logo" style="display: block; border: 0; margin: 0 auto;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 32px;">
                            <div style="height: 1px; background-color: #f1f5f9; width: 100%;"></div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 32px;">

                            <h1 style="margin: 0 0 14px 0; font-size: 24px; font-weight: 700; color: #0a1c3e; text-align: center; letter-spacing: -0.02em;">
                                Verifikasi Alamat Email
                            </h1>

                            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155; text-align: center;">
                                Halo <strong style="color: #0a1c3e;">{{ $user->username ?? 'Pengguna LawGates' }}</strong>, terima kasih telah mendaftar di LawGates Intelligence.
                            </p>

                            <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.6; color: #64748b; text-align: center;">
                                Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda. Link ini berlaku selama <strong>60 menit</strong>.
                            </p>

                            <!-- CTA Button (pr-900: #0a1c3e) -->
                            <div style="text-align: center; margin-bottom: 32px;">
                                <a href="{{ $url }}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #0a1c3e; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 14px rgba(10, 28, 62, 0.25); transition: all 0.2s ease;">
                                    Verifikasi Email Saya
                                </a>
                            </div>

                            <!-- Fallback Link Section (URL with pr-900: #0a1c3e) -->
                            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                                <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                                    Jika tombol di atas tidak bisa diklik, salin dan tempel URL berikut ke browser Anda:
                                </p>
                                <p style="margin: 0; font-size: 12px; word-break: break-all; color: #0a1c3e; font-family: monospace; line-height: 1.5;">
                                    <a href="{{ $url }}" style="color: #0a1c3e; font-weight: 600; text-decoration: underline;">{{ $url }}</a>
                                </p>
                            </div>

                            <!-- Security Disclaimer -->
                            <div style="border-left: 3px solid #cbd5e1; padding-left: 14px; margin-top: 24px;">
                                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #64748b;">
                                    Jika Anda tidak pernah membuat akun di LawGates, abaikan saja email ini. Tidak ada tindakan lebih lanjut yang diperlukan.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #475569;">
                                LawGates &mdash; Legal Regulation Intelligence Platform
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                                &copy; {{ date('Y') }} LawGates Project. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
