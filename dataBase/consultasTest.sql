use fotoTren;
select * from imagen;
select * from publicacion;
select * from tipotren;
select * from tren;
select * from usuario;
-- Todos los datos
select * from publicacion as pub  join tren as tren on tren.trenId=pub.trenId join tipotren as tip on tip.tipoTren=tren.tipoTren; 

select * from imagen as img join publicacion as pub on img.pubId=pub.pubId where pub.pubId=1 order by img.imgId asc  ;




select * from imagen as img join publicacion as pub on img.pubId=pub.pubId group by pub.pubId  ;





