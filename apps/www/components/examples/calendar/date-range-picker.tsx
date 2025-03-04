"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";

interface PopupProps {
  stepOne: boolean;
  setStepOne: (open: boolean) => void;
}

export function CalendarDateRangePicker() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [inputDayValue, setinputDayValue] = React.useState<string>('');
  const [inputMonthValue, setinputMonthValue] = React.useState<string>('');
  const [inputYearValue, setinputYearValue] = React.useState<string>('');

  function handleDayInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    if (value) value = checkValue(value, 31);
    const dayNumber = value.replace(/[^\d]/g, '');
    const limitedDeyNumber = dayNumber.slice(0, 2);
    setinputDayValue(limitedDeyNumber);
  };


  function handleMonthInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    if (value) value = checkValue(value, 12);
    const monthNumber = value.replace(/[^\d]/g, '');
    const limitedMonthNumber = monthNumber.slice(0, 2);
    setinputMonthValue(limitedMonthNumber);
  };

  function handleYearInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    const d = (new Date().getFullYear() % 100);
    if (value.length <= 4) {
      if (value.length === 2 && Number(value) > d + 5) {
        setinputYearValue(19 + value);
      } else if (value.length === 2 && Number(value) < d + 5 && value !== '20') {
        setinputYearValue(20 + value);
      } else if (value.length === 4 && Number(value?.slice(2, 4)) > d + 5) {
        const maxYear: any = new Date().getFullYear() + 5
        setinputYearValue(maxYear);
      } else {
        setinputYearValue(value);
      }
    }
  };

  function checkDate() {
    let month;
    let day;
    if (inputMonthValue === '1' && inputMonthValue.length === 1) {
      month = '0' + inputMonthValue;
    } else {
      month = inputMonthValue;
    }
    if(inputDayValue === '1' || inputDayValue === '2' || inputDayValue === '3') {
      day = '0' + inputDayValue
    } else {
      day = inputDayValue
    }
    const year = inputYearValue;
    const data: any = [month, day, year].join(' / ');

    if (data.length > 13) {
      const checkDate = new Date(data);
      setDate(checkDate);
    } else {
      console.log("Invalid input value format");
    }
  };

  function checkValue(str: string, max: number) {
    if (str.charAt(0) !== '0' || str == '00') {
      let num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str = num > parseInt(max.toString().charAt(0))
        && num.toString().length === 1 ? '0' + num : num.toString();
    };
    return str;
  };

  function formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (day.length < 2)
      day = '0' + day;

    return [month, day, year].join('/');
  }


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Popover>
        <div style={{ display: 'flex', marginRight: '16px' }}>
          <div style={{ display: 'grid', justifyItems: 'center', gridRowGap: '4px' }}>
            <span>Month</span>
            <Input
              type="number"
              className={cn(
                "mr-[8px] w-[60px] justify-start text-left font-normal"
              )}
              style={{ wordSpacing: "-3px" }}
              value={inputMonthValue ? inputMonthValue : ''}
              onChange={handleMonthInputChange}
            />
          </div>
          <div style={{ display: 'grid', justifyItems: 'center', gridRowGap: '4px' }}>
            <span>Day</span>
            <Input
              type="number"
              disabled={!inputMonthValue}
              className={cn(
                "mr-[8px] w-[60px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              value={inputDayValue}
              onChange={handleDayInputChange}
            />
          </div>
          <div style={{ display: 'grid', justifyItems: 'center', gridRowGap: '4px' }}>
            <span>Year</span>
            <Input
              type="number"
              disabled={!inputDayValue}
              className={cn(
                "w-[60px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              value={inputYearValue}
              onChange={handleYearInputChange}
            />
          </div>
        </div>
        <PopoverTrigger asChild>
          <Button
            id="date"
            style={{ marginTop: '27px' }}
            variant={"outline"}
            className={cn(
              "w-[160px] justify-start text-left font-normal"
            )}
            onClick={checkDate}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            showOutsideDays={true}
            today={date}
            onSelect={(event: any) => {
              formatDate(event);
              setDate(event)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
