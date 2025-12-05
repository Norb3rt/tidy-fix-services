# Script para migrar a PostgreSQL y sembrar datos
Write-Host "🔄 Iniciando migración a PostgreSQL..." -ForegroundColor Cyan

# Paso 1: Generar cliente Prisma
Write-Host "`n📦 Generando cliente Prisma..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al generar el cliente Prisma" -ForegroundColor Red
    Write-Host "⚠️  Si el servidor está corriendo, deténlo y ejecuta este script de nuevo" -ForegroundColor Yellow
    exit 1
}

# Paso 2: Ejecutar seed
Write-Host "`n🌱 Sembrando usuario admin..." -ForegroundColor Yellow
npx prisma db seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al sembrar la base de datos" -ForegroundColor Red
    exit 1
}

# Paso 3: Verificar estado
Write-Host "`n✅ Verificando estado de la base de datos..." -ForegroundColor Yellow
npx prisma migrate status

Write-Host "`n✨ ¡Migración completada exitosamente!" -ForegroundColor Green
Write-Host "`n📋 Resumen:" -ForegroundColor Cyan
Write-Host "  ✓ Cliente Prisma generado" -ForegroundColor Green
Write-Host "  ✓ Usuario admin creado (norbertnnunez@gmail.com / Miah1121)" -ForegroundColor Green
Write-Host "  ✓ Base de datos PostgreSQL lista" -ForegroundColor Green
Write-Host "`n🚀 Puedes iniciar el servidor con: npm run dev" -ForegroundColor Cyan
