
type CourseType = "MONTHLY" | "FULL_COURSE";
type PromoCode = "SAVE10" | "FLAT50K" | null;

interface InvoiceOutput {
  subtotal: number;
  discount: number;
  refund: number;
  total: number;
}

// Hàm chính
export function calcInvoice(
  courseType: CourseType,
  basePrice: number,
  months: number | null | undefined,
  promoCode: PromoCode,
  canceledClasses: number,
  refundPerClass: number
): InvoiceOutput {
  

  
  // Kiểm tra các giá trị tiền và số lượng không được âm
  if (basePrice < 0 || canceledClasses < 0 || refundPerClass < 0) {
    throw new Error("Validation Error: basePrice, canceledClasses, và refundPerClass phải >= 0");
  }

  // Kiểm tra số tháng nếu gói là MONTHLY
  if (courseType === "MONTHLY") {
    if (months === undefined || months === null || months < 1 || months > 3) {
      throw new Error("Validation Error: Gói MONTHLY yêu cầu số tháng (months) từ 1 đến 3");
    }
  }

  // Kiểm tra mã khuyến mãi hợp lệ
  if (promoCode !== "SAVE10" && promoCode !== "FLAT50K" && promoCode !== null) {
    throw new Error("Validation Error: promoCode không hợp lệ");
  }

  //Tính tổng 
  let subtotal = 0;
  if (courseType === "MONTHLY") {
    subtotal = basePrice * (months as number);
  } else if (courseType === "FULL_COURSE") {
    subtotal = basePrice;
  }

  //Tính tiền khuyến mãi
  let discount = 0;
  if (promoCode === "SAVE10") {
    discount = Math.floor(0.10 * subtotal);
  } else if (promoCode === "FLAT50K") {
    discount = 50000; 
  }
  
  // không cho tiền giảm lớn hơn tiền học  
  discount = Math.min(discount, subtotal); 

  //Tính tiền hoàn và tổng thu
  const refund = canceledClasses * refundPerClass;
  
  let total = subtotal - discount - refund;
  
  // tổng tiền không được nhỏ hơn 0
  total = Math.max(0, total);

  return {
    subtotal,
    discount,
    refund,
    total
  };
}


