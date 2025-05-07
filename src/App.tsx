"use client";

import * as React from "react";
import { ChartPie, ChartLine, TrendingUpIcon } from "lucide-react"; // Consolidated imports
import { GlobalGet } from "@/helpers/fetcher.ts";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import PieChartComponent from "@/components/piechart";
import LineChartComponent from "@/components/linechart";
import SectionCards from "@/components/cards";

import LoadingComponent from "@/components/loading";
import ErrorComponent from "@/components/error";

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
// mendefinisikan struktur Data Populasi yang dibutuhkan dari tipedata
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
  // mendefinisikan State yang akan menampung beberapa kebetuhan value
  const [state, setState] = React.useState<PopulationData>({
    isLoading: true,
    data: [],
    source: {
      source_name: "",
      dataset_name: "",
      dataset_link: "",
      source_description: "",
    },
    error: null,
    activeChart: "Line",
  });
  // Fetching data dari API url untuk mendapatkan suatu value data
  const fetchData = React.useCallback(async () => {
    try {
      const response = await GlobalGet<PopulationData>({
        url: `https://datausa.io/api/data?drilldowns=Nation&measures=Population`,
      });
      if (response.status === "error") {
        setState((prev) => ({
          ...prev,
          error: response,
          isLoading: false,
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        data: Array.isArray(response.data)
          ? response.data.map((item) => ({
              Nation: item.Nation || "",
              Year: item.Year || "",
              Population: item.Population || "",
            }))
          : [],
        source: response?.source?.[0]?.annotations ?? {
          source_name: "",
          dataset_name: "",
          dataset_link: "",
          source_description: "",
        },
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err,
        isLoading: false,
      }));
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // small function untuk reusable function convert angka menjadi rapih
  const convertThousandFormat = React.useMemo(
    () => new Intl.NumberFormat("en"),
    []
  );
  // small function untuk reusable function convert angka menjadi pendek
  const convertThousandShort = React.useMemo(
    () =>
      new Intl.NumberFormat("en", {
        notation: "compact",
      }),
    []
  );

  // small function untuk reusable function filtering tahun
  const latestYear = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return "";

    return state.data.reduce((latest, current) => {
      return Number(current.Year) > Number(latest.Year) ? current : latest;
    }, state.data[0]).Year;
  }, [state.data]);

  // small function untuk reusable function menghitung total populasi
  const totalPopulation = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return 0;

    return state.data.reduce((acc, curr) => acc + Number(curr.Population), 0);
  }, [state.data]);

  // function untuk memfilter data yang akan hanya di gunakan di Pie Chart
  const pieData = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return [];

    return state.data.map((item) => ({
      year: item.Year,
      population: item.Population,
      fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
  }, [state.data]);

  // function untuk memfilter data yang akan hanya di gunakan di Line Chart
  const lineData = React.useMemo(() => {
    if (!state.data || state.data.length === 0) return [];

    return state.data
      .map((item) => ({
        year: item.Year,
        population: item.Population,
        displayPopulation: convertThousandShort.format(Number(item.Population)),
        fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, [state.data, convertThousandShort]);

  // Loading Handling ketika data sedang di fetch
  if (state.isLoading) {
    return <LoadingComponent />;
  }

  // Error Handling ketika ada seuatu yang error terjadi
  if (state.error) {
    return <ErrorComponent errorMsg={state.error.message} />;
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
                  const chart = key;
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
                        <span className="text-xs">
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
          <div className="px-4 lg:px-6">
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
