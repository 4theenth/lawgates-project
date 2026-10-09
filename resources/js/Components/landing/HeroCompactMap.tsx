import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { MapContainer, GeoJSON, TileLayer, useMap } from 'react-leaflet';
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

function MiniMapController({
  onMapReady,
  geoJsonBounds,
}: {
  onMapReady: (map: L.Map) => void;
  geoJsonBounds: L.LatLngBounds | null;
}) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  useEffect(() => {
    if (geoJsonBounds && !fitted.current) {
      fitted.current = true;
      map.fitBounds(geoJsonBounds, {
        padding: [10, 10],
        animate: false,
      });
    }
  }, [geoJsonBounds, map]);

  return null;
}

export function HeroCompactMap() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('bali');
  const [geoJsonBounds, setGeoJsonBounds] = useState<L.LatLngBounds | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const activeProvince: ProvinceDetail | null = PROVINCES_DATA[selectedProvinceId] || PROVINCES_DATA['bali'];

  const getFeatureStyle = useCallback((feature: any) => {
    const provName = feature?.properties?.PROVINSI || '';
    const key = normalizeProvinceKey(provName);
    const isSelected = key === selectedProvinceId;

    return isSelected ? MAP_THEME.province.selected : MAP_THEME.province.default;
  }, [selectedProvinceId]);

  const updateStyles = useCallback((activeKey: string) => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: any) => {
        const featureName = layer.feature?.properties?.PROVINSI || '';
        const key = normalizeProvinceKey(featureName);
        const isSelected = key === activeKey;

        layer.setStyle(isSelected ? MAP_THEME.province.selected : MAP_THEME.province.default);
        if (isSelected && typeof layer.bringToFront === 'function') {
          layer.bringToFront();
        }
      });
    }
  }, []);

  useEffect(() => {
    updateStyles(selectedProvinceId);
  }, [selectedProvinceId, updateStyles]);

  const handleSelectProvince = (provKey: string) => {
    setSelectedProvinceId(provKey);
    const landCoord = PROVINCE_LAND_COORDINATES[provKey];
    if (mapRef.current && landCoord) {
      mapRef.current.setView(landCoord, 5.5, { animate: true, duration: 0.4 });
    }
  };

  const handleReset = () => {
    setSelectedProvinceId('bali');
    if (mapRef.current && geoJsonBounds) {
      mapRef.current.fitBounds(geoJsonBounds, { padding: [10, 10], animate: true });
    }
  };

  const onEachFeature = (feature: any, layer: any) => {
    const provName = feature.properties?.PROVINSI || '';
    const key = normalizeProvinceKey(provName);

    layer.on({
      click: (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e);
        handleSelectProvince(key);
      },
      mouseover: () => {
        if (key !== selectedProvinceId) {
          layer.setStyle(MAP_THEME.province.hover);
        }
      },
      mouseout: () => {
        if (key !== selectedProvinceId) {
          layer.setStyle(MAP_THEME.province.default);
        }
      },
    });
  };

  return (
    <div className="relative w-full max-w-[525px] h-[257px] bg-[#0A1C3E] rounded-[20px] overflow-hidden border border-white/10 shadow-inner">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={4.5}
        minZoom={3.5}
        maxZoom={8}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full bg-[#07132B]"
        style={{ width: '100%', height: '100%', background: '#07132B' }}
      >
        <MiniMapController
          onMapReady={(map) => {
            mapRef.current = map;
          }}
          geoJsonBounds={geoJsonBounds}
        />

        <TileLayer
          url="https://{s}.google.com/vt/lyrs=p&apistyle=s.e:l%7Cp.v:off,s.t:2%7Cs.e:l%7Cp.v:on&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          maxZoom={20}
        />

        <GeoJSON
          data={NEIGHBORING_COUNTRIES as any}
          style={{
            fillColor: '#1A2744',
            fillOpacity: 0.5,
            weight: 0.5,
            color: '#2A3B60',
            opacity: 0.4,
          }}
          interactive={false}
        />

        <GeoJSON
          ref={(instance) => {
            geoJsonRef.current = instance;
            if (instance && !geoJsonBounds) {
              setGeoJsonBounds(instance.getBounds());
            }
            if (instance) {
              updateStyles(selectedProvinceId);
            }
          }}
          data={INDONESIA_GEOJSON as any}
          style={getFeatureStyle}
          onEachFeature={onEachFeature}
        />

        <GeoJSON
          data={INDONESIA_LAND_BORDERS as any}
          style={{
            color: '#ffffff',
            weight: 1,
            opacity: 0.3,
          }}
          interactive={false}
        />
      </MapContainer>

      {/* ── Tooltip Chip (Pojok Kiri Bawah) Sesuai Figma node #2358:57214 ── */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white rounded-[12px] px-3 py-2 shadow-md border border-neu-100 flex flex-col gap-0.5 select-none pointer-events-none min-w-[110px]">
        <div className="flex items-center gap-1.5 text-[10px] text-neu-600 font-normal">
          <span className="w-2 h-2 rounded-full bg-pr-900 inline-block" />
          <span>Provinsi dipilih</span>
        </div>
        <div className="text-[13px] font-medium text-neu-900">{activeProvince?.name || 'Bali'}</div>
        <div className="text-[11px] font-normal text-black">
          {(activeProvince?.total || 3090).toLocaleString('id-ID')} Peraturan
        </div>
      </div>

      {/* ── Zoom Controls (Pojok Kanan Bawah) ── */}
      <div className="absolute bottom-3 right-3 z-[400] flex flex-col bg-white rounded-[12px] shadow-md border border-neu-200/80 overflow-hidden select-none">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          title="Perbesar"
          className="p-1.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <div className="w-full h-[1px] bg-neu-100" />
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          title="Perkecil"
          className="p-1.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="w-full h-[1px] bg-neu-100" />
        <button
          type="button"
          onClick={handleReset}
          title="Reset"
          className="p-1.5 hover:bg-neu-100 text-neu-800 transition-colors flex items-center justify-center cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default HeroCompactMap;
