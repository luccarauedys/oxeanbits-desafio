export const formatDateFromInput = (inputDate) => {
  // Essa inputDate vem no formato ANO-MES-DIA. Exemplo: 2024-03-20.
  const date = new Date(inputDate);
  const formatedDate = date.toLocaleString("pt-BR", { timeZone: "UTC" }); // 20/03/2024, 00:00:00
  return formatedDate.split(",")[0];
};
