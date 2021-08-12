export class LaunchModel {
  constructor(
    public id: string,
    public dtLancamento: string,
    public observacao: string,
    public tpDespesa: string,
    public tpLancamento: string,
    public usuarioId: string,
    public valor: string
  ) {}
}
