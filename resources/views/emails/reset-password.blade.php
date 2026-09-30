<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atur Ulang Kata Sandi - LawGates</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070c18; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #070c18; padding: 40px 16px;">
        <tr>
            <td align="center">
                <!-- Main Card Container -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #0a1c3e; border-radius: 20px; border: 1px solid #1e3a8a; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);">
                    
                    <!-- Top Gold Accent Line -->
                    <tr>
                        <td height="4" style="background: linear-gradient(90deg, #d4af37 0%, #e5cf87 50%, #d4af37 100%);"></td>
                    </tr>

                    <!-- Header with Branding -->
                    <tr>
                        <td style="padding: 32px 32px 24px 32px; text-align: center;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <!-- Brand Header / Logo from public/images/logo.png (CID Attachment) -->
                                        <div style="display: inline-block; padding: 12px 24px; background-color: #070c18; border-radius: 14px; border: 1px solid #1e293b;">
                                            <img src="{{ $message->embed(public_path('images/logo.png')) }}" width="140" alt="LawGates Logo" style="display: block; border: 0; margin: 0 auto;" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 32px;">
                            <div style="height: 1px; background-color: #1e293b; width: 100%;"></div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 32px;">

                            <h1 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 700; color: #ffffff; text-align: center; letter-spacing: -0.02em;">
                                Permintaan Atur Ulang Kata Sandi
                            </h1>

                            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #cbd5e1; text-align: center;">
                                Halo <strong style="color: #ffffff;">{{ $user->username ?? 'Pengguna LawGates' }}</strong>, kami menerima permintaan untuk mengatur ulang kata sandi akun LawGates Anda.
                            </p>

                            <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                                Silakan klik tombol di bawah ini untuk membuat kata sandi baru. Link ini berlaku selama <strong>60 menit</strong>.
                            </p>

                            <!-- CTA Button -->
                            <div style="text-align: center; margin-bottom: 32px;">
                                <a href="{{ $url }}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #d4af37 0%, #c49d27 100%); color: #070c18; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 14px rgba(212, 175, 55, 0.3); transition: all 0.2s ease;">
                                    Atur Ulang Kata Sandi Saya
                                </a>
                            </div>

                            <!-- Fallback Link Section -->
                            <div style="background-color: #051026; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                                <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;">
                                    Jika tombol di atas tidak bisa diklik, salin dan tempel URL berikut ke browser Anda:
                                </p>
                                <p style="margin: 0; font-size: 12px; word-break: break-all; color: #d4af37; font-family: monospace;">
                                    <a href="{{ $url }}" style="color: #d4af37; text-decoration: underline;">{{ $url }}</a>
                                </p>
                            </div>

                            <!-- Security Disclaimer -->
                            <div style="border-left: 3px solid #64748b; padding-left: 12px; margin-top: 24px;">
                                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748b;">
                                    Jika Anda tidak pernah meminta perubahan kata sandi ini, abaikan saja email ini. Kata sandi akun Anda akan tetap aman dan tidak akan berubah.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #051026; text-align: center; border-top: 1px solid #1e293b;">
                            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #94a3b8;">
                                LawGates — Legal Regulation Intelligence Platform
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #475569;">
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
