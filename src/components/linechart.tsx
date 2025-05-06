import { Line, CartesianGrid, LabelList, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

interface LineChartProps {
  chartConfigLine: ChartConfig;
  lineData: Array<any>;
  dataKeyDisplay: string;
  dataKeyLine: string;
  dataKeyAxis: string;
  title: string;
  uptodateYear: string;
  startYear?: number;
  endYear?: number;
}
const LineChartComponent = ({
  chartConfigLine,
  lineData,
  dataKeyAxis,
  dataKeyLine,
  dataKeyDisplay,
  title,
  uptodateYear,
  startYear,
  endYear,
}: LineChartProps) => {
  const [selectedYear, setSelectedYear] = useState(`-- Select Year --`);

  // Filter data based on selected year
  const filteredData =
    selectedYear === "-- Select Year --"
      ? lineData
      : lineData.filter((item) => {
          const itemYear = new Date(item[dataKeyAxis]).getFullYear().toString();
          return itemYear === selectedYear;
        });

  // Generate years array for dropdown with "All Years" option
  const years = [
    "-- Select Year --",
    ...Array.from({ length: endYear - startYear + 1 }, (_, i) =>
      (startYear + i).toString()
    ).reverse(),
  ];
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Updated Data {uptodateYear}
          </span>
          <span className="@[540px]/card:hidden">Updated {uptodateYear}</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32" aria-label="Select year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="rounded-lg"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="h-[300px] w-full" config={chartConfigLine}>
          <LineChart
            accessibilityLayer
            data={filteredData || lineData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
            height={300}
            width={undefined}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey={dataKeyAxis}
              tickLine={true}
              axisLine={true}
              tickMargin={2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey={dataKeyLine}
              type="monotone"
              stroke="var(--color-year)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey={dataKeyDisplay}
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
