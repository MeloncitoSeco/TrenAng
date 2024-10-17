use fotoTren;
SELECT * FROM Publicacion;
SELECT * FROM Publicacion WHERE pubId =1;

select * from imagen;
select * from publicacion;
select * from tipotren;
select * from tren;
select * from usuario;

select * from publicacion as pub  join tren as tren on tren.trenId=pub.trenId join tipotren as tip on tip.tipoTren=tren.tipoTren; 
select * from imagen as img join publicacion as pub on img.pubId=pub.pubId where pub.pubId=1 order by img.imgId asc limit 1 ;
select * from imagen as img join publicacion as pub where pub.pubId=2 order by img.imgId asc limit 1 ;

