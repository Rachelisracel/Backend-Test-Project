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


function isValidDate(dateStr: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return false;
    }

    const [y, m, d] = dateStr.split("-").map(Number);

    const dateObj = new Date(
        Date.UTC(y, m - 1, d)
    );

    return (
        dateObj.getUTCFullYear() === y &&
        dateObj.getUTCMonth() === m - 1 &&
        dateObj.getUTCDate() === d
    );
}


function toTimestamp(dateStr: string): number {
    const [y, m, d] = dateStr.split("-").map(Number);

    return Date.UTC(y, m - 1, d);
}


function toDateString(timestamp: number): string {
    return new Date(timestamp)
        .toISOString()
        .split("T")[0];
}


export function generateSchedule(
    input: ScheduleInput
): ScheduleOutput {

    const {
        startDate,
        totalClasses,
        classWeekdays,
        holidays,
        holidayRanges
    } = input;


    if (totalClasses < 1) {
        throw new Error(
            "Validation Error: totalClasses phải >= 1"
        );
    }


    if (!isValidDate(startDate)) {
        throw new Error(
            "Validation Error: startDate sai format YYYY-MM-DD"
        );
    }


    const normalizedWeekdays =
        Array.from(
            new Set(classWeekdays)
        ).sort((a, b) => a - b);


    const holidaySet = new Set<number>();


    for (const h of holidays) {

        if (!isValidDate(h)) {
            throw new Error(
                `Validation Error: holiday ${h} sai format`
            );
        }

        holidaySet.add(
            toTimestamp(h)
        );
    }


    const rangesTs: [number, number][] =
        holidayRanges.map(range => {

            if (
                !isValidDate(range[0]) ||
                !isValidDate(range[1])
            ) {
                throw new Error(
                    "Validation Error: holidayRange sai format"
                );
            }

            return [
                toTimestamp(range[0]),
                toTimestamp(range[1])
            ];
        });


    const fullSchedule: string[] = [];

    const ONE_DAY_MS =
        24 * 60 * 60 * 1000;

    let currentTs =
        toTimestamp(startDate);


    while (
        fullSchedule.length < totalClasses
    ) {

        const dateObj =
            new Date(currentTs);


        const customDay =
            (dateObj.getUTCDay() + 6) % 7;


        if (
            normalizedWeekdays.includes(
                customDay
            )
        ) {

            const isHoliday =
                holidaySet.has(currentTs);


            const isInHolidayRange =
                rangesTs.some(
                    range =>
                        currentTs >= range[0] &&
                        currentTs <= range[1]
                );


            if (
                !isHoliday &&
                !isInHolidayRange
            ) {

                fullSchedule.push(
                    toDateString(currentTs)
                );
            }
        }


        currentTs += ONE_DAY_MS;
    }


    return {
        endDate:
            fullSchedule[
                fullSchedule.length - 1
            ],

        fullSchedule
    };
}