<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\JenisPeraturan;
use App\Models\Status;
use App\Models\Peraturan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ManualUploadTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private JenisPeraturan $jenis;
    private Status $status;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $this->status = Status::create(['nama_status' => 'Berlaku']);
    }

    public function test_manual_upload_from_react_form_imports_document_successfully(): void
    {
        $payload = [
            'files' => [
                [
                    'name' => 'UU_1_2026.json',
                    'title' => 'Undang-Undang Nomor 1 Tahun 2026',
                    'parsedData' => [
                        'metadata' => [
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Tentang Transformasi Digital',
                            'nomor' => '1',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                        'chunks' => [
                            [
                                'tipe' => 'PASAL',
                                'label' => 'Pasal 1',
                                'teks' => 'Ketentuan umum peraturan ini...',
                            ]
                        ]
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Berhasil mengimpor 1 dokumen.',
            ]);

        $this->assertDatabaseHas('peraturan', [
            'nomor' => '1',
            'tahun' => 2026,
            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Tentang Transformasi Digital',
            'created_by' => $this->admin->id,
        ]);
    }

    public function test_manual_upload_detects_duplicate_and_returns_409_conflict(): void
    {
        // 1. Buat peraturan eksisting di database
        Peraturan::create([
            'unique_id' => 'uu_1_2026',
            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Tentang Transformasi Digital',
            'nomor' => '1',
            'tahun' => 2026,
            'jenis_peraturan_id' => $this->jenis->id,
            'status_id' => $this->status->id,
        ]);

        $payload = [
            'files' => [
                [
                    'name' => 'UU_1_2026.json',
                    'title' => 'Undang-Undang Nomor 1 Tahun 2026',
                    'parsedData' => [
                        'metadata' => [
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Tentang Transformasi Digital',
                            'nomor' => '1',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertStatus(409)
            ->assertJson([
                'success' => false,
                'conflict' => true,
                'existing_id' => 'uu_1_2026',
            ]);
    }

    public function test_manual_upload_allows_overwrite_when_explicitly_requested(): void
    {
        Peraturan::create([
            'unique_id' => 'uu_1_2026',
            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Lama',
            'nomor' => '1',
            'tahun' => 2026,
            'jenis_peraturan_id' => $this->jenis->id,
            'status_id' => $this->status->id,
        ]);

        $payload = [
            'allow_overwrite' => true,
            'files' => [
                [
                    'name' => 'UU_1_2026.json',
                    'title' => 'Undang-Undang Nomor 1 Tahun 2026',
                    'parsedData' => [
                        'metadata' => [
                            'id_dokumen' => 'uu_1_2026',
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Yang Baru',
                            'nomor' => '1',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertOk()
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('peraturan', [
            'unique_id' => 'uu_1_2026',
            'judul' => 'Undang-Undang Nomor 1 Tahun 2026 Yang Baru',
        ]);
    }

    public function test_api_import_manual_accepts_raw_json_document(): void
    {
        $payload = [
            'metadata' => [
                'tipe_peraturan' => 'Undang-Undang',
                'judul' => 'Undang-Undang Nomor 2 Tahun 2026 Melalui REST API',
                'nomor' => '2',
                'tahun' => 2026,
                'status' => 'Berlaku',
            ],
            'chunks' => [
                [
                    'tipe' => 'PASAL',
                    'label' => 'Pasal 1',
                    'teks' => 'Isi pasal 1 API...',
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/import/manual', $payload);

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Berhasil mengimpor 1 dokumen.',
            ]);

        $this->assertDatabaseHas('peraturan', [
            'nomor' => '2',
            'tahun' => 2026,
            'judul' => 'Undang-Undang Nomor 2 Tahun 2026 Melalui REST API',
        ]);
    }

    public function test_api_import_manual_accepts_uploaded_file(): void
    {
        $jsonContent = json_encode([
            'metadata' => [
                'tipe_peraturan' => 'Undang-Undang',
                'judul' => 'Undang-Undang Nomor 3 Tahun 2026 via File Upload',
                'nomor' => '3',
                'tahun' => 2026,
                'status' => 'Berlaku',
            ]
        ]);

        $uploadedFile = UploadedFile::fake()->createWithContent('uu_3_2026.json', $jsonContent);

        $response = $this->actingAs($this->admin)
            ->post('/api/admin/import/manual', [
                'file' => $uploadedFile,
            ], [
                'Accept' => 'application/json',
            ]);

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Berhasil mengimpor 1 dokumen.',
            ]);

        $this->assertDatabaseHas('peraturan', [
            'nomor' => '3',
            'tahun' => 2026,
            'judul' => 'Undang-Undang Nomor 3 Tahun 2026 via File Upload',
        ]);
    }

    public function test_check_duplicate_does_not_trigger_false_positives_for_substring_titles(): void
    {
        Peraturan::create([
            'unique_id' => 'uu_10_2026',
            'judul' => 'Undang-Undang Nomor 10 Tahun 2026 Tentang Perpajakan Nasional',
            'nomor' => '10',
            'tahun' => 2026,
            'jenis_peraturan_id' => $this->jenis->id,
            'status_id' => $this->status->id,
        ]);

        // Dokumen baru dengan judul "Perpajakan" (hanya substring) tidak boleh dianggap duplikat
        $response = $this->actingAs($this->admin)
            ->getJson('/admin/dokumen-hukum/check-duplicate?judul=' . urlencode('Perpajakan'));

        $response->assertOk()
            ->assertJson(['exists' => false]);

        // Judul sama persis harus terdeteksi duplikat
        $responseExact = $this->actingAs($this->admin)
            ->getJson('/admin/dokumen-hukum/check-duplicate?judul=' . urlencode('Undang-Undang Nomor 10 Tahun 2026 Tentang Perpajakan Nasional'));

        $responseExact->assertStatus(409)
            ->assertJson([
                'exists' => true,
                'conflict' => true,
            ]);
    }

    public function test_manual_upload_with_stringified_correction_data_succeeds(): void
    {
        $payload = [
            'files' => [
                [
                    'name' => 'UU_99_2026.json',
                    'title' => 'Undang-Undang Nomor 99 Tahun 2026',
                    'parsedData' => json_encode([
                        'metadata' => [
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang 99 Lama',
                            'nomor' => '99',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                    ]),
                    'correctionData' => json_encode([
                        'judul' => 'Undang-Undang Nomor 99 Tahun 2026 Hasil Koreksi',
                        'nomorPeraturan' => '99',
                        'tahun' => 2026,
                    ]),
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->post('/admin/dokumen-hukum/import', $payload, [
                'Accept' => 'application/json',
            ]);

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'message' => 'Berhasil mengimpor 1 dokumen.',
            ]);

        $this->assertDatabaseHas('peraturan', [
            'nomor' => '99',
            'tahun' => 2026,
            'judul' => 'Undang-Undang Nomor 99 Tahun 2026 Hasil Koreksi',
        ]);
    }

    public function test_perda_with_same_number_and_year_from_different_regions_does_not_conflict(): void
    {
        $perdaJenis = JenisPeraturan::create(['kode' => 'PERDA', 'nama' => 'Peraturan Daerah']);

        // Perda Badung Nomor 1 Tahun 2026 sudah ada di database
        Peraturan::create([
            'unique_id' => 'perda_badung_1_2026',
            'judul' => 'Peraturan Daerah Kabupaten Badung Nomor 1 Tahun 2026',
            'nomor' => '1',
            'tahun' => 2026,
            'instansi' => 'Pemerintah Kabupaten Badung',
            'jenis_peraturan_id' => $perdaJenis->id,
            'status_id' => $this->status->id,
        ]);

        // Perda Provinsi Bali Nomor 1 Tahun 2026 diimpor (instansi berbeda)
        $payload = [
            'files' => [
                [
                    'name' => 'perda_bali_1_2026.json',
                    'parsedData' => [
                        'metadata' => [
                            'tipe_peraturan' => 'Peraturan Daerah',
                            'judul' => 'Peraturan Daerah Provinsi Bali Nomor 1 Tahun 2026',
                            'nomor' => '1',
                            'tahun' => 2026,
                            'pemrakarsa' => 'Pemerintah Provinsi Bali',
                            'status' => 'Berlaku',
                        ],
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertOk()
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('peraturan', [
            'judul' => 'Peraturan Daerah Provinsi Bali Nomor 1 Tahun 2026',
            'instansi' => 'Pemerintah Provinsi Bali',
        ]);
    }

    public function test_batch_import_pre_validation_blocks_partial_inserts_on_conflict(): void
    {
        // Dokumen UU 50 sudah ada
        Peraturan::create([
            'unique_id' => 'uu_50_2026',
            'judul' => 'Undang-Undang Nomor 50 Tahun 2026',
            'nomor' => '50',
            'tahun' => 2026,
            'jenis_peraturan_id' => $this->jenis->id,
            'status_id' => $this->status->id,
        ]);

        // Batch upload berisi UU 51 (baru) dan UU 50 (duplikat)
        $payload = [
            'files' => [
                [
                    'name' => 'uu_51_2026.json',
                    'parsedData' => [
                        'metadata' => [
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang Nomor 51 Tahun 2026',
                            'nomor' => '51',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                    ]
                ],
                [
                    'name' => 'uu_50_2026.json',
                    'parsedData' => [
                        'metadata' => [
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang Nomor 50 Tahun 2026',
                            'nomor' => '50',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertStatus(409)
            ->assertJson([
                'success' => false,
                'conflict' => true,
            ]);

        // Pastikan UU 51 TIDAK tersimpan (transaksi aman, tidak ada partial write)
        $this->assertDatabaseMissing('peraturan', [
            'nomor' => '51',
            'tahun' => 2026,
        ]);
    }
}
