# Setup Redis

Note: *Kalo lagi di local/dev pake database aja biar ngga ribet. Kalo mau tes redisnya bisa download dengan tutorial berikut ini. Lalu ini akan pasti digunakan ketika sudah masuk ke production.*

## 1. Cek prasyarat

```powershell
php -m | Select-String redis
```

Harus muncul `redis`. Kalau tidak, aktifkan `extension=redis` di `php.ini`.

---

## 2. Tutor (piliih salah satu)

### A. Docker (rekomendasi)

Service Redis sudah tersedia di `docker-compose.yml` repositori ini.

```powershell
docker compose up -d redis
```

Konfigurasinya:

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: lawgates-redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  redisdata:
    name: lawgates-project_redisdata
```

Kalau hanya butuh Redis tanpa service lain, simpan potongan di atas sebagai
`docker-compose.redis.yml`, lalu:

```powershell
docker compose -f docker-compose.redis.yml up -d
```

Perintah harian (opsional, lngsung cek di docker aja lngsung klo make app desktopnya):

```powershell
docker compose ps                      # cek status
docker compose logs -f redis           # lihat log
docker compose stop redis              # stop, data tetap ada
docker compose down -v                 # stop + hapus volume (cache hilang)
```

### B. Laragon

```powershell
cd D:\laragon\bin\redis\redis-x64-5.0.14.1
.\redis-server.exe redis.windows.conf
```

Auto-start (PowerShell **Administrator**):

```powershell
.\redis-server.exe --service-install redis.windows.conf --loglevel verbose
.\redis-server.exe --service-start
```

### C. WSL2

```powershell
wsl --install -d Ubuntu
```

```bash
sudo apt install redis-server -y
sudo service redis-server start
```

### D. Chocolatey / Scoop

```powershell
choco install redis-64
```

```powershell
scoop install redis
```

---

## 3. Set `.env`

```env
CACHE_STORE=redis
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=null
```

---

## 4. Clear config + restart server

```powershell
php artisan config:clear
php artisan cache:clear
```

Restart `php artisan serve`. Tanpa ini config lama masih dipakai.

---

## 5. Verifikasi

```powershell
Test-NetConnection 127.0.0.1 -Port 6379
docker exec lawgates-redis redis-cli ping      # khusus Docker: harus PONG
php artisan config:show cache.default
php artisan tinker --execute="echo cache()->put('t',1) ? 'OK' : 'FAIL';"
```

---

## 6. Batal pakai Redis

```env
CACHE_STORE=database
```

```powershell
php artisan config:clear
```

Restart `php artisan serve`.
