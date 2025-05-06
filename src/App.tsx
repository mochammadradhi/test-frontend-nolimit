"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import PieChartComponent from "./components/piechart";
import LineChartComponent from "./components/linechart";
import { SectionCards } from "./components/cards";

const chartConfig = {
  Year: {
    label: "Year",
  },
  other: {
    label: "Other",
    color: "hsl(212 97% 87%)",
  },
};

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

const chartConfigLine = {
  year: {
    label: "Year",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  population: {
    label: "Population",
    color: "hsl(212 95% 68%)",
  },
};

function App() {
  const convertThousand = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  const latestYear = React.useMemo(() => {
    return sensusData.reduce((latest, current) => {
      return Number(current.Year) > Number(latest.Year) ? current : latest;
    }).Year;
  }, []);

  const totalPopulation = React.useMemo(() => {
    return sensusData.reduce((acc, curr) => acc + curr.Population, 0);
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
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards>
            <Card className="@container/card">
              <CardHeader className="relative">
                <CardDescription>Total Population</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {convertThousand.format(totalPopulation)}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Trending up this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </SectionCards>
          <div className=" px-4 lg:px-6">
            <LineChartComponent
              title="Growth Population"
              uptodateYear={latestYear}
              chartConfigLine={chartConfigLine}
              lineData={lineData}
              dataKeyAxis="year"
              dataKeyLine="population"
              dataKeyDisplay="displayPopulation"
            />
          </div>

          <PieChartComponent
            pieData={pieData}
            chartConfig={chartConfig}
            totalPopulation={totalPopulation}
            dataKey="population"
            nameKey="year"
          />
        </div>
      </div>
    </div>
  );
}
export default App;
