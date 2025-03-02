export const formatData = (data) => {
    const { uf, dolar, euro, fecha } = data;
    return {
        fecha,
        uf: uf.valor,
        dolar: dolar.valor,
        euro: euro.valor
    }
}