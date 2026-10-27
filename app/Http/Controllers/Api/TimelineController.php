<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TimelineEventsRequest;
use App\Services\TimelineService;
use Illuminate\Http\JsonResponse;

/**
 * Endpoint agregasi timeline regulasi (REG-04, REG-05).
 *
 * Kedua endpoint berbagi kontrak parameter yang sama dan hanya meneruskan ke
 * service; tidak ada logika bisnis di sini. Rentang dipotong di
 * `TimelineService::resolveRange()`, sehingga `truncated` menggambarkan
 * permintaan asli klien, bukan hasil yang sudah dipotong request.
 */
class TimelineController extends Controller
{
    public function __construct(private readonly TimelineService $timeline) {}

    /**
     * GET /api/timeline/events
     */
    public function events(TimelineEventsRequest $request): JsonResponse
    {
        return response()->json(
            $this->timeline->events(
                $request->startDate(),
                $request->endDate(),
                $request->regulationTypes(),
                $request->subjek(),
                $request->lokasi(),
                $request->instansi(),
            )
        );
    }

    /**
     * GET /api/timeline/frequency
     */
    public function frequency(TimelineEventsRequest $request): JsonResponse
    {
        return response()->json(
            $this->timeline->frequency(
                $request->startDate(),
                $request->endDate(),
                $request->regulationTypes(),
                $request->subjek(),
                $request->lokasi(),
                $request->instansi(),
            )
        );
    }
}
