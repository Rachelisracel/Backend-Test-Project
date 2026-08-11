# API List

## 1. Generate Schedule

### POST /schedule/generate

Tạo lịch học dựa trên ngày bắt đầu, số buổi học,
ngày học trong tuần và ngày nghỉ.

### Request

```json
{
  "startDate": "2026-01-01",
  "totalClasses": 16,
  "classWeekdays": [1, 3],
  "holidays": [
    "2026-04-30",
    "2026-05-01"
  ],
  "holidayRanges": [
    ["2026-01-26", "2026-02-05"]
  ]
}