import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Plus,
  Minus,
  RotateCcw,
  Earth,
} from 'lucide-react';
import { router } from '@inertiajs/react';
import { MapContainer, GeoJSON, TileLayer, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  INDONESIA_GEOJSON,
  INDONESIA_LAND_BORDERS,
  NEIGHBORING_COUNTRIES,
  PROVINCES_DATA,
  PROVINCE_LAND_COORDINATES,
  normalizeProvinceKey,
  ProvinceDetail,
} from './indonesiaMapData';
import { MAP_THEME } from '../../config/mapTheme';
import { getRegenciesForProvince } from './map/regencyData';
import { getRegencyCoordinates } from './map/regencyCoordinates';
import { MapSearchCard, WilayahSearchResult } from './map/MapSearchCard';
import { MapProvinceDetailCard } from './map/MapProvinceDetailCard';
import { MapKabupatenPreviewCard } from './map/MapKabupatenPreviewCard';
import { MapKabupatenFullListCard } from './map/MapKabupatenFullListCard';
import { MapRegulasiSummaryCard } from './map/MapRegulasiSummaryCard';
import { MapRegulasiKabupatenCard } from './map/MapRegulasiKabupatenCard';

// ── Sub-komponen untuk kontrol kamera Leaflet (FitBounds & Drag Listener) ──
function MapController({
  onMapReady,
  geoJsonBounds,
  onDeselect,
  onDragStateChange,
}: {
  onMapReady: (map: L.Map) => void;
  geoJsonBounds: L.LatLngBounds | null;
  onDeselect: () => void;
  onDragStateChange: (isDragging: boolean) => void;
}) {
  const map = useMap();
  const initialFitDone = useRef(false);

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  // Saat pertama kali peta termuat: buat peta Indonesia memenuhi container secara proporsional
  useEffect(() => {
    if (geoJsonBounds && !initialFitDone.current) {
      initialFitDone.current = true;
      map.fitBounds(geoJsonBounds, {
        padding: [15, 15],
        animate: false,
      });
    }
  }, [geoJsonBounds, map]);

  // ResizeObserver memastikan Leaflet map selalu pas dan tidak terpotong saat ukuran container stabil
  useEffect(() => {
    const container = map.getContainer();
    if (!container) return;
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [map]);

  // Pantau drag murni (TIDAK menyertakan movestart agar animasi zoom tidak disangka drag)
  useEffect(() => {
    const handleDragStart = () => {
      onDragStateChange(true);
    };
    const handleDragEnd = () => {
      onDragStateChange(false);
    };
    const handleBackgroundClick = () => {
      onDeselect();
    };

    map.on('dragstart', handleDragStart);
    map.on('dragend', handleDragEnd);
    map.on('click', handleBackgroundClick);

    return () => {
      map.off('dragstart', handleDragStart);
      map.off('dragend', handleDragEnd);
      map.off('click', handleBackgroundClick);
    };
  }, [map, onDeselect, onDragStateChange]);

  return null;
}

export interface IndonesiaLegalMapProps {
  variant?: 'landing' | 'regulasi';
}

export function IndonesiaLegalMap({ variant = 'landing' }: IndonesiaLegalMapProps = {}) {
  // ── 1. State Provinsi: Tampilan awal WAJIB null (Empty State) ───────────
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<L.LatLngExpression | null>(null);
  const [geoJsonBounds, setGeoJsonBounds] = useState<L.LatLngBounds | null>(null);

  // ── 2. State Hover Tunggal (Mencegah tooltip nyangkut saat drag/panning) ─
  const [hoveredProvinceKey, setHoveredProvinceKey] = useState<string | null>(null);
  const [hoveredProvinceName, setHoveredProvinceName] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const handleDragStateChange = useCallback((isDragging: boolean) => {
    isDraggingRef.current = isDragging;
    if (isDragging) {
      setHoveredProvinceKey(null);
      setHoveredProvinceName(null);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      setHoveredProvinceKey(null);
      setHoveredProvinceName(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // ── 3. State Pencarian ────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');

  // Reference ke Leaflet map & layer GeoJSON
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  // SVG Renderer dengan padding diperluas (1.5x) agar tidak ada garis terpotong saat peta digeser
  const svgRenderer = useMemo(() => L.svg({ padding: 1.5 }), []);

  // Selalu sinkronkan state selectedProvinceId ke Ref agar event listener tidak stale
  const selectedProvinceRef = useRef<string | null>(selectedProvinceId);

  // Fungsi utilitas untuk memperbarui warna seluruh layer wilayah secara instan tanpa DOM thrashing
  const updateLayerStyles = useCallback((activeKey: string | null, hoveredKey: string | null) => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const featureName = layer.feature?.properties?.PROVINSI || '';
        const key = normalizeProvinceKey(featureName);
        const isSelected = activeKey !== null && key === activeKey;
        const isHovered = !isSelected && hoveredKey !== null && key === hoveredKey;

        if (isSelected) {
          layer.setStyle(MAP_THEME.province.selected);
        } else if (isHovered) {
          layer.setStyle(MAP_THEME.province.hover);
        } else {
          layer.setStyle(MAP_THEME.province.default);
        }
      });
    }
  }, []);

  // State Data Provinsi (Default dari PROVINCES_DATA, di-update secara dinamis dari API backend)
  const [provincesData, setProvincesData] = useState<Record<string, ProvinceDetail>>(PROVINCES_DATA);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/regions/statistics')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.success && data.data) {
          setProvincesData((prev) => ({
            ...prev,
            ...data.data,
          }));
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat statistik wilayah dari API, menggunakan data cadangan:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    selectedProvinceRef.current = selectedProvinceId;
    updateLayerStyles(selectedProvinceId, hoveredProvinceKey);
  }, [selectedProvinceId, hoveredProvinceKey, updateLayerStyles]);

  // State untuk view list kabupaten lengkap (Figma node #2587:56232)
  const [isViewingAllKabupaten, setIsViewingAllKabupaten] = useState(false);

  // Pastikan data aktif hanya ada jika ada provinsi yang terpilih
  const activeProvince: ProvinceDetail | null = selectedProvinceId
    ? provincesData[selectedProvinceId] || null
    : null;

  // Data kabupaten/kota untuk provinsi terpilih yang disinkronkan dengan hitungan riil database
  const activeProvinceRegencies = useMemo(() => {
    if (!activeProvince) return null;
    const base = getRegenciesForProvince(activeProvince.id, activeProvince.name);
    const counts = (activeProvince as any).regencyCounts || {};

    const regencies = base.regencies.map((reg) => ({
      ...reg,
      totalPeraturan: counts[reg.name] ?? 0,
    }));

    // Prioritaskan kabupaten yang memiliki peraturan di database agar muncul di daftar teratas popup
    regencies.sort((a, b) => (b.totalPeraturan ?? 0) - (a.totalPeraturan ?? 0));

    return {
      ...base,
      regencies,
    };
  }, [activeProvince]);

  // Patokan tinggi aktif (default ~556px sesuai natural height kartu provinsi + daftar kabupaten/kota)
  const [activeHeight, setActiveHeight] = useState<number>(556);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Pantau dan sinkronkan tinggi saat provinsi aktif dipilih agar frame peta & form selalu presisi
  useEffect(() => {
    if (!rightPanelRef.current) return;
    const updateHeight = () => {
      if (rightPanelRef.current && activeProvince && !isViewingAllKabupaten) {
        const h = rightPanelRef.current.offsetHeight;
        if (h > 400) {
          setActiveHeight(h);
        }
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(rightPanelRef.current);
    return () => observer.disconnect();
  }, [activeProvince, isViewingAllKabupaten]);

  // Sinkronkan canvas Leaflet map saat tinggi kontainer berubah
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [activeHeight]);

  // Hasil pencarian gabungan (Provinsi & Kabupaten/Kota) untuk autocomplete dropdown
  const searchResults = useMemo<WilayahSearchResult[]>(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: WilayahSearchResult[] = [];

    const provList = Object.values(provincesData);

    for (const prov of provList) {
      const provNameLower = prov.name.toLowerCase();
      const provMatches = provNameLower.includes(q);

      // 1. Tambahkan provinsi jika cocok dengan query
      if (provMatches) {
        results.push({
          key: `prov-${prov.id}`,
          category: 'provinsi',
          name: prov.name,
          label: 'Provinsi',
          provinceId: prov.id,
          provinceName: prov.name,
          total: prov.total ?? 0,
        });
      }

      // 2. Ambil data kabupaten/kota untuk provinsi ini
      const regData = getRegenciesForProvince(prov.id, prov.name);
      const counts = (prov as any).regencyCounts || {};

      for (const reg of regData.regencies) {
        const regNameLower = reg.name.toLowerCase();
        const fullRegLower = `${reg.type.toLowerCase()} ${regNameLower}`;

        if (regNameLower.includes(q) || fullRegLower.includes(q)) {
          const regTotal = counts[reg.name] ?? 0;
          const regCoord = getRegencyCoordinates(reg.name, prov.id);
          results.push({
            key: `reg-${prov.id}-${reg.name}`,
            category: reg.type.toLowerCase().includes('kota') ? 'kota' : 'kabupaten',
            name: `${reg.type} ${reg.name}`,
            label: `${reg.type} di ${prov.name}`,
            provinceId: prov.id,
            provinceName: prov.name,
            total: regTotal,
            coordinates: regCoord || undefined,
          });
        }
      }
    }

    // Urutkan hasil pencarian:
    // 1. Exact match di nama item
    // 2. Prefix match di nama item
    // 3. Item dengan jumlah peraturan > 0 diprioritaskan
    // 4. Urutan alfabetis
    results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aExact = aName === q || aName.replace(/^(kabupaten|kota)\s+/i, '') === q;
      const bExact = bName === q || bName.replace(/^(kabupaten|kota)\s+/i, '') === q;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = aName.startsWith(q) || aName.replace(/^(kabupaten|kota)\s+/i, '').startsWith(q);
      const bStarts = bName.startsWith(q) || bName.replace(/^(kabupaten|kota)\s+/i, '').startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      if ((b.total > 0) !== (a.total > 0)) {
        return b.total - a.total;
      }

      return a.name.localeCompare(b.name);
    });

    return results.slice(0, 30);
  }, [provincesData, searchQuery]);

  // Handler saat memilih provinsi (dari klik peta atau search dropdown)
  const handleSelectProvince = useCallback((provKey: string, options?: { skipCamera?: boolean }) => {
    setIsViewingAllKabupaten(false);
    // Sinkronkan ref dan state seketika
    selectedProvinceRef.current = provKey;
    setSelectedProvinceId(provKey);
    setHoveredProvinceKey(null);
    setHoveredProvinceName(null);
    setSearchQuery('');

    // Ambil koordinat daratan pasti (solid landmass) untuk provinsi ini
    const landCoord = PROVINCE_LAND_COORDINATES[provKey];
    if (landCoord && !options?.skipCamera) {
      setPopupPos(landCoord);
    }

    let targetBounds: L.LatLngBounds | null = null;

    // Langsung aplikasikan warna Navy ke layer yang dipilih
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const featureName = layer.feature?.properties?.PROVINSI || '';
        const key = normalizeProvinceKey(featureName);
        const isSelected = key === provKey;

        layer.setStyle(isSelected ? MAP_THEME.province.selected : MAP_THEME.province.default);

        if (isSelected) {
          layer.bringToFront();
          const bounds = layer.getBounds();
          targetBounds = bounds;
          if (!landCoord && bounds && !options?.skipCamera) {
            setPopupPos(bounds.getCenter());
          }
        }
      });
    }

    if (options?.skipCamera) {
      return;
    }

    // Eksekusi animasi pergerakan kamera secara langsung (Direct & Smooth, tanpa delay dan tanpa parabolic zoom-out-in yang aneh)
    if (mapRef.current) {
      const mapSize = mapRef.current.getSize();
      const isMobileMap = mapSize.y < 350;

      if (targetBounds) {
        // Headroom atas proporsional: 95px di mobile (250px height), 160px di desktop (520px height)
        mapRef.current.fitBounds(targetBounds, {
          maxZoom: isMobileMap ? 5.8 : 6.2,
          paddingTopLeft: isMobileMap ? [20, 95] : [50, 160],
          paddingBottomRight: isMobileMap ? [20, 20] : [50, 50],
          animate: true,
          duration: 0.45,
          easeLinearity: 0.25,
        });
      } else if (landCoord) {
        mapRef.current.setView(landCoord, isMobileMap ? 5.5 : 6, {
          animate: true,
          duration: 0.45,
        });
      }
    }
  }, []);

  // Handler pemilihan kabupaten/kota (dari dropdown search atau kartu kabupaten)
  const handleSelectRegency = useCallback(
    (regencyFullName: string, provinceId?: string, coordinates?: [number, number]) => {
      // 1. Tentukan koordinat target (dari prop atau lookup)
      const targetCoord = coordinates || getRegencyCoordinates(regencyFullName, provinceId);

      // 2. Highlight provinsi di peta & update state tanpa menganimasikan kamera ke bounds provinsi
      if (provinceId) {
        handleSelectProvince(provinceId, { skipCamera: true });
      }

      // 3. Pasang pin/popup tepat di titik daerah yang dipilih
      if (targetCoord) {
        setPopupPos(targetCoord);
      }

      // 4. Fokuskan kamera Leaflet dengan animasi halus fly-to ke koordinat daerah (zoom in)
      if (mapRef.current && targetCoord) {
        const container = mapRef.current.getContainer();
        if (container) {
          const rect = container.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }

        const mapSize = mapRef.current.getSize();
        const isMobileMap = mapSize.y < 350;
        const targetZoom = isMobileMap ? 7.0 : 7.8;

        mapRef.current.flyTo(targetCoord, targetZoom, {
          duration: 0.9,
          easeLinearity: 0.25,
        });
      }
    },
    [handleSelectProvince]
  );

  // Handler saat user menekan Enter pada input search
  const handleSubmitSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    router.visit(`/pencarian?keyword=${encodeURIComponent(query.trim())}`);
  }, []);

  // Reset zoom & kamera kembali ke Indonesia penuh serta HAPUS PILIHAN (Empty State)
  const handleResetMap = useCallback(() => {
    selectedProvinceRef.current = null;
    setSelectedProvinceId(null);
    setIsViewingAllKabupaten(false);
    setPopupPos(null);
    setSearchQuery('');

    // Kembalikan semua provinsi ke style default transparan
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        layer.setStyle(MAP_THEME.province.default);
      });
    }

    // Kembalikan kamera ke seluruh Indonesia dengan transisi halus
    if (mapRef.current && geoJsonBounds) {
      mapRef.current.fitBounds(geoJsonBounds, {
        padding: [10, 10],
        animate: true,
        duration: 0.45,
        easeLinearity: 0.25,
      });
    }
  }, [geoJsonBounds]);

  // Navigasi ke detail kategori regulasi provinsi yang dipilih atau detail perda spesifik
  const handleNavigatePeraturan = (provName: string, uniqueId?: string | null) => {
    if (uniqueId) {
      router.get(`/peraturan/${uniqueId}`);
    } else {
      const slug = normalizeProvinceKey(provName);
      router.get(`/kategori/${slug}`);
    }
  };

  // Styling default setiap polygon provinsi
  const getFeatureStyle = useCallback((feature: any) => {
    const provName = feature?.properties?.PROVINSI || '';
    const key = normalizeProvinceKey(provName);
    const isSelected = key === selectedProvinceId;
    const isHovered = !isSelected && key === hoveredProvinceKey;

    if (isSelected) return MAP_THEME.province.selected;
    if (isHovered) return MAP_THEME.province.hover;
    return MAP_THEME.province.default;
  }, [selectedProvinceId, hoveredProvinceKey]);

  // Event handler untuk setiap fitur GeoJSON (Hover & Klik)
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const provName = feature?.properties?.PROVINSI || '';
    const provKey = normalizeProvinceKey(provName);

    // CATATAN: Tooltip dinonaktifkan agar tidak muncul label mengambang saat peta digeser/drag
    layer.on({
      mouseover: (e) => {
        // Jika sedang ditarik/drag, JANGAN trigger hover sama sekali!
        if (isDraggingRef.current) return;

        const target = e.target;
        // Hanya ubah ke warna hover jika provinsi ini BELUM terpilih
        if (provKey !== selectedProvinceRef.current) {
          target.setStyle(MAP_THEME.province.hover);
          target.bringToFront();
          setHoveredProvinceKey(provKey);
          setHoveredProvinceName(provName);
        }
      },
      mouseout: (e) => {
        const target = e.target;
        // Jika bukan provinsi yang sedang terpilih, kembalikan ke default transparan
        if (provKey !== selectedProvinceRef.current) {
          target.setStyle(MAP_THEME.province.default);
        } else {
          // Jika ini provinsi yang terpilih, pertahankan style selected
          target.setStyle(MAP_THEME.province.selected);
          target.bringToFront();
        }
        setHoveredProvinceKey((prev) => (prev === provKey ? null : prev));
        setHoveredProvinceName((prev) => (prev === provName ? null : prev));
      },
      click: (e) => {
        L.DomEvent.stopPropagation(e);
        setHoveredProvinceKey(null);
        setHoveredProvinceName(null);
        handleSelectProvince(provKey);
      },
    });
  };

  // ── Render Kanvas Peta Leaflet Mandiri (Dapat dipakai di Landing Page maupun Regulasi) ──
  const renderMapCanvas = (containerClassName?: string) => (
    <div className={containerClassName || "w-full flex-1 h-full bg-[#71D4E9] rounded-[15px] border border-neu-100 overflow-hidden relative shadow-xs"}>
      {/* Leaflet Map Canvas Wrapper dengan event mouse move & leave untuk hover tooltip */}
      <div
        className="w-full h-full relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredProvinceKey(null);
          setHoveredProvinceName(null);
        }}
      >
        {/* Tooltip Tunggal: HANYA muncul saat kursor lewat murni dan LANGSUNG lenyap saat kursor keluar / drag */}
        {hoveredProvinceName && mousePos && !isDraggingRef.current && (
          <div
            className="absolute pointer-events-none z-[500] select-none transition-opacity duration-75"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y - 14}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-neu-200/90 shadow-md text-[10px] sm:text-[11px] font-bold text-neu-900 tracking-wide whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-pr-900 inline-block" />
              <span>{hoveredProvinceName.toUpperCase()}</span>
            </div>
          </div>
        )}

        <MapContainer
          center={[-2.5, 118]}
          zoom={4.8}
          minZoom={3.8}
          maxZoom={12}
          zoomSnap={0.1}
          zoomDelta={0.5}
          wheelDebounceTime={40}
          wheelPxPerZoomLevel={120}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
          renderer={svgRenderer}
          maxBounds={[
            [24, 85],
            [-20, 152],
          ]}
          maxBoundsViscosity={1.0}
          className="w-full h-full bg-[#71D4E9] z-0 focus:outline-none custom-leaflet-map"
        >
          <MapController
            geoJsonBounds={geoJsonBounds}
            onDeselect={handleResetMap}
            onDragStateChange={handleDragStateChange}
            onMapReady={(map) => {
              mapRef.current = map;
            }}
          />

          {/* Basemap Google Maps Terrain */}
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=p&apistyle=s.e:l%7Cp.v:off,s.t:2%7Cs.e:l%7Cp.v:on&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={20}
          />

          {/* Layer Wilayah Negara Tetangga */}
          <GeoJSON
            data={NEIGHBORING_COUNTRIES as any}
            style={{
              fillColor: MAP_THEME.neighbors.fillColor,
              fillOpacity: MAP_THEME.neighbors.fillOpacity,
              weight: MAP_THEME.neighbors.weight,
              color: MAP_THEME.neighbors.color,
              opacity: MAP_THEME.neighbors.opacity,
              smoothFactor: 0,
            } as any}
            interactive={false}
          />

          {/* Layer GeoJSON 38 Provinsi Resmi Indonesia */}
          <GeoJSON
            ref={(instance) => {
              geoJsonRef.current = instance;
              if (instance && !geoJsonBounds) {
                setGeoJsonBounds(instance.getBounds());
              }
            }}
            data={INDONESIA_GEOJSON as any}
            style={getFeatureStyle}
            onEachFeature={onEachFeature}
          />

          {/* Layer Garis Batas Daratan Antar Provinsi */}
          <GeoJSON
            data={INDONESIA_LAND_BORDERS as any}
            style={{
              color: MAP_THEME.borders.color,
              weight: MAP_THEME.borders.weight,
              opacity: MAP_THEME.borders.opacity,
              lineCap: 'round',
              lineJoin: 'round',
              smoothFactor: 0,
            } as any}
            interactive={false}
          />

          {/* Floating Popup Card saat provinsi dipilih dengan Garis Pin Stem (Sesuai Figma node #2622:44208) */}
          {activeProvince && popupPos && (
            <Popup
              key={activeProvince.id}
              position={popupPos}
              closeButton={false}
              autoPan={false}
              offset={[0, -2]}
              className="custom-leaflet-popup"
            >
              <div className="flex flex-col items-center select-none pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
                {/* Box Card Putih Sesuai Figma node #2622:44208 */}
                <div className="bg-white rounded-[6px] border border-neu-50 px-2.5 py-[7px] min-w-[144px] shadow-md flex flex-col gap-1.5">
                  {/* Header: NAMA PROVINSI (Uppercase) | Total */}
                  <div className="flex items-center justify-between pb-1 border-b border-neu-50 h-[21px]">
                    <span className="text-[12px] font-medium text-neu-900 tracking-wide uppercase leading-[18px]">
                      {activeProvince.name}
                    </span>
                    <span className="text-[10px] font-medium text-pr-900 leading-[16px]">
                      {(activeProvince.total ?? 0).toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* 4 Kabupaten/Kota Teratas (Sesuai Figma node #2622:44212) */}
                  <div className="flex flex-col">
                    {(activeProvinceRegencies?.regencies || []).slice(0, 4).map((reg) => (
                      <div
                        key={reg.id}
                        className="flex items-center justify-between text-[10px] text-neu-600 leading-[16px]"
                      >
                        <span className="truncate pr-2">{reg.name}</span>
                        <span className="tabular-nums font-normal shrink-0">
                          {(reg.totalPeraturan ?? 0).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Garis Pin Stem Menunjuk Wilayah Terpilih (Figma node #2622:44208: 1px garis vertikal) */}
                <div className="w-[1px] h-[24px] bg-[#212121]" />
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>

      {/* Indicator Info Badge (Figma node #2358:57291: Primary/50 bg, Primary/900 dot & text) */}
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-[400] flex items-center gap-1.5 px-2.5 py-1 bg-pr-50 text-pr-900 rounded-lg text-[10px] sm:text-xs font-normal border border-pr-100/60 shadow-2xs pointer-events-none select-none">
        <span className="w-2 h-2 rounded-full bg-pr-900 shrink-0" />
        <span>klik provinsi yang ingin dipilih</span>
      </div>

      {/* Zoom & Reset Controls Custom Figma (Pojok Kanan Bawah, Figma node #2358:57265) */}
      <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-[400] flex flex-col bg-white rounded-[10px] sm:rounded-[14px] shadow-md border border-neu-200/80 overflow-hidden select-none">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          title="Perbesar Peta"
          className="p-1.5 sm:p-2.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <div className="w-full h-[1px] bg-neu-100" />
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          title="Perkecil Peta"
          className="p-1.5 sm:p-2.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <div className="w-full h-[1px] bg-neu-100" />
        <button
          type="button"
          onClick={handleResetMap}
          title="Kembali ke Tampilan Awal"
          className="p-1.5 sm:p-2.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <section className={variant === 'regulasi' ? 'w-full' : 'mt-8 sm:mt-[66px] w-full'}>
      {/* ── Transisi Halus Saat Kursor Berpindah Antar Daerah (Snappy & GPU-accelerated) ── */}
      <style>{`
        .custom-leaflet-map path.leaflet-interactive {
          transition: fill 0.12s ease-out,
                      fill-opacity 0.12s ease-out !important;
        }
      `}</style>

      {variant === 'regulasi' ? (
        /* ── 🌟 VARIAN MENU REGULASI (STACKED SESUAI FIGMA #2337:54385) ── */
        <div className="w-full flex flex-col">
          {/* 1. Header Section */}
          <div className="mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-neu-900 tracking-tight">
              Peta Hukum Indonesia
            </h2>
            <p className="text-neu-600 text-xs sm:text-[14px] mt-1 w-full max-w-none leading-relaxed">
              Eksplorasi provinsi, lihat ringkasan peraturan, status berlaku, dan daftar kabupaten/kota secara terstruktur.
            </p>
          </div>

          {/* 2. Full-Width Search Input Bar dengan Frame Background Putih */}
          <div className="w-full bg-white rounded-[20px] border border-neu-50 p-2.5 sm:p-3 mb-6 ">
            <MapSearchCard
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchResults={searchResults}
              onSelectProvince={handleSelectProvince}
              onSelectRegency={handleSelectRegency}
              onSubmitSearch={handleSubmitSearch}
              inputOnly
            />
          </div>

          {/* 3. Card Peta Indonesia Landscape Full-Width */}
          <div className="w-full bg-white rounded-[20px] border border-neu-50 p-4 sm:p-6  flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-[17px] sm:text-[18px] font-semibold text-neu-900 tracking-tight">
                  Peta Indonesia
                </h3>
                <p className="text-[12px] text-neu-500 mt-0.5">
                  Klik provinsi untuk melihat ringkasan dan daftar kabupaten/kota.
                </p>
              </div>
              {activeProvince ? (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-neu-50/80 rounded-full border border-neu-100 text-[11px] sm:text-[12px] font-medium text-neu-800 shrink-0">
                  <Earth className="w-3.5 h-3.5 text-neu-700" />
                  <span>Provinsi dipilih: {activeProvince.name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-neu-50/80 rounded-full border border-neu-100 text-[11px] sm:text-[12px] font-normal text-neu-500 shrink-0">
                  <Earth className="w-3.5 h-3.5 text-neu-400" />
                  <span>Belum ada provinsi dipilih</span>
                </div>
              )}
            </div>

            {/* Map Canvas: Landscape Full-Width */}
            <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px]">
              {renderMapCanvas('w-full h-full bg-[#71D4E9] rounded-[16px] border border-neu-100 overflow-hidden relative shadow-xs')}
            </div>
          </div>

          {/* 4. Dua Kolom Sejajar di Bawah Peta: Ringkasan Provinsi & Daftar Kab/Kota */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-start">
            <div className="lg:col-span-7 w-full">
              <MapRegulasiSummaryCard
                activeProvince={activeProvince}
                provinceData={activeProvinceRegencies}
                onNavigateAllRegulations={handleNavigatePeraturan}
              />
            </div>
            <div className="lg:col-span-5 w-full">
              <MapRegulasiKabupatenCard
                provinceData={activeProvinceRegencies}
                onSelectRegency={(regency) => {
                  handleSelectRegency(`${regency.type} ${regency.name}`, activeProvince?.id);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ── 🌟 VARIAN LANDING PAGE ASLI (TETAP 100% SAMA TANPA DIUBAH) ── */
        <>
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 max-w-[361px] lg:max-w-none mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-neu-900 tracking-tight">
              Peta Hukum Indonesia
            </h2>
            <p className="text-neu-600 text-xs sm:text-[14px] mt-1 max-w-2xl leading-relaxed">
              Klik salah satu provinsi untuk melihat jumlah peraturan dan hukum yang berlaku di wilayah tersebut.
            </p>
          </div>

          {/* Grid Container Sesuai Figma node #2622:43699 & #2587:56232 & #2622:44619 (Mobile) */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 w-full items-start">
            {/* 1. MOBILE ONLY SEARCH CARD */}
            <div className="w-full max-w-[361px] mx-auto lg:hidden">
              <MapSearchCard
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchResults={searchResults}
                onSelectProvince={handleSelectProvince}
                onSelectRegency={handleSelectRegency}
                onSubmitSearch={handleSubmitSearch}
              />
            </div>

            {/* 2. KANVAS MAP LANGSUNG (TANPA CONTAINER PUTIH) */}
            <div
              style={isDesktop ? { height: `${activeHeight}px` } : undefined}
              className="lg:col-span-8 w-full max-w-[361px] lg:max-w-none mx-auto flex flex-col h-[260px] sm:h-[300px] lg:h-full"
            >
              {renderMapCanvas('w-full h-full bg-[#71D4E9] rounded-[16px] sm:rounded-[20px] border border-neu-100 overflow-hidden relative shadow-xs')}
            </div>

            {/* 3. RIGHT COLUMN: KABUPATEN & PROVINSI PANELS */}
            <div
              ref={rightPanelRef}
              style={
                isDesktop
                  ? { height: isViewingAllKabupaten || !activeProvince ? `${activeHeight}px` : undefined }
                  : undefined
              }
              className="lg:col-span-4 w-full max-w-[361px] lg:max-w-none mx-auto flex flex-col gap-4 min-h-0"
            >
              {/* Desktop Only Search Card */}
              <div className="hidden lg:block shrink-0">
                <MapSearchCard
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchResults={searchResults}
                  onSelectProvince={handleSelectProvince}
                  onSelectRegency={handleSelectRegency}
                  onSubmitSearch={handleSubmitSearch}
                />
              </div>

              {isViewingAllKabupaten && activeProvince && activeProvinceRegencies ? (
                <MapKabupatenFullListCard
                  provinceData={activeProvinceRegencies}
                  onBack={() => setIsViewingAllKabupaten(false)}
                  onSelectRegency={(regency) => {
                    handleSelectRegency(`${regency.type} ${regency.name}`, activeProvince?.id);
                  }}
                />
              ) : activeProvince ? (
                <>
                  <MapProvinceDetailCard
                    activeProvince={activeProvince}
                    totalKabupatenKota={activeProvinceRegencies?.totalCount || 0}
                    onNavigateAllRegulations={(name) => handleNavigatePeraturan(name)}
                  />

                  <MapKabupatenPreviewCard
                    provinceData={activeProvinceRegencies}
                    onViewAll={() => setIsViewingAllKabupaten(true)}
                    onSelectRegency={(regency) => {
                      handleSelectRegency(`${regency.type} ${regency.name}`, activeProvince?.id);
                    }}
                  />
                </>
              ) : (
                /* TAMPILAN JIKA BELUM ADA PROVINSI DIPILIH (EMPTY STATE) */
                <div className="w-full bg-white rounded-[16px] sm:rounded-[20px] border border-neu-100 sm:border-neu-50 p-6 sm:p-8 flex-1 flex flex-col items-center justify-center text-center shadow-sm sm:shadow-none min-h-[220px] sm:min-h-[260px] lg:min-h-0 animate-in fade-in duration-200">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-white border border-neu-100 flex items-center justify-center text-neu-400 mb-3 shadow-2xs">
                    <Earth className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-medium text-[13px] sm:text-[14px] text-neu-900 mb-1">
                    Belum ada provinsi yang dipilih
                  </h4>
                  <p className="text-[11px] sm:text-[12px] text-neu-400 max-w-[240px] leading-relaxed">
                    Silakan klik salah satu provinsi pada peta atau pencarian untuk menampilkan jumlah peraturan
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
