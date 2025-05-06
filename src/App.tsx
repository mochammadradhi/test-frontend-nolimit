"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  Line,
  CartesianGrid,
  LabelList,
  LineChart,
  XAxis,
  PieChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  Year: {
    label: "Year",
  },
  other: {
    label: "Other",
    color: "hsl(212 97% 87%)",
  },
} satisfies ChartConfig;

const sensusData = [
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2023,
    Year: "2023",
    Population: 332387540,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2022,
    Year: "2022",
    Population: 331097593,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2021,
    Year: "2021",
    Population: 329725481,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2020,
    Year: "2020",
    Population: 326569308,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2019,
    Year: "2019",
    Population: 324697795,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2018,
    Year: "2018",
    Population: 322903030,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2017,
    Year: "2017",
    Population: 321004407,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2016,
    Year: "2016",
    Population: 318558162,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2015,
    Year: "2015",
    Population: 316515021,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2014,
    Year: "2014",
    Population: 314107084,
    "Slug Nation": "united-states",
  },
  {
    "ID Nation": "01000US",
    Nation: "United States",
    "ID Year": 2013,
    Year: "2013",
    Population: 311536594,
    "Slug Nation": "united-states",
  },
];

const chartDataLine = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfigLine = {
  year: {
    label: "Year",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  population: {
    label: "Population",
    color: "hsl(212 95% 68%)",
  },
} satisfies ChartConfig;

function App() {
  const convertThousand = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  const totalVisitors = React.useMemo(() => {
    return convertThousand.format(
      sensusData.reduce((acc, curr) => acc + curr.Population, 0)
    );
  }, []);

  const pieData = React.useMemo(() => {
    return sensusData.map((item) => ({
      year: item.Year,
      population: item.Population,
      fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
  }, []);

  const lineData = React.useMemo(() => {
    return sensusData
      .map((item) => ({
        year: item.Year,
        population: item.Population,
        displayPopulation: convertThousand.format(item.Population),
        fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 pb-0">
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
              data={pieData}
              dataKey="population"
              nameKey="year"
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
                          {totalVisitors.toLocaleString()}
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

        <ChartContainer config={chartConfigLine}>
          <LineChart
            accessibilityLayer
            data={lineData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="year"
              tickLine={true}
              axisLine={true}
              tickMargin={2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="population"
              type="natural"
              stroke="var(--color-year)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-year)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="displayPopulation"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
export default App;
