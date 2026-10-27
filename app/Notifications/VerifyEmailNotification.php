<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

/**
 * Notifikasi verifikasi email berbahasa Indonesia.
 *
 * VerifyEmail bawaan Laravel memakai teks Inggris dan tema Markdown polos.
 * Notifikasi ini memakai view Blade yang sama gaya visualnya dengan email
 * reset password, memakai $url bertanda tangan dari parent.
 */
class VerifyEmailNotification extends VerifyEmail
{
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Verifikasi Alamat Email - LawGates')
            ->view('emails.verify-email', [
                'url' => $this->verificationUrl($notifiable),
                'user' => $notifiable,
            ]);
    }
}
