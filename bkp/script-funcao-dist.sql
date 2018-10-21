CREATE OR REPLACE FUNCTION public.gc_dist(double precision, double precision)
 RETURNS TABLE(distance double precision)
 LANGUAGE plpgsql
AS $function$
DECLARE var_r RECORD;  
BEGIN
	FOR var_r IN (SELECT * FROM pets)
	LOOP 
		distance := ACOS(SIN(var_r.lat)*SIN($1)+COS(var_r.lat)*COS($1)*COS($2-var_r.lon))*6371;    
		RETURN NEXT;
	END LOOP;
END;
$function$

