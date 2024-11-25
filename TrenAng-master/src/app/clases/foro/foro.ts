export class Foro {
    constructor(
        public idComentario: number | null,
        public Texto: string,
        public Creador: string,
        public PId: number | null
      ) {}
    }