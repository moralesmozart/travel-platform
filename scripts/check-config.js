#!/usr/bin/env node

/**
 * Script para verificar la configuración antes del build
 * Ejecutar con: node scripts/check-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto...\n');

// Verificar archivos de configuración
const configFiles = [
  'src/config/config.ts',
  'src/config/supabase.ts',
  'src/config/auth.ts'
];

let configOk = true;

configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Existe`);
  } else {
    console.log(`❌ ${file} - No existe`);
    configOk = false;
  }
});

// Verificar variables de entorno en .env.local
const envFile = '.env.local';
if (fs.existsSync(envFile)) {
  console.log(`✅ ${envFile} - Existe (desarrollo local)`);
  
  const envContent = fs.readFileSync(envFile, 'utf8');
  const hasSupabaseUrl = envContent.includes('REACT_APP_SUPABASE_URL');
  const hasSupabaseKey = envContent.includes('REACT_APP_SUPABASE_ANON_KEY');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ Variables de Supabase configuradas en .env.local');
  } else {
    console.log('⚠️  Variables de Supabase incompletas en .env.local');
  }
} else {
  console.log(`⚠️  ${envFile} - No existe (usando configuración de producción)`);
}

// Verificar package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log(`✅ package.json - Versión ${packageJson.version}`);

// Verificar dependencias críticas
const criticalDeps = ['@supabase/supabase-js', 'react', 'typescript'];
criticalDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep} - Instalado`);
  } else {
    console.log(`❌ ${dep} - No instalado`);
    configOk = false;
  }
});

console.log('\n📋 Resumen de la configuración:');

if (configOk) {
  console.log('🎉 ¡Configuración correcta! El proyecto está listo para build.');
  console.log('\n🚀 Para hacer build:');
  console.log('   npm run build');
  console.log('\n🌐 Para desplegar:');
  console.log('   npm run deploy');
} else {
  console.log('❌ Hay problemas en la configuración. Revisa los errores arriba.');
  console.log('\n📚 Ver archivo CONFIGURATION.md para ayuda.');
  process.exit(1);
}

console.log('\n📚 Documentación disponible:');
console.log('   - README.md - Documentación principal');
console.log('   - CONFIGURATION.md - Guía de configuración');
console.log('   - env.example - Ejemplo de variables de entorno');
