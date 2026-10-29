<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Resend, Postmark, AWS, and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'google' => [
        // Dipakai untuk memastikan access token yang dikirim frontend memang
        // diterbitkan untuk aplikasi LawGates, bukan aplikasi Google lain.
        'client_id' => env('GOOGLE_CLIENT_ID'),
    ],

    'qwen' => [
        'base_url' => env('QWEN_BASE_URL', 'https://api.mindrouter.ai/v1'),
        'api_key' => env('QWEN_API_KEY'),
        'embedding_model' => env('QWEN_EMBEDDING_MODEL', 'mindrouter/qwen3-embedding-8b'),
        'dimensions' => env('QWEN_EMBEDDING_DIMENSIONS') ? (int) env('QWEN_EMBEDDING_DIMENSIONS') : null,
        'timeout' => (int) env('QWEN_TIMEOUT', 60),
    ],

];
