import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Earth,
  Search,
  Scale,
  FileText,
  Eye,
  Plus,
  Minus,
  RotateCcw,
  Check,
  CircleCheckBig,
  ChevronRight,
} from 'lucide-react';
import { router } from '@inertiajs/react';
import { MapContainer, GeoJSON, TileLayer, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  INDONESIA_GEOJSON,
  PROVINCES_DATA,
  PROVINCE_LAND_COORDINATES,
  normalizeProvinceKey,
  ProvinceDetail,
} from './indonesiaMapData';

// ── Sub-komponen untuk kontrol kamera Leaflet (FitBounds, PanTo, Zoom) ─────
function MapController({
  popupPos,
  resetTrigger,
  onMapReady,
  geoJsonBounds,
  onDeselect,
  onDragStateChange,
}: {
  popupPos: L.LatLngExpression | null;
  resetTrigger: number;
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

  // Pantau drag/pan & klik latar belakang
  useEffect(() => {
    const handleDragStart = () => {
      onDragStateChange(true);
    };
    const handleDragEnd = () => {
      setTimeout(() => {
        onDragStateChange(false);
      }, 100);
    };
    const handleBackgroundClick = () => {
      onDeselect();
    };

    map.on('dragstart', handleDragStart);
    map.on('movestart', handleDragStart);
    map.on('dragend', handleDragEnd);
    map.on('moveend', handleDragEnd);
    map.on('click', handleBackgroundClick);

    return () => {
      map.off('dragstart', handleDragStart);
      map.off('movestart', handleDragStart);
      map.off('dragend', handleDragEnd);
      map.off('moveend', handleDragEnd);
      map.off('click', handleBackgroundClick);
    };
  }, [map, onDeselect, onDragStateChange]);

  // Efek perpindahan kamera saat provinsi dipilih:
  // Menggunakan panTo atau flyTo halus langsung ke titik daratan (popupPos)
  // Menghilangkan efek getar (jitter) yang sebelumnya terjadi karena zoom bouncing
  useEffect(() => {
    if (popupPos) {
      const currentZoom = map.getZoom();
      if (currentZoom < 5.2) {
        map.flyTo(popupPos, 5.4, {
          animate: true,
          duration: 0.6,
          easeLinearity: 0.25,
        });
      } else {
        map.panTo(popupPos, {
          animate: true,
          duration: 0.45,
          easeLinearity: 0.25,
        });
      }
    }
  }, [popupPos, map]);

  // Reset kamera ke seluruh wilayah Indonesia (fitBounds agar selalu pas & proporsional)
  useEffect(() => {
    if (resetTrigger > 0 && geoJsonBounds) {
      map.flyToBounds(geoJsonBounds, {
        padding: [15, 15],
        duration: 0.6,
        easeLinearity: 0.25,
      });
    }
  }, [resetTrigger, geoJsonBounds, map]);

  return null;
}

export function IndonesiaLegalMap() {
  // ── 1. State Provinsi: Tampilan awal WAJIB null (Empty State) ───────────
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [selectedBounds, setSelectedBounds] = useState<L.LatLngBounds | null>(null);
  const [popupPos, setPopupPos] = useState<L.LatLngExpression | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [geoJsonBounds, setGeoJsonBounds] = useState<L.LatLngBounds | null>(null);

  // ── 2. State Hover Tunggal (Mencegah tooltip nyangkut saat drag/panning) ─
  const [hoveredProvinceName, setHoveredProvinceName] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const handleDragStateChange = useCallback((isDragging: boolean) => {
    isDraggingRef.current = isDragging;
    if (isDragging) {
      setHoveredProvinceName(null);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Reference ke Leaflet map & layer GeoJSON
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  // Selalu sinkronkan state selectedProvinceId ke Ref agar event listener tidak stale
  const selectedProvinceRef = useRef<string | null>(selectedProvinceId);

  // Fungsi utilitas untuk memperbarui warna seluruh layer wilayah secara instan
  const updateLayerStyles = useCallback((activeKey: string | null) => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const featureName = layer.feature?.properties?.PROVINSI || '';
        const key = normalizeProvinceKey(featureName);
        const isSelected = activeKey !== null && key === activeKey;

        layer.setStyle({
          fillColor: isSelected ? '#0A1C3E' : '#000000',
          color: isSelected ? '#0A1C3E' : '#0F2C59',
          weight: isSelected ? 2 : 0.75,
          fillOpacity: isSelected ? 1 : 0.001,
          opacity: isSelected ? 1 : 0.3,
        });

        if (isSelected) {
          layer.bringToFront();
        }
      });
    }
  }, []);

  useEffect(() => {
    selectedProvinceRef.current = selectedProvinceId;
    updateLayerStyles(selectedProvinceId);
  }, [selectedProvinceId, updateLayerStyles]);

  // Pastikan data aktif hanya ada jika ada provinsi yang terpilih
  const activeProvince: ProvinceDetail | null = selectedProvinceId
    ? PROVINCES_DATA[selectedProvinceId] || null
    : null;

  // Filter daftar provinsi untuk autocomplete search
  const filteredProvinces = useMemo(() => {
    const list = Object.values(PROVINCES_DATA);
    if (!searchQuery.trim()) return list;
    return list.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery]);

  // Handler saat memilih provinsi (dari klik peta atau search dropdown)
  const handleSelectProvince = useCallback((provKey: string) => {
    // Sinkronkan ref dan state seketika
    selectedProvinceRef.current = provKey;
    setSelectedProvinceId(provKey);
    setSearchQuery('');
    setIsSearchFocused(false);

    // Ambil koordinat daratan pasti (solid landmass) untuk provinsi ini
    const landCoord = PROVINCE_LAND_COORDINATES[provKey];
    if (landCoord) {
      setPopupPos(landCoord);
    }

    // Langsung aplikasikan warna Navy ke layer yang dipilih
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const featureName = layer.feature?.properties?.PROVINSI || '';
        const key = normalizeProvinceKey(featureName);
        const isSelected = key === provKey;

        layer.setStyle({
          fillColor: isSelected ? '#0A1C3E' : '#000000',
          color: isSelected ? '#0A1C3E' : '#0F2C59',
          weight: isSelected ? 2 : 0.75,
          fillOpacity: isSelected ? 1 : 0.001,
          opacity: isSelected ? 1 : 0.3,
        });

        if (isSelected) {
          layer.bringToFront();
          const bounds = layer.getBounds();
          setSelectedBounds(bounds);
          if (!landCoord) {
            setPopupPos(bounds.getCenter());
          }
        }
      });
    }
  }, []);

  // Reset zoom & kamera kembali ke Indonesia penuh serta HAPUS PILIHAN (Empty State)
  const handleResetMap = useCallback(() => {
    selectedProvinceRef.current = null;
    setSelectedProvinceId(null);
    setSelectedBounds(null);
    setPopupPos(null);
    setSearchQuery('');
    setResetTrigger((prev) => prev + 1);

    // Kembalikan semua provinsi ke style default transparan
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        layer.setStyle({
          fillColor: '#000000',
          color: '#0F2C59',
          weight: 0.75,
          fillOpacity: 0.001,
          opacity: 0.3,
        });
      });
    }
  }, []);

  // Navigasi ke pencarian regulasi provinsi
  const handleNavigatePeraturan = (provName: string) => {
    router.get('/pencarian', { keyword: provName });
  };

  // Styling default setiap polygon provinsi
  const getFeatureStyle = (feature: any) => {
    const provName = feature?.properties?.PROVINSI || '';
    const key = normalizeProvinceKey(provName);
    const isSelected = key === selectedProvinceRef.current;

    return {
      fillColor: isSelected ? '#0A1C3E' : '#000000',
      weight: isSelected ? 2 : 0.75,
      opacity: isSelected ? 1 : 0.3,
      color: isSelected ? '#0A1C3E' : '#0F2C59',
      fillOpacity: isSelected ? 1 : 0.001,
      className: 'cursor-pointer',
    };
  };

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
          target.setStyle({
            fillColor: '#0A1C3E',
            color: '#0A1C3E',
            weight: 1.5,
            fillOpacity: 0.25,
            opacity: 0.8,
          });
          // Tampilkan nama provinsi saat hover murni sebelum di-select
          setHoveredProvinceName(provName);
        }
      },
      mouseout: (e) => {
        const target = e.target;
        // Hapus nama provinsi seketika saat kursor keluar!
        setHoveredProvinceName(null);

        // Jika bukan provinsi yang sedang terpilih, kembalikan ke default transparan
        if (provKey !== selectedProvinceRef.current) {
          target.setStyle({
            fillColor: '#000000',
            color: '#0F2C59',
            weight: 0.75,
            fillOpacity: 0.001,
            opacity: 0.3,
          });
        } else {
          // Jika ini provinsi yang terpilih, blok solid warna pr-900!
          target.setStyle({
            fillColor: '#0A1C3E',
            color: '#0A1C3E',
            weight: 2,
            fillOpacity: 1,
            opacity: 1,
          });
        }
      },
      click: (e) => {
        L.DomEvent.stopPropagation(e);
        setHoveredProvinceName(null);
        handleSelectProvince(provKey);
      },
    });
  };

  return (
    <section className="mt-[66px] w-full">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-[26px] font-bold text-neu-900 tracking-tight">
          Peta Hukum Indonesia
        </h2>
        <p className="text-neu-600 text-md sm:text-[14px] mt-1 max-w-2xl leading-relaxed">
          Klik salah satu provinsi untuk melihat jumlah peraturan dan hukum yang berlaku di wilayah tersebut.
        </p>  
      </div>

      {/* ── Grid Container (Peta Kiri + Sidebar Kanan) Sejajar Garis Bawah ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
        {/* ── MAP CONTAINER (Left) ── responsive height, rounded 20px ── */}
        <div className="lg:col-span-8 xl:col-span-8 w-full h-[400px] sm:h-[460px] lg:h-[520px] bg-[#96C1DF] rounded-[20px] border border-neu-200/80 overflow-hidden relative shadow-sm">
          {/* Leaflet Map Canvas Wrapper dengan event mouse move & leave untuk hover tooltip */}
          <div
            className="w-full h-full relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredProvinceName(null)}
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
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-neu-200/90 shadow-md text-[11px] font-bold text-neu-900 tracking-wide whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-pr-900 inline-block" />
                  <span>{hoveredProvinceName.toUpperCase()}</span>
                </div>
              </div>
            )}

            <MapContainer
              center={[-2.5, 118]}
              zoom={5}
              minZoom={4.6}
              maxZoom={8}
              zoomSnap={0.25}
              zoomDelta={0.5}
              wheelDebounceTime={40}
              wheelPxPerZoomLevel={120}
              scrollWheelZoom={true}
              zoomControl={false}
              attributionControl={false}
              maxBounds={[
                [12, 92],
                [-14, 143],
              ]}
              maxBoundsViscosity={0.8}
              className="w-full h-full bg-[#96C1DF] z-0 focus:outline-none"
            >
              <MapController
                popupPos={popupPos}
                resetTrigger={resetTrigger}
                geoJsonBounds={geoJsonBounds}
                onDeselect={handleResetMap}
                onDragStateChange={handleDragStateChange}
                onMapReady={(map) => {
                  mapRef.current = map;
                }}
              />

              {/* Basemap Fisik Alami: Pulau Hijau & Laut Bersih Tanpa Label Nama Kota/Laut */}
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
                maxZoom={12}
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

              {/* Floating Popup Card saat provinsi dipilih dengan Garis Pin Stem (Sesuai Figma) */}
              {activeProvince && popupPos && (
                <Popup
                  position={popupPos}
                  closeButton={false}
                  autoPan={true}
                  autoPanPadding={[24, 24]}
                  offset={[0, 0]}
                  className="custom-leaflet-popup"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-white rounded-xl shadow-xl border border-neu-200/90 p-3.5 min-w-[200px] select-none">
                      {/* Header Card: NAMA PROVINSI 14px neu-900 | 3090 neu-900 */}
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-neu-100">
                        <span className="text-[12px] font-bold text-neu-900 tracking-wide">
                          {activeProvince.name}
                        </span>
                        <span className="text-[14px] font-bold text-neu-900">
                          {activeProvince.total.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {/* Detail Berlaku & Tidak Berlaku */}
                      <div className="py-2 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-neu-600">
                          <span>Berlaku</span>
                          <span className="font-semibold text-neu-900">
                            {activeProvince.berlaku.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-neu-600">
                          <span>Tidak Berlaku</span>
                          <span className="font-semibold text-neu-900">
                            {activeProvince.tidakBerlaku.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Tombol Lihat Peraturan */}
                      <button
                        type="button"
                        onClick={() => handleNavigatePeraturan(activeProvince.name)}
                        className="w-full mt-1 bg-pr-900 hover:bg-pr-800 text-white rounded-lg py-1.5 px-3 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Peraturan</span>
                      </button>
                    </div>

                    {/* Garis Pin Stem Menunjuk Wilayah Terpilih */}
                    <div className="w-[1.5px] h-6 bg-neu-900" />
                  </div>
                </Popup>
              )}
            </MapContainer>
          </div>

          {/* Indicator Info (Pojok Kiri Bawah) */}
          <div className="absolute bottom-4 left-4 z-[400] flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-neu-200 shadow-sm text-xs text-neu-700 select-none pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-pr-900 inline-block" />
            <span className="text-[12px] sm:text-xs font-medium">
              klik provinsi yang ingin dipilih
            </span>
          </div>

          {/* Zoom & Reset Controls Custom Figma (Pojok Kanan Bawah) */}
          <div className="absolute bottom-4 right-4 z-[400] flex flex-col bg-white rounded-[14px] shadow-md border border-neu-200/80 overflow-hidden select-none">
            <button
              type="button"
              onClick={() => mapRef.current?.zoomIn()}
              title="Perbesar Peta"
              className="p-2 sm:p-2.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div className="w-full h-[1px] bg-neu-100" />
            <button
              type="button"
              onClick={() => mapRef.current?.zoomOut()}
              title="Perkecil Peta"
              className="p-2 sm:p-2.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="w-full h-[1px] bg-neu-100" />
            <button
              type="button"
              onClick={handleResetMap}
              title="Kembali ke Tampilan Awal"
              className="p-2 sm:p-2.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── SIDEBAR PANEL (Right) ── responsive height, auto-fit content cleanly ── */}
        <div className="lg:col-span-4 xl:col-span-4 w-full lg:h-[520px] flex flex-col gap-3">
          {/* ── FORM 1: Top Search Box ── */}
          <div className="bg-white rounded-[20px] border border-neu-50 p-4 shrink-0">
            {/* Header: Pilih Provinsi + Earth Icon */}
            <div className="flex items-center justify-between pb-2.5">
              <h3 className="font-medium text-neu-900 text-[14px]">
                Pilih Provinsi
              </h3>
              <div className="w-8 h-8 rounded-full  flex items-center justify-center text-neu-700 bg-white">
                <Earth className="w-[20px] h-[20px]" />
              </div>
            </div>

            {/* Input Search Provinsi */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neu-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Cari provinsi"
                className="w-full pl-9 pr-4 py-2 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none focus:ring-1 focus:ring-pr-900 focus:border-pr-900 transition-all"
              />

              {/* Dropdown Pencarian Otomatis */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neu-200 rounded-xl shadow-lg max-h-56 overflow-y-auto z-30 py-1">
                  {filteredProvinces.length > 0 ? (
                    filteredProvinces.map((prov) => (
                      <button
                        key={prov.id}
                        type="button"
                        onMouseDown={() => handleSelectProvince(prov.id)}
                        className="w-full text-left px-3.5 py-2 hover:bg-neu-50 text-xs sm:text-sm text-neu-800 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="font-medium">{prov.name}</span>
                        <span className="text-[11px] text-neu-500 font-semibold">
                          {prov.total.toLocaleString('id-ID')}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-neu-500 text-center">
                      Provinsi tidak ditemukan
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── FORM 2: Bottom Info Box ── */}
          <div className="flex-1 bg-white rounded-[20px] border border-neu-50 p-4  flex flex-col justify-between overflow-y-auto">
            {activeProvince ? (
              <div className="space-y-2.5 animate-in fade-in duration-300">
                {/* Header Row: Logo Timbangan + NAMA PROVINSI + Total Regulasi */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-[35px] h-[35px] rounded-lg bg-pr-50 flex items-center justify-center text-pr-900 shrink-0">
                      <Scale className="w-[20px] h-[20px]" />
                    </div>
                    <span className="font-bold text-[13px] sm:text-[14px] text-pr-900 tracking-wide truncate">
                      {activeProvince.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-pr-900 shrink-0 ml-2">
                    <FileText className="w-4 h-4 text-pr-900" />
                    <span className="font-bold text-[13px] sm:text-[14px]">
                      {activeProvince.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Garis Pembatas di Bawah Nama Provinsi */}
                <div className="w-full h-[1px] bg-neu-50" />

                {/* Progress Bar Status Peraturan */}
                <div className="space-y-2">
                  {/* Berlaku */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] sm:text-[12px] mb-1">
                      <span className="text-neu-900 font-medium">Berlaku</span>
                      <span className="text-neu-900 font-bold">
                        {activeProvince.berlaku.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neu-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-suc-800 transition-all duration-500"
                        style={{
                          width: `${Math.round(
                            (activeProvince.berlaku / activeProvince.total) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Tidak Berlaku */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] sm:text-[12px] mb-1">
                      <span className="text-neu-900 font-medium">Tidak Berlaku</span>
                      <span className="text-neu-900 font-bold">
                        {activeProvince.tidakBerlaku.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-dan-50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-dan-800 transition-all duration-500"
                        style={{
                          width: `${Math.round(
                            (activeProvince.tidakBerlaku / activeProvince.total) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Garis Pembatas di Bawah Tidak Berlaku */}
                <div className="w-full h-[1px] bg-neu-100" />

                {/* Peraturan Daerah Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-bold text-neu-900">Peraturan Daerah</span>
                    <button
                      type="button"
                      onClick={() => handleNavigatePeraturan(activeProvince.name)}
                      className="text-neu-600 hover:text-pr-900 font-medium transition-colors flex items-center gap-0.5 text-[11px] cursor-pointer"
                    >
                      Lihat semua
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Detail Perda */}
                  <div className="p-3 rounded-xl  bg-white space-y-2 shadow-sm">
                    {/* Badge Status */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-suc-50 text-suc-800 border border-suc-200 text-[10px] font-semibold">
                      <CircleCheckBig className="w-3 h-3 text-suc-800" />
                      <span>{activeProvince.samplePerda.status}</span>
                    </div>

                    {/* Judul Perda */}
                    <p className="text-[11px] sm:text-[12px] text-neu-800 font-medium line-clamp-2 leading-relaxed">
                      {activeProvince.samplePerda.nomor}{' '}
                      {activeProvince.samplePerda.tentang}
                    </p>

                    {/* Tombol Lihat Detail */}
                    <button
                      type="button"
                      onClick={() => handleNavigatePeraturan(activeProvince.name)}
                      className="w-full bg-[#E8EDF4] hover:bg-[#DCE3ED] text-pr-900 text-[12px] font-normal py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* KONDISI 2: BELUM ADA PROVINSI DIPILIH (EMPTY STATE) */
              <div className="flex flex-col items-center justify-center text-center my-auto py-8 px-4">
                <div className="w-12 h-12 rounded-[18px] bg-white border border-neu-100 flex items-center justify-center text-neu-400 mb-3">
                  <Earth className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h4 className="font-medium text-[14px] text-neu-900 mb-1">
                  Belum ada provinsi yang dipilih
                </h4>
                <p className="text-[12px] text-neu-200 max-w-[240px] leading-relaxed">
                  Silakan klik salah satu provinsi pada peta atau pencarian untuk menampilkan jumlah peraturan
                </p>
              </div>
            )}

            {/* Tombol Footer: Lihat Lainnya (Aktif jika ada provinsi) */}
            {activeProvince && (
              <div className="pt-2.5">
                <button
                  type="button"
                  onClick={() => handleNavigatePeraturan(activeProvince.name)}
                  className="w-full bg-pr-900 hover:bg-pr-800 text-white rounded-xl py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Lainnya</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
