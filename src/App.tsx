"use client";

import * as React from "react";
import { TrendingUp, ChartPie, ChartLine } from "lucide-react";
import { GlobalGet } from "@/helpers/fetcher.ts";
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
import SectionCards from "./components/cards";
import { log } from "console";
import LoadingComponent from "./components/loading";

const chartConfig = {
  Year: {
    label: "Year",
  },
  other: {
    label: "Other",
    color: "hsl(212 97% 87%)",
  },
};

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

interface PopulationData {
  data: Array<{
    Nation: string;
    Year: string;
    Population: string;
  }>;
  source: {
    source_name: string;
    dataset_name: string;
    dataset_link: string;
    source_description: string;
  };
  isLoading: boolean;
  error: any;
  activeChart: string;
}

function App() {
  const [state, setState] = React.useState<PopulationData>({
    isLoading: true,
    data: [],
    source: {},
    error: null,
    activeChart: "",
  });

  console.log(state.source);
  const fetchData = async () => {
    try {
      const response = await GlobalGet<PopulationData>({
        url: `https://datausa.io/api/data?drilldowns=Nation&measures=Population`,
      });

      setState((prev) => ({
        ...prev,
        data: response.data || [],
        source: response.source[0].annotations || [],
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err,
        isLoading: false,
      }));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const convertThousandFormat = new Intl.NumberFormat("en");

  const convertThousandShort = new Intl.NumberFormat("en", {
    notation: "compact",
  });

  const latestYear = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return "";

    return state.data.reduce((latest, current) => {
      return Number(current.Year) > Number(latest.Year) ? current : latest;
    }, state.data[0]).Year;
  }, [state.data]);

  const totalPopulation = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return "";

    return state.data.reduce((acc, curr) => acc + curr.Population, 0);
  }, [state.data]);

  const pieData = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return "";

    return state.data.map((item) => ({
      year: item.Year,
      population: item.Population,
      fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
  }, [state.data]);

  const lineData = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return "";

    return state.data
      .map((item) => ({
        year: item.Year,
        population: item.Population,
        displayPopulation: convertThousandShort.format(item.Population),
        fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, [state.data]);

  if (state.isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards>
            <Card className="@container/card">
              <CardHeader className="relative">
                <CardTitle className="@[250px]/card:text-2xl text-xl font-semibold tabular-nums">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {state.source.source_name}{" "}
                    <TrendingUpIcon className="size-4" />
                  </div>
                  <div className="text-muted-foreground">
                    {state.source.source_description}
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="@container/card flex flex-col xl:flex-row justify-between">
              <div>
                <CardHeader className="relative">
                  <CardTitle className="@[250px]/card:text-2xl text-xl font-semibold tabular-nums">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Total Population
                    </div>
                    <div className="text-muted-foreground">
                      {convertThousandFormat.format(totalPopulation)}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <div className="text-muted-foreground">
                    {state.source.dataset_link}
                  </div>
                </CardFooter>
              </div>

              <div className="flex">
                {["Line", "Pie"].map((key) => {
                  const chart = key as keyof typeof chartConfig;
                  return (
                    <button
                      key={chart}
                      data-active={state.activeChart === chart}
                      className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          activeChart: key,
                        }))
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs  ">
                          {chart === "Line" ? (
                            <ChartLine className="size-10" />
                          ) : (
                            <ChartPie className="size-10" />
                          )}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                          {chart}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </SectionCards>
          <div className=" px-4 lg:px-6">
            {state.activeChart === "Line" ? (
              <LineChartComponent
                title="Growth Population"
                uptodateYear={latestYear}
                chartConfigLine={chartConfigLine}
                lineData={lineData}
                dataKeyAxis="year"
                dataKeyLine="population"
                dataKeyDisplay="displayPopulation"
                startYear={2013}
                endYear={2023}
              />
            ) : (
              <PieChartComponent
                title="Growth Population"
                uptodateYear={latestYear}
                pieData={pieData}
                chartConfig={chartConfig}
                totalPopulation={convertThousandShort.format(totalPopulation)}
                dataKey="population"
                nameKey="year"
                startYear={2013}
                endYear={2023}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
