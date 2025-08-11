export function formatCurrency(val) {
  return val
    ? new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(val)
    : "0 đ";
}

export function formatDateTime(val) {
   if (!val) return "Vừa xong"
  const date = new Date(val)
  return isNaN(date.getTime())
    ? "Vừa xong"
    : date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
}
