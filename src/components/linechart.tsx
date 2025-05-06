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

interface LineChartProps {
  chartConfigLine: ChartConfig;
  lineData: Array<any>;
  dataKeyDisplay: string;
  dataKeyLine: string;
  dataKeyAxis: string;
  title: string;
  uptodateYear: string;
}
const LineChartComponent = ({
  chartConfigLine,
  lineData,
  dataKeyAxis,
  dataKeyLine,
  dataKeyDisplay,
  title,
  uptodateYear,
}: LineChartProps) => {
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
          {/* <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="h-[300px] w-full" config={chartConfigLine}>
          <LineChart
            accessibilityLayer
            data={lineData}
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
