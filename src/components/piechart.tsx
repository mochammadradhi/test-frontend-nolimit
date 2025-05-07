import { Label, Pie, PieChart } from "recharts";

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

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
// Membuat component piechart dan pass props untuk reusable components sesuai kebutuhan
interface PieChartProps {
  chartConfig: ChartConfig;
  pieData: Array<any>;
  totalPopulation: string;
  dataKey: string;
  nameKey: string;
  title: string;
  uptodateYear: string;
  startYear?: number;
  endYear?: number;
}

const PieChartComponent = ({
  title,
  uptodateYear,
  chartConfig,
  pieData,
  totalPopulation,
  dataKey,
  nameKey,
  startYear = 2013,
  endYear = new Date().getFullYear(),
}: PieChartProps) => {
  const [selectedYear, setSelectedYear] = useState(`-- Select Year --`);

  // Filter data berdasarkan tahun yang dipilih
  const filteredData =
    selectedYear === "-- Select Year --"
      ? pieData
      : pieData.filter((item) => {
          const itemYear = new Date(item[nameKey]).getFullYear().toString();
          return itemYear === selectedYear;
        });

  // Generate array semua tahun beserta "All Years" option untuk dropdown option

  // Menghitung total population untuk filtering data
  const filteredTotalPopulation =
    selectedYear === "-- Select Year --"
      ? totalPopulation
      : filteredData.reduce(
          (sum, item) => sum + (Number(item[dataKey]) || 0),
          0
        );

  // Generate array semua tahun
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
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={filteredData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {filteredTotalPopulation}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Population
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
