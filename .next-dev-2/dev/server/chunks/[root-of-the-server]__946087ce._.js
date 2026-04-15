module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/server/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function createPool() {
    const sslMode = (process.env.PGSSLMODE ?? "disable").toLowerCase();
    const useSsl = sslMode === "require" || sslMode === "verify-ca" || sslMode === "verify-full";
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
        host: process.env.PGHOST,
        port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        ssl: useSsl ? {
            rejectUnauthorized: sslMode !== "require"
        } : false
    });
}
const pool = global.__rutarentaPool ?? createPool();
if ("TURBOPACK compile-time truthy", 1) {
    global.__rutarentaPool = pool;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/app-data/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/server/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const runtime = "nodejs";
function toUiStatus(estatus) {
    switch(estatus){
        case "completado":
            return "Listo";
        case "pendiente":
            return "Pendiente";
        case "cerrado":
            return "Cerrado";
        case "material_estorbando":
            return "Material Estorbando";
        case "notas":
        case "en_proceso":
            return "Notas";
        default:
            return "Pendiente";
    }
}
async function GET() {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`
      DO $$
      BEGIN
        BEGIN
          ALTER TYPE renta.estatus_ruta ADD VALUE IF NOT EXISTS 'cerrado';
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;

        BEGIN
          ALTER TYPE renta.estatus_ruta ADD VALUE IF NOT EXISTS 'material_estorbando';
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;

        BEGIN
          ALTER TYPE renta.estatus_ruta ADD VALUE IF NOT EXISTS 'notas';
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;
      END
      $$;
    `);
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`
      UPDATE renta.registros_ruta
      SET
        estatus = CASE
          WHEN notas LIKE '__RR_STATUS__:cerrado%' THEN 'cerrado'::renta.estatus_ruta
          WHEN notas LIKE '__RR_STATUS__:material_estorbando%' THEN 'material_estorbando'::renta.estatus_ruta
          WHEN notas LIKE '__RR_STATUS__:notas%' THEN 'notas'::renta.estatus_ruta
          ELSE estatus
        END,
        notas = regexp_replace(notas, '^__RR_STATUS__:[^\n]*\n?', '')
      WHERE notas LIKE '__RR_STATUS__:%'
    `);
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`
      WITH source_days AS (
        SELECT
          o.id AS orden_id,
          o.cliente_nombre AS cliente,
          o.domicilio AS ubicacion,
          COALESCE(o.notas, '') AS notas,
          CASE
            WHEN o.estado = 'terminado' THEN 'completado'::renta.estatus_ruta
            WHEN o.estado = 'cancelado' THEN 'en_proceso'::renta.estatus_ruta
            ELSE 'pendiente'::renta.estatus_ruta
          END AS estatus,
          o.ruta,
          CASE
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'lunes' THEN 'Lunes'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'martes' THEN 'Martes'
            WHEN LOWER(BTRIM(day_token.raw_day)) IN ('miercoles', 'miércoles') THEN 'Miercoles'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'jueves' THEN 'Jueves'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'viernes' THEN 'Viernes'
            WHEN LOWER(BTRIM(day_token.raw_day)) IN ('sabado', 'sábado') THEN 'Sabado'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'domingo' THEN 'Domingo'
            ELSE 'Lunes'
          END AS dia
        FROM renta.ordenes o
        CROSS JOIN LATERAL regexp_split_to_table(COALESCE(NULLIF(o.frecuencia, ''), 'Lunes'), ',') AS day_token(raw_day)
      ),
      missing_days AS (
        SELECT s.*
        FROM source_days s
        WHERE NOT EXISTS (
          SELECT 1
          FROM renta.registros_ruta r
          WHERE r.orden_id = s.orden_id AND r.dia = s.dia
        )
      )
      INSERT INTO renta.registros_ruta
        (
          id,
          orden_id,
          cliente,
          ubicacion,
          notas,
          estatus,
          ruta,
          dia,
          fecha
        )
      SELECT
        COALESCE((SELECT MAX(id) FROM renta.registros_ruta), 0) + ROW_NUMBER() OVER (ORDER BY orden_id, dia) AS id,
        orden_id,
        cliente,
        ubicacion,
        notas,
        estatus,
        ruta,
        dia,
        CURRENT_DATE AS fecha
      FROM missing_days
    `);
    const [clientsResult, routesResult] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`
        SELECT id, nombre, empresa, telefono, email, domicilio
        FROM renta.clientes
        ORDER BY id ASC
      `),
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`
        SELECT
          id,
          cliente,
          ubicacion,
          notas,
          estatus,
          evidencia1,
          evidencia2,
          evidencia3,
          evidencia4,
          evidencia5,
          firma,
          TO_CHAR(hora_firma, 'HH24:MI') AS hora_firma,
          ruta,
          dia
        FROM renta.registros_ruta
        ORDER BY ruta ASC, dia ASC, id ASC
      `)
    ]);
    const clients = clientsResult.rows.map((row)=>({
            id: row.id,
            nombre: row.nombre,
            empresa: row.empresa,
            telefono: row.telefono ?? "",
            email: row.email ?? "",
            direccion: row.domicilio,
            activo: true
        }));
    const routes = {};
    for (const row of routesResult.rows){
        const routeKey = String(row.ruta);
        if (!routes[routeKey]) {
            routes[routeKey] = {};
        }
        if (!routes[routeKey][row.dia]) {
            routes[routeKey][row.dia] = [];
        }
        routes[routeKey][row.dia].push({
            id: row.id,
            cliente: row.cliente,
            ubicacion: row.ubicacion,
            notas: row.notas ?? "",
            estatus: toUiStatus(row.estatus),
            evidencia1: row.evidencia1,
            evidencia2: row.evidencia2,
            evidencia3: row.evidencia3,
            evidencia4: row.evidencia4,
            evidencia5: row.evidencia5,
            firma: row.firma,
            hora_firma: row.hora_firma
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        clients,
        routes
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__946087ce._.js.map