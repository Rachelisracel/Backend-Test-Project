
type HolidayRange = [string, string];

interface ScheduleInput {
  startDate: string;
  totalClasses: number;
  classWeekdays: number[];
  holidays: string[];
  holidayRanges: HolidayRange[];
}

interface ScheduleOutput {
  endDate: string;
  fullSchedule: string[];
}

//Hàm xử lý Edge case
// 1. Kiểm tra format YYYY-MM-DD và ngày có hợp lệ không 
function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  return dateObj.getUTCFullYear() === y && 
         dateObj.getUTCMonth() === m - 1 && 
         dateObj.getUTCDate() === d;
}

// 2. Chuyển đổi sang Timestamp UTC 
function toTimestamp(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

// 3. Chuyển Timestamp UTC về lại chuỗi YYYY-MM-DD
function toDateString(timestamp: number): string {
  return new Date(timestamp).toISOString().split('T')[0];
}

//Hàm chính

export function generateSchedule(input: ScheduleInput): ScheduleOutput {
  const { startDate, totalClasses, classWeekdays, holidays, holidayRanges } = input;

  // Validation 
  if (totalClasses < 1) throw new Error("Validation Error: totalClasses phải >= 1");
  if (!isValidDate(startDate)) throw new Error("Validation Error: startDate sai format YYYY-MM-DD");

  // (Edge case)
  // Loại bỏ trùng lặp và sắp xếp lại mảng classWeekdays
  const normalizedWeekdays = Array.from(new Set(classWeekdays)).sort((a, b) => a - b);
  
  // Chuyển holidays thành Set chứa timestamp để tra cứu nhanh O(1)
  const holidaySet = new Set<number>();
  for (const h of holidays) {
    if (!isValidDate(h)) throw new Error(`Validation Error: holiday ${h} sai format`);
    holidaySet.add(toTimestamp(h));
  }

  // Chuyển holidayRanges thành mảng chứa [startTimestamp, endTimestamp]
  const rangesTs: [number, number][] = holidayRanges.map(range => {
    if (!isValidDate(range[0]) || !isValidDate(range[1])) {
       throw new Error(`Validation Error: holidayRange sai format`);
    }
    return [toTimestamp(range[0]), toTimestamp(range[1])];
  });

  // Thuật toán quét lịch 
  const fullSchedule: string[] = [];
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  let currentTs = toTimestamp(startDate);

  // Quét cho đến khi đủ tổng số buổi học
  while (fullSchedule.length < totalClasses) {
    const dateObj = new Date(currentTs);
    
    // JS getDay(): 0=Sun, 1=Mon... -> Chuyển sang quy ước đề bài: 0=Mon ... 6=Sun
    const customDay = (dateObj.getUTCDay() + 6) % 7; 

    // Điều kiện 1: Có thuộc ngày học trong tuần không?
    if (normalizedWeekdays.includes(customDay)) {
      
      // Điều kiện 2 & 3: Kiểm tra có rơi vào ngày lễ lẻ hoặc kỳ nghỉ dài không?
      const isHolidayStr = holidaySet.has(currentTs);
      const isInHolidayRange = rangesTs.some(range => currentTs >= range[0] && currentTs <= range[1]);

      // Nếu KHÔNG vướng ngày nghỉ nào -> Thêm vào lịch học
      if (!isHolidayStr && !isInHolidayRange) {
        fullSchedule.push(toDateString(currentTs));
      }
    }
    
    currentTs += ONE_DAY_MS;
  }

 
  return {
    endDate: fullSchedule[fullSchedule.length - 1],
    fullSchedule: fullSchedule
  };
}

// test
try {
  const result = generateSchedule({
    startDate: "2026-04-01",
    totalClasses: 10,
    classWeekdays: [1, 3],
    holidays: ["2026-04-16"],
    holidayRanges: [
      ["2026-04-30", "2026-05-05"]
    ]
  });

  console.log("=== KẾT QUẢ TẠO LỊCH ===");
  console.log("Ngày kết thúc:", result.endDate);
  console.log("Lịch chi tiết:", result.fullSchedule);
} catch (error: any) {
  console.error(error.message);
}