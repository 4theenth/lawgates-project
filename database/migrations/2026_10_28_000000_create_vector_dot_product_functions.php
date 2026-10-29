<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            // 1. Fungsi dot_product untuk array float8[]
            DB::statement('
                CREATE OR REPLACE FUNCTION dot_product(a float8[], b float8[])
                RETURNS float8 AS $$
                DECLARE
                    total float8 := 0;
                    i int;
                BEGIN
                    IF a IS NULL OR b IS NULL THEN
                        RETURN 0;
                    END IF;
                    FOR i IN 1 .. array_length(a, 1) LOOP
                        total := total + (a[i] * b[i]);
                    END LOOP;
                    RETURN total;
                END;
                $$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;
            ');

            // 2. Fungsi dot_product untuk kolom bertipe JSON
            DB::statement("
                CREATE OR REPLACE FUNCTION dot_product(a json, b float8[])
                RETURNS float8 AS $$
                DECLARE
                    total float8 := 0;
                    arr float8[];
                    i int;
                BEGIN
                    IF a IS NULL OR b IS NULL THEN
                        RETURN 0;
                    END IF;
                    arr := translate(a::text, '[]', '{}')::float8[];
                    FOR i IN 1 .. array_length(arr, 1) LOOP
                        total := total + (arr[i] * b[i]);
                    END LOOP;
                    RETURN total;
                END;
                $$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;
            ");

            // 3. Fungsi dot_product untuk kolom bertipe JSONB
            DB::statement("
                CREATE OR REPLACE FUNCTION dot_product(a jsonb, b float8[])
                RETURNS float8 AS $$
                DECLARE
                    total float8 := 0;
                    arr float8[];
                    i int;
                BEGIN
                    IF a IS NULL OR b IS NULL THEN
                        RETURN 0;
                    END IF;
                    arr := translate(a::text, '[]', '{}')::float8[];
                    FOR i IN 1 .. array_length(arr, 1) LOOP
                        total := total + (arr[i] * b[i]);
                    END LOOP;
                    RETURN total;
                END;
                $$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;
            ");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('DROP FUNCTION IF EXISTS dot_product(float8[], float8[]);');
            DB::statement('DROP FUNCTION IF EXISTS dot_product(json, float8[]);');
            DB::statement('DROP FUNCTION IF EXISTS dot_product(jsonb, float8[]);');
        }
    }
};
