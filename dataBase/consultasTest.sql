use fotoTren;
select * from Imagen;
select * from Publicacion;
select * from tipoTren;
select * from Tren;
select * from Usuario;
select * from Foro;
-- Todos los datos
select * from Publicacion as pub  join Tren as tren on tren.trenId=pub.trenId join tipoTren as tip on tip.tipoTren=tren.tipoTren; 

select * from Imagen as img join Publicacion as pub on img.pubId=pub.pubId where pub.pubId=1 order by img.imgId asc  ;




select * from Imagen as img join Publicacion as pub on img.pubId=pub.pubId  ;



